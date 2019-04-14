import store from "../../../store";

export default {
  name: 'modify-collection',
  components: {},
  props: [],
  data () {
    return {
      isDraggingBanner: false,
      slug: '',
      name: '',
      description: '',
      bannerSrc: ''
    }
  },
  computed: {

  },
  mounted () {
    document.ondragover = (e) => {e.stopImmediatePropagation(); e.preventDefault() }
    document.ondrop = (e) => {e.stopImmediatePropagation(); e.preventDefault() }
  },
  methods: {
    //uploading
    onUploadBanner(e) {
      if(e.target.files.length > 0)
        this.loadBanner(e.target.files[0])
    },
    //dragging
    onDragBannerEnter(e) {
      this.isDraggingBanner = true
    },
    onDragBannerLeave(e) {
      this.isDraggingBanner = false
    },
    onDropBanner(e) {
      this.isDraggingBanner = false

      if(e.dataTransfer.files.length > 0) this.loadBanner(e.dataTransfer.files[0])
    },

    loadBanner(file) {
      let reader = new FileReader()
      reader.onload = (e) => {
        console.log(e)
        this.bannerSrc = e.srcElement.result
      }

      reader.readAsDataURL(file)

    },

    submitCollection(e) {
      //get the data
      const data = { slug:this.slug, name:this.name, description:this.description, bannerImage:this.bannerSrc }
      store.commit("addCollection", data)
    }

  }
}
