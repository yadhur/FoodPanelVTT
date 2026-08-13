import { useState } from 'react'
import { MainRoutes } from './routes'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <>
     <BrowserRouter>
      <MainRoutes/>
      <Toaster />

     </BrowserRouter>
    </>
  )
}

export default App
