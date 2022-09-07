<template>
  <div>
    <v-checkbox
      v-model="show"
      :label="toggleShowText"
      class="d-inline-block"
    />
    <v-table v-if="displayTodoList.length">
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Title
          </th>
          <th class="text-left">
            Description
          </th>

          <th class="text-left">
            Due Date
          </th>         



          <th />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in displayTodoList"
          :key="index"
        >
          <td>
            <v-checkbox
              v-model="item.isCompleted"
              :label="String(item.id)"
              hide-details
              @click="handleOnCheck(item)"
            />
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.body }}</td>
          <td class="text-right whitespace-nowrap">
            <v-btn
              size="small"
              :color="item.isCompleted ? 'primary': 'success'"
              class="mr-5"
              @click="handleOnCheck(item)"
            >
              <v-icon
                :icon="item.isCompleted ? 'mdi-restore' : 'mdi-check-circle-outline'"
              />
            </v-btn>
            
            <v-tooltip top>
            <v-btn
              :to="{ name: 'edit-id', params: { id: item.id } }"
              size="small"
              color="warning"
              class="mr-5"
            >

              <v-icon>mdi-square-edit-outline</v-icon>
            </v-btn>
           <!--  <v-hover span"Edit"></v-hover></span>
              </v-hover> -->
          </v-tooltip>
            
            <v-btn
              color="error"
              size="small" 
              @click="drop(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-alert v-else type="info">
      No data available.
    </v-alert>
  </div>
</template>
<script setup lang="ts">
import { Todo } from 'types/todo'
const show = ref(false)
const toggleShowText = computed(() => {
  const text = show.value ? 'Hide closed' : 'Show closed'
  return text
})

const { todoList, activeTodoList, deleteTodo, toggleStatusTodo } = useTodos()
const displayTodoList = computed(() => {
  const todos = show.value ? todoList.value : activeTodoList.value
  return todos
})

const handleOnCheck = (todo: Todo) => {
  toggleStatusTodo(todo)
}

const drop = (id: number) => {
  deleteTodo(id)
}
</script>
<style lang="sass" scoped>
.whitespace-nowrap
  white-space: nowrap
</style>
