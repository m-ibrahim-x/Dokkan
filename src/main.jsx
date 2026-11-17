import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './app.jsx'
import ThemeProvider from "./app/providers/themeProvider.jsx";
import AuthProvider from './app/providers/authProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
      <Toaster position='top-right' richColors duration={4000} />
        <App />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
