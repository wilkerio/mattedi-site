import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/newsreader/opsz.css';
import '@fontsource-variable/newsreader/opsz-italic.css';
import '@fontsource-variable/instrument-sans';
import './styles.css';
import App from './App';
import { CartProvider } from './components/cart';

createRoot(document.getElementById('root')!).render(<StrictMode><CartProvider><App /></CartProvider></StrictMode>);
