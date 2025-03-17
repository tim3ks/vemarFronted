<script setup lang="ts">
// import 'primevue/resources/themes/aura-light-green/theme.css'
const supabase = useSupabaseClient();

useHead({
    title: "Dashboard",
    meta: [{ name: "Vemar", content: "Strona do tworzenia inwestycji!" }],
});

onMounted(() => {
    // supabase.auth.onAuthStateChange((event, session) => {
    //     // console.log(event)
    //     switch (event) {
    //         case 'SIGNED_OUT':
    //             navigateTo("/login");
    //             break;
    //         case 'SIGNED_IN':
    //             // navigateTo("/");
    //             break;
    //         default:
    //             break;
    //     }
    //     // if (event === "SIGNED_OUT") {
    //     // }
    // });
});

// const ACCESS_TOKEN_KEY = useRuntimeConfig()

// console.log(ACCESS_TOKEN_KEY);
</script>

<template>
    <div>APP</div>
</template>
