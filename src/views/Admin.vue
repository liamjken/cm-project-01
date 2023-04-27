<template>    
    <v-container>
     <v-main>
        <h1>Admin Portal</h1>
        <v-row>
            <v-col><v-text-field type="datetime-local" label="From" v-model="fromDate"></v-text-field></v-col>
            <v-col><v-text-field type="datetime-local" label="to" v-model="toDate"></v-text-field></v-col>
        </v-row>
        <v-row>
            <v-col>
               <h2>Total To Review:</h2>
               <h1>{{ adminData.totalToReview }}</h1>
            
            </v-col>
            <v-col>
                <v-table>
                    <v-table>
    <tbody>
      <tr>
        <td>{{ adminData.totalInReview }}</td>
        <td>Total In Review</td>
      </tr>
      <tr>
        <td>{{ adminData.totalNeedEditing }}</td>
        <td>Total Need Editing</td>
      </tr>
      <tr>
        <td>{{ adminData.totalCompleted }}</td>
        <td>Total Completed</td>
      </tr>
    </tbody>
  </v-table>
                </v-table>

            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col class="pa-10 bg-white ma-3" v-for=" reviewer in reviewers" :key="reviewer.total">
                <div justify="center" style="text-align: center;">
                    <div><i class="mdi mdi-account"  size="25"></i></div>
<div>Email:{{ reviewer.email }}</div>
<div>Total in Review</div>
<h1>{{ reviewer.total }}</h1>
</div>
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
    toDate: '2023-04-26 00:00',
    today: '',
    reviewUsers: ''
  }),
  
    mounted() {
        this.todaysDate()
        this.fetchAdminDetails(`${this.fromDate}:00.000`, `${this.today}:00.000`)



},
    updated() {
    },

    computed: {
      ...mapState(useAppStore, 
     ['adminData', 'reviewers'])
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
    'fetchAdminDetails'
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
      }
    }
  
  
  
  
  })
  </script>


  <style scoped>
  
  
  </style>