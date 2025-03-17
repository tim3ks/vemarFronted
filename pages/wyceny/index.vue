<template>
    <div class="relative inline-block text-left">
        <div>
            <button
                class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
                id="menu-button"
                aria-expanded="false"
                aria-haspopup="false"
            >
                Menu
                <svg
                    class="w-5 h-5 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="false"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </div>

        <!-- Dropdown content -->
        <div
            class="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
        >
            <div class="py-1" role="none">
                <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Opcja 1</a
                >
                <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Opcja 2</a
                >
                <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    >Opcja 3</a
                >
            </div>
        </div>
    </div>
    <FakturyNowaFaktura />
</template>

<script setup>
import { ref } from "vue";

const showMenu = ref(false);
let closeTimeout = null;

const openMenu = () => {
    clearTimeout(closeTimeout);
    showMenu.value = true;
};

const closeMenu = () => {
    closeTimeout = setTimeout(() => {
        showMenu.value = false;
    }, 300); // Adjust the delay if necessary
};

const clearCloseTimeout = () => {
    clearTimeout(closeTimeout);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
