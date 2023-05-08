import { component$ } from '@builder.io/qwik';
import { QwikLogo } from './icons/qwik';

export default component$(() => {
  return (
    <header class="p-4 bg-teal-600 rounded-full">
      <div class="flex">
        <QwikLogo />
        <h1 class="text-2xl text-white font-semibold">TODO GEN</h1>
      </div>
    </header>
  );
});
