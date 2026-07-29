  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import { SignUpPage } from './Pages/SignUpPage'

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <SignUpPage/>
    </StrictMode>,
  )
