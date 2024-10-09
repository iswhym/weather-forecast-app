// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      openweathermapKey: process.env.OPEN_WEATHER_MAP_API_KEY,
      weatherApiBase: 'http://api.openweathermap.org/data/2.5',
    }
  }
})
