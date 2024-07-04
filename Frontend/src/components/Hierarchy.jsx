import { useState } from 'preact/hooks'
import '../css/Hierarchy.scss'

let levelHistory = [];

export default function Hierarchy({ data }) {
    const [curLvl, setCurLvl] = useState('root');

    let json = data;

    // console.log(levelHistory);

    if (curLvl !== 'root') {
        let nesting = (levelHistory.reduce((acc, cur) => acc + '.' + cur, ''));
        console.log(nesting);
        nesting += '.' + curLvl;
        console.log(nesting);
        json = stringToPath(data, nesting);
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