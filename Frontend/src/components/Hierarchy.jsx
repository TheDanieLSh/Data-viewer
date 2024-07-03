export default function Hierarchy({ data }) {
    const level = Object.keys(data).map(obj => obj);

    return (
        <div className="hierarchy">
            {level.map(item => (
                <div className="hierarchy__item">{item}</div>
            ))}
        </div>
    )
}