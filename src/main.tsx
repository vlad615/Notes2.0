import { StrictMode } from 'react'
import { App } from './app/App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store'
import ReactDOM from 'react-dom/client'
import { AppHttpRequests } from './app/AppHttpRequests.tsx'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Provider store={store}>
        <StrictMode>
            {/* <App /> */}
            <AppHttpRequests />
        </StrictMode>
    </Provider>,
)
