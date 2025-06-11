import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // ✅ أضف هذا
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* ✅ لفّ التطبيق هنا */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
