# usePagination

Simple client side pagination hooks for react.

[![NPM](https://img.shields.io/npm/v/@itsfaqih/usepagination.svg)](https://www.npmjs.com/package/@itsfaqih/usepagination)

## Install

```bash
npm install --save @itsfaqih/usepagination
```

## Usage

```tsx
import React from 'react';
import Post from 'component/post';
import Pagination from 'component/pagination';
import usePagination from '@itsfaqih/usepagination';

const Home = () => {
  const posts = [
    {
      id: 1,
      title: 'Nice hooks',
      body: 'You can also use data from an API. As long as it returns an array',
    },
    ...
  ];

  const { page, action } = usePagination(posts);

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {page.data.map(item => <Post.Card data={item}>)}
      </div>
      <div>
        <Pagination>
          <Pagination.First
            onClick={() => action.goTo(1)}
            disabled={page.current === 1}
          />
          <Pagination.Previous
            onClick={action.previous}
            disabled={page.previous === null}
          />
          {page.numbers.map((number, index) => (
            <Pagination.Number
              key={index}
              number={number}
              onClick={() => action.goTo(number)}
              disabled={page.current === number}
            />
          ))}
          <Pagination.Next
            onClick={action.next}
            disabled={page.next === null}
          />
          <Pagination.Last
            onClick={() => action.goTo(page.last)}
            disabled={page.current === page.last}
          />
        </Pagination>
      </div>
    </div>
  );
};
```

## API

```tsx
const { page, action } = usePagination(initialData, perPage, shownPageNumber);
```

### `parameters`

| Parameter       | Type   | Description                                        |
| --------------- | ------ | -------------------------------------------------- |
| initialData     | Array  | The array of the data to be paginated              |
| perPage         | number | Number of data to be shown per page                |
| shownPageNumber | number | Amount of number to be shown in pagination buttons |

### `page`

| Property | Type           | Description                                                                     |
| -------- | -------------- | ------------------------------------------------------------------------------- |
| data     | Array          | Data of current active page                                                     |
| numbers  | Array          | Generated page numbers for pagination buttons                                   |
| current  | number \| null | Current active page number. It will be null on empty initialData                |
| next     | number \| null | Next page number. It will be null on empty initialData or no more next page     |
| previous | number \| null | Previous page number. It will be null on empty initialData or active first page |
| last     | number         | Last page number. It will be 0 on empty initialData                             |

### `action`

| Property | Type     | Argument | Description                 |
| -------- | -------- | :------: | --------------------------- |
| next     | Function |    -     | Change to the next page     |
| previous | Function |    -     | Change to the previous page |
| goTo     | Function |  number  | Change to specified page    |

## License

MIT © [itsfaqih](https://github.com/itsfaqih)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
