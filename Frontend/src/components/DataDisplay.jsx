import '../css/DataDisplay.scss'

export default function DataDisplay({ data }) {
    
    return (
        <pre className="data-display">
            {JSON.stringify(data, null, 3)}
        </pre>
    )
}