<template>
    <div
        v-if="planModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-gray-600 bg-opacity-50"
    >
        <div
            class="relative flex flex-col w-full h-full max-w-3xl gap-2 p-4 bg-white rounded-lg shadow-lg"
        >
            <button
                @click="closeModal"
                class="absolute px-1.5 pb-0.5 rounded-md text-xl font-semibold text-gray-700 uppercase hover:bg-slate-200 top-2 right-2 hover:text-gray-900 flex items-center justify-center"
            >
                &times;
            </button>
            <h2 class="mb-4 text-2xl font-semibold">
                {{ selectedProdukt.opcje.plany[selectedPlan].nazwa }}
            </h2>
            <div class="flex items-center justify-between gap-2">
                <div class="flex gap-2">
                    <button
                        v-for="color in colors"
                        :class="`p-2 h-6 w-6 ring-1 gap-2 bg-${color}-500`"
                        @click="
                            (settings.stroke = color) &&
                                (settings.strokeWidth = 2)
                        "
                    ></button>
                </div>
                <div class="flex gap-1">
                    <button
                        class="p-1 text-sm text-white bg-blue-600 hover:bg-blue-700"
                        @click="toggleEraser"
                    >
                        {{ useEraser ? "Długopis" : "Gumka" }}
                    </button>
                    <button
                        class="p-1 text-sm text-white bg-red-600 hover:bg-red-700"
                        @click="lines = []"
                    >
                        Wyczyść
                    </button>
                    <!-- Dodaj przycisk Drukuj -->
                    <button
                        @click="printCanvas"
                        class="p-1 text-sm text-white bg-green-600 hover:bg-green-700"
                    >
                        Drukuj
                    </button>
                </div>
            </div>
            <div
                ref="canvasContainer"
                class="w-full h-full border"
                :class="{ 'eraser-cursor': useEraser }"
            >
                <v-stage
                    :config="stageConfig"
                    @mousedown="startDrawing"
                    @mousemove="draw"
                    @mouseup="endDrawing"
                    @touchstart="startDrawing"
                    @touchmove="draw"
                    @touchend="endDrawing"
                >
                    <v-layer ref="layer">
                        <v-line
                            v-for="(line, index) in lines"
                            :key="index"
                            :config="line"
                        ></v-line>
                    </v-layer>
                </v-stage>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { Stage, Layer, Line } from "vue-konva";
import { storeToRefs } from "pinia";
import { wycenyStore } from "~/stores/wycenyStore";

const { selectedProdukt, planModal } = storeToRefs(wycenyStore());

const currentColor = ref("red");
const settings = ref({
    stroke: "black",
    strokeWidth: 2,
    lineCap: "round",
    lineJoin: "round",
});

const colors = ["red", "black", "blue", "green", "purple"];
const useEraser = ref(false);

const toggleEraser = () => {
    useEraser.value = !useEraser.value;
    useEraser.value
        ? (settings.value.stroke = "white") && (settings.value.strokeWidth = 30)
        : (settings.value.stroke = "black") && (settings.value.strokeWidth = 2);
};

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
    selectedPlan: {
        type: Number,
    },
});
const lines = ref([]);

const stageConfig = ref({
    width: 0,
    height: 0,
});

const lastModyfications = [];

let isDrawing = false;

const canvasContainer = ref(null);

const printCanvas = () => {
    const stage = canvasContainer.value.querySelector("canvas");
    const dataURL = stage.toDataURL();

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
    <html>
      <head>
        <title>Wydruk ${
            selectedProdukt.value.opcje.plany[props?.selectedPlan].nazwa
        }</title>
        <style>
          body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: white;
          }
          img {
            max-width: 100%;
            max-height: 100%;
          }
        </style>
      </head>
      <body>
        <img src="${dataURL}" onload="window.print();window.close();" />
      </body>
    </html>
  `);
    printWindow.document.close();
};

const updateStageSize = () => {
    if (canvasContainer.value) {
        const { clientWidth, clientHeight } = canvasContainer.value;
        stageConfig.value.width = clientWidth;
        stageConfig.value.height = clientHeight;
    }
};

const startDrawing = (e) => {
    isDrawing = true;

    document.body.style.overflow = "hidden"; // Disable scrolling
    const pos = e.target.getStage().getPointerPosition();
    lines.value.push({
        points: [pos.x, pos.y],
        stroke: settings.value.stroke,
        strokeWidth: settings.value.strokeWidth,
        lineCap: settings.value.lineCap,
        lineJoin: settings.value.lineJoin,
    });
};

const draw = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines.value[lines.value.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // Update the last line to trigger reactivity
    lines.value.splice(lines.value.length - 1, 1, lastLine);
};

const endDrawing = () => {
    isDrawing = false;
    document.body.style.overflow = ""; // Enable scrolling
    selectedProdukt.value.opcje.plany[props?.selectedPlan].lines = JSON.parse(
        JSON.stringify(lines?.value)
    );
};

const closeModal = () => {
    planModal.value = false;
};

onMounted(() => {
    updateStageSize();
    window.addEventListener("resize", updateStageSize);
});

onUnmounted(() => {
    window.removeEventListener("resize", updateStageSize);
});

watch(
    () => props.isOpen,
    (newVal) => {
        if (newVal) {
            lines.value = JSON.parse(
                JSON.stringify(
                    selectedProdukt.value.opcje.plany[props.selectedPlan].lines
                )
            );
            nextTick(() => {
                updateStageSize();
            });
        }
    }
);
</script>

<style scoped>
/* Dostosowanie stylu */
.eraser-cursor {
    cursor: url("../../assets/images/zawiasA.png") 16 16, auto; /* Adjust the URL as per your eraser image */
}
</style>
