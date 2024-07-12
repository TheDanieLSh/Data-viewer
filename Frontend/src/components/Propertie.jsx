import { useEffect, useRef, useState } from 'preact/hooks'

export default function Propertie({ name, values, chosenValues }) {
    const valuesRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        if (valuesRef.current) {
            setIsOverflow(valuesRef.current.scrollWidth > valuesRef.current.clientWidth);
        }
    }, [values])

    const toggleValue = (e) => {
        if (!chosenValues[name]) chosenValues[name] = new Set();

        if (!chosenValues[name].has(e.target.innerHTML)) {
            chosenValues[name].add(e.target.innerHTML);
        } else {
            chosenValues[name].delete(e.target.innerHTML);
            if (chosenValues[name].size == 0) delete chosenValues[name];
        }

        e.target.classList.toggle('isActive');
    }

    return (
        <div className='property'>
            <div className='property__name'>{name + ':'}</div>
            <div className='property__values' ref={valuesRef}>
                {values.map(val => {
                    if (['string', 'number', 'boolean'].includes(typeof val))
                        return (
                            <>
                                <div className='property__val' onClick={(e) => {toggleValue(e)}}>{val}</div>
                                <div className='property__separator'>;</div>
                            </>
                        )
                })}
            </div>
            {isOverflow && <div className='property__expand'>...</div>}
        </div>
    )
}