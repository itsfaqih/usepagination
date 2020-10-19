import React from 'react';
import usePagination from 'usepagination';
import { posts } from './data/posts';

const App = () => {
  const { page, action } = usePagination(posts);

  return (
    <main>
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {page.data.map(item => (
            <div key={item.id} className="bg-white rounded-lg py-4 px-5 shadow">
              <h2 className="text-lg font-semibold text-gray-700 capitalize">{item.title}</h2>
              <p className="text-gray-600 mt-3">{item.body}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <ul className="flex bg-white rounded-md shadow overflow-hidden">
            <li>
              <button
                className={`h-full px-3 flex items-center ${
                  page.current !== 1 ? 'text-gray-700' : 'text-gray-500 cursor-default'
                }`}
                onClick={() => action.goTo(1)}
                disabled={page.current === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>
            </li>
            <li className="border border-gray-300 -my-px -ml-px">
              <button
                className={`h-full px-3 flex items-center ${
                  page.previous !== null ? 'text-gray-700' : 'text-gray-500 cursor-default'
                }`}
                onClick={action.previous}
                disabled={page.previous === null}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </li>
            {page.numbers.map((number, index) => (
              <li key={index} className="border border-gray-300 -my-px -ml-px">
                <button
                  className={`py-2 px-4 ${
                    page.current === number
                      ? 'bg-indigo-500 text-white cursor-default'
                      : 'text-gray-700'
                  }`}
                  onClick={() => action.goTo(number)}
                  disabled={page.current === number}
                >
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                className={`h-full px-3 flex items-center ${
                  page.next !== null ? 'text-gray-700' : 'text-gray-500 cursor-default'
                }`}
                onClick={action.next}
                disabled={page.next === null}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </li>
            <li className="border border-gray-300 -my-px -ml-px">
              <button
                className={`h-full px-3 flex items-center ${
                  page.current !== page.last ? 'text-gray-700' : 'text-gray-500 cursor-default'
                }`}
                onClick={() => action.goTo(page.last)}
                disabled={page.current === page.last}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};
export default App;
