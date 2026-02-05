import { createRoot } from 'react-dom/client'
import { ToastContainer, Bounce } from 'react-toastify'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <>
        <App />
        <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="dark"
            transition={Bounce}
        />
    </>
)
