import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import { AppProvider } from './context/AppContext.tsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './css/components.css'
import App from './App.tsx';

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      {/* <QueryClientProvider client={queryClient}> */}
        <ToastContainer />
        <App />
      {/* </QueryClientProvider> */}
    </AppProvider>
  </React.StrictMode>
);
