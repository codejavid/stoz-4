import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChangenameProvider } from './context/ChangenameContext.jsx'
import { ChangeemailProvider } from './context/ChangeemailContext.jsx'


createRoot(document.getElementById('root')).render(
  <ChangenameProvider>
    <ChangeemailProvider>
      <App />
    </ChangeemailProvider>
  </ChangenameProvider>,
)
