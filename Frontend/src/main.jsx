import { render } from 'preact'
import { useState } from 'preact/hooks'
import './css/index.scss'
import LinkField from './components/LinkField'
import Workspace from './components/Workspace'

function App() {
    const [data, setData] = useState({});

    return (
        <>  
            <LinkField data={data} setData={setData} />
            <Workspace data={data} setData={setData} />
        </>
    )
}

render(<App />, document.getElementById('app'));
