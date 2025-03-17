<script setup>

defineProps({
	item: {type:Object}
})

</script>

<template>
	<div>
		Drzwiowa
		<span>{{item.cena.toFixed(2)}}</span>
	</div>
</template>