import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Local from './pages/local';
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={ store }>
          <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
