
export default {
    env: {
        strapiBaseUri: process.env.API_URL || "http://localhost:1338"
    },
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'server',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { src: 'font-awesome/scss/font-awesome.scss', lang: 'scss' },
            { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?Caveat:wght@600&family=Poiret+One&display=swap" },
        ]
    },
    /*
    ** Global CSS
    */
    css: [
        "bulma",
        { src: '~/assets/main.scss', lang: 'scss' },
    ],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [
        { src: '@/plugins/nuxt-awesome-swiper.js', mode: 'client' },
    ],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        "@nuxtjs/fontawesome",
    ],
    fontawesome: {
        icons: {
            solid: true,
            brands: true
        }
    },
    styleResources: {},
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
        '@nuxtjs/bulma',
        "@nuxtjs/apollo",
        '@nuxtjs/axios',
    ],
    axios: {
        // extra config e.g
        baseURL: process.env.API_URL || 'http://localhost:1338',
        debug: process.env.NODE_ENV != 'production'
    },
    apollo: {
        clientConfigs: {
            default: {
                httpEndpoint: (process.env.API_URL || 'http://localhost:1338') + '/graphql'
            }
        }
    },
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
        postcss: {
            preset: {
                features: {
                    customProperties: false
                }
            }
        },
    },
    generate: {
        minify: {
            collapseWhitespace: false
        }
    }
}
