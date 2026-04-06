<template>
  <div class="grid grid-cols-[5fr_2fr] gap-10 min-h-0 h-full overflow-hidden">
    <div class="min-h-0 h-full z-10">
      <slot name="img-content"></slot>
    </div>
    <div class="min-h-0 overflow-hidden h-full z-0">
      <slot name="main-content"></slot>
    </div>
  </div>
</template>