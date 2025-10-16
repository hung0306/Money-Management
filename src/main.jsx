  import { StrictMode } from 'react';
  import { createRoot } from 'react-dom/client';
  import App from './App.jsx';

  // Bootstrap CSS dan JS
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap/dist/js/bootstrap.bundle.min.js';

  import 'aos/dist/aos.css';
  import AOS from 'aos';

  // Boxicons
  import 'boxicons/css/boxicons.min.css';

  AOS.init(); 

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
