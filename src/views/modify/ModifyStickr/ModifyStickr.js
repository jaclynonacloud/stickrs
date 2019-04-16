import { mapState } from 'vuex'
import mixins from '@/mixins'
import uiSlider from '@/components/ui-slider'

export default {
  name: 'modify-stickr',
  components: {uiSlider},
  props: [],
  mixins: [mixins],
  data () {
    return {
      isEditing: false,

      isDraggingBanner: false,
      slug: '',
      name: '',
      description: '',
      bannerSrc: '',
      ownerships: [{name:'', url:''}],
      artists: [{name:'', url:''}],
      rarity: 0,
      hidden: false,
      shiny: false,
      addToStartr: true,
      unlisted: false,
      uploadErrors: [],

      oldSlug: '',
    }
  },
  computed: {
    rarityText() {
      if(this.rarity > 0.9) return "Special"
      if(this.rarity > 0.65) return "Rare"
      if(this.rarity > 0.4) return "Uncommon"
      if(this.rarity > 0.05) return "Common"
      return "Super Common"
    }
  },
  mounted () {
    document.ondragover = (e) => {e.stopImmediatePropagation(); e.preventDefault() }
    document.ondrop = (e) => {e.stopImmediatePropagation(); e.preventDefault() }

    //find out if we are editing
    if(this.$route.params.slug != null) {
      this.isEditing = true
      
      this.$store.dispatch("waitForData")
        .then(() => {
          //get the initial data
          const stickr = this.$store.state.stickrs.find(s => s.slug == this.$route.params.slug && s.coll == this.$route.params.coll)
          console.log(stickr.rarity)
          if(stickr != null) {
            this.oldSlug = stickr.slug
            this.slug = stickr.slug
            this.name = stickr.name
            this.description = stickr.description
            this.rarity = stickr.rarity
            this.ownerships = stickr.ownership
            this.artists = stickr.artist
            this.hidden = stickr.hidden
            this.shiny = stickr.shiny
            this.unlisted = stickr.unlisted
            this.addToStartr = stickr.addToStartr
            //get the old stickr data URL
            fetch(this.getStickrURL(stickr.coll, stickr.slug))
              .then(blob => blob.blob())
              .then(blob => {
                let reader = new FileReader()
                  reader.onload = (e) => {
                    this.bannerSrc = e.target.result
                }
                reader.readAsDataURL(blob)
              })

          }
        })

    }
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

    //handle rarity
    onRarityChange(value) {
      this.rarity = value
    },

    //handle ownerships
    addOwnership() {
      this.ownerships.push({name:'', url:''})
    },
    removeOwnership(index) {
      this.ownerships.splice(index, 1)
    },
    //handle artists
    addArtist() {
      this.artists.push({name:'', url:''})
    },
    removeArtist(index) {
      this.artists.splice(index, 1)
    },


    submitStickr(e) {
      console.log("SUBMIT")
      //test for required data
      this.uploadErrors = []
      if(this.bannerSrc == "") this.uploadErrors.push("Please post an image!")
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

      //remove empties
      this.ownerships = this.ownerships.filter(o => o.name != '' && o.url != '')
      this.artists = this.artists.filter(o => o.name != '' && o.url != '')

      //get the data
      let data = {
        slug:this.slug, 
        coll:this.$route.params.coll,
        name:this.name, 
        description:this.description, 
        bannerImage:this.bannerSrc,
        rarity:this.rarity,
        ownership:this.ownerships,
        artist:this.artists,
        curator:"jaclynonacloud",
        hidden:this.hidden,
        unlisted:this.unlisted,
        shiny:this.shiny
      }

      //if this is a new entry
      if(!this.isEditing) {
        //listen for finish -- redirect when done
        this.$store.subscribe((mutation, state) => {
          const wait = setTimeout(() => {
            clearTimeout(wait)
            this.$router.push({ name:'stickr', params: { slug:data.slug, coll:data.coll } })
          }, 100)
        })
        //commit
        this.$store.commit("addStickr", data)
      }
      //if this is an update
      else {
        //listen for finish -- redirect when done
        this.$store.subscribe((mutation, state) => {
          const wait = setTimeout(() => {
            clearTimeout(wait)
            this.$router.push({ name:'stickr', params: { slug:data.slug, coll:data.coll } })
          }, 100)
        })
        //commit
        data.oldSlug = this.oldSlug
        this.$store.commit("editStickr", data)
      }

      //TODO add to startr pack if clicked
    },

  }
}
