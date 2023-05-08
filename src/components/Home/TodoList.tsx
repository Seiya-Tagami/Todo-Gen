import { component$ } from "@builder.io/qwik";
import { useListLoader } from "~/routes";

export default component$(() => {
  const todoList = useListLoader();
  return (
    <>
      <div class="w-[520px] mx-auto overflow-x-auto shadow-md sm:rounded-lg">
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
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          {(todoList.value.length && (
            <tbody>
              {todoList.value.map((item, index) => (
                <tr class="bg-white border-b hover:bg-gray-50"
                  key={`items-${index}`}>
                  <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {item.text}
                  </th>
                  <td class="px-6 py-4">
                    {item.type}
                  </td>
                  <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          )) ||
            (<tbody>
              <tr class="bg-white border-b hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
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