import { useState } from 'preact/hooks'
import '../css/Hierarchy.scss'

let levelHistory = [];

export default function Hierarchy({ data }) {
    const [curLvl, setCurLvl] = useState(null);

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
        console.log(e.target.innerHTML);
    }

    const firstLevel = levelParse(data);

    return (
        <div className="hierarchy">
            {firstLevel.map(item => (
                <div onClick={(e) => {goTo(e)}} className="hierarchy__item">{item}</div>
            ))}
        </div>
    )  
}