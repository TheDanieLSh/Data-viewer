import { nestedSignal, filteredSignal, historySignal } from '../store.js'
import '../css/DataDisplay.scss'
import { useEffect } from 'preact/hooks';

export default function DataDisplay() {
    const nested = nestedSignal.value;
    const filtered = filteredSignal.value;

    useEffect(() => {
        filteredSignal.value = null;
    }, [historySignal.value])

    return (
        <pre className="data-display">
            {/* {JSON.stringify(Object.keys(filtered).length > 0 ? filtered : nested, null, 3)} */}
            {JSON.stringify(filtered ?? nested, null, 3)}
        </pre>
    )
}