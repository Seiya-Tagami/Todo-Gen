import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeAction$ } from '@builder.io/qwik-city';
import Controller from '~/components/Home/Controller';

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

export const useGenTodo = routeAction$(async () => {
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
  const response = await fetch(import.meta.env.PUBLIC_AZURE_COGNITIVE_TRANSLATOR_END_POINT, options);
  const result = await response.json();
  console.log(result[0])
  return result as [
    {
      translations: TranslatedText[]
    }
  ];
})

export default component$(() => {
  return (
    <>
      <Controller />
    </>
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
