import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import VueAxios from 'vue-axios'
import axios from 'axios'

Vue.use(VueAxios, axios);

const URL = process.env.API_URL || "http://localhost:4000/api"

export default new Vuex.Store({
  state: {
    stickrs: [],
    collections: [],
    users: [],
    hasLoaded: false
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
      const { slug, name, description } = payload
      //build the body
      const body = {
        slug,
        name,
        ownership : "jaclynonacloud",
        created : (new Date()).toString(),
        curators : [],
        description,
        stickrs : [],
        unlisted : true
      }

      new Promise(async(res, rej) => {
        //send the body to the database
        const result = await axios.post(`${URL}/collections/add`, body)
        if(result.status == 200) {
          //save the header image if there was one
          if(payload.headerImage && payload.headerImage != null) {
            const uploadResult = await axios.post(`/${URL}/api/upload`, { image: payload.headerImage, directory: `assets/uploads/collections/${payload.slug}/`, name: 'banner.png' })
          }
  
          //add collection to collections array
          state.collections.push(result.data.result)
          res(result.data.result)
        }
        else {
          rej(result.statusText)
        }

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
  
