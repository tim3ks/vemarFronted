<script setup>
const isVisible = ref(false);

// const toggle = () => isVisible.value = !isVisible.value

const produkty = [
    {
        id: 1,
        nazwa: "Moskitiera",
        class: "!bg-red-400",
    },
    {
        id: 2,
        nazwa: "Plisa",
        class: "!bg-blue-400",
    },
    {
        id: 3,
        nazwa: "Żaluzja",
        class: "!bg-purple-400",
    },
    {
        id: 4,
        nazwa: "Roleta",
        class: "!bg-yellow-400",
    },
    {
        id: 5,
        nazwa: "Vertical",
        class: "!bg-cyan-400",
    },
    {
        id: 6,
        nazwa: "Karnisze / zasłony",
        class: "!bg-orange-400",
    },
];
</script>

<template>
    <!-- <div class=""> -->
    <!-- <span class="px-3 py-1 font-bold text-white duration-300 bg-green-500 rounded-sm cursor-pointer ring-1 hover:bg-green-400 ring-slate-400"
			@click="isVisible = !isVisible">
			+
		</span> -->
    <div class="md:left-0 sm:right-0">
        <ul class="flex flex-wrap items-center gap-1">
            <li
                @click="
                    $emit('dodajProdukt', {
                        produkt: item.nazwa,
                        produktKolor: item.class,
                    })
                "
                :class="[item.class, `addProdukt`]"
                v-for="item in produkty"
            >
                {{ item.nazwa }}
            </li>
        </ul>
    </div>
    <!-- </div> -->
</template>
