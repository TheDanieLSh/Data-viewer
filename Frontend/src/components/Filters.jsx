import { filteredSignal } from '../store'
import '../css/Filters.scss'

export default function Filters() {
    const filtersObj = {};
    
    if (Array.isArray(filteredSignal.value)) {
        filteredSignal.value.forEach(el => {
            if (typeof el === 'object') {
                Object.keys(el).forEach(key => {
                    if (!filtersObj[key]) filtersObj[key] = [];
                    filtersObj[key].push(el[key]);
                })
            }
        });
    }

    return (
        <pre className="filters">
            {JSON.stringify(filtersObj, null, 1)}
        </pre>
    )
}