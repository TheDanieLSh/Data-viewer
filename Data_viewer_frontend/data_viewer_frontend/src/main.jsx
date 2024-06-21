import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import LinkField from './components/LinkField'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

function App() {
    return (
        <>
            <LinkField />
        </>
    )
}
