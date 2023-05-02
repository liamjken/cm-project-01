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
        
        <v-row  align="center" justify="center">
            <!-- Text Totals -->
            <v-col  cols="12" sm="2">
               <h2>Total To Review:</h2>
               <h1>{{ adminData.totalToReview }}</h1>
               <v-divider thickness="2" class="pa-1"></v-divider>
               <h4>Total Accepted:</h4>
               <h1>{{ adminData.totalAccepted }}</h1>
            </v-col>
            <!-- Total Percentage 
           <v-col  cols="12" sm="2">
            <v-progress-circular 
            :model-value="circlePercentage" 
            size="100" 
            width="15"
            bg-color="primary"
      color="secondary"
      class="" ><h1 class="circle-percentage">{{ circlePercentage }}%</h1></v-progress-circular>
           </v-col> -->
            <!-- Circle Diagram -->
           <v-col v-if="!switchStatView"  cols="12" sm="2">

            <v-progress-circular 
            :model-value="inReview" 
            size="180" 
            width="10"
            bg-color="simpleGrey"
      color="red"
      class="" >
    
      <v-progress-circular 
            :model-value="needEditing" 
            size="140" 
            width="10"
            bg-color="simpleGrey"
      color="green"
      class="" >
      <v-progress-circular 
            :model-value="TotalCompleted" 
            size="100" 
            width="10"
            bg-color="simpleGrey"
      color="orange"
      class="" >
      <v-progress-circular 
            :model-value="Editing" 
            size="60" 
            width="10"
            bg-color="simpleGrey"
      color="blue"
      class="" >    <v-btn @click="switchStatViews()" icon="mdi-circle" size="x-small"></v-btn></v-progress-circular>
    </v-progress-circular>
    </v-progress-circular>
    </v-progress-circular>


           </v-col>
            <!-- Line Diagrams -->           
            <v-col v-if="!switchStatView"  cols="12" sm="8">
                <v-card class="rounded-t-10 rounded-b-0">
                    <v-row bg-color="white" class="px-2 py-1">
                        <v-col cols="12" sm="3">{{ adminData.totalInReview }}</v-col>
                        <v-col cols="12" sm="9">Total In Review</v-col>
                    </v-row>
                </v-card>
    <v-progress-linear
      :model-value="inReview"
      bg-color="simpleGrey"
      color="red"
      height="8"
    ></v-progress-linear>


    <v-card class="rounded-0">
                    <v-row bg-color="white" class="px-2 py-1">
                        <v-col cols="12" sm="3">{{ adminData.totalNeedEditing }}</v-col>
                        <v-col cols="12" sm="9">Total Need Editing</v-col>
                    </v-row>
                </v-card>
    <v-progress-linear
      :model-value="needEditing"
      bg-color="simpleGrey"
      color="green"
      height="8"
    ></v-progress-linear>

    <v-card class="rounded-0">
                    <v-row bg-color="white" class="px-2 py-1">
                        <v-col cols="12" sm="3">{{ adminData.totalCompleted }}</v-col>
                        <v-col cols="12" sm="9">Total Completed</v-col>
                    </v-row>
                </v-card>
    <v-progress-linear
      :model-value="TotalCompleted"
      bg-color="simpleGrey"
      color="orange"
      height="8"
    ></v-progress-linear>
    <v-card class="rounded-0">
                    <v-row bg-color="white" class="px-2 py-1">
                        <v-col cols="12" sm="3">{{ adminData.totalEditing }}</v-col>
                        <v-col cols="12" sm="9">Total Editing</v-col>
                    </v-row>
                </v-card>
    <v-progress-linear
      :model-value="Editing"
      bg-color="simpleGrey"
      color="blue"
      height="8"
    ></v-progress-linear>
    <v-card class="rounded-b-10 rounded-t-0">
                    <v-row bg-color="white" class="py-2">
                        <v-col cols="12" sm="12"></v-col>
                    </v-row>
                </v-card>
            </v-col>
              <!-- line Diagram no text -->         
              <v-col v-if="switchStatView"  cols="12" sm="2">
              <v-card align="center" justify="center" class="pa-5">
    <v-progress-linear
      :model-value="inReview"
      bg-color="white"
      color="red"
      height="8"
    ></v-progress-linear>
    <v-progress-linear
      :model-value="needEditing"
      bg-color="white"
      color="green"
      height="8"
    ></v-progress-linear>
    <v-progress-linear
      :model-value="TotalCompleted"
      bg-color="white"
      color="orange"
      height="8"
    ></v-progress-linear>
    <v-progress-linear
      :model-value="Editing"
      bg-color="white"
      color="blue"
      height="8"
    ></v-progress-linear>
    <v-btn @click="switchStatViews()" icon="mdi-square" size="x-small" class="ma-auto text-center" justify-center></v-btn>
  </v-card>    
            </v-col>

          <!-- Circle Diagram spaced -->
          <v-col v-if="switchStatView"  cols="12" sm="8">
<v-progress-circular 
:model-value="inReview" 
size="180" 
width="10"
bg-color="simpleGrey"
color="red"
class="ma-1" ><h3>Total in Review</h3>
</v-progress-circular>
<v-progress-circular 
:model-value="needEditing" 
size="180" 
width="10"
bg-color="simpleGrey"
color="green"
class="ma-1" ><h3>Total Need Editing</h3></v-progress-circular>

<v-progress-circular 
:model-value="TotalCompleted" 
size="180" 
width="10"
bg-color="simpleGrey"
color="orange"
class="ma-1" ><h3>Total Completed</h3></v-progress-circular>

<v-progress-circular 
:model-value="Editing" 
size="180" 
width="10"
bg-color="simpleGrey"
color="blue"
class="ma-1" ><h3>Total Editing</h3>
</v-progress-circular>
</v-col>
        </v-row>
        <v-divider thickness="2" class="my-5"></v-divider>

            <!-- Reviewers section -->    
            <h1>Review Agents</h1>    
        <v-row justify="center">
            <v-col class="py-10 bg-white ma-3 rounded-lg elevation-2" v-for=" reviewer in reviewers" :key="reviewer.total">
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
    today: '',
    reviewUsers: '',
    switchStatView: false

  }),
  
    mounted() {
        this.todaysDate()
        this.fetchAdminDetails(`${this.fromDate}:00.000`, `${this.today}:00.000`)




},
    updated() {
    },

    computed: {
      ...mapState(useAppStore, 
     ['adminData', 'reviewers', 'circlePercentage', 'Editing', 'TotalCompleted', 'inReview', 'needEditing'])
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

        switchStatViews() {
          this.switchStatView = !this.switchStatView
          console.log(this.switchStatView)
        }

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