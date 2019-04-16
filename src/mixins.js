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
        getStickrURL(coll, slug) {
            try {
                return require(`./assets/uploads/collections/${coll}/stickrs/${slug}.png`)
            }
            catch(e) {
                return null
            }
        },


        /*https://stackoverflow.com/questions/34698905/clone-a-js-object-except-for-one-key*/
        omit(obj, omitKey) {
            return Object.keys(obj).reduce((result, key) => {
                if(key !== omitKey) {
                    result[key] = obj[key];
                }
                return result;
            }, {});
        }
    }
}