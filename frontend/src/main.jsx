import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Modal from "react-modal";
import App from './assets/components/App';


Modal.setAppElement("#root");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
