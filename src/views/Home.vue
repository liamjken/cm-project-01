<template>

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
  />



          </v-sheet>
        </v-col>
        </v-row>
        </v-container>
  </template>
  
  <script lang="ts" setup>
  
import type { Header, Item } from "vue3-easy-data-table";
import { ref, onMounted, computed } from "vue";
import { useAppStore } from '../store/app'


const store = useAppStore()
const msg = ref("testing pina and axios")
const getfailedImages = computed(() => {
  return store.getfailedImages;
});
const failedImages = computed(() => {
  return store.failedImages;
});


onMounted(() => {
  store.fetchFailedImages();
})



const headers: Header[] = [
  { text: "File Name", value: "name" },
  { text: "Status", value: "status"},
  { text: "Last Updated", value: "updatedAt"},
  { text: "Action", value: "src" },
];



const items: Item[] = failedImages


</script>
 

<style>
.customize-table {
  --easy-table-header-background-color: #f5f5f5;
  --easy-table-body-even-row-background-color: #f5f5f5;
}

</style>

