<template>
      <div class="w-full h-full min-h-0 flex flex-col gap-2 p-15">
          <div class="h-screen grid grid-rows-[1fr_5fr_2fr] gap-2">
          <!-- Ligne 1 -->
          <slot name="header-content"></slot>
          <!-- Ligne 2 -->
          <div class="grid grid-cols-[5fr_2fr] gap-2">
            <slot name="main-content"></slot>
          </div>
        
          <!-- Ligne 3 -->
          <div class="grid grid-cols-[5fr_2fr] gap-2">
            <div class="bg-red-300">
              <slot name="secondary-content"></slot>
            </div>
            <div class="bg-red-500">Col 20%</div>
          </div>
        </div>
      </div>
</template>
