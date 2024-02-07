import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './Context/AuthProvider.jsx'

import {BrowserRouter,Routes,Route} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path = "/*" element = {<App/>}></Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)


// /* is a wildacard path that matches any path
