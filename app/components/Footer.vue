<script setup lang="ts">
const props = defineProps<{ showFooter?: boolean }>()
</script>  
<template>
    <!-- FOOTER -->
        <footer v-if="showFooter" class="h-20 max-h-20 text-[0.65rem] leading-2  hidden md:block">
          <div class="flex  flex-row  gap-12 pl-20">
            <div class="flex flex-col gap-1 font-bold"">
              <p>Maxistudio associés</p>
            </div>
            <div class="flex flex-col gap-1">
              <p>1a rue Rodolphe Pollak</p>
              <p>13001 Marseille</p>
              <p class="italic">+33 7 68 77 69 59</p>
            </div>
            <div class="flex flex-col gap-1">
              <p>2 rue du Pré Saint-Gervais</p>
              <p>75019 Paris</p>
              <p class="italic">+33 6 01 64 68 05</p>
            </div>

            <div class="flex flex-col gap-1 justify-between">
              <!-- INSTAGRAM -->
              <p>contact@maxistudio.fr</p>
              <div class="w-fit bg-transparent"> 
                <a href="https://www.instagram.com/_maxistudio/" 
                  class="underline" target="_blank">
                  instagram
                </a>
              </div>
            </div>
          </div>
        </footer>

        <!-- FOOTER MOBILE -->
    <footer v-if="showFooter" class="h-20 max-h-20 text-[0.5rem] leading-2 mt-10  md:hidden">
        <div class="flex flex-col gap-3">
            <div class="font-bold text-[0.6rem]"">
              <p>Maxistudio associés</p>
            </div>
          <div class="flex  flex-row  gap-4 md:gap-12 md:pl-20 items-start">
            <div class="flex flex-col gap-1">
              <p>1a rue Rodolphe Pollak</p>
              <p>13001 Marseille</p>
              <p class="italic">+33 7 68 77 69 59</p>
            </div>
            <div class="flex flex-col gap-1">
              <p>2 rue du Pré Saint-Gervais</p>
              <p>75019 Paris</p>
              <p class="italic">+33 6 01 64 68 05</p>
            </div>

            <div class="flex flex-col gap-1 justify-between">
              <!-- INSTAGRAM -->
              <p>contact@maxistudio.fr</p>
              <div class="w-fit bg-transparent"> 
                <a href="https://www.instagram.com/_maxistudio/" 
                  class="underline" target="_blank">
                  instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        </footer>
</template>