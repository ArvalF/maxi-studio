<template>
      <div class="w-full h-full min-h-0 flex flex-col gap-2 pt-5 pb-5 ">
        <div class="grid grid-rows-[1fr_9fr] min-h-0 gap-2 h-full">
          <!-- Ligne 1 -->
          <slot name="header-content"></slot>
          <!-- Ligne 2 -->
          <!-- <div class="grid grid-cols-[5fr_2fr] gap-10 min-h-0 h-full overflow-hidden">
            <slot name="main-content"></slot>
          </div> -->
          <div class="min-h-0 h-full overflow-y-auto md:overflow-hidden w-full">
            <slot name="main-content"></slot>
          </div>
        
          <!-- Ligne 3 -->
          <div class="grid grid-cols-[5fr_2fr] h-full min-h-0 gap-2">
            <div class="h-full min-h-0">
              <slot name="secondary-content"></slot>
            </div>
            <div class="h-full min-h-0"></div>
          </div>
        </div>
        <footer class="h-20"></footer>
      </div>
</template>
