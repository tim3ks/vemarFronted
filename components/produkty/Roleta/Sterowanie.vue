<script setup>
const zawiasy = ["Lewe", "Prawe"];

const props = defineProps({
    sterowanie: { type: Object },
    item: { type: Object },
});

watch(
    () => props.item,
    (newRodzaj, oldRodzaj) => {
        if (newRodzaj.ilosc == 1)
            newRodzaj.opcje.sterowanie = {
                lewe: 1,
                prawe: 0,
            };
        console.log(newRodzaj.ilosc);
    }
    //     { deep: true }
);
</script>

<template>
    <div>
        <!-- {{ item }} -->
        <span class="underline">Sterowanie</span>
        <div class="flex gap-1 pt-2">
            <div class="flex flex-row justify-between gap-3">
                <div
                    class="flex flex-col items-center justify-center p-1 bg-gray-200 rounded-lg shadow-lg"
                >
                    <!-- Plus Button -->
                    <button
                        class="text-xl font-bold text-black hover:text-gray-600"
                        @click="
                            $emit('zmianaSterowania', 'sterowanieLewe', '+')
                        "
                    >
                        <span class="px-2 bg-green-300 rounded-full">+</span>
                    </button>

                    <!-- Label -->
                    <div class="p-1 text-lg font-semibold text-black">
                        {{ item.opcje.sterowanie.lewe }} L
                    </div>

                    <!-- Minus Button -->
                    <!-- <button
                        class="text-xl font-bold text-black hover:text-gray-600"
                        @click="
                            $emit('zmianaSterowania', 'sterowanieLewe', '-')
                        "
                    >
                        <span class="px-2 bg-red-300 rounded-full">-</span>
                    </button> -->
                </div>
                <div
                    class="flex flex-col items-center justify-center p-1 bg-gray-200 rounded-lg shadow-lg"
                >
                    <!-- Plus Button -->

                    <!-- Label -->
                    <div class="p-1 text-lg font-semibold text-black">
                        {{ item.opcje.sterowanie.prawe }} P
                    </div>

                    <button
                        class="text-xl font-bold text-black hover:text-gray-600"
                        @click="
                            $emit('zmianaSterowania', 'sterowaniePrawe', '+')
                        "
                    >
                        <span class="px-2 bg-green-300 rounded-full">+</span>
                    </button>
                    <!-- Minus Button -->
                    <!-- <button
                        @click="
                            $emit('zmianaSterowania', 'sterowaniePrawe', '-')
                        "
                        class="text-xl font-bold text-black hover:text-gray-600"
                    >
                        <span class="px-2 bg-red-300 rounded-full">-</span>
                    </button> -->
                </div>

                <!-- <label
                    class="flex items-center space-x-2 cursor-pointer"
                    v-for="item in zawiasy"
                    @click="$emit('zmianaSterowania', item + 1)"
                >
                    <input type="checkbox" class="hidden" :value="item" />
                    <svg
                        class="w-6 h-6 text-gray-500 fill-current"
                        viewBox="0 0 24 24"
                    >
                        <rect
                            x="3"
                            y="3"
                            width="19"
                            height="19"
                            rx="4"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1"
                        />
                        <transition name="fade">
                            <path
                                class="check-icon"
                                v-if="item === props.sterowanie"
                                d="M5.414 12l4.293 4.293c.39.39 1.024.39 1.414 0L19.707 9.293a1 1 0 0 0-1.414-1.414L10 14.586 6.707 11.293a1 1 0 0 0-1.414 1.414z"
                            />
                        </transition>
                    </svg>
                    <span
                        :class="[
                            item === props.sterowanie ? 'font-semibold' : null,
                        ]"
                        class="text-gray-800"
                        >{{ item }}</span
                    >
                </label> -->
            </div>
        </div>
        <!-- <div>
      <zawiasyTypA />
    </div> -->
    </div>
</template>
