import { useEffect, useRef, useState } from 'preact/hooks'
import { filteredSignal, nestedSignal } from '../store'

export default function Propertie({ name, values, chosenValues }) {
    const propertyRef = useRef(null);
    const valuesRef = useRef(null);
    const [overflow, setOverflow] = useState('');
    const [expanded, setExpanded] = useState(false);

    const filterScroll = document.querySelector('.data-filter__scroll');
    const filterRect = filterScroll.getBoundingClientRect();

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
            if (chosenValues[name].size === 0) delete chosenValues[name];
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

            const curPropRect = propertyRef.current.getBoundingClientRect();

            filterScroll.scrollTo({
                top: (curPropRect.top - filterRect.top) + filterScroll.scrollTop,
                behavior: 'smooth',
            });
        }
    }

    useEffect(() => {

        const propertyExpand = propertyRef.current.querySelector('.property__expand');

        const propertyExpand_fixation = () => {
            const valuesRect = valuesRef.current.getBoundingClientRect();

            if (valuesRect.bottom >= window.innerHeight && valuesRect.top <= window.innerHeight) {
                propertyExpand.classList.add('overflowed');
            } else {
                propertyExpand.classList.remove('overflowed');
            }
        }

        if (overflow === '^') {
            filterScroll.addEventListener('scroll', propertyExpand_fixation);
        }

        return () => filterScroll.removeEventListener('scroll', propertyExpand_fixation);
        
    }, [expanded]);

    const objValuesRestriction = {
        '{...}': false,
        '[...]': false,
    }

    return (
        <div className={'property ' + (expanded && 'expanded')} ref={propertyRef}>
            <div className='property__name'>{name + ':'}</div>
            <div className='property__values' ref={valuesRef}>
                {values.map(val => {
                    if (['string', 'number', 'boolean'].includes(typeof val)) {
                        return (
                            <>
                                <div className='property__val' onClick={(e) => { toggleValue(e) }}>{String(val)}</div>
                                <div className='property__separator'>;</div>
                            </>
                        )
                    } else if (typeof val === null) {
                        return (
                            <>
                                <div className='property__val' onClick={(e) => { toggleValue(e) }}>{'null'}</div>
                                <div className='property__separator'>;</div>
                            </>
                        )
                    } else if (typeof val === 'object') {
                        const type = Array.isArray(val) ? '[...]' : '{...}';
                        if (!objValuesRestriction[type]) {

                            objValuesRestriction[type] = true;

                            return (
                                <>
                                    <div className='property__val'>{Array.isArray(val) ? '[...]' : '{...}'}</div>
                                    <div className='property__separator'>;</div>
                                </>
                            )
                        }
                    } else {
                        return (
                            <>
                                <div className='property__val' onClick={(e) => { toggleValue(e) }}>{'!!!UNSUPPORTED DATA TYPE!!!'}</div>
                                <div className='property__separator'>;</div>
                            </>
                        )
                    }
                })}
            </div>
            <div className='property__expand' onClick={() => { expandPropertie() }}>{overflow}</div>
        </div>
    )

    function resultFilter() {
        filteredSignal.value = nestedSignal.value.filter(obj => {
            return Object.keys(obj).every(prop => {
                if (chosenValues[prop]) {
                    return chosenValues[prop].has(String(obj[prop]));
                }
                return true
            })
        });
    }
}
