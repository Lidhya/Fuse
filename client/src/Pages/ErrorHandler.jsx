import * as React from 'react'
import ReactDOM from 'react-dom'


function ErrorHandler({error}) {
  return (
    <div role="alert">
      <p>An error occurred:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export default ErrorHandler