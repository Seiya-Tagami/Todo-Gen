import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useDeleteTodoItemAction, useListLoader } from "~/routes";

export default component$(() => {
  const todoList = useListLoader();
  const action = useDeleteTodoItemAction();
  return (
    <>
      <div class="max-w-[520px] mx-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Category
              </th>
              <th scope="col" class="px-6 py-3">
                <span class="sr-only"></span>
              </th>
            </tr>
          </thead>
          {(todoList.value.length && (
            <tbody>
              {todoList.value.map((item, index) => (
                <tr class="bg-white border-b hover:bg-gray-50"
                  key={`items-${index}`}>
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                    {item.text}
                  </th>
                  <td class="px-6 py-4">
                    {item.type}
                  </td>
                  <td class="px-6 py-4 text-right">
                    <Form action={action}>
                      <input type="text" name="id" value={item.id} hidden />
                      <button class="font-medium text-blue-600 hover:underline">remove</button>
                    </Form>
                  </td>
                </tr>
              ))}
            </tbody>
          )) ||
            (<tbody>
              <tr class="bg-white border-b hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900">
                  NO DATA
                </th>
                <td class="px-6 py-4">
                  NO DATA
                </td>
              </tr>
            </tbody>
            )}
        </table>
      </div>
    </>
  )
})