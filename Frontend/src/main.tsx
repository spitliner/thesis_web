import React from 'react'
import ReactDOM from 'react-dom/client'
import {HelmetProvider} from 'react-helmet-async'

import App from "./App.tsx";

import './index.css'


import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import {authApi} from "@features/auth";
import {setupListeners} from "@reduxjs/toolkit/query";

// reducer store config
const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware),
})
setupListeners(store.dispatch)

// apply providers
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </HelmetProvider>

    </React.StrictMode>,
)
