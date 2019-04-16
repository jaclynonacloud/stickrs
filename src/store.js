import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(VueAxios, axios);

// const URL = `${process.env.VUE_API_URL}:${process.env.PORT}/api` || "http://localhost:4000/api"
const URL = process.env.VUE_APP_API_URL || "http://localhost:4000/api"

export default new Vuex.Store({
  state: {
    stickrs: [],
    collections: [],
    users: [],
    hasLoaded: false,
    lastUpdated: ''
  },
  mutations: {
    init(state, payload) {
      state.stickrs = payload.stickrs
      state.collections = payload.collections
      state.users = payload.users
    },


    loaded(state) {
      state.hasLoaded = true
    },


    //adding stuff to database
    addCollection(state, payload) {
      //build the body
      const body = payload
      //add extra fields
      body.created (new Date()).toString()

      new Promise(async(res, rej) => {
        //send the body to the database
        const result = await axios.post(`${URL}/collections/add`, body)
        if(result.status == 200) {
          //save the header image if there was one
          if(payload.bannerImage && payload.bannerImage != null) {
            const uploadResult = await axios.post(`${URL}/upload`, { image: payload.bannerImage, directory: `assets/uploads/collections/${payload.slug}/`, name: 'banner.png' })
          }
  
          //add collection to collections array
          let collection = Object.assign({}, payload)
          collection.created = body.created
          delete collection.bannerImage
          state.collections.push(collection)
          res(collection)
        }
        else {
          rej(result.statusText)
        }

      })
    },

    addStickr(state, payload) {
      //build the body
      let body = payload
      //add extra fields
      body.uploaded = (new Date()).toString()

      new Promise(async(res, rej) => {
        //send the body to the database
        const result = await axios.post(`${URL}/stickrs/add`, body)
        if(result.status == 200) {
          //save the header image if there was one
          if(payload.bannerImage && payload.bannerImage != null) {
            const uploadResult = await axios.post(`${URL}/upload`, { image: payload.bannerImage, directory: `assets/uploads/collections/${payload.coll}/stickrs/`, name: `${payload.slug}.png` })
          }
  
          //add stickr to stickrs array
          let stickr = Object.assign({}, payload)
          stickr.uploaded = body.uploaded
          delete stickr.bannerImage
          state.stickrs.push(stickr)
          res(stickr)
        }
        else {
          rej(result.statusText)
        }

      })
    },
    editStickr(state, payload) {
      //build the body
      let body = payload

      new Promise(async(res, rej) => {
        //if we cannot find old stickr, don't continue
        let oldStickr = state.stickrs.find(s => s.slug == body.oldSlug && s.coll == body.coll)
        if(oldStickr == null) rej("Could not find old stickr to edit!")

        //send the body to the database
        console.log(body)
        await axios.put(`${URL}/stickrs/edit`, body)
          .then(async e => {
            //if the call was good
            if(e.status == 200) { 

              //save the header image if there was one
              let oldName = (payload.oldSlug != payload.slug) ? `${payload.oldSlug}.png` : null
              if(payload.bannerImage && payload.bannerImage != null) {
                  await axios.post(`${URL}/upload`, { image: payload.bannerImage, directory: `assets/uploads/collections/${payload.coll}/stickrs/`, name: `${payload.slug}.png`, oldName })
              }

              //add collection to collections array
              //update the stickr array
              let stickr = Object.assign({}, payload)
              delete stickr.oldSlug
              delete stickr.bannerImage
              let index = state.stickrs.indexOf(oldStickr)
              if(index != -1) state.stickrs.splice(index, 1, stickr)
              res(stickr)

            }
          })
          .catch(err => rej("There's a problem!\n" + err))

      })
    },


    getCollectionURL(slug) {
      return `../../assets/uploads/collections/${slug}/banner.png`
    },
    getStickrURL(state, payload) {
      console.log("MY PAYLOAD", payload)
      return `../../assets/uploads/collections/${payload[0]}/${payload[1]}.png`
    }

  },
  actions: {
    load({ commit }) {
      return new Promise(async(res) => {
        //load the stickrs
        const stickrs = await axios.get(`${URL}/stickrs`)
        //load the collections
        const collections = await axios.get(`${URL}/collections`)
        //load the users
        const users = await axios.get(`${URL}/users`)

        
        commit('init', { stickrs:stickrs.data, collections:collections.data, users:users.data })


        commit('loaded')

        res()
      })
    },


    waitForData({ commit, state }) {
      if(state.hasLoaded) return Promise.resolve()

      return new Promise(res => {

        const interval = window.setInterval(() => {
          if(state.hasLoaded) {
            window.clearInterval(interval)
            res()
          }
        }, 100)
      })
    }

  }

})
  
