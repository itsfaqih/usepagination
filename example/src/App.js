import React from 'react'

import { useMyHook } from 'usepagination'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
