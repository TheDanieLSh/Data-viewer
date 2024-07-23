import { dataSignal } from '../store.js'
import { useState } from 'preact/hooks'
import '../css/LinkField.scss'

export default function LinkField() {
    const [loading, setLoading] = useState(false);

    const dataLoad = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const link = formData.get('dataLink');

        setLoading(true);

        if (dataSignal.value) dataSignal.value = {};

        await fetch('http://localhost:4090/file_process', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: link,
        }).then(resp => resp.json()).then(json => dataSignal.value = json);

        setLoading(false);
    }

    return (
        <div className="link-field">
            <form onSubmit={(e) => dataLoad(e)}>
                <label>Вставьте ссылку на файл:</label>
                <br />
                <input type="text" name="dataLink" />
                <button>Загрузить</button>
            </form>
            {loading && <div className='link-field__load-animation'></div>}
        </div>
    )
}
