<script setup>
const { companyNip, pomiar, klient, isCompany, postalCode, isExist } = storeToRefs(useStore());
const { checkCompany, getPostal, klientAdres } = useStore();

const adres = computed(() => {
	return klientAdres()
})

</script>

<template>
		<div>
			<input oninput="this.value=this.value.slice(0,10)" type="number" name="nip" placeholder="NIP"
				v-model="companyNip"
				class="bg-white w-full px-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none py-1 text-base leading-8 duration-200 ease-in-out bg-transparent border border-gray-600 rounded outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-transparent focus:shadow-lg shadow-blue-500/50" />
			<div class="flex flex-col gap-2 p-4" v-if="klient.Nip">

				<DaneKlienta :dane="klient.Nazwa" />
				<DaneKlienta :dane="adres.firstLine" />
				<DaneKlienta :dane="adres.secondLine" />
				<input type="text" name="nip" placeholder="telefon" v-model="klient.telefon"
					class="bg-white w-full px-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none py-1 text-base leading-8 duration-200 ease-in-out bg-transparent border border-gray-600 rounded outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-transparent" />
				<input type="text" name="nip" placeholder="e-mail" v-model="klient.email"
					class="bg-white w-full px-3 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none py-1 text-base leading-8 duration-200 ease-in-out bg-transparent border border-gray-600 rounded outline-none placeholder:text-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-transparent" />
				<div v-if="!isExist" class="flex flex-col">
					<span class="text-red-500 underline">Klient nie istnieje w bazie danych.</span>
					<button
						class='p-2 text-white duration-500 bg-green-500 rounded-sm hover:bg-green-400'>Zapisz</button>
				</div>
			</div>
		</div>
</template>