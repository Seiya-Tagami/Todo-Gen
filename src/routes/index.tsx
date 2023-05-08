import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import Controller from '~/components/Home/Controller';

export default component$(() => {
  return (
    <div class={"w-full"}>
      <Controller />
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
