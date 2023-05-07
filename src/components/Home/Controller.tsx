import { component$, useSignal } from '@builder.io/qwik';
import { useGenTodo } from '~/routes';
import Loading from '../utils/Loading';

export default component$(() => {
  const text = useSignal<string | undefined>("Let's gen!");
  const lang = useSignal<string>("ja");
  const loading = useSignal<boolean>(false)
  const action = useGenTodo();

  return (
    <>
      <div class="p-4">
        <div class="flex items-center gap-2 text-2xl">
          <p>Generate in</p>
          <select name="lang_select" class='p-2 bg-gray-200 rounded-lg text-teal-500' onChange$={(e) => lang.value = e.target.value}>
            <option value="ja">Japanese</option>
            <option value="en">English</option>
          </select>
          <button class="ml-6 p-2 text-3xl font-semibold text-white bg-purple-500 rounded-md italic" onClick$={async () => {
            loading.value = true;
            const translatedData = await action.submit();
            text.value = translatedData.value[0]?.translations[0].text;
            loading.value = false;
          }}>GO🚀</button>
        </div>
      </div>
      <div>
        {loading.value ? <Loading /> : text.value}
      </div>
    </>
  );
});