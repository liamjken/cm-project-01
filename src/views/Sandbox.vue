<template>
      <v-dialog
        transition="dialog-bottom-transition"
        width="auto"
        v-model="dialog"
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

<script lang="ts">
import { mapActions, mapState } from 'pinia';
import { defineComponent } from 'vue'
import { useAppStore } from '../store/app'




export default defineComponent({

  data: () => ({
    dialog: true
  }),
  created() {
    this.fetchFailedImages();
  },
  mounted() {
    this.dialog = true
  },
  computed: {
   ...mapState(useAppStore, 
   ['failedImages', 'completed', 'isImageValid'])
  },
  methods: {
    ...mapActions(useAppStore,[
    'fetchFailedImages',
    'PostEditImg',
    'ImgErCheck'
    ]),

    
  }




})
</script>