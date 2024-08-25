// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-08-25',

  devtools: { enabled: false },

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
  ],

  eslint: {
    config: {
      stylistic: true,
    },
  },
})
