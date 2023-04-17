<template>
<v-app id="inspire">
  <v-app-bar
    class="px-3"
    color="masthead"
    flat
    density="compact"
    >
    <v-img 
        class="" 
        src="./assets/logo.new.png"
        max-width="200"
        ></v-img>
    <v-spacer></v-spacer>
    <v-tabs v-if="$route.path != '/'" 
    color="secondary">
    <v-tab
    @click="userlogOut"
    :ripple="false"
    >Logout</v-tab>
  </v-tabs>
  </v-app-bar>
  <v-main>
    <RouterView></RouterView>
  </v-main>
</v-app>
</template>


<script lang="ts">
  import { defineComponent} from "vue"
  import { mapActions, mapState } from 'pinia';
  import { useAppStore } from './store/app'

  export default defineComponent({

    data: () => ({ 
    

     }),
 
     computed: {
      ...mapState(useAppStore, 
     [ ])
    },

    methods: {

      ...mapActions(useAppStore,[
      'mylogout',
      ]),

      userlogOut() {
        this.mylogout() 
        this.$router.replace('/')
      }


    },
})
</script>

<style>
.v-main{
  background: lightgray;
}
</style>