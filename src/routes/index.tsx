import { component$ } from '@builder.io/qwik';
import { routeAction$, type DocumentHead, zod$, z, routeLoader$ } from '@builder.io/qwik-city';
import Controller from '~/components/Home/Controller';
import TodoList from '~/components/Home/TodoList';

interface TodoItem {
  id: string
  text: string
  type: string
}

export const useListLoader = routeLoader$(() => {
  return todoList;
});

export let todoList: TodoItem[] = [];
export const useAddToTodoListAction = routeAction$(
  (item) => {
    todoList.push(item);
    return {
      success: true,
    };
  },
  zod$({
    id: z.string(),
    text: z.string().trim().min(1),
    type: z.string().trim().min(1)
  })
);

export const useDeleteTodoItemAction = routeAction$(
  (item) => {
    const newTodoList = todoList.filter(todo => todo.id !== item.id);
    todoList = newTodoList;
    return {
      success: true,
    };
  }
)

export default component$(() => {
  return (
    <div class={"w-full"}>
      <Controller />
      <TodoList />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'TODO GEN',
  meta: [
    {
      name: 'description',
      content: 'Todo gen can suggest what to do next!',
    },
  ],
};
