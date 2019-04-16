import store from '@/store'
import mixins from '@/mixins'


export default {
  name: 'stickr',
  components: {},
  props: [],
  mixins: [mixins],
  data () {
    return {
      stickr: null
    }
  },
  computed: {
    createdDate() {
      return (new Date(this.stickr.uploaded)).toLocaleDateString("en-US", { month:'long', day:'numeric', 'year':'numeric' })
    }
  },
  mounted () {
    store.dispatch('waitForData')
      .then(() => {
        this.stickr = store.state.stickrs.find(e => e.slug == this.$route.params.slug && e.coll == this.$route.params.coll)
      })
  },
  methods: {
    getStickrCollectionName(coll) {
      return store.state.collections.find(c => c.slug == coll).name
    }
  }
}
