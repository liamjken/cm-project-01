<template>

<Dialogbox>
        <template v-slot:title>
          Wrong Login
        </template>
        <template v-slot:content>
          The Login Info you entered is incorrect
        </template>
      </Dialogbox>


  <v-container class="login-box d-flex justify-center">
    <v-card width="400" class="px-4 py-4">
      <v-text-field
      variant="outlined"
      v-model="email"
      label="Email"
      type="email"
      requried></v-text-field>
      <v-text-field
      variant="outlined"
      v-model="password"
      label="Password"
      type="password"
      requried></v-text-field>
      <v-btn
      flat
      color="primary"
      size="large"
      block
      :disabled="email == '' || password == '' "
      @click="enterLogin"
      >Submit</v-btn>
    </v-card>
</v-container>
</template>

<script lang="ts">
  import { defineComponent, computed } from "vue"
  import { mapActions, mapState } from 'pinia'
  import { useAppStore } from '../store/app'
  import Dialogbox from '../components/DialogBox.vue'
import store from "@/store"

  export default defineComponent({
    components: {
      Dialogbox
    },
  

    data: () => ({ 
      email: '',
      password: '',
      showError: false


     }),
 
     computed: {
      ...mapState(useAppStore, 
     [ ])
    },

    methods: {

      ...mapActions(useAppStore,[
      'mylogin',
      'loginDialog'
      ]),

      enterLogin(){
        let result = this.mylogin(this.email, this.password)

        if(result == null){
          this.loginDialog()
        } else if(result == 'editor') {
          this.$router.replace('/editor')
        } else if(result == 'reviewer'){
          this.$router.replace('/reviewer')
        } else if(result == 'admin'){
          this.$router.replace('/admin')
        }
      }


    },
})
</script>

<style scoped>
.login-box {
  vertical-align: middle;
}


</style>