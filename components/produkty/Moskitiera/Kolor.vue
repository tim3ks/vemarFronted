<script setup>
defineProps({
    kolory: { type: Array },
    kolor: { type: String },
    emit: { type: String },
});
</script>

<template>
    <div>
        <span class="underline">Kolor systemu</span>
        <div class="flex flex-wrap items-center p-1 gap-x-2 gap-y-3">
            <button
                v-for="item in kolory"
                :class="[
                    kolor == item.nazwa ? 'ring-4 ring-red-400' : 'ring-1',
                    item.kolor,
                ]"
                class="relative p-1 text-sm duration-300 cursor-pointer"
                @click="
                    $emit(emit, emit, {
                        kolor: item.nazwa,
                        doplata: item.doplata,
                    })
                "
            >
                {{ item.nazwa }}
                <span
                    v-if="item.doplata"
                    class="absolute z-10 px-[2px] rounded-sm py-[1px] text-xs font-extrabold text-slate-700 bg-green-200 -top-3 -right-3"
                    >{{ `*` + item.doplata }}</span
                >
            </button>
        </div>
    </div>
</template>

<style>
.white {
    background-color: white;
}

.antracyt {
    background-color: #222222;
}
.zloty-dab {
    background-color: #856d4d;
}
.orzech {
    background-color: #664228;
}
.mahon {
    background-color: #4c1200;
}
.winchester {
    background-color: #704214;
}
.ciemny-braz {
    background-color: #2b1e12;
}
.braz {
    background-color: #502f28;
}
.czarny {
    background-color: #000000;
}
.sosna {
    background-color: #e3ac72;
}
.dab-bagienny {
    background-color: #3e2f23;
}
</style>
