import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './redux/store/store.js'
import { Bounce, ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <ToastContainer
          position="top-right"
          autoClose={2000}
          newestOnTop={false}
          rtl={false}
          pauseOnHover={false}
          theme="light"
          transition={Bounce}
        />
      <App />
    </Provider>
  </StrictMode>,
)
