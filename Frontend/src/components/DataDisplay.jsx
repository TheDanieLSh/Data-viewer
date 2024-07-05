import { filteredSignal } from '../store.js'
import '../css/DataDisplay.scss'

export default function DataDisplay() {
    
    return (
        <pre className="data-display">
            {JSON.stringify(filteredSignal.value, null, 3)}
        </pre>
    )
}