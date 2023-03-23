// Utilities
import { defineStore } from 'pinia'
import axios from 'axios'

let apiUrl = 'https://qualitycontrol-service.dev.carpix2p0.net/api/1.0'

export const useAppStore = defineStore('app', {
  state: () => ({

    failedImages: [],
    isImageValid: false,

  }),
  getters: {
    getfailedImages(state){
        return state.failedImages
      }
  },

    actions: {
      async fetchFailedImages() {
        try {
          const data = await axios.get(`${apiUrl}/failed-images`)
            this.failedImages = data.data.results.items
            console.log(this.failedImages)
          }
          catch (error) {
            alert(error)
            console.log(error)
        }
      }
    },
    

    //
  })

