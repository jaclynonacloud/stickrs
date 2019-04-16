import store from '@/store'
import mixins from '@/mixins'

export default {
  name: 'collection',
  mixins: [mixins],
  components: {},
  props: [],
  data () {
    return {
      collection: null,
      stickrs: null
    }
  },
  computed: {
    createdDate() {
      return (new Date(this.collection.created)).toLocaleDateString("en-US", { month:'long', day:'numeric', 'year':'numeric' })
    },

    //get stickr sets
    exclusiveStickrs() {
      const exclusives = this.stickrs.filter(s => {
        let hasFreebie = false
        if(s.availability == null) return false
        s.availability.forEach(a => { if(a.type.toLowerCase() == "freebie")  hasFreebie = true })
        return hasFreebie
      })
      return exclusives
    },

    rareStickrs() {
      return this.stickrs.filter(s => s.rarity > 0.6)
    },


    
  },
  mounted () {
    store.dispatch('waitForData')
      .then(() => {
        this.collection = store.state.collections.find(c => c.slug == this.$route.params.slug)
        this.stickrs = store.state.stickrs.filter(s => s.coll == this.$route.params.slug)
      })
  },
  methods: {
  }
}
