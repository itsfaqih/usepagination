# usepagination

> Simple pagination hooks for react

[![NPM](https://img.shields.io/npm/v/@itsfaqih/usepagination.svg)](https://www.npmjs.com/package/@itsfaqih/usepagination)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @itsfaqih/usepagination
```

## Usage

```tsx
import React, { useState, useEffect } from 'react';
import Post from 'component/post';
import Pagination from 'component/pagination';
import usePagination from '@itsfaqih/usepagination';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { page, action } = usePagination(posts);

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {page.data.map(item => <Post.Card data={item}>)}
      </div>
      <div>
        <Pagination>
          {page.numbers.map(number => (
            <Pagination.Number number={number} onClick={() => action.goTo(number)}/>
          ))}
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
