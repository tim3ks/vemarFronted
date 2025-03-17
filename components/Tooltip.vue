<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
});

const visible = ref(false);

const tooltipStyles = reactive({
  top: "0px",
  left: "0px",
  transform: "translate(-50%, -100%)",
});

const showTooltip = (event) => {
  visible.value = true;
  const tooltipHeight = 10; // Adjust based on tooltip height
  tooltipStyles.top = `${event.currentTarget.offsetTop - tooltipHeight}px`;
  tooltipStyles.left = `${
    event.currentTarget.offsetLeft + event.currentTarget.offsetWidth / 2
  }px`;
};

const hideTooltip = () => {
  visible.value = false;
};
</script>

<template>
  <div
    class="tooltip-container"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <slot></slot>
    <div v-if="visible" class="z-30 tooltip" :style="tooltipStyles">
      {{ text }}
    </div>
  </div>
</template>

<style scoped>
.tooltip-container {
  position: relative;
  /* display: inline-block; */
}

.tooltip {
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 5px;
  white-space: nowrap;
  z-index: 1000;
  transform: translate(-50%, -100%);
}
</style>