<template>
    <div class="flex flex-col gap-2 h-3/4">
        <!-- <div class="flex-grow h-full ring-1"> -->
        <v-stage
            :config="configStage"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="endDrawing"
            class="h-full"
        >
            <v-layer ref="layer">
                <v-line
                    v-for="(line, index) in lines"
                    :key="index"
                    :config="line"
                />
            </v-layer>
        </v-stage>
        <!-- </div> -->
        <div class="flex gap-2">
            <button
                v-for="color in colors"
                :class="`p-2 ring-1 gap-2 bg-${color}-500`"
                @click="currentColor = color"
            ></button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import { Stage, Layer, Line } from "vue-konva";

const colors = ["red", "black", "blue"];
const currentColor = ref("red");

var width = window.innerWidth;
var height = window.innerHeight;

const configStage = ref({
    width: width,
    height: height,
});

const lines = ref([]);
let isDrawing = false;

const startDrawing = (e) => {
    isDrawing = true;
    const pos = e.target.getStage().getPointerPosition();
    lines.value.push({
        points: [pos.x, pos.y],
        stroke: currentColor.value,
        strokeWidth: 3,
        lineCap: "round",
        lineJoin: "round",
    });
};

const draw = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const lastLine = lines.value[lines.value.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.value.splice(lines.value.length - 1, 1, lastLine);
};

const endDrawing = () => {
    isDrawing = false;
};

const resizeCanvas = () => {
    const container = document.querySelector(".flex-grow");
    if (container) {
        configStage.value.width = container.offsetWidth;
        configStage.value.height = container.offsetHeight;
    }
};

onMounted(() => {
    window.addEventListener("resize", resizeCanvas);
    nextTick(() => {
        resizeCanvas();
    });
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeCanvas);
});

const setColor = (color) => {
    currentColor.value = color;
};
</script>

<style scoped>
/* Stylowanie płótna */
</style>
