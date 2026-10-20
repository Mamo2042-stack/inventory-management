import formatDateTime from "../../utils/formatDateTime";
import calUpcomingQuantity from "../../utils/calUpcomingQuan";

function ItemCard ({ item, setSelectedItem, setInventoryView, history }) {
    function handleClick (){
        setSelectedItem(item.id);
        setInventoryView("item")
    }  

    const hasHistory = history.some(history => history.itemId === item.id);
    let lastUpdateDate;

    if(hasHistory){
        const relatedHistory = history.filter(history => history.itemId === item.id);
        lastUpdateDate = formatDateTime(relatedHistory[relatedHistory.length - 1].timestamp);
    }

    const upcomingQuantity = calUpcomingQuantity(item);
    const isLowStock = item.expectedQuantity > item.quantity + upcomingQuantity;

    return (
        <>
        <button 
            onClick={handleClick}
            className={isLowStock ? "item-card item-card--low-stock" : "item-card"}
        >
            <h3>{item.name}</h3>
            <p>
                在庫数:{item.quantity}{item.storageUnit}
                {upcomingQuantity ? ` + (注文済み: ${upcomingQuantity}${item.storageUnit})` : ""}
            </p>

            {item.expectedQuantity && (
                <p>最低在庫数:{item.expectedQuantity}{item.storageUnit}</p>
            )}

            {isLowStock && (
                <p>再入荷</p>
            )}

            {hasHistory && (
                <p>最終更新:{lastUpdateDate}</p>
            )}
        </button>
        </>
    )
}

export default ItemCard;