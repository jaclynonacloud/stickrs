require('dotenv').config()

export default {
    build: {
        extend (config, { isDev, isClient }) {
            config.resolve.alias["vue"] = "vue/dist/vue.common";
        }
    }
}