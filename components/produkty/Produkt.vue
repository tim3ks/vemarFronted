<script setup>
const props = defineProps({
    pozycja: { type: Object },
    cena: { type: Number },
});

const { produktColor } = wycenyStore();
</script>

<template>
    <div class="relative px-3 py-1">
        <!-- <slot /> -->
        <span
            :class="pozycja.produktKolor"
            class="absolute px-[7px] shadow-md text-white justify-center -left-3 pt-0.5 rounded-full text-[14px] -top-1.5"
            >{{ pozycja.ilosc }}</span
        >
        <span>{{ produktColor(pozycja.produkt) }}</span>
        <span
            >{{ pozycja.produkt }} (
            {{ pozycja.rodzaj ? pozycja.rodzaj : "wybierz" }} )
            {{
                pozycja.szerokosc === null || pozycja.wysokosc === null
                    ? `podaj wymiary`
                    : `- ${pozycja.szerokosc}x${pozycja.wysokosc}: ${
                          pozycja.pomieszczenie
                              ? pozycja.pomieszczenie
                              : "wybierz pom."
                      }`
            }}
        </span>
        <!-- <span>{{ pozycja.produkt }} x {{ pozycja.ilosc }}{{ pozycja.rodzaj ? ` - ${pozycja.rodzaj}`: '' }} {{
			`${pozycja.szerokosc === null || pozycja.wysokosc === null ? '' : ': ' + pozycja.szerokosc + 'x' +
				pozycja.wysokosc}` }}{{ isNaN(cena) ? '' : `, ${cena.toFixed(2)}` }} </span> -->
    </div>
</template>
