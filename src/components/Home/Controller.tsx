import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const lang = useSignal<string>("ja");

  return (
    <div class="p-4">
      <div class="flex items-center gap-2 text-2xl
    ">
        <p>Generate in</p>
        <select name="lang_select" id="" class='p-2 bg-gray-200 rounded-lg text-teal-500' onChange$={(e) => lang.value = e.target.value}>
          <option value="ja">Japanese</option>
          <option value="en">English</option>
        </select>
        <button class="ml-6 p-2 text-3xl font-semibold text-white bg-purple-500 rounded-md italic">GO🚀</button>
      </div>
      {lang}
    </div>
  );
});