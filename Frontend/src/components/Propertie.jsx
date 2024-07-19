import { useEffect, useRef, useState } from 'preact/hooks'
import { filteredSignal, nestedSignal } from '../store'

export default function Propertie({ name, values, chosenValues }) {
    const propertyRef = useRef(null);
    const valuesRef = useRef(null);
    const [overflow, setOverflow] = useState('');
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        if (valuesRef.current) {
            if (expanded) {
                setOverflow('^');
            } else {
                setOverflow(valuesRef.current.scrollWidth > valuesRef.current.clientWidth ? '...' : '');
            }
        }
    }, [values]);

    const toggleValue = (e) => {
        if (!chosenValues[name]) chosenValues[name] = new Set();

        if (!chosenValues[name].has(e.target.innerHTML)) {
            chosenValues[name].add(e.target.innerHTML);
        } else {
            chosenValues[name].delete(e.target.innerHTML);
            if (chosenValues[name].size == 0) delete chosenValues[name];
        }

        e.target.classList.toggle('isActive');

        resultFilter();
    }

    const expandPropertie = () => {
        if (!expanded) {
            setOverflow('^');
            setExpanded(true);
        } else {
            setOverflow('...');
            setExpanded(false);
            window.scrollTo({
                top: propertyRef.current.offsetTop - 50,
                behavior: 'smooth',
            });
        }
    }

    return (
        <div className={'property ' + (expanded && 'expanded')} ref={propertyRef}>
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
            <div className='property__expand' onClick={(e) => {expandPropertie()}}>{overflow}</div>
        </div>
    )

    function resultFilter() {
        filteredSignal.value = nestedSignal.value.filter(obj => {
            return Object.keys(obj).every(prop => {
                if (chosenValues[prop]) {
                    return chosenValues[prop].has(obj[prop]);
                }
                return true
            })
        });
    }
}
