import { historySignal } from '../store'
import Hierarchy from './Hierarchy'
import Filters from './Filters'
import '../css/DataFilter.scss'

export default function DataFilter() {

    return (
        <div className='data-filter__scroll'>
            <div className='data-filter'>
                <div className='data-filter__section-hierarchy'>
                    <div className='data-filter__header'>
                        <div
                            className='back-button'
                            style={{ display: historySignal.value.length > 0 ? 'block' : 'none' }}
                            onClick={() => {
                                historySignal.value = historySignal.value.slice(0, -1);
                            }}
                        >
                            ⟵
                        </div>
                        <div>Выбор вложенности</div>
                    </div>
                    <Hierarchy />
                </div>
                <div className='data-filter__section-filters'>
                    <div className='data-filter__header'>
                        Фильтрация
                    </div>
                    <Filters />
                </div>
            </div>
        </div>
    )
}
