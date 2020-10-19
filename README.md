# usepagination

> Simple pagination hooks for react

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

## License

MIT © [itsfaqih](https://github.com/itsfaqih)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
