import { dataSignal, historySignal, filteredSignal } from '../store.js'
import '../css/Hierarchy.scss'

export default function Hierarchy() {
    const data = dataSignal.value;
    const history = historySignal.value;
    const filteredJson = filteredSignal.value;

    const nesting = (history.reduce((acc, cur) => acc + '.' + cur, ''));
    filteredSignal.value = (history.length > 0) ? stringToPath(data, nesting) : data;
    const curLvl = levelParse(filteredJson);

    function levelParse(lvl) {
        let result = [];

        if (Array.isArray(lvl)) {
            result = lvl.map((val, i) => i);
            // lvl.forEach((val, i) => {
            //     if (typeof val === 'object') {
            //         result.push('{...}');
            //     } else {
            //         result.push(val);
            //     }
            // })
        } else {
            result = Object.keys(lvl).map(key => key);
        }

        return result
    }

    function stringToPath(obj, path) {
        path = path.replace(/^\.+/, ''); //очистка от пустого элемента из-за точки в начале строки
        return path.split('.').reduce((acc, cur) => acc[cur], obj);
    }

    return (
        <div className="hierarchy">
            {curLvl.map(item => (
                <div
                    className="hierarchy__item"
                    onClick={(e) => {
                        historySignal.value = [...historySignal.value, e.target.innerHTML];
                    }}
                >
                    {item}
                    {/* {typeof item === 'number' ? `[${item}]` : item} */}
                </div>
            ))}
        </div>
    )
}
// https://lidgroup.ru/local/cron/new_import/xml_files/last/defanspremium.xml
// https://a.fsk.ru/api/flats/flats-vladivostok
