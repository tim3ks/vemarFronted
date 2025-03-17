<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();

// import Button from "primevue/button";
defineProps({
    access: { type: String },
});
</script>
<template>
    <div>
        <TopNav />
        <slot />
    </div>
    <!-- <div class="inline-flex gap-2">
        <router-link v-for="item in adminMenu" :key="item.id" :to="{name:item.link, query:'aksjnlknasd'}">
            <Button :label="item.name"/>
        </router-link>
    </div> -->
</template>
