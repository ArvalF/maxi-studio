// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      cmsUrl: process.env.NUXT_PUBLIC_CMS_URL || 'http://localhost:1337'
    }
  },
  app: {
  rootAttrs: { class: 'h-full' },
  head: {
    htmlAttrs: { class: 'h-full' },
    bodyAttrs: { class: 'h-full overflow-hidden' }
  }
}
})
