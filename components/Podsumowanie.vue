<script setup>
const {
    wycena,
    sumaProduktow,
    sumaMontazu,
    selectedProdukt,
    loader,
    opcjeProduktu,
    itemDelete,
    confirmModal,
} = storeToRefs(wycenyStore());

const openConfirm = (index, id) => {
    itemDelete.value = { index, id };
    confirmModal.value = true;

    const mojObiekt = {};

    // Dodawanie właściwości i funkcji do obiektu
    mojObiekt.nazwa = "ChatGPT";
    mojObiekt.przywitanie = function () {
        console.log(`Cześć, jestem ${this.nazwa}`);
    };
};

const { selectProdukt, usunProdukt, dodajJeden, odejmijJeden, duplikuj } =
    wycenyStore();

defineProps({ total: { type: Object, default: null } });
</script>

<template>
    <div class="inline-flex gap-2 p-3 font-['Nunito']">
        <table class="w-full text-base rounded-sm ring-1">
            <thead>
                <tr class="bg-gray-200">
                    <th class="px-2 py-2 text-left">L.p</th>
                    <th class="px-2 py-2 text-left">Produkt-rodzaj</th>
                    <th class="px-2 py-2 text-left">Szerokość</th>
                    <th class="px-2 py-2 text-left">Wysokość</th>
                    <th class="px-2 py-2 text-left">Ilość</th>
                    <th class="px-2 py-2 text-left">Opcje</th>
                    <th class="px-2 py-2 text-left">Cena</th>
                    <th class="px-2 py-2 text-left">Montaż</th>
                    <th class="px-2 py-2 text-left">Akcje</th>
                </tr>
            </thead>
            <tbody>
                <Loader :isLoading="loader" />
                <tr
                    v-if="!loader"
                    v-for="(item, index) in wycena.produkty"
                    :key="item.id"
                    class="relative border-b cursor-pointer"
                    :class="[
                        selectedProdukt.id == item.id
                            ? '!bg-blue-100 shadow-md'
                            : 'bg-slate-100 duration-300',
                    ]"
                    @click="selectProdukt(item)"
                >
                    <td class="px-2 py-2">{{ index + 1 }}</td>
                    <td class="px-2 py-2">
                        {{
                            item.produkt +
                            "-" +
                            (item.rodzaj === null ? "Wybierz" : item.rodzaj)
                        }}
                    </td>
                    <td class="px-2 py-2">{{ item.szerokosc }}</td>
                    <td class="px-2 py-2">{{ item.wysokosc }}</td>
                    <td class="px-2 py-2">{{ item.ilosc }}</td>

                    <td class="px-2 py-2">
                        {{ opcjeProduktu(item) }}
                        {{
                            item.opcje.kolor
                                ? `kolor: ${item.opcje.kolor}`
                                : null
                        }}
                        {{
                            item.opcje.blaszka
                                ? `, mocowanie: ${item.opcje.blaszka}`
                                : null
                        }}
                    </td>
                    <td class="px-2 py-2">
                        {{
                            item.cena
                                ? `${Math.round(item.cena * 1.23)} zł`
                                : ""
                        }}
                    </td>
                    <td class="px-2 py-2">
                        {{
                            item.cenaMontazu
                                ? `${item.cenaMontazu * item.ilosc} zł`
                                : ""
                        }}
                    </td>
                    <td
                        class="flex items-center h-10 gap-1 text-sm justify-self-center"
                    >
                        <button
                            @click.stop="duplikuj(item.id)"
                            class="bg-blue-500 py-0.5 px-1 text-white rounded hover:bg-blue-400"
                        >
                            Duplikuj
                        </button>
                        <button
                            v-if="item.ilosc > 1"
                            @click.stop="odejmijJeden(item.id)"
                            class="bg-red-500 py-0.5 px-1 text-white rounded hover:bg-red-400"
                        >
                            -1
                        </button>
                        <button
                            @click.stop="dodajJeden(item.id)"
                            class="bg-green-500 py-0.5 px-1 text-white rounded hover:bg-green-400"
                        >
                            +1
                        </button>

                        <button
                            @click.stop="openConfirm(index, item.id)"
                            class="bg-violet-500 py-0.5 px-1 text-white rounded hover:bg-violet-400"
                        >
                            Usuń
                        </button>
                    </td>
                </tr>
                <tr v-if="!loader">
                    <td class="px-4 py-2 text-end" colspan="7">Montaż:</td>
                    <td
                        class="px-4 py-2 border-t border-l border-red-300 text-end"
                        colspan="2"
                    >
                        {{ sumaMontazu }} zł
                    </td>
                </tr>
                <tr v-if="!loader">
                    <td class="px-4 py-2 text-end" colspan="7">
                        Suma produktów:
                    </td>
                    <td
                        class="px-4 py-2 border-t border-l border-blue-300 text-end"
                        colspan="2"
                    >
                        {{ Math.round(sumaProduktow).toFixed(2) }} zł Brutto
                    </td>
                </tr>
                <tr v-if="!loader">
                    <td class="px-4 py-2 text-end" colspan="7">
                        Suma z montażem:
                    </td>
                    <td
                        class="px-4 py-2 border-t border-l border-green-300 text-end"
                        colspan="2"
                    >
                        {{ Math.round(sumaProduktow + sumaMontazu).toFixed(2) }}
                        zł Brutto
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style>
.montaz {
    background-color: #f2f2f2;
}
@media (max-width: 768px) {
    table {
        display: block;
        overflow-x: auto;
        white-space: nowrap;
    }
    thead {
        display: table;
        width: 100%;
        table-layout: fixed;
    }
    tbody {
        display: table;
        width: 100%;
        table-layout: fixed;
    }
    tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }
    th,
    td {
        display: block;
        text-align: right;
        white-space: normal;
    }
    th::before,
    td::before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
    }
    .flex {
        display: flex;
        justify-content: space-between;
    }
}
</style>
