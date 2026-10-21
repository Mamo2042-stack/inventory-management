import formatDateTime from "../../utils/formatDateTime";
import calUpcomingQuantity from "../../utils/calUpcomingQuan";
import "./ItemCard.css"

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
    const className = [
        "item-card",
        isLowStock && "item-card--low-stock",
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
            onClick={handleClick}
            className={className}
        >
            <div className="secondary-content">
                <h3 className="item-name">{item.name}</h3>

                {isLowStock && (
                <p className="low-stock--indicator">再入荷</p>
                )}

                {hasHistory && (
                    <p>最終更新:{lastUpdateDate}</p>
                )}
            </div>

            <div className="main-content">
                <p>
                    在庫数:<span className="current-quantity"> {item.quantity} </span>{item.storageUnit}
                    {upcomingQuantity ?  
                    <span className="additional-info"> + (注文済み: {upcomingQuantity}{item.storageUnit})</span> 
                    :
                    ""                  
                    }
                </p>
                {item.expectedQuantity && (
                <p>最低在庫数: {item.expectedQuantity} {item.storageUnit}</p>
                )}
             </div>
        </button>
        </>
    )
}

export default ItemCard;