import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux'
// import { Elements } from "@stripe/react-stripe-js";
import store, { persistor } from './redux/store/store.ts'
import './index.css'
import App from './App.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={'692858338119-q4hri7ic6ca9jk0v8qhj265nicnuttkc.apps.googleusercontent.com'}  >

      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor} >
            <BrowserRouter>
              <App />
              <Toaster />
            </BrowserRouter>

          </PersistGate>
        </Provider>
      </QueryClientProvider>

    </GoogleOAuthProvider>

  </StrictMode>,
)
