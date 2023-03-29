<template>
      <v-dialog
        transition="dialog-bottom-transition"
        width="auto"
        v-model="store.completed"
      >
        <template v-slot:default="{ isActive }">
          <v-card>
            <v-toolbar
              color="primary"
              title="Image Update"
            ></v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Image has been updated on the server</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                variant="text"
                @click="isActive.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
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
      { text: "Status", value: "indicator.status"},
      { text: "Last Updated", value: "updatedAt"},
      { text: "Action", value: "indicator.action" },
];

const items = failedImages

</script>