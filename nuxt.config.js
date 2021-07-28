export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'sho_oebai',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // CSS file in the project
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/firebase',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  firebase: {
    config: {
      apiKey: "AIzaSyAZbwO7t7ivtzIJALo3e32p46V5RXKdebQ",
      authDomain: "shooebai.firebaseapp.com",
      projectId: "shooebai",
      storageBucket: "shooebai.appspot.com",
      messagingSenderId: "989533888707",
      appId: "1:989533888707:web:69a6c6711cf5f6dfde4276",
      measurementId: "G-4RH604WC1K"
    },
    services: {
      auth: true,
      firestore: true,
      storage: true,
      // realtimeDb: true,
    },
  },

  // firestore: {
  // memoryOnly: false, // default
  //   chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
  //   enablePersistence: true,
  //   emulatorPort: 3000,
  //   emulatorHost: 'localhost',
  //   // settings: {
  //     // Firestore Settings - currently only works in SPA mode
  //   // }
  // },

  auth: {
    persistence: 'local', // default
    initialize: {
      onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
      onAuthStateChangedAction: 'onAuthStateChangedAction',
      subscribeManually: false
    },
    ssr: false, // default
    emulatorPort: 3000,
    emulatorHost: 'http://localhost',
  },


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
