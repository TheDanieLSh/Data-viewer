import { dataSignal, historySignal } from '../store.js'
import '../css/Hierarchy.scss'

export default function Hierarchy() {
    const data = dataSignal.value;
    const history = historySignal.value;

    const nesting = (history.reduce((acc, cur) => acc + '.' + cur, ''));
    const json = (history.length > 0) ? stringToPath(data, nesting) : data;
    const curLvl = levelParse(json);

    function levelParse(lvl) {
        let result = [];
    
        if (Array.isArray(lvl)) {
            result = lvl.values.map(val => val);
            result.forEach(el => {
                if (typeof el === 'object') {
    
                }
            });
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
                </div>
            ))}
        </div>
    )  
}
