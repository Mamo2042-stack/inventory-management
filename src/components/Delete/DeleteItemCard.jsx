function DeleteItemCard({ item, setSelectedItem, setIsModalOpen }){
    function handleClick (){
        setSelectedItem(item.id);
        setIsModalOpen(true);
    }  

    const className = [
        "item-card",
        item.category === "meat" ? "item-card--meat" :
        item.category === "seafood" ? "item-card--seafood":
        item.category === "vegetable" ? "item-card--vegetable":
        item.category === "tenshin" ? "item-card--tenshin":
        item.category === "drink" ? "item-card--drink":
        item.category === "seasoning" ? "item-card--seasoning":
        "item-card--others"
    ].filter(Boolean).join(" ");

    return (
        <>
        <button 
            type="button"
            className={className}
            onClick={handleClick}
        >
            <h3>{item.name}</h3>
            <p>在庫数:{item.quantity / 10}</p>
        </button>
        </>
    )
}

export default DeleteItemCard;