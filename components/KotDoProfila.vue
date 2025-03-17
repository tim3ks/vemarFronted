<script setup>
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { wycenyStore } from "@/stores/wycenyStore";

const { selectedProdukt } = storeToRefs(wycenyStore());

const props = defineProps({
    kolor: { type: String },
});

const kot = computed(() => selectedProdukt.value.opcje.kot);

const getColor = (lineId) => {
    // console.log("kolor");
    // if (kot?.value.length == 0) return;
    // if (kot.value?.includes(lineId)) {
    //   return "red"; // zmień na dowolny kolor po kliknięciu
    // }
    return props.kolor === "Biały - Ral 9003" ? "black" : "white";
};

const addKot = (item) => {
    const index = kot.value.indexOf(item);

    if (index === -1) {
        kot.value.push(item);
    } else {
        kot.value.splice(index, 1);
    }
};

const profilKolor = (kolor) => {
    switch (kolor) {
        case "Brąz - Ral 8017":
            return "braz";
        case "Antracyt - Ral 7016":
            return "antracyt";
        case "Złoty dąb":
            return "zloty-dab";
        case "Orzech":
            return "orzech";
        case "Mahoń":
            return "mahon";
        case "Winchester":
            return "winchester";
        case "Ciemny brąz - Ral 8022":
            return "ciemny-braz";
        default:
            return "white";
    }
};
</script>

<template>
    <div :class="{ 'bg-slate-200': props.kolor === 'Biały - Ral 9003' }">
        <Transition name="fade">
            <svg
                v-if="props.kolor && selectedProdukt.opcje.kot"
                width="200"
                height="250"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 250"
            >
                <!-- Górna ściana -->
                <line
                    x1="6"
                    y1="10"
                    x2="194"
                    y2="10"
                    :class="`stroke-${profilKolor(props.kolor)}`"
                    class="cursor-pointer"
                    stroke-width="8"
                    @click="addKot('Góra')"
                />

                <!-- Prawa ściana -->
                <line
                    x1="190"
                    y1="10"
                    x2="190"
                    y2="240"
                    :class="`stroke-${profilKolor(props.kolor)}`"
                    stroke-width="8"
                    class="cursor-pointer"
                    @click="addKot('Prawa')"
                />

                <!-- Dolna ściana -->
                <line
                    x1="194"
                    y1="240"
                    x2="6"
                    y2="240"
                    class="cursor-pointer"
                    :class="`stroke-${profilKolor(props.kolor)}`"
                    stroke-width="8"
                    @click="addKot('Dół')"
                />

                <!-- Lewa ściana -->
                <line
                    x1="10"
                    y1="240"
                    x2="10"
                    y2="10"
                    class="cursor-pointer"
                    :class="`stroke-${profilKolor(props.kolor)}`"
                    stroke-width="8"
                    @click="addKot('Lewa')"
                />

                <line
                    x1="10"
                    y1="10"
                    x2="10"
                    y2="240"
                    :stroke="getColor('Lewa')"
                    stroke-width="0.5"
                />
                <line
                    x1="190"
                    y1="10"
                    x2="190"
                    y2="240"
                    :stroke="getColor('Prawa')"
                    stroke-width="0.5"
                />
                <line
                    x1="10"
                    y1="10"
                    x2="190"
                    y2="10"
                    :stroke="getColor('Góra')"
                    stroke-width="0.5"
                />
                <line
                    x1="10"
                    y1="240"
                    x2="190"
                    y2="240"
                    :stroke="getColor('Dół')"
                    stroke-width="0.5"
                />

                <!-- Moskitiera - kratka -->
                <defs>
                    <pattern
                        id="grid"
                        width="4"
                        height="4"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 4 0 L 0 0 0 4"
                            fill="none"
                            stroke="gray"
                            stroke-width="0.5"
                        />
                    </pattern>
                </defs>
                <rect
                    x="14"
                    y="14"
                    width="172"
                    height="222"
                    fill="url(#grid)"
                    stroke="none"
                />

                <!-- Zaczepy -->
                <rect
                    x="16"
                    y="10"
                    width="4"
                    height="8"
                    fill="white"
                    rx="1"
                    ry="1"
                />
                <rect
                    x="98"
                    y="10"
                    width="4"
                    height="8"
                    fill="white"
                    rx="1"
                    ry="1"
                />
                <rect
                    x="180"
                    y="10"
                    width="4"
                    height="8"
                    fill="white"
                    rx="1"
                    ry="1"
                />
                <rect
                    x="10"
                    y="118"
                    width="8"
                    height="4"
                    fill="white"
                    rx="1"
                    ry="1"
                />
                <rect
                    x="182"
                    y="118"
                    width="8"
                    height="4"
                    fill="white"
                    rx="1"
                    ry="1"
                />
                <rect
                    x="180"
                    y="232"
                    width="4"
                    height="8"
                    fill="white"
                    rx="1"
                    ry="1"
                />
                <rect
                    x="98"
                    y="232"
                    width="4"
                    height="8"
                    fill="white"
                    rx="1"
                    ry="1"
                />
                <rect
                    x="16"
                    y="232"
                    width="4"
                    height="8"
                    fill="white"
                    rx="1"
                    ry="1"
                />

                <!-- Strzałki -->
                <!-- Strzałka skierowana do góry pod górną linią -->
                <svg
                    v-if="selectedProdukt.opcje.kot.includes('Góra')"
                    x="90"
                    y="20"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 2L12 22"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M5 9L12 2L19 9"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>

                <!-- Strzałka skierowana w lewo po prawej stronie -->
                <svg
                    v-if="selectedProdukt.opcje.kot.includes('Prawa')"
                    x="160"
                    y="110"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="arrow-right"
                >
                    <path
                        d="M2 12H22"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M15 5L22 12L15 19"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>

                <!-- Strzałka skierowana w dół pod dolną linią -->
                <svg
                    v-if="selectedProdukt.opcje.kot.includes('Dół')"
                    x="90"
                    y="210"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="arrow-down"
                >
                    <path
                        d="M12 2L12 22"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M19 15L12 22L5 15"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>

                <!-- Strzałka skierowana w prawo po lewej stronie -->
                <svg
                    v-if="selectedProdukt.opcje.kot.includes('Lewa')"
                    x="20"
                    y="110"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    class="arrow-left"
                >
                    <path
                        d="M22 12H2"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path
                        d="M9 5L2 12L9 19"
                        stroke="currentColor"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                </svg>
            </svg>
        </Transition>
    </div>
</template>

<style>
.stroke-white {
    stroke: #ffffff;
}

.stroke-antracyt {
    stroke: #222222;
}

.stroke-zloty-dab {
    stroke: #856d4d;
}

.stroke-orzech {
    stroke: #664228;
}

.stroke-mahon {
    stroke: #4c1200;
}

.stroke-winchester {
    stroke: #704214;
}

.stroke-ciemny-braz {
    stroke: #2b1e12;
}

.stroke-braz {
    stroke: #502f28;
}
</style>
