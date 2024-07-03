import DataDisplay from "./DataDisplay"
import DataFilter from "./DataFilter"
import '../css/Workspace.scss'

export default function Workspace({ data, setData }) {

    return (
        <div className="workspace">
            <DataFilter data={data} />
            <DataDisplay data={data} />
        </div>
    )
}