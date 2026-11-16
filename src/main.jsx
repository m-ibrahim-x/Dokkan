import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './app.jsx'
import ThemeProvider from "./app/providers/themeProviders.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster position='top-right' richColors duration={4000} />
        <App />
    </ThemeProvider>
  </StrictMode>,
)
