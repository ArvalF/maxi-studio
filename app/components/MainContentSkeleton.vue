<template>
  <div class="grid grid-cols-1 md:grid-cols-[5fr_2fr] gap-10 min-h-0 h-auto overflow-visible md:h-full md:overflow-hidden pl-10 pr md:pl-20 xl:pr-30 2xl:pr-50">
    <div class="order-2 md:order-1 min-h-0 h-auto md:h-full z-10 flex justify-start md:justify-end">
      <slot name="img-content"></slot>
    </div>
    <div class="order-1 md:order-2 h-auto md:min-h-0 overflow-visible md:overflow-hidden md:h-full z-0 w-full">
      <slot name="main-content"></slot>
    </div>
  </div>
</template>