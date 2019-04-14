import store from '@/store'
import mixins from '@/mixins'

export default {
  name: 'stickr-main',
  components: {},
  props: [],
  mixins: [mixins],
  data () {
    return {
      stickrs: [],
      collections: []
    }
  },
  computed: {
    
  },
  mounted () {
    store.dispatch('waitForData')
      .then(() => {
        this.stickrs = store.state.stickrs
        this.collections = store.state.collections
      })
  },
  methods: {
    getStickrCollectionName(slugCollection) {
      return this.collections.find(c => c.slug == slugCollection).name
    }
  }
}
