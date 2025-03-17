<script setup>
import { onClickOutside } from "@vueuse/core";
const { material } = wycenyStore();

const showMenu = ref(false);
const isDropdownOpen = ref(false);
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
    //
};

const openDropdown = () => {
    isDropdownOpen.value = true;
};

const closeDropdown = () => {
    setTimeout(() => {
        isDropdownOpen.value = false;
    }, 200);
};

// onClickOutside(showMenu, (event) => {
//     showMenu.value = false;
// });
</script>

<template>
    <div class="relative inline-block text-left">
        <div>
            <button
                class="inline-flex justify-center w-full px-2 py-1 text-sm font-medium text-gray-700 bg-white shadow-sm ring-1 hover:bg-gray-100 focus:outline-none focus:ring-indigo-400"
                id="options-menu"
                aria-expanded="true"
                aria-haspopup="true"
                @click="openDropdown"
                @blur="closeDropdown"
            >
                <slot name="nazwa" />
            </button>
        </div>

        <transition name="fade">
            <div
                v-if="isDropdownOpen"
                class="absolute left-0 z-50 mt-1 origin-top-right bg-white rounded-md shadow-lg"
                @mouseenter="clearCloseTimeout"
            >
                <div
                    class="inline-block px-1 py-2"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                >
                    <slot name="opcje" @send-message="material" />
                </div>
            </div>
        </transition>
    </div>
</template>

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
