<template>
  
    <UApp>
      <div class="w-full h-full min-h-0 flex flex-col gap-2 p-15">
        <PageSkeleton>
          <template #header-content>
            <Header />
          </template>
          <template #main-content>
            <NuxtPage />
          </template>
        </PageSkeleton>
      </div>

           <!-- <div class="h-screen grid grid-rows-[1fr_5fr_2fr] gap-2">



          <div class="h-screen grid grid-rows-[1fr_5fr_2fr] gap-2">
          <Header />
          <slot name="header-content"></slot>
          <div class="grid grid-cols-[5fr_2fr] gap-2">
            <div class="bg-green-300">
              <slot name="img-content"></slot>
            </div>
            <div class="bg-green-500">
              <slot name="main-content"></slot>
            </div>
          </div>
        
          <div class="grid grid-cols-[5fr_2fr] gap-2">
            <div class="bg-red-300">
              <slot name="secondary-content"></slot>
            </div>
            <div class="bg-red-500">Col 20%</div>
          </div>
        </div>
      </div> -->

        <!-- <div class="min-h-screen flex flex-col overflow-hidden bg-gray-50">
          <Header />
          <main class="flex-1 h-[85vh] md:w-[1200px] w-full min-h-0 mx-auto px-6 py-12 bg-white overflow-hidden">
            <NuxtPage />
          </main>
        </div> -->
    </UApp>
</template>
