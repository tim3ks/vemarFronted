<script setup>
const props = defineProps({
  odwrotnyMontaz: Boolean,
});

// const updateValue = (event) => {
// 	emit('update:modelValue', event.target.checked);
// };
</script>

<template>
  <div>
    <label class="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        class="hidden"
        :value="odwrotnyMontaz"
        @change="$emit('odwrotnyMontaz')"
      />
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
            v-if="props.odwrotnyMontaz === true"
            d="M5.414 12l4.293 4.293c.39.39 1.024.39 1.414 0L19.707 9.293a1 1 0 0 0-1.414-1.414L10 14.586 6.707 11.293a1 1 0 0 0-1.414 1.414z"
          />
        </transition>
      </svg>
      <span class="text-gray-800">Odwrotny montaż</span>
    </label>
  </div>
</template>