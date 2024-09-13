import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import Index from './Index.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './Footer.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Footer/>
  </StrictMode>,
)
