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
      bannerSrc: '',
      uploadErrors: []
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
      console.log("SUBMIT")
      //test for required data
      this.uploadErrors = []
      if(this.slug == "") this.uploadErrors.push("Please enter a slug name!")
      if(this.name == "") this.uploadErrors.push("Please enter a name!")

      //if there are errors, wipe them out after x time
      if(this.uploadErrors.length > 0) {
        const duration = setTimeout(() => {
          this.uploadErrors = []
          clearTimeout(duration)
        }, 4000)
      }

      //if there are errors, do not send to database
      if(this.uploadErrors.length > 0) return

      //get the data
      const data = { 
        slug:this.slug, 
        name:this.name, 
        description:this.description, 
        bannerImage:this.bannerSrc,
        creator:'jaclynonacloud',
        curators: [],
        stickrs: [],
        unlisted: true
      }


      //listen for finish -- redirect when done
      this.$store.subscribe((mutation, state) => {
        const wait = setTimeout(() => {
          clearTimeout(wait)
          this.$router.push({ name:'collection', params: { slug:data.slug } })
        }, 100)
      })
      //commit
      store.commit("addCollection", data)
    }

  }
}
