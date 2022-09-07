<template>
  <div>
    <h3 class="subtitle-1 mb-5">
      Home
    </h3>
    <TodoForm class="pb-7" />
    <TodoTable />
  </div>
</template>

<!-- <script>
  import TodoForm from "~/components/TodoForm";
  import TodoTable from "~/components/TodoTable";
  import {mapGetters} from "vuex";
  import Vue from 'vue'
 /*  import Datepicker from 'vuejs-datepicker'
  Vue.component('date-picker', Datepicker) */
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css'


  export default {
    name: "index",
    components: {TodoForm, TaskTable},
  
    mounted() {
        this.$store.dispatch('task/init')
    },
  
    computed: {
      ...mapGetters({
        doneTasks: 'task/doneTasks',
        pendingTasks: 'task/pendingTasks',
      }),
    },
  }
  </script> -->
  
  <style>
  </style>


