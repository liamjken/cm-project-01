// Utilities
import { defineStore } from 'pinia'
import axios from 'axios'
import Vue from 'vue'

let apiUrl = 'https://qualitycontrol-service.dev.carpix2p0.net/api/1.0'

export const useAppStore = defineStore('app', {
  state: () => ({

    failedImages: [],
    isImageValid: true,
    completed: false,
    sandboxComp: true,
    isSelecting: false,
    uploadImgURL: 'url not found',
    adminData: [],
    reviewers: '',
    circlePercentage: 0,
    inReview: 0,
    needEditing: 0,
    TotalCompleted: 0,
    Editing: 0,
    circleInfo: {} 


  }),
  getters: {
    getfailedImages(state){
        return state.failedImages
      }
  },

  actions: {

// Getting the API data
      async fetchFailedImages() {
        try {
          const data = await axios.get(`${apiUrl}/failed-images`)
            this.failedImages = data.data.results.items
          }
          catch (error) {
            alert(error)
            console.log(error)
        }
      },
      
      ImgErCheck() {
        this.isImageValid = false
        return this.isImageValid
      },
// Updating Status  
 async PostEditImg(dvId:string, nameId:string, status:number) {
      try {
        const data = await axios.put(`${apiUrl}/dealer-vehicle-listings/${dvId}/images/update-statuses`,  {
          "dealerVehicleListingId": `${dvId}`,
          "imageStatuses": [
            {
              "id": `${nameId}`,
              "processingStatus": `${status}`
            }
          ]
        })
       if(data.status === 200 || data.status === 201) {
        this.completed = true
       }
       console.log(data.status)
        }
        catch (error) {
          alert(error)
          console.log(error)
      }
      },
// Download Image & Update Status
    async  downloadImage(dvId:string, nameId:string, status:number) {
        const imgUrl = `https://cm2p0vehiclemediadev.blob.core.windows.net/vehicle-media/${dvId}/${nameId}-Original`
        const imgDets = await axios.get(imgUrl, {
          responseType: 'blob'
        })
        const newUrl = window.URL.createObjectURL(imgDets.data)
        const link = document.createElement('a')
        link.href = newUrl
        link.setAttribute('download', `${nameId}-failed-image.jpg`)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(newUrl)

        this.PostEditImg(dvId, nameId, status)
      },

// Generate API link to upload image   
      async beforeUploadImage(dvId:string, nameId:string) {
        try {
          const data = await axios.post(`https://vehiclemedia-service.dev.carpix2p0.net/api/1.0/vehicle-media/vehicle-listings/${dvId}/upload-links/${nameId}/rewrite-link`,  {
            type: '-Original'
          })
        this.uploadImgURL = data.data.uploadUri
         console.log(this.uploadImgURL)

          }
          catch (error) {
            alert(error)
            console.log(error)
        }
      },	

// Manage Login for Editor & Reviewer
        mylogin (email: string, password: string) {

          let editor = 'editor@test.com'
          let reviewer = 'reviewer@test.com'
          let admin = 'admin@test.com'
          let pass = 'Auto123'

          if(email == editor && password == pass){
            sessionStorage.setItem("role", 'hzc*EUW_vay4zue4gdb');
            return 'editor'
          } else if (email == reviewer && password == pass) {
            sessionStorage.setItem("role", 'hqc2xfn_buv3yuj5MEC');
            return 'reviewer'
          } else if (email == admin && password == pass){
            sessionStorage.setItem("role", 'pbr_DAQ6hgd_hgy-vkj');
            return 'admin'
          }
          return null

        },
// Logout
        mylogout() {
          sessionStorage.removeItem("role")
        },

      loginDialog() {
        this.completed = true
      },
      // Getting the API data for Admin Page
      async fetchAdminDetails(dateFrom:any, dateTo:any) {
        try {
          const data = await axios.get(`${apiUrl}/dealer-vehicle-listings/images/statistics/?from=${dateFrom}&to=${dateTo}`)
            this.adminData = data.data
            this.reviewers = data.data.reviewers
            this.circlePercentage = this.calcPercentage(data.data.totalAccepted, data.data.totalToReview)
            this.inReview = this.calcPercentage(data.data.totalInReview, data.data.totalAccepted)
            this.needEditing = this.calcPercentage(data.data.totalNeedEditing, data.data.totalAccepted)
            this.TotalCompleted = this.calcPercentage(data.data.totalCompleted, data.data.totalAccepted)
            this.Editing = this.calcPercentage(data.data.totalEditing, data.data.totalAccepted)
            this.circleInfo = [{
              "name": "Total in Review",
              "value": data.data.totalInReview,
              "color": "red",
              "perc": this.calcPercentage(data.data.totalInReview, data.data.totalAccepted)

            },
            {
             "name": "Total Need Editing",
              "value": data.data.totalNeedEditing,
              "color": "green",
              "perc": this.calcPercentage(data.data.totalNeedEditing, data.data.totalAccepted)
            }]
      
          }
          catch (error) {
            alert(error)
            console.log(error)
        }
        console.log(this.adminData)
      },

      calcPercentage(num1:number, num2:number ){
        let percentage = (num1 / num2) * 100;
        return Math.round(percentage)
      }

    },

  
    
    

    //
  })