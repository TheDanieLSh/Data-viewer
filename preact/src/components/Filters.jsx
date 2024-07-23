import { nestedSignal } from '../store'
import Propertie from './Propertie'
import '../css/Filters.scss'

const chosenValues = {};

export default function Filters() {
    const filtersObj = {};

    if (Array.isArray(nestedSignal.value)) {
        nestedSignal.value.forEach(el => {
            if (typeof el === 'object') {
                for (const key in el) {
                    if (!filtersObj[key]) filtersObj[key] = new Set();
                    filtersObj[key].add(el[key]);
                }
            }
        });
    }

    return (
        <div className='filters'>
            {Object.keys(filtersObj).map(key => (
                <Propertie name={key} values={[...filtersObj[key]]} chosenValues={chosenValues} />
            ))}
        </div>
    )
}
