<script setup>
const zawiasy = ["Lewe", "Prawe"];

const props = defineProps({
  zawias: { type: String },
});
</script>

<template>
  <div>
    <span class="underline">Zawiasy / sterowanie</span>
    <div class="flex gap-1 pt-2">
      <div class="flex">
        <label
          class="flex items-center space-x-2 cursor-pointer"
          v-for="item in zawiasy"
          @click="$emit('zmianaZawiasu', item)"
        >
          <input type="checkbox" class="hidden" :value="item" />
          <svg class="w-6 h-6 text-gray-500 fill-current" viewBox="0 0 24 24">
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
                v-if="item === props.zawias"
                d="M5.414 12l4.293 4.293c.39.39 1.024.39 1.414 0L19.707 9.293a1 1 0 0 0-1.414-1.414L10 14.586 6.707 11.293a1 1 0 0 0-1.414 1.414z"
              />
            </transition>
          </svg>
          <span
            :class="[item === props.zawias ? 'font-semibold' : null]"
            class="text-gray-800"
            >{{ item }}</span
          >
        </label>
      </div>
    </div>
    <!-- <div>
      <zawiasyTypA />
    </div> -->
  </div>
</template>