<template>    
    <v-container>
     <v-main>
        <h1>Admin Portal</h1>
        <v-row>
            <v-col><v-text-field type="datetime-local" label="From" v-model="fromDate"></v-text-field></v-col>
            <v-col><v-text-field type="datetime-local" label="to" v-model="toDate"></v-text-field></v-col>
        </v-row>
        <v-row>
            <v-col  cols="12" sm="2">
               <h3>Total To Review:</h3>
               <h1>{{ adminData.totalToReview }}</h1>
               <h3>Total Accepted:</h3>
               <h1>{{ adminData.totalAccepted }}</h1>
            </v-col>
           <v-col  cols="12" sm="4">
            <v-progress-circular 
            :model-value="circlePercentage" 
            size="160" 
            width="40"
            bg-color="primary"
      color="secondary" ><h1 class="circle-percentage">{{ circlePercentage }}%</h1></v-progress-circular>
           </v-col>
            <v-col  cols="12" sm="6">



                <v-card class="rounded-0">
                    <v-row bg-color="white" class="px-2 py-1">
                        <v-col cols="12" sm="3">{{ adminData.totalInReview }}</v-col>
                        <v-col cols="12" sm="9">Total In Review</v-col>
                    </v-row>
                </v-card>
    <v-progress-linear
      model-value="0"
      bg-color="secondary"
      color="primary"
      height="8"
    ></v-progress-linear>


    <v-card class="rounded-0">
                    <v-row bg-color="white" class="px-2 py-1">
                        <v-col cols="12" sm="3">{{ adminData.totalNeedEditing }}</v-col>
                        <v-col cols="12" sm="9">Total Need Editing</v-col>
                    </v-row>
                </v-card>
    <v-progress-linear
      model-value="31.7"
      bg-color="secondary"
      color="primary"
      height="8"
    ></v-progress-linear>

    <v-card class="rounded-0">
                    <v-row bg-color="white" class="px-2 py-1">
                        <v-col cols="12" sm="3">{{ adminData.totalCompleted }}</v-col>
                        <v-col cols="12" sm="9">Total Completed</v-col>
                    </v-row>
                </v-card>
    <v-progress-linear
      model-value="53.6"
      bg-color="secondary"
      color="primary"
      height="8"
    ></v-progress-linear>
    <v-card class="rounded-0">
                    <v-row bg-color="white" class="px-2 py-1">
                        <v-col cols="12" sm="3">{{ adminData.totalEditing }}</v-col>
                        <v-col cols="12" sm="9">Total Edited</v-col>
                    </v-row>
                </v-card>
    <v-progress-linear
      model-value="6.09"
      bg-color="secondary"
      color="primary"
      height="8"
    ></v-progress-linear>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col class="py-10 bg-white ma-3" v-for=" reviewer in reviewers" :key="reviewer.total">
                <div justify="center" style="text-align: center;">
                    <div>
                        <v-avatar  size="80" color="primary">
                            <v-icon size="70" color="secondary" icon="mdi-account">
                            </v-icon>
                        </v-avatar>
                    </div>
<div class="py-3"><span class="info-title">Email:</span> {{ reviewer.email }}</div>
<div>Total in Review</div>
<h1>{{ reviewer.total }}</h1>
</div>
            </v-col>

        </v-row>
{{ adminData }}
{{ circlePercentage }}

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
    today: '',
    reviewUsers: '',

  }),
  
    mounted() {
        this.todaysDate()
        this.fetchAdminDetails(`${this.fromDate}:00.000`, `${this.today}:00.000`)




},
    updated() {
    },

    computed: {
      ...mapState(useAppStore, 
     ['adminData', 'reviewers', 'circlePercentage'])
    },
    created() {
  
    },
    methods: {
        todaysDate(){
            let date = new Date()
            let todays = date.toLocaleDateString().replace(/\//g, "-")
            this.today = `${todays} 00:00`
        },
  
      ...mapActions(useAppStore,[
    'fetchAdminDetails',
    'calcPercentage'
      ]),
    },
    watch: {
        fromDate() {
            let fromDate = this.fromDate
            let newDate = fromDate.replace(/T/g, " ");
            this.fromDate = newDate
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