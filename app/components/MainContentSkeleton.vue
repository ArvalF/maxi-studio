<script setup lang="ts">
const mainContentRef = ref<HTMLElement | null>(null)
const imgContentRef = ref<HTMLElement | null>(null)

const mainColumnWidth = ref(0)
const imgColumnWidth = ref(0)

const columnWidths = computed(() => ({
  main: mainColumnWidth.value,
  image: imgColumnWidth.value,
}))

const updateColumnWidths = () => {
  mainColumnWidth.value = mainContentRef.value?.clientWidth ?? 0
  imgColumnWidth.value = imgContentRef.value?.clientWidth ?? 0
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  updateColumnWidths()

  resizeObserver = new ResizeObserver(() => {
    updateColumnWidths()
  })

  if (mainContentRef.value)
    resizeObserver.observe(mainContentRef.value)

  if (imgContentRef.value)
    resizeObserver.observe(imgContentRef.value)

  window.addEventListener('resize', updateColumnWidths)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  window.removeEventListener('resize', updateColumnWidths)
})
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 min-h-0 max-h-[100%] h-auto overflow-visible md:h-full md:overflow-hidden md:pl-71  xl:pr-30 2xl:pr-50">
    <div ref="mainContentRef" class=" h-auto md:min-h-0 overflow-visible md:overflow-hidden md:h-full z-0 w-full">
      <slot
        name="main-content"
        :main-column-width="mainColumnWidth"
        :img-column-width="imgColumnWidth"
        :column-widths="columnWidths"
      ></slot>
    </div>
    <div ref="imgContentRef" class="min-h-0 h-auto md:h-full z-10 flex justify-center">
      <slot
        name="img-content"
        :main-column-width="mainColumnWidth"
        :img-column-width="imgColumnWidth"
        :column-widths="columnWidths"
      ></slot>
    </div>
  </div>
</template>