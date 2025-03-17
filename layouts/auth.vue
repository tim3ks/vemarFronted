<script setup>
const supabase = useSupabaseClient();

const loading = ref(false);
const email = ref("");
const password = ref("");

async function signInWithEmail() {
    //     setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
        email: email.value,
        password: password.value,
    });

    if (error) Alert.alert(error.message);
    //     setLoading(false);
}
</script>
<template>
    <div class="flex justify-center items-center min-h-screen">
        <form class="flex" @submit.prevent="signInWithEmail">
            <div
                class="border border-green-400 flex flex-col rounded-md p-6 gap-2"
            >
                <input v-model="email" />
                <input v-model="password" />
                <button
                    type="submit"
                    @click="signInWithEmail"
                    :disabled="loading"
                    class="px-4 py-2 mt-6 font-semibold text-white transition duration-50"
                >
                    Zaloguj
                </button>
            </div>
        </form>
    </div>
</template>
