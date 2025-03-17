<script setup>
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
    access: { type: String },
    user: { type: Object },
});

const isOpen = ref(false);

const supabase = useSupabaseClient();

const target = ref(null);

const toggle = (e) => {
    setTimeout(() => (isOpen.value = true));
    // (isOpen.value = !isOpen.value)
};

const dropMenu = [
    {
        id: 1,
        name: "Ustawienia",
        icon: "pi-cog",
        class: "rounded-t-[4px]",
        command: () => console.log("ustawienia"),
    },
    {
        id: 2,
        name: "Wyloguj",
        icon: "pi-upload",
        class: "rounded-b-[4px]",
        command: async () => {
            // await supabase.auth.signOut();
            $fetch("api/useAuth", {
                method: "POST",
                query: {
                    method: "sign-out",
                },
            });
            // navigateTo("/login");
        },
    },
];

onClickOutside(isOpen, (event) => {
    isOpen.value = false;
});
</script>

<template>
    <div class="relative z-10">
        <button
            :disabled="isOpen"
            class="flex items-center gap-1 px-3 py-2 text-white duration-300 rounded-md"
            :class="{
                '!bg-blue-300': isOpen,
                'bg-blue-400': !isOpen,
            }"
            @click.prevent="toggle"
        >
            <i :class="`pi pi-user`" style="font-size: 1rem" />{{ user?.email }}
        </button>
        <div
            class="absolute right-0 transition-all ease-out border rounded-[5px] w-30 border-slate-300 bg-slate-200 top-[41px]"
            v-if="isOpen"
            ref="target"
        >
            <ul>
                <li v-for="item in dropMenu">
                    <!-- <div :class="`flex p-2 duration-500 hover:bg-blue-400 ${item.class}`"> -->
                    <button
                        :class="`inline-flex w-full items-center gap-2 text-[14px] text-slate-600 hover:text-white px-4 py-2 duration-500 hover:bg-blue-400 ${item.class}`"
                        class=""
                        @click="item.command()"
                    >
                        <i
                            :class="`pi ${item.icon}`"
                            style="font-size: 1rem"
                        /><span>{{ item.name }}</span>
                    </button>
                    <!-- </div> -->
                </li>
            </ul>
            <!-- <button class="w-full text-sm" @click="console.log('link')">Wyloguj</button> -->
        </div>
    </div>
</template>
