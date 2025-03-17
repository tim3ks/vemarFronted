<script setup>
defineProps({
	contentClass: { type: String },
	pomiar: { type: Object }
})
</script>

<template>
	<div :class="contentClass">
		{{ pomiar.monterzy }}
	</div>
</template>