import { type Signal, component$, useSignal } from '@builder.io/qwik';
import Loading from '../utils/Loading';
import TodoCard from './TodoCard';

interface GenTodo {
  activity: string,
  accessibility: number
  type: string
  participants: number
  price: number
  key: string
}

interface TranslatedText {
  text: string,
  to: string
}

export const genTodoFromAPI = async (lang: Signal<string>) => {
  /**
   * Bored API を叩く
   */
  const generatedTodoText = await fetch(import.meta.env.PUBLIC_BORED_API_END_POINT, {
    headers: { Accept: 'application/json' },
  });
  const { activity } = (await generatedTodoText.json()) as GenTodo;

  /**
   * Azure Cognitive Translator API を叩く
   */
  const data = [
    {
      "text": activity
    }
  ];

  const options = {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': `${import.meta.env.PUBLIC_AZURE_COGNITIVE_TRANSLATOR_API_KEY}`,
      'Ocp-Apim-Subscription-Region': 'japaneast',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };
  const response = await fetch(`${import.meta.env.PUBLIC_AZURE_COGNITIVE_TRANSLATOR_END_POINT}to=${lang.value}`, options);
  const result = await response.json();
  console.log(result[0])
  return result as [
    {
      translations: TranslatedText[]
    }
  ];
}

export default component$(() => {
  const text = useSignal<Promise<string> | string | undefined>("Let's find what to do next!");
  const lang = useSignal<string>("ja");
  const loading = useSignal<boolean>(false)

  return (
    <div class='w-[560px] mx-auto mt-8'>
      <div class="flex items-center gap-2 text-2xl">
        <button class="p-2 text-3xl font-semibold text-white bg-purple-500 rounded-md italic hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick$={async () => {
          loading.value = true;
          const result = await genTodoFromAPI(lang);
          text.value = result[0].translations[0].text;
          loading.value = false;
        }}>GEN🚀</button>
        <p>in</p>
        <select name="lang_select" class='p-2 bg-gray-200 rounded-lg text-teal-500' onChange$={(e) => lang.value = e.target.value}>
          <option value="ja">Japanese</option>
          <option value="en">English</option>
          <option value="zh-Hans">Chinese Simplified</option>
        </select>
      </div>
      <div class={"w-full h-[200px] flex justify-center items-center mt-8"}>
        {loading.value ? <Loading /> : <TodoCard text={text.value} />}
      </div>
    </div>
  );
});