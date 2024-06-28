export default function LinkField() {
    const dataLoad = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const link = formData.get('dataLink');

        fetch('http://localhost:4090/process_file', {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: link,
        })
    }

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
