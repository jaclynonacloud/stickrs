export default {
    methods: {
        getCollectionURL(slug) {
            try {
                return require(`./assets/uploads/collections/${slug}/banner.png`)
            }
            catch(e) {
                return null
            }
        },
        getStickrURL(slugCollection, slug) {
            try {
                return require(`./assets/uploads/collections/${slugCollection}/${slug}.png`)
            }
            catch(e) {
                return null
            }
        }
    }
}