<template>
  <div>
    <v-card class="pa-5 mb-7">
      <v-form @submit.prevent="handleSubmit">
        <h3 class="subtitle-2 pb-3">
          {{ pageTitle }}
        </h3>
        <v-text-field v-model="title" :error-messages="titleError" label="Title" variant="outlined" />
        <v-text-field v-model="body" :error-messages="bodyError" label="Description" variant="outlined" />
        <span>Select due date</span>
        <v-spacer></v-spacer>
        
        <Datepicker> {{ datepickerVue }}</Datepicker>
        
        
        <v-btn color="indigo" type="submit">
          Submit
        </v-btn>
      </v-form>
    </v-card>
    <v-alert v-show="success" type="success" class="mb-5">
      Successfully updated!
    </v-alert>
  </div>
</template>

<script setup lang="ts">
  
import { Duplex } from 'stream';
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { Todo } from '~/types/todo'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import datepickerVue from './datepicker.vue';

type Props = {
  todo?: Todo
}
const { todo } = defineProps<Props>()

const pageTitle = computed(() => {
  return todo ? 'Edit Task' : 'Create Task'
})

const schema = yup.object({
  title: yup.string().required().max(10).label('Title'),
  body: yup.string().required().max(20).label('Body')
})
const { validate, resetForm } = useForm({ validationSchema: schema })
const { value: title, errorMessage: titleError } = useField<string>('title')
const { value: body, errorMessage: bodyError } = useField<string>('body')
if (todo) {
  resetForm({
    values: {
      title: todo.title,
      body: todo.body,
      // due: todo.due
    }
  })
}

const success = ref(false)
const { updateTodo, createTodo } = useTodos()
const handleSubmit = async () => {
  const result = await validate()
  if (result.valid && todo) { // if edit
    await updateTodo({
      id: todo.id,
      title: title.value,
      body: body.value,
      // due: due.value,
      isCompleted: todo.isCompleted
    })
    success.value = true
  } else if (result.valid && !todo) { // is create
    createTodo({
      title: title.value,
      body: body.value
      // due: due.value,
    })
    resetForm({
      values: {
        title: '',
        body: ''
      }
    })
  } else {
    return false
  }
}
watch(success, (newVal: boolean) => {
  if (newVal === true) {
    setTimeout(() => {
      success.value = false
    }, 3000)
  }
})

</script>
