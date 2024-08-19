import { render } from 'preact'
import Header from './components/Header'
import Workspace from './components/Workspace'
import './css/index.scss'

function App() {

    return (
        <>  
            <Header />
            <Workspace />
        </>
    )
}

render(<App />, document.getElementById('app'));
