import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <header class="p-4 bg-teal-600 rounded-full">
      <div class="flex gap-4">
        {/* <button class='' hidden>button</button> */}
        <h1 class="text-2xl text-white font-semibold ml-6">TODO GEN</h1>
      </div>
    </header>
  );
});
