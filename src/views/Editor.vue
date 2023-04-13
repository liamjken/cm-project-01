<template>
    <!-- Dialog Box that appears when Failed Image Status is updated. -->
        <Dialogbox>
        <template v-slot:title>
          Image Updated
        </template>
        <template v-slot:content>
          The image has been updated on the server!
        </template>
      </Dialogbox>
    
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-sheet class="">
            <EasyDataTable
              theme-color="#1d90ff"
              buttons-pagination
              table-class-name="customize-table"
              alternating
              :headers="headers"
              :items="items"
            >
    <!-- Creating the button to Open Image -->
    <template #item-indicator.action="item">
      <v-btn 
        class="mt-3 mb-3"
        prepend-icon="mdi-check-circle"
        color="primary"
      >
        <Router-link 
          class="text-decoration-none" 
          :to="`/Failedimage/${item.vehicleId}/${item.name}`">
            <span 
              class="
              text-decoration-none 
              text-white"
        >
            Open Image
            </span>
        </Router-link>
      </v-btn>
    </template>
    
    
    <!-- Applying className depending on item status -->
    <template #item-indicator.status="item">
      <span :class="[  
        item.status === 'NeedEditing' ? 'need-edit' :  
        item.status === 'Editing' ? 'edit' :  
        'default'
        ]">{{ item.status }}</span>
    
    </template>
    
    <!-- Creating the button to Open Image -->
    <template #item-indicator.actiontwo="item">
      <v-btn v-if="item.status === 'NeedEditing'" 
        class="mt-3 mb-3"
        prepend-icon="mdi-cloud-download"
        color="download"
        @click.once="downloadImage(item.vehicleId, item.name)"
      >
    Download
      </v-btn>
    
      <v-btn  v-if="item.status === 'Editing'" 
        class="mt-3 mb-3"
        prepend-icon="mdi-cloud-upload"
        color="upload"
        @click="beforeUploadImage(item.vehicleId, item.name ), selectFile()"
      >
    <span>Upload</span>
  
        <v-overlay
          :model-value="spinnerLoad"
          class="align-center justify-center"
        >
          <v-progress-circular
            color="primary"
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
        <input class="input-file__input" ref="file" type="file" accept="image/png" @change="(event) => onFileUpload(event, item.vehicleId, item.name)">
      </v-btn>
  
    </template>
    
          </EasyDataTable>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
    
    
    </template>
  
  <script lang="ts">
  import type { Header, Item } from "vue3-easy-data-table"
  import { ref, onMounted, computed, defineComponent } from "vue"
  import { useAppStore } from '../store/app'
  import Dialogbox from '../components/DialogBox.vue'
  import { mapActions, mapState } from 'pinia';
  import axios from 'axios'
  import store from "@/store";
  
  export default defineComponent({
    components: {
      Dialogbox
    },
  
  data: () => ({
  
    mySelectedFile: null,
    resResult: null,
    spinnerLoad: false,
  
    headers: [
        { text: "File Name", value: "name" },
        { text: "Status", value: "indicator.status"},
        { text: "Last Updated", value: "updatedAt"},
        { text: "Image", value: "indicator.action" },
        { text: "Action", value: "indicator.actiontwo" },
          ],
          items: []
    
    
  
  }),
  
    mounted() {
      this.fetchFailedImages();
  
    },
    computed: {
      ...mapState(useAppStore, 
     ['failedImages', 'completed', 'isImageValid', 'uploadImgURL' ])
    },
    created() {
  
    },
    methods: {
  
      selectFile(){
        let fileInputElement : any = this.$refs.file;
        fileInputElement.click();
      },
   async onFileUpload(event: any, dvId: any, nameId: any ) {
    this.spinnerLoad = true
    this.mySelectedFile = event.target.files[0]
      await axios.put(this.uploadImgURL, this.mySelectedFile, { headers: {
                "Content-Type": "image/png",
                "x-ms-blob-type": "BlockBlob"
            }})
        .then(res => {
          console.log(res)
          if(res.status === 201) {
            this.dialogStatUpdate()
         }
        })
  .finally(() => {
    this.spinnerLoad = false
    this.endStatusUpdate(dvId, nameId)
  })
    
      },
  
      ...mapActions(useAppStore,[
      'fetchFailedImages',
      'PostEditImg',
      'ImgErCheck',
      'downloadImage',
      "beforeUploadImage",
      'dialogStatUpdate',
      'endStatusUpdate'
      ]),
  
    },
    watch: {
      failedImages(newVal) {
        this.items = newVal;
      },
      spinnerLoad (val) {
        val && setTimeout(() => {
          this.spinnerLoad = false
        }, 3000)
      }
    }
  
  
  
  
  })
  </script>
  
  <style scoped>
  .input-file__input {
  display: none;
  }
  
  
  </style>