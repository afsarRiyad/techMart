import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import App from '@/App'
import { Provider } from 'react-redux'
import { store } from '@/app/store'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <>
  <QueryClientProvider client={queryClient}>
  <BrowserRouter>
  {/* one Toaster for the whole app, pages must not render their own.
      It lives inside the router so a toast can hold a <Link> */}
  <Toaster
    position='top-right'
    toastOptions={{
      className: 'appToast',
      duration: 4000,
      error: { duration: 5000 },
    }}
  />
  <Provider store={store}>
  <StrictMode>
    <App />
  </StrictMode>
  </Provider>
  </BrowserRouter>
  </QueryClientProvider>
  </>
)
