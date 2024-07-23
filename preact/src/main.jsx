import { render } from 'preact'
import LinkField from './components/LinkField'
import Workspace from './components/Workspace'
import './css/index.scss'

function App() {

    return (
        <>  
            <LinkField />
            <Workspace />
        </>
    )
}

render(<App />, document.getElementById('app'));
