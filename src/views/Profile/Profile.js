import store from '@/store'
import mixins from '@/mixins'

export default {
  name: 'profile',
  components: {},
  props: [],
  mixins: [mixins],
  data () {
    return {
      user: null,
      collections: null
    }
  },
  computed: {
    joinedDate() {
      return (new Date(this.user.joined)).toLocaleDateString("en-US", { month:'long', day:'numeric', 'year':'numeric' })
    },


    myCollections() {
      return store.state.collections.filter(c => c.creator == this.user.slug)
    },
    myFavStickrs() {
      return this.user.favStickrs.map(s => store.state.stickrs.find(storeStickr => storeStickr.slug == s.slug && storeStickr.coll == s.coll))
    }

  },
  mounted () {
    store.dispatch('waitForData')
    .then(() => {
      this.user = store.state.users.find(e => e.slug == this.$route.params.slug)
      this.collections = this.getCollections()
    })
  },
  methods: {
    getProfileURL(slug) {
      return require(`../../assets/uploads/profiles/prof-${slug}.png`)
    },

    //collections
    getCollections() {
      //get collection groups
      let collections = []
      this.user.collectedStickrs.map(s => s.coll).filter((s, i, a) => a.indexOf(s) == i)
        .forEach(s => {
          collections.push(this.getCollectionData(s))
        })

      return collections
    },
    getCollectionData(slug) {
      return store.state.collections.find(s => s.slug == slug)
    },

    getStickrsInCollection(slug) {
      return this.user.collectedStickrs.map(s => store.state.stickrs.find(storeStickr => storeStickr.slug == s.slug)).filter(s => s.coll == slug)
    },
    

  }

}
