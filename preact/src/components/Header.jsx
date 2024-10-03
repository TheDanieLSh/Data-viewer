import { dataSignal, nestedSignal, filteredSignal, totalSignal } from '../store.js'
import { useState, useEffect } from 'preact/hooks'
import '../css/Header.scss'

export default function Header() {
    const [loading, setLoading] = useState(false);

    const targetBackend = window.location.host.includes('localhost') ? 'http://localhost' : 'https://data-viewer.art3d.ru';

    const dataLoad = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const link = formData.get('dataLink');

        setLoading(true);

        if (dataSignal.value) dataSignal.value = {};

        await fetch(`${targetBackend}:4090/file_process`, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: link,
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error();
            }
        })
            .then(json => dataSignal.value = json)
            .catch(err => alert(err));

        setLoading(false);
    }

    useEffect(() => {
        if (filteredSignal.value) {
            totalSignal.value = filteredSignal.value.length;

        } else {
            totalSignal.value = nestedSignal.value.length;
        }
    }, [nestedSignal.value, filteredSignal.value]);


    const dndCover = document.querySelector('.dnd-cover');
    let isDragging = false;

    const dragOverHandle = (e) => {
        e.preventDefault();

        if (!isDragging) {
            isDragging = true;
            dndCover.style.display = 'block';
        }
    }
    const dragLeaveHandle = (e) => {
        e.preventDefault();

        if (e.clientX === 0 && e.clientY === 0) {
            isDragging = false;
            dndCover.style.display = 'none';
        }
    }
    const dropHandle = () => {

    }

    useEffect(() => {
        window.addEventListener('dragover', dragOverHandle);
        window.addEventListener('dragleave', dragLeaveHandle);
        window.addEventListener('drop', dropHandle);
    })

    return (
        <div className='header'>
            <div className='dnd-cover'></div>
            <div className="link-field">
                <form onSubmit={(e) => dataLoad(e)}>
                    <label>Вставьте ссылку на файл:</label>
                    <br />
                    <input type="text" name="dataLink" />
                    <button>Загрузить</button>
                </form>
                {loading && <div className='link-field__load-animation'></div>}
            </div>
            <div className='total-count'>{totalSignal.value}</div>
        </div>
    )
}
