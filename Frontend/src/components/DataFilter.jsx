import Hierarchy from './Hierarchy'
import Filters from './Filters'
import '../css/DataFilter.scss'

export default function DataFilter({ data }) {

    return (
        <div className='data-filter'>
            <div className='data-filter__section'>
                <div className='data-filter__header'>
                    <div className='back-button' onClick={() => goBack()}>←</div>
                    <div>Выбор вложенности</div>
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
