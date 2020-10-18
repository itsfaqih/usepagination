import React from 'react'

import { usePagination } from 'usepagination'

const App = () => {
  const example = usePagination()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
