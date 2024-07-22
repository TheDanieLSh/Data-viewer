import DataDisplay from "./DataDisplay"
import DataFilter from "./DataFilter"
import '../css/Workspace.scss'

export default function Workspace() {

    return (
        <div className="workspace">
            <DataFilter />
            <DataDisplay />
        </div>
    )
}
