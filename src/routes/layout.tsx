import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Header from '~/components/common/Header';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  return (
    <div class="w-full px-4">
      <div class="mx-auto mt-2  max-w-[1200px]">
        <Header />
        <main>
          <Slot />
        </main>
      </div>
    </div>
  );
});
