function DeleteItemCard({item, setSelectedItem, setViewMode }){
    function handleClick (){
        setSelectedItem(item.id);
        setViewMode("confirmation")
    }  

    return (
        <>
        <button 
            type="button"
            onClick={handleClick}
        >
            <h3>{item.name}</h3>
            <p>在庫数:{item.quantity}</p>
            <p></p> 
        </button>
        </>
    )
}

export default DeleteItemCard;