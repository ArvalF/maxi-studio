<script setup lang="ts">
</script>

<template>
  <!-- <MainContentSkeleton>
    <template #img-content>
    </template>
    <template #main-content> -->
    <div class="min-h-0 max-h-[100%] h-auto overflow-visible md:h-full md:overflow-hidden md:pl-71  xl:pr-30 2xl:pr-50">
      <div class="text-sm flex flex-1 h-full flex-col gap-8 min-h-[80dvh] justify-start pr-10 md:pr-0">
        <div class="flex flex-col gap-4 justify-between">
          <div>
          <h4 class="font-bold">Maxistudio Associés</h4>
          <p >TVA FR69990208126</p>
          </div>
        

          <!-- Adresses postales -->
          <div>
            <h4 class="font-bold">Adresses</h4>
              <p >1a rue Rodolphe Pollak, 13001 Marseille</p>
              <p >2 rue du Pré Saint-Gervais, 75019 Paris</p>
          </div>

          <!-- Téléphone -->
          <div>
            <h4 class="font-bold">Contacts</h4>
              <p>Marseille <span>+33 7 68 77 69 59</span></p>
              <p>Paris <span>+33 6 01 64 68 05</span></p>
              <p>contact@maxistudio.fr</p>
          </div>

          <div class="w-fit bg-transparent"> 
            <h4 class="font-bold">Réseaux</h4>
            <a href="https://www.instagram.com/_maxistudio/" 
              class="underline" target="_blank">
                  instagram
            </a>
            <br>
            <a href="https://www.linkedin.com/company/maxistudio-associ%C3%A9s/" 
              class="underline" target="_blank">
              linkedin
            </a>
          </div>
        </div>

        <div class="flex flex-col gap-4 max-w-[427px]">
            <h4 class="font-bold">Contactez-nous !</h4>
            <input 
            class="w-full border border-black bg-black text-white p-2 focus:outline-none focus:ring-0 h-[1.5rem]"
            type="text" placeholder="votre mail ici :">
            <textarea 
            class="w-full border border-black p-4 h-40 resize-none focus:outline-none focus:ring-0"
            name="message" id="message" placeholder="votre message là :"></textarea>
            <button class="ml-auto">Envoyer</button>
        </div>
      </div>
    </div>
</template>