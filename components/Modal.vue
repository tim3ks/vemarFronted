<script setup>
const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false,
    },
});

// const { sendEmail, sending, error } = useEmail();

const { sendOferta } = wycenyStore();
const { wycena, doZaplaty } = storeToRefs(wycenyStore());

const form = ref({
    from: "Vemar",
    name: "",
    street: "",
    city: "",
    email: "",
    phone: "",
    nip: "",
});

const { sending } = useEmail();

const handleSubmit = async () => {
    sendOferta;
    //   // Handle form submission logic here

    //   const id = crypto.randomUUID();

    //   const result = await sendEmail({
    //     from: form.value.from,
    //     to: form.value.email,
    //     subject: `VEMAR, wycena ID: ` + id,
    //     wycena: { ...wycena.value },
    //     dane: {
    //       id: id,
    //       name: form.value.name,
    //       city: form.value.city,
    //       street: form.value.street,
    //       email: form.value.email,
    //       phone: form.value.phone,
    //       nip: form.value?.nip,
    //     },
    //   });
    //   if (result.success) {
    //     console.log(props.isOpen);
    //     // emit("close");
    //     props.isOpen = false;
    //     // form.value = {
    //     //   from: "",
    //     //   to: "",
    //     //   // cc: "",
    //     //   // bcc: "",
    //     //   subject: "",
    //     //   text: "",
    //     // };
    //     // alert("Email sent successfully");
    //   }
};

const firma = ref(false);
</script>

<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50"
    >
        <div
            class="p-6 bg-white rounded shadow-lg lg:max-w-lg lg:h-3/4 sm:w-full sm:h-full"
        >
            <h2 class="flex justify-between mb-4 text-2xl">
                Wysyłanie oferty
                <CheckBox
                    @na-firme="firma = !firma"
                    :item="firma"
                    emit="naFirme"
                    class="p-1 text-sm"
                >
                    Firma
                </CheckBox>
            </h2>

            <div class="flex justify-between gap-2 mb-4">
                <div class="w-1/2 p-3 rounded-sm ring-1 ring-slate-300">
                    <div class="flex items-center gap-1">
                        <label
                            for="zadatek"
                            class="block text-lg font-medium text-gray-700"
                            >Zadatek</label
                        >
                        <button
                            @click="console.log('40%')"
                            class="px-1 py-[1px] hover:bg-green-400 text-sm text-white bg-green-500 rounded"
                        >
                            40%
                        </button>
                        <button
                            @click="console.log('50%')"
                            class="px-1 py-[1px] hover:bg-red-400 text-sm text-white bg-red-500 rounded"
                        >
                            50%
                        </button>
                    </div>
                    <input
                        v-model="wycena.zadatek"
                        type="number"
                        id="zadatek"
                        class="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <div class="flex gap-2">
                        <input
                            type="radio"
                            id="gotowka"
                            name="choice"
                            value="Gotówka"
                            v-model="wycena.rodzajZadatku"
                        />
                        <label for="gotowka">Gotówka</label><br />

                        <input
                            type="radio"
                            id="przelew"
                            name="choice"
                            value="Przelew"
                            v-model="wycena.rodzajZadatku"
                        />
                        <label for="przelew">Przelew</label><br />
                    </div>
                </div>

                <div
                    class="flex flex-col items-center w-1/2 px-4 py-1 rounded bg-slate-200"
                >
                    <label
                        for="zadatek"
                        class="block text-sm font-medium text-gray-700"
                        >Pozostało do zapłaty</label
                    >
                    <div class="flex items-center mt-3 font-bold">
                        {{ doZaplaty }} zł
                    </div>
                </div>
            </div>
            <form @submit.prevent="sendOferta(form)">
                <transition name="fade">
                    <div class="flex flex-col mb-4" key="nip" v-if="firma">
                        <label
                            for="nip"
                            class="block text-sm font-medium text-gray-700"
                        >
                            NIP (jeśli firma)
                        </label>
                        <input
                            v-model="form.nip"
                            type="text"
                            id="nip"
                            class="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </transition>
                <div class="mb-4">
                    <label
                        for="name"
                        class="block text-sm font-medium text-gray-700"
                        >Imię i Nazwisko</label
                    >
                    <input
                        v-model="form.name"
                        type="text"
                        id="name"
                        class="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div class="flex gap-2 mb-4">
                    <div>
                        <label
                            for="street"
                            class="block text-sm font-medium text-gray-700"
                            >Ulica</label
                        >
                        <input
                            v-model="form.street"
                            type="text"
                            id="street"
                            class="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label
                            for="city"
                            class="block text-sm font-medium text-gray-700"
                            >Miejscowość</label
                        >
                        <input
                            v-model="form.city"
                            type="text"
                            id="city"
                            class="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                </div>
                <div class="mb-4">
                    <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                        >Email</label
                    >
                    <input
                        v-model="form.email"
                        type="email"
                        id="email"
                        class="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div class="mb-4">
                    <label
                        for="phone"
                        class="block text-sm font-medium text-gray-700"
                        >Telefon</label
                    >
                    <input
                        v-model="form.phone"
                        type="tel"
                        id="phone"
                        class="block w-full p-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>
                <div class="flex justify-end">
                    <button
                        type="submit"
                        class="px-4 py-2 mr-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                    >
                        Wyślij
                    </button>
                    <button
                        type="button"
                        class="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-700"
                        @click="$emit('close')"
                    >
                        Zamknij
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}
.fade-enter, 
.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
</style>
