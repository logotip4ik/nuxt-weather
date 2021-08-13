export default {
  target: 'server',
  ssr: true,
  privateRuntimeConfig: {
    apiKey: process.env.OPEN_WEATHER_API,
  },
  publicRuntimeConfig: {
    baseUrl: 'https://api.openweathermap.org/data/2.5',
    currentWeather: `/weather?units=metric`,
    oneCallWeather: `/onecall?exclude=current,minutely&units=metric`,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Forecast',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Weather forecast in your browser, fast and reliable',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        property: 'og:description',
        content: 'Weather forecast in your browser, fast and reliable',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        property: 'og:title',
        content: `Forecast`,
      },
      {
        hid: 'apple-mobile-web-app-title',
        name: 'apple-mobile-web-app-title',
        content: `Forecast`,
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/base.css',
    '~/assets/css/variables.scss',
    '~/assets/css/button.scss',
  ],
  loading: {
    height: '4px',
    color: 'var(--secondary-color-600)',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    headers: {
      common: {
        'Cache-Control': 'max-age: 600',
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
      ],
    },
  },
}
