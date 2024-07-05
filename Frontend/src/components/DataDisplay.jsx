import { dataSignal } from '../store.js'
import '../css/DataDisplay.scss'

export default function DataDisplay() {
    
    return (
        <pre className="data-display">
            {JSON.stringify(dataSignal.value, null, 3)}
        </pre>
    )
}