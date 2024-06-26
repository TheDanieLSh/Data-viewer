export default function LinkField() {
    const dataLoad = (e) => {
        e.preventDefault();
        const link = e.target.get('dataLink')
        console.log(link);
    }

    return (
        <div className="link-field">
            <form onSubmit={(e) => dataLoad(e)}>
                <label>Вставьте ссылку на файл:</label>
                <br />
                <input type="text" name="dataLink" />
                <button>Загрузить</button>
            </form>
        </div>
    )
}
