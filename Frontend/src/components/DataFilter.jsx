import Hierarchy from './Hierarchy'
import Filters from './Filters'
import '../css/DataFilter.scss'

export default function DataFilter({ data }) {

    return (
        <div className='data-filter'>
            <div className='data-filter__section'>
                <div className='data-filter__header'>
                    Выбор вложенности
                </div>
                <Hierarchy data={data} />
            </div>
            <div className='data-filter__section'>
                <div className='data-filter__header'>
                    Фильтрация
                </div>
                <Filters />
            </div>
        </div>
    )
}
