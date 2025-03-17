// composables/useLocalStorage.js
import { ref, watch, onMounted } from "vue";

export function useLocalStorage(key, defaultValue) {
    const data = ref(defaultValue);

    onMounted(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue !== null) {
            data.value = JSON.parse(storedValue);
        }
    });

    watch(
        data,
        (newValue) => {
            localStorage.setItem(key, JSON.stringify(newValue));
        },
        { deep: true }
    );

    return data;
}
