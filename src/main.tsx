import { StrictMode } from 'react'
import { App } from './app/App.tsx'
import { Provider } from "react-redux";
import { store } from "./app/store";
import ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>);