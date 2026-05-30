// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: process.env.NODE_ENV === 'production',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://maxistudio.fr'
  },
  modules: [
    '@nuxt/ui',
    ['@nuxtjs/sitemap', {
      autoLastmod: true,
    }],
    ['@nuxtjs/robots', {
      sitemap: 'https://maxistudio.fr/sitemap.xml',
    }],
    'nuxt-schema-org'
  ],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      cmsUrl: process.env.NUXT_PUBLIC_CMS_URL || 'http://localhost:1337'
    }
  },
  app: {
  rootAttrs: { class: 'h-full' },
  head: {
    titleTemplate: 'Maxistudio',
    link: [
      { rel: 'icon', type: 'image/jpeg', href: '/favicon.jpeg' }
    ],
    meta: [
        {
          name: 'description',
          content: 'Maxistudio, cabinet d\'architecture entre Paris et Marseille.'
        }
      ],
    htmlAttrs: { class: 'h-full' },
    bodyAttrs: { class: 'h-full overflow-hidden' }
  }
},
  vite: {
    logLevel: 'info' // or 'warn', 'error', 'silent'
  }
})
