export default {
  name: 'stickr-nav',
  components: {},
  props: [],
  data () {
    return {
      menuIsOpen: false

    }
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    toggleMenu() {
      this.menuIsOpen = !this.menuIsOpen;
    }
  }
}
