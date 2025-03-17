<script setup>
definePageMeta({
    layout: false,
});

const inputStyle =
    "text-sm rounded border border-gray-300 py-2 px-4 text-base font-semi leading-8 outline-none transition-colors duration-300 ease-in-out placeholder:text-gray-500 focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-600";

const { auth } = useSupabaseClient();
const user = useSupabaseUser();

const loading = ref(false);
const email = ref("");
const password = ref("");

const emailId = useId();
const passId = useId();

async function signInWithEmail() {
    loading.value = true;
    try {
        const { error } = await auth.signInWithPassword({
            email: email.value,
            password: password.value,
        });

        email.value = "";
        password.value = "";

        if (error) throw error;

        return navigateTo("/");
    } catch (error) {
        setTimeout(() => {
            loading.value = false;
        }, 3000);
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        signInWithEmail();
    }
}
</script>

<template>
    <div
        class="flex flex-col items-center justify-center min-h-screen p-4 select-none sm:p-8 bg-gray-50"
    >
        <div
            class="relative flex flex-col items-center w-full max-w-md gap-4 p-8 bg-white border border-gray-300 rounded-md shadow-lg sm:p-12"
        >
            <form
                class="flex flex-col items-center w-full gap-4"
                @submit.prevent="signInWithEmail"
            >
                <div class="flex flex-col w-full gap-2">
                    <label
                        :for="emailId"
                        class="text-sm leading-4 text-gray-600"
                        >E-mail</label
                    >
                    <input
                        :id="emailId"
                        type="text"
                        name="login"
                        placeholder="Enter your email"
                        :class="inputStyle"
                        v-model="email"
                        @keypress="handleKeyPress"
                    />
                </div>
                <div class="flex flex-col w-full gap-2">
                    <label :for="passId" class="text-sm leading-4 text-gray-600"
                        >Password</label
                    >
                    <input
                        :id="passId"
                        autocomplete="true"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        :class="inputStyle"
                        v-model="password"
                        @keypress="handleKeyPress"
                    />
                </div>
                <LoginButton
                    :disabled="loading"
                    text="Login"
                    class="px-4 py-2 text-white transition duration-300 bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    @click="signInWithEmail"
                />
            </form>
        </div>
    </div>
</template>
