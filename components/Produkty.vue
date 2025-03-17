<script setup>
const props = defineProps({
	contentClass: { type: String },
	pomiar: { type: Object }
})

const addProdukt = () => {
	props.pomiar.produkty.push({ id: 1, name: 'Moskitiera' })
}

</script>

<template>
	<div :class="contentClass">
		<div class="grid grid-cols-2 p-1">
			<div class="bg-white">

				<div v-for="(produkt, index) in pomiar.produkty">
					<span @click="pomiar.produkty.splice(index, 1)">{{ produkt.name }}</span>
				</div>
			</div>
			<div class="flex justify-end">
				<button class="w-10 h-10 p-2 bg-blue-500 rounded-md justify-self-end"
					@click="addProdukt">+</button>
			</div>

		</div>
	</div>
</template>