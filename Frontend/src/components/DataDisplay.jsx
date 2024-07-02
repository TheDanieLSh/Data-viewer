export default function DataDisplay({ data }) {
    
    return (
        <pre className="data-display">
            {JSON.stringify(data, null, '\t')}
        </pre>
    )
}