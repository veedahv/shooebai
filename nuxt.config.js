export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Sho_oebai',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://kit.fontawesome.com/3ad8d4fbe1.js', crossorigin: 'anonymous' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // CSS file in the project
    '@/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/country.js',
    '~/plugins/currency.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  generate: {
    fallback: true,
  },

  // router: {
  //   extendRoutes(routes, resolve) {
  //     routes.push(
  //       {
  //         // path: '/users/:id',
  //         // components: {
  //         //   default: resolve(__dirname, 'pages/users'), // or routes[index].component
  //         //   modal: resolve(__dirname, 'components/modal.vue')
  //         // },
  //         //   modal: 'components/modal'
  //         // }
  //         // path: "/Admin/ProductForm/:ProductId?",
  //         // components: resolve(__dirname, 'pages/Admin/ProductForm.vue'), // or routes[index].component
  //         // name: "Admin-ProductForm-ProductId",
  //         //   chunkNames: 'pages/Admin/ProductForm'
  //         // },
  //         // {
  //           // path: "/Admin/ProductForm/:ProductId?",
  //           path: "/ProductDetail/:id",
  //           components: resolve(__dirname, 'pages/ProductDetail/_id/index.vue'), // or routes[index].component
  //           name: "ProductDetail-id" ,
  //           chunkNames: 'pages/ProductDetail/_id/index'
  //         // }, {
  //         //   name: 'custom',
  //         //   path: '*',
  //         //   component: resolve(__dirname, 'pages/404.vue')
  //       }
  //     )
  //   }
  // },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/firebase',
    '@nuxtjs/netlify-files',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxt/http',
  ],

  // netlifyFiles: {
  //   netlifyToml: {
  //     headers: [
  //       {
  //         for: '/*',
  //         // values: { 'X-XSS-Protection': '1; mode=block' }
  //         values: { 'Access-Control-Allow-Origin': '*' }
  //       }
  //     ]
  //   }
  // },

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
      storage: true
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

  // serverMiddleware: ['~/server-middleware/currency.js'],
  // serverMiddleware: [
  //   { path: '/api', handler: '~/server-middleware/currency.js' }
  // ],
  
  serverMiddleware: {
    '/api': '~/api'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
