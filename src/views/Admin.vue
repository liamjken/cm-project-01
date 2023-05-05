<template>    
    <v-container>
     <v-main>
        <h1>Admin Portal</h1>
        
        <v-row>
            <v-col><v-text-field type="datetime-local" label="From" v-model="fromDate"></v-text-field></v-col>
            <v-col><v-text-field type="datetime-local" label="to" v-model="toDate"></v-text-field></v-col>
        </v-row>
        <v-row>
          
        </v-row>
        
        <v-row justify="center">
            <!-- Text Totals -->
            <v-col  cols="12" sm="2">
               <h2>Total To Review:</h2>
               <h1>{{ adminData.totalToReview }}</h1>
               <v-divider thickness="2" class="pa-1"></v-divider>
               <h4>Total Accepted:</h4>
               <h1>{{ adminData.totalAccepted }}</h1>
            </v-col>
          <!-- Circle Diagram spaced -->
          <div v-for="(circle,index) in circleInfo" :key="index">
          <v-col class="liam"  cols="12" sm="8">
          <v-progress-circular 
:model-value="circle.perc" 
size="180" 
width="10"
bg-color="simpleGrey"
:color="circle.color"
class="mx-3" ><div align="center" justify="center">
<h3>{{ circle.name }}</h3>
<h1>{{ circle.value }}</h1></div>
</v-progress-circular>

</v-col>
</div>
        </v-row>
        <v-divider thickness="2" class="my-5"></v-divider>

            <!-- Reviewers section -->    
            <h1>Review Agents</h1>    
        <v-row justify="center">
            <v-col class="py-10 bg-white ma-3 rounded-lg elevation-2" v-for=" reviewer,index in reviewers" :key="index">
                <div justify="center" style="text-align: center;">
                    <div>
                        <v-avatar  size="80" color="primary">
                            <v-icon size="70" color="secondary" icon="mdi-account">
                            </v-icon>
                        </v-avatar>
                    </div>
<div class="py-3"><span class="info-title">Email:</span> {{ reviewer.email }}</div>
<div>Total Completed</div>
<h1>{{ reviewer.total }}</h1>
</div>
            </v-col>

        </v-row>
        <v-row>                         
          
        
        </v-row>
        <v-row>
          <v-col>
     
          </v-col>
        </v-row>

     </v-main>
    </v-container>

    </template>
  
  <script lang="ts">
  import { defineComponent } from "vue"
  import { useAppStore } from '../store/app'
  import { mapActions, mapState } from 'pinia';
  
  export default defineComponent({
  
  data: () => ({
    fromDate: '2023-01-01 00:00',
    toDate: '',
    reviewUsers: '',
    switchStatView: false

  }),
  
    mounted() {
        this.fetchAdminDetails(`${this.fromDate}:00.000`, `${this.toDate}:00.000`)




},
    updated() {
      this.todaysDate()
    },

    computed: {
      ...mapState(useAppStore, 
     ['adminData', 'reviewers', 'circlePercentage', 'Editing', 'TotalCompleted', 'inReview', 'needEditing', 'circleInfo'])
    },
    created() {
      this.todaysDate()
    },
    methods: {
        todaysDate(){
            let date = new Date()
            let year = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDay()

            this.toDate = `${year}-0${month}-0${day} 00:00`
        },
  
      ...mapActions(useAppStore,[
    'fetchAdminDetails',
    'calcPercentage'
      ]),

        switchStatViews() {
          this.switchStatView = !this.switchStatView
          console.log(this.switchStatView)
        }

    },
    watch: {
        fromDate() {
            let fromDate = this.fromDate
            let newfromDate = fromDate.replace(/T/g, " ");
            this.fromDate = newfromDate
            this.fetchAdminDetails(`${this.fromDate}:00.000`, `${this.toDate}:00.000`);
        },
            toDate() {
            let toDate = this.toDate
            let newtoDate = toDate.replace(/T/g, " ");
            this.toDate = newtoDate
            this.fetchAdminDetails(`${this.fromDate}:00.000`, `${this.toDate}:00.000`);
      },
    }
  
  
  
  
  })
  </script>


  <style scoped>
  
  .info-title{
    font-weight: 800;
  }

  .circle-percentage{
    color: black;
  }
  
  </style>