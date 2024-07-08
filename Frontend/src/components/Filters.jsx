import { filteredSignal } from '../store'
import '../css/Filters.scss'

export default function Filters() {
    const filtersObj = {};

    if (Array.isArray(filteredSignal.value)) {
        filteredSignal.value.forEach(el => {
            if (typeof el === 'object') {
                Object.keys(el).forEach(key => {
                    if (!filtersObj[key]) filtersObj[key] = new Set();
                    filtersObj[key].add(el[key]);
                })
            }
        });
    }

    return (
        <div className="filters">
            {Object.keys(filtersObj).map(key => (
                <div className="property">
                    <div className="property__name">{key + ':'}</div>
                    <div className="property__values">
                        {[...filtersObj[key]].map(val => {
                            if (typeof val === 'string' || typeof val === 'number')
                                return val + '; '
                        })}
                    </div>
                    {}
                </div>
            ))}
        </div>
    )
}
