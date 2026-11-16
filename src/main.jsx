import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './app.jsx'
import { initTheme } from './utils/theme'

initTheme()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position='top-right' richColors duration={4000} />
    <App />
  </StrictMode>,
)
