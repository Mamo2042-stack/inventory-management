function ItemCard ({ item, setSelectedItem, setInventoryView}) {
    function handleClick (){
        setSelectedItem(item.id);
        setInventoryView("item")
    }  

    return (
        <>
        <button 
            onClick={handleClick}
        >
            <h3>{item.name}</h3>
            <p>在庫数:{item.quantity}</p>
            <p></p> 
        </button>
        </>
    )
}

export default ItemCard;