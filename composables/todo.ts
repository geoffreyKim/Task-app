import type { Todo, CreateFormPayload } from '~/types/todo'

export const useTodos = () => {
  const nextTodoId = useState<number>('nextTodoId', () => 1)
  const todoList = useState<Todo[]>('todoList', () => [])
  const activeTodoList = computed(() => {
    return todoList.value.filter(todo => !todo.isCompleted)
  })

  const findIndexTodo = (id: number) => {
    const index = todoList.value.findIndex(todo => todo.id === id)
    if (index === -1) {
      throw throwError('Task is not found')
    }
    return index
  }

  const fetchTodo = (id: number): Todo => {
    const result = todoList.value.filter(todo => todo.id === Number(id))
    if (!result[0]) {
      throw throwError('Task is not found')
    }
    return result[0]
  }

  const createTodo = (payload: CreateFormPayload) => {
    todoList.value.unshift({
      id: nextTodoId.value,
      title: payload.title,
      body: payload.body,
      // due: payload.due,
      isCompleted: false
    })
    nextTodoId.value++
  }

  const toggleStatusTodo = (todo: Todo) => {
    const targetIndex = findIndexTodo(todo.id)
    todoList.value[targetIndex].isCompleted = !todo.isCompleted
  }

  const updateTodo = (payload: Todo) => {
    const targetIndex = findIndexTodo(payload.id)
    todoList.value[targetIndex] = payload
  }

  const deleteTodo = (id: number) => {
    const targetIndex = findIndexTodo(id)
    todoList.value.splice(targetIndex, 1)
  }

  return {
    todoList: readonly(todoList),
    activeTodoList: readonly(activeTodoList),
    fetchTodo,
    toggleStatusTodo,
    createTodo,
    updateTodo,
    deleteTodo
  }
}
