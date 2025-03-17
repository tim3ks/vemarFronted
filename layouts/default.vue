<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const { userRoles } = useStore();

const layout = ref("");

const { access } = storeToRefs(useStore());
const { updateAccess } = useStore();

// console.log(access);

const { data, error } = await supabase.from("user_roles_view").select("*");

// onMounted(() => {
//     console.log("data");
//     console.log(data, "data");
// });

user.value ? updateAccess(data[0].roles[0]) : null;

await callOnce(async () => {
    if (user.value) {
        // userRoles()
        // supabase
        //     .channel("roles")
        //     .on(
        //         "postgres_changes",
        //         {
        //             event: "*",
        //             schema: "public",
        //             table: "user_roles",
        //         },
        //         (payload) => {
        //             const { eventType } = payload;
        //             if (
        //                 eventType === "UPDATE" ||
        //                 eventType === "INSERT" ||
        //                 eventType === "DELETE"
        //             ) {
        //                 // console.log("zmiana");
        //                 // getPomiary();
        //                 // alert('Nowe pomiary!')
        //                 // reloadNuxtApp({
        //                 //     path: "/",
        //                 //     ttl: 1000, // default 10000
        //                 // });
        //             }
        //         }
        //     )
        //     .subscribe();
    }
});
</script>
<template>
    <div class="flex select-none navStyle">
        <LazyNuxtLayout :name="access" />
        <MyDropDown :access="access" :user="user" />
    </div>
    <slot />
</template>
