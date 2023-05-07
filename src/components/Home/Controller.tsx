import { component$, useSignal } from '@builder.io/qwik';
import { Form } from '@builder.io/qwik-city';
import { useGenTodo } from '~/routes';

export default component$(() => {
  const text = useSignal<string | undefined>("");
  const lang = useSignal<string>("ja");
  const action = useGenTodo();

  return (
    <>
      <div class="p-4">
        <div class="flex items-center gap-2 text-2xl
    ">
          <p>Generate in</p>
          <select name="lang_select" id="" class='p-2 bg-gray-200 rounded-lg text-teal-500' onChange$={(e) => lang.value = e.target.value}>
            <option value="ja">Japanese</option>
            <option value="en">English</option>
          </select>
          <button class="ml-6 p-2 text-3xl font-semibold text-white bg-purple-500 rounded-md italic" onClick$={async () => {
            const translatedData = await action.submit();
            text.value = translatedData.value[0]?.translations[0].text;
          }}>GO🚀</button>
        </div>
      </div>
      <div>
        {text.value}
      </div>
    </>
  );
});