import { component$, useSignal, useStore } from '@builder.io/qwik';
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

export const genTodoFromAPI = async (lang: string) => {
  /**
   * Bored API を叩く
   */
  const generatedTodoText = await fetch(import.meta.env.PUBLIC_BORED_API_END_POINT, {
    headers: { Accept: 'application/json' },
  });
  const res = (await generatedTodoText.json()) as GenTodo;

  /**
   * Azure Cognitive Translator API を叩く
   */
  const data = [
    {
      "text": res.activity
    },
    {
      "text": res.type
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
  const response = await fetch(`${import.meta.env.PUBLIC_AZURE_COGNITIVE_TRANSLATOR_END_POINT}to=${lang}`, options);
  const result = await response.json();
  console.log(result)
  return result as [
    {
      translations: TranslatedText[]
    },
    {
      translations: TranslatedText[]
    }
  ]
}

export default component$(() => {
  const todoData = useStore<{ text: Promise<string> | string | undefined, type: Promise<string> | string | undefined, lang: string }>({ text: "Let's find what to do next!", type: "", lang: "ja" })
  const loading = useSignal<boolean>(false)

  return (
    <div class='max-w-[520px] mx-auto mt-8'>
      <div class="flex items-center gap-2 text-2xl">
        <button class="p-2 text-3xl font-semibold text-white bg-purple-500 rounded-md italic hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300" onClick$={async () => {
          loading.value = true;
          const result = await genTodoFromAPI(todoData.lang);
          todoData.text = result[0].translations[0].text;
          todoData.type = result[1].translations[0].text;
          loading.value = false;
        }}>GEN🚀</button>
        <p>in</p>
        <select name="lang_select" class='p-2 bg-gray-200 rounded-lg text-teal-500' onChange$={(e) => todoData.lang = e.target.value}>
          <option value="ja">Japanese</option>
          <option value="en">English</option>
          <option value="zh-Hans">Chinese Simplified</option>
          <option value="fr">French</option>
        </select>
      </div>
      <div class={"w-full h-[200px] flex justify-center items-center mt-8"}>
        {loading.value ? <Loading /> : <TodoCard text={todoData.text} type={todoData.type} />}
      </div>
    </div>
  );
});