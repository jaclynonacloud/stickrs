import store from '@/store'

export default {
  name: 'stickr-nav',
  components: {},
  props: [],
  data () {
    return {
      menuIsOpen: false,
      user: null
    }
  },
  computed: {

  },
  mounted () {
    store.dispatch('waitForData')
    .then(() => {
      this.user = store.state.users.find(e => e.slug == 'jaclynonacloud')
    })
  },
  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    },

    getProfileURL(slug) {
      return require(`../../assets/uploads/profiles/prof-${slug}.png`)
    }
  }
}
