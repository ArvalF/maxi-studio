<script setup lang="ts">
const isVisible = ref(true)
const isFading = ref(false)
const isImageVisible = ref(false)

onMounted(() => {
    setTimeout(() => {
        isImageVisible.value = true
    }, 100)

    setTimeout(() => {
        isFading.value = true
    }, 1500)

    setTimeout(() => {
        isVisible.value = false
    }, 3200)
})
</script>
<template>
    <div
        v-if="isVisible"
        :class="[
            'fixed inset-0 z-9999 flex h-screen w-screen items-center justify-center bg-white transition-opacity duration-1800 ease-out',
            isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        ]"
    >
        <img
            :class="[
                'max-h-10 transition-opacity duration-1600 ease-out',
                isImageVisible ? 'opacity-100' : 'opacity-0'
            ]"
            class="w-80 md:w-100"
            src="~/assets/img/logo-maxistudio-horizontal.png"
        />

    </div>
</template>