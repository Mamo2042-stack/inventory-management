

function ItemCard ({ item, onSelect}) {
    return (
        <>
            <button className="item-card">
                <h3>{item.name}</h3>
                <hr></hr>
                <p>在庫数</p>
                <p>最終アクティビティ</p>
            </button>
        </>
    )
}

export default ItemCard;