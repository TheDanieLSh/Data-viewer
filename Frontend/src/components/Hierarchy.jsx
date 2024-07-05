import { dataSignal } from '../store.js'
import { useState } from 'preact/hooks'
import '../css/Hierarchy.scss'

let levelHistory = [];

export default function Hierarchy() {
    const [curLvl, setCurLvl] = useState('root');

    let json = dataSignal.value;

    if (curLvl !== 'root') {
        let nesting = (levelHistory.reduce((acc, cur) => acc + '.' + cur, ''));
        nesting += '.' + curLvl;
        json = stringToPath(dataSignal.value, nesting);
    }

    const firstLevel = levelParse(json);

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
    
    function goTo(e) {
        if (curLvl !== 'root') {
            levelHistory.push(curLvl);
        }
        setCurLvl(e.target.innerHTML);
    }
    
    function stringToPath(obj, path) {
        path = path.replace(/^\.+/, ''); //очистка от пустого элемента из-за точки в начале строки
        return path.split('.').reduce((acc, cur) => acc[cur], obj);
    }

    return (
        <div className="hierarchy">
            {firstLevel.map(item => (
                <div onClick={(e) => {goTo(e)}} className="hierarchy__item">{item}</div>
            ))}
        </div>
    )  
}
