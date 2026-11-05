function DeleteItemCard({ item, setSelectedItem, setIsModalOpen }){
    function handleClick (){
        setSelectedItem(item.id);
        setIsModalOpen(true);
    }  

    const className = [
        "item-card",
        "clickable-button",
        item.category === "meat" ? "item-card--meat" :
        item.category === "seafood" ? "item-card--seafood":
        item.category === "vegetable" ? "item-card--vegetable":
        item.category === "tenshin" ? "item-card--tenshin":
        item.category === "drink" ? "item-card--drink":
        item.category === "seasoning" ? "item-card--seasoning":
        "item-card--others"
    ].filter(Boolean).join(" ");

    const hasPendingOrder = item.pendingOrders?.length > 0;

    return (
        <>
        <button 
            type="button"
            className={className}
            onClick={handleClick}
        >
            <h3>{item.name}</h3>
            <p>在庫数:{item.quantity / 10}</p>
            
            {hasPendingOrder && (
                <p>未受取注文あり</p>
            )}
        </button>
        </>
    )
}

export default DeleteItemCard;