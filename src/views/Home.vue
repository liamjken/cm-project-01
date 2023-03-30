<template>

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


<!-- Creating the button to Open Image -->
<template #item-indicator.status="item">
  <span :class="[  
    item.status === 'NeedEditing' ? 'need-edit' :  
    item.status === 'Editing' ? 'edit' :  
    'default'
    ]">{{ item.status }}</span>

</template>


        </EasyDataTable>
      </v-sheet>
    </v-col>
  </v-row>
</v-container>


</template>
  


<script lang="ts" setup>
  
import type { Header, Item } from "vue3-easy-data-table"
import { ref, onMounted, computed } from "vue"
import { useAppStore } from '../store/app'
import Dialogbox from '../components/DialogBox.vue'

const components = Dialogbox


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
      { text: "Status", value: "indicator.status"},
      { text: "Last Updated", value: "updatedAt"},
      { text: "Action", value: "indicator.action" },
];

const items = failedImages

</script>
 

<style>

.customize-table {
  --easy-table-header-background-color: #f5f5f5;
  --easy-table-body-even-row-background-color: #f5f5f5;
}

.need-edit{
  background: #ffdfe5;
    padding: 10px;
    border-radius: 5px;
    color: #a03030;
    font-weight: bolder;
    border: 1px solid #a03030;
}

.edit{
  background: #d4edd1;
    padding: 10px;
    border-radius: 5px;
    color: #0d634b;
    font-weight: bolder;
    border: 1px solid #0d634b;

}

</style>

