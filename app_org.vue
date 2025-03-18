<script setup lang="ts">
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
</script>

<template>
    <NuxtLayout>
        <div class="p-2 select-none">
            <NuxtPage />
        </div>
    </NuxtLayout>
</template>
