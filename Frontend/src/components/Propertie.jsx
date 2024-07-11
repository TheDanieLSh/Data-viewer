import { useEffect, useRef, useState } from 'preact/hooks'

export default function Propertie({ name, values }) {
    const valuesRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        if (valuesRef.current) {
            setIsOverflow(valuesRef.current.scrollWidth > valuesRef.current.clientWidth);
        }
    }, [values])

    return (
        <div className='property'>
            <div className='property__name'>{name + ':'}</div>
            <div className='property__values' ref={valuesRef}>
                {values.map(val => {
                    if (['string', 'number', 'boolean'].includes(typeof val))
                        return <div className='property__val'>{val + ';'}</div>
                })}
            </div>
            {isOverflow && <div className='property__expand'>...</div>}
        </div>
    )
}