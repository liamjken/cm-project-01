<template>
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
  import { mapActions, mapState } from 'pinia';
  import { useAppStore } from '../store/app'

  export default defineComponent({

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
      'mylogin'
      ]),

      enterLogin(){
        let result = this.mylogin(this.email, this.password)

        if(result == null){
          alert('this Login is invalid')
        } else if(result == 'editor') {
          this.$router.replace('/Editor')
        } else if(result == 'reviewer'){
          this.$router.replace('/Reviewer')
        }
      }


    },
})
</script>

<style>
.login-box {
  vertical-align: middle;
}

</style>