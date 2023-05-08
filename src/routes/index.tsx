import { component$ } from '@builder.io/qwik';
import { routeAction$, type DocumentHead, zod$, z, routeLoader$ } from '@builder.io/qwik-city';
import Controller from '~/components/Home/Controller';
import TodoList from '~/components/Home/TodoList';

interface TodoItem {
  text: string
  type: string
}

export const useListLoader = routeLoader$(() => {
  return todoList;
});

export const todoList: TodoItem[] = [];
export const useAddToTodoListAction = routeAction$(
  (item) => {
    todoList.push(item);
    return {
      success: true,
    };
  },
  zod$({
    text: z.string().trim().min(1),
    type: z.string().trim().min(1)
  })
);

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
