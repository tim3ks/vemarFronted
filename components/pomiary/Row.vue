<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

defineProps({
    pomiar: { type: Object }
})

const status = (val) => {
    switch (val) {
        case '2':
            return 'bg-red-500'
        case '3':
            return 'bg-yellow-500'
        case '4':
            return 'bg-blue-500'
        default:
            return 'bg-green-500'
    }
}

</script>
<template>
    <div class="p-3">
        <div class="grid-cols-3 md:grid">

            <div class="flex gap-3">
                <div class="flex flex-col items-center gap-1">

                    <span class="p-2 font-bold text-white bg-indigo-500 border rounded-md">
                        ID: {{ pomiar.id }}
                    </span>
                    <div class="p-2 rounded-sm" :class="status(pomiar.status_id)">
                        Status
                    </div>
                </div>
                    <div class="flex items-start gap-4">
                        <div class="flex flex-col">

                            <span class="font-semibold text-pretty">

                                Lokalizacja
                            </span>
                            <button class="flex justify-center p-2 rounded-md hover:bg-slate-400">
                                <svg fill="#f70909" height="50" width="50" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 0C7.386 0 4 3.387 4 8c0 4.24 4.455 10.366 7.523 15.05a.5.5 0 0 0 .954 0C15.545 18.366 20 12.241 20 8c0-4.613-3.386-8-8-8zm0 12c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                                </svg>
                            </button>
                        </div>
                        <div class="flex items-start gap-4">

                            <span class="font-semibold text-pretty">
    
                                Dodano: {{ pomiar.date }}
                            </span>
                        </div>
                </div>
            </div>
            <div>
                {{ pomiar.produkty }}
            </div>
            <div>
                {{ pomiar.monterzy }}
            </div>

            <!-- <pre>
                {{ pomiar }}
            </pre> -->
        </div>
    </div>

</template>
