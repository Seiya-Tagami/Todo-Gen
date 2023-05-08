import { component$, useSignal } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useAddToTodoListAction } from "~/routes";
import { v4 as uuidv4 } from "uuid"
interface ITodoCardProps {
  text?: Promise<string> | string,
  type?: Promise<string> | string,
}
export default component$<ITodoCardProps>((props) => {
  const { text, type } = props;
  const action = useAddToTodoListAction();
  const preventAddTwice = useSignal(false);

  return (
    <Form class="w-full m-h-full p-6 bg-white border border-gray-200 rounded-lg shadow" action={action}>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{text ? text : "Let's find what to do next!"}</h5>
      <input type="text" name="text" value={text as FormDataEntryValue} hidden />
      {type && (
        <>
          <span class="bg-blue-100 text-blue-800 text-[18px] font-medium mr-2 px-2.5 py-0.5 rounded-full">{type}</span>
          <input type="text" name="type" value={type as FormDataEntryValue} hidden />
        </>
      )}
      <div class="flex justify-end">
        {text && (
          <button class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-600 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400" type="submit" disabled={preventAddTwice.value} onClick$={() => {
            preventAddTwice.value = true;
          }}>
            Add
            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        )}
      </div>
      <input type="text" name="id" value={uuidv4()} hidden />
    </Form>
  )
})