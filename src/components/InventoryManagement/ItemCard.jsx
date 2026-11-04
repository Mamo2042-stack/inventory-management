import formatDateTime from "../../utils/formatDateTime";
import calUpcomingQuantity from "../../utils/calUpcomingQuan";
import "./ItemCard.css"
import { RotateCwClock, CircleAlert} from "lucide-react";

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


                {isLowStock ? (
                        <div className="low-stock-indicator">
                            <CircleAlert className="low-stock-icon low-stock-icon--desktop"/>
                            <CircleAlert className="low-stock-icon low-stock-icon--mobile" size={15}/>
                            <p className="low-stock-message">low-stock</p>
                        </div>
                    ) :
                    (
                        <div></div>
                    )
                }

                {hasHistory ? (
                    <div className="last-history-container">
                        <RotateCwClock className="last-history-icon" size={15}/>
                        <p className="last-history">{lastUpdateDate}</p>
                    </div>
                ) :
                (
                    <div></div>
                )
                }
                
            </div>

            <div className="main-content">
                <p className="current-quantity-display">
                    <span className="quantity-without-orders">
                        <span className="title">在庫数:</span>
                        <span className="current-quantity"> {item.quantity / 10} </span>
                        {item.storageUnit}
                    </span>
                    {upcomingQuantity ?  
                    <span className="additional-info"> + 注文済: {upcomingQuantity / 10}{item.storageUnit}</span>
                    :
                    ""                  
                    }
                </p>
                
                <p className="expected-quantity">
                    {item.expectedQuantity ? 
                        <span>
                            <span className="first-line">最低在庫数: </span>
                            <span className="second-line">{item.expectedQuantity / 10} {item.storageUnit}</span>
                        </span>
                        :
                        ""
                    }
                </p>
             </div>
        </button>
        </>
    )
}

export default ItemCard;