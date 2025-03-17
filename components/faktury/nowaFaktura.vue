<template>
    <div class="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-md">
        <h1 class="text-2xl font-bold text-gray-800">Faktura</h1>
        <p class="text-sm text-gray-500">Data: {{ invoiceDate }}</p>

        <div class="mt-8">
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <h2 class="font-semibold text-gray-700">Sprzedawca:</h2>
                    <p>{{ companyName }}</p>
                    <p>{{ companyAddress }}</p>
                </div>
                <div>
                    <h2 class="font-semibold text-gray-700">Odbiorca:</h2>
                    <p>{{ clientName }}</p>
                    <p>{{ clientAddress }}</p>
                </div>
            </div>
        </div>

        <table class="w-full mt-6 table-auto">
            <thead>
                <tr class="bg-gray-100">
                    <th class="px-4 py-2 text-left text-gray-600">Przedmiot</th>
                    <th class="px-4 py-2 text-right text-gray-600">Cena</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.name">
                    <td class="px-4 py-2 border">{{ item.name }}</td>
                    <td class="px-4 py-2 text-right border">
                        {{ item.price }} zł
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="flex justify-end mt-6">
            <p class="text-lg font-semibold">Razem: {{ total }} zł</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const invoiceDate = ref("2024-09-12");
const companyName = ref("Firma XYZ");
const companyAddress = ref("Ul. Przykładowa 123, 00-000 Miasto");
const clientName = ref("Jan Kowalski");
const clientAddress = ref("Ul. Klienta 321, 00-000 Miasto");
const items = ref([
    { name: "Usługa A", price: 100 },
    { name: "Produkt B", price: 150 },
]);
const total = ref(items.value.reduce((acc, item) => acc + item.price, 0));
</script>

<style scoped>
/* Custom styles (opcjonalnie) */
</style>
