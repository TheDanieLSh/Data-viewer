import '../css/LinkField.scss'
import { useState } from 'preact/hooks'

export default function LinkField() {
    const [data, setData] = useState({});

    const dataLoad = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const link = formData.get('dataLink');

        fetch('http://localhost:4090/file_process', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: link,
        }).then(resp => resp.json()).then(json => setData(json))
    }

    console.log(data);

    return (
        <div className="link-field">
            <form onSubmit={(e) => dataLoad(e)} /* autoComplete="off"*/ >
                <label>Вставьте ссылку на файл:</label>
                <br />
                <input type="text" name="dataLink" />
                <button>Загрузить</button>
            </form>
        </div>
    )
}
