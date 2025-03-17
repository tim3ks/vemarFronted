<script setup>

defineProps({
	dane: {type:String}
})

</script>

<template>
	<span span class="p-2 font-semibold bg-white rounded-sm text-md ring-1">
		{{dane}}
	</span>
</template>