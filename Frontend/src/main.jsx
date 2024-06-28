import { render } from 'preact'
import LinkField from './components/LinkField'
import './css/index.scss'

function App() {
    return (
        <>
            <LinkField />
        </>
    )
}

render(<App />, document.getElementById('app'));
