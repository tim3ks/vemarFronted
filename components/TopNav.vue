<script setup>
// import { useStore } from "~/store";
const { access } = storeToRefs(useStore());
const route = useRoute();

const menu = [
    {
        id: 1,
        name: "Wyceny",
        path: "/wyceny",
        icon: "pi-dollar",
        access: ["admin", "monter", "biuro"],
        color: "bg-blue-500",
    },
    {
        id: 2,
        name: "Inwestycje",
        path: "/inwestycje",
        icon: "pi-calendar",
        access: ["admin", "monter", "biuro"],
        color: "bg-green-500",
    },
    {
        id: 3,
        name: "Monterzy",
        path: "/monterzy",
        icon: "pi-user",
        access: ["admin", "monter", "biuro"],
        color: "bg-purple-500",
    },
    {
        id: 4,
        name: "Klienci",
        path: "/klienci",
        icon: "pi-users",
        access: ["admin", "monter", "biuro"],
        color: "bg-cyan-500",
    },
    {
        id: 5,
        name: "Użytkownicy",
        path: "/uzytkownicy",
        icon: "pi-users",
        access: ["admin", "monter", "biuro"],
        color: "bg-orange-500",
    },
    {
        id: 6,
        name: "Produkcja",
        path: "/produkcja",
        icon: "pi-wrench",
        access: ["admin", "monter", "biuro"],
        color: "bg-yellow-500",
    },
];

const hover = (item) => {
    return item.path !== route.fullPath ? item.color : null;
};

const isVisible = (access, item) => {
    return item.access.includes(access);
};

defineProps({
    access: { type: String },
});
</script>

<template>
    <div>
        <ul class="flex gap-1 p-1 lg:flex text-md">
            <li v-for="item in menu">
                <TopLink
                    :visible="isVisible(access, item)"
                    :to="item.path"
                    :class="[
                        `flex items-center gap-1 p-2 ring-1 rounded shadow-md border-slate-400 duration:500 relative group transition ease-in-out  `,
                        [
                            {
                                'hover:bg-slate-300 hover:-translate-y-1':
                                    item.path !== route.fullPath,
                            },
                            { disabled: item.path === route.fullPath },
                            item.path === route.matched[0].path
                                ? `${item.color} -translate-y-1`
                                : null,
                        ],
                    ]"
                >
                    <i :class="`pi ${item.icon}`" style="font-size: 1rem" />{{
                        item.name
                    }}
                    <span
                        :class="[
                            'absolute left-0 flex group-hover:w-full  h-1 duration-400 bottom-[0.5px]',
                            hover(item),
                        ]"
                    ></span>
                </TopLink>
            </li>
        </ul>
    </div>
</template>
