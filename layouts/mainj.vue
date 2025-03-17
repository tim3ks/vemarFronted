<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const layout = ref("");

const { access } = storeToRefs(useStore());
const { updateAccess } = useStore();

// console.log(access);

const { data, error } = await supabase.from("user_roles_view").select("*");

onMounted(() => {
    console.log("data");
    console.log(data, "data");
});

user.value ? updateAccess(data[0].roles[0]) : null;

const wyloguj = async () => {
    const { error } = await supabase.auth.signOut();

    console.log(error);
};

const menu = ref();

const toggle = (event) => {
    menu.value.toggle(event);
};

const items = ref([
    {
        separator: true,
    },
    {
        label: user.value?.email,
        items: [
            {
                label: "Wyloguj",
                icon: "pi pi-upload",
                command: () => wyloguj(),
            },
        ],
    },
]);
</script>
<template>
    <div class="flex select-none navStyle">
        <NuxtLink to="/pomiary">
            <Button label="Pomiary" />
        </NuxtLink>
        <div>
            <NuxtLayout :name="access" />
        </div>
        <!-- <div class="inline-flex border"> -->
        <div class="">
            <Button
                type="button"
                icon="pi pi-user"
                @click="toggle"
                aria-haspopup="true"
                aria-controls="overlay_menu"
            />
            <Menu
                ref="menu"
                id="overlay_menu"
                :model="items"
                :popup="true"
                class="text-xs"
            />
        </div>
        <!-- </div> -->
    </div>
    <slot />
</template>

<style scoped>
.navStyle {
    /* @apply justify-between p-3 border-b bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50; */
}
</style>
