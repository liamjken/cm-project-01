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
  Upload
    </v-btn>
      <input class="input-file__input" ref="file" type="file" @change="onFileSelected">
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

export default defineComponent({
  components: {
    Dialogbox
  },

data: () => ({

  mySelectedFile: null,
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
   ['failedImages', 'completed', 'isImageValid'])
  },
  created() {

  },
  methods: {
    selectFile(){
      let fileInputElement : any = this.$refs.file;
      fileInputElement.click();
    },
    onFileSelected(event: any){
      this.mySelectedFile = event.target.files[0]
      return this.mySelectedFile
    },

    ...mapActions(useAppStore,[
    'fetchFailedImages',
    'PostEditImg',
    'ImgErCheck',
    'downloadImage',
    "beforeUploadImage"
    ]),

  },
  watch: {
    failedImages(newVal) {
      this.items = newVal;
    }
  }




})
</script>

<style scoped>
.input-file__input {
display: none;
}


</style>