import { useAppData } from "../../../context/useAppData";
import formatDateTime from "../../../utils/formatDateTime";

function InventoryHistoryList({ selectedItem }){
    const { appData } = useAppData();
    const allHistory = appData.inventoryHistory.filter(history => history.itemId === selectedItem);
    const sortedHistory = [...allHistory].sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)) ?? [];
    const actions = {
        "INCREASE_QUANTITY" : "在庫の更新(増やす)",
        "DECREASE_QUANTITY": "在庫の更新(減らす)",
        "RECEIVE_FULL_ORDER": "注文の受取",
        "RECEIVE_PARTIAL_ORDER": "注文の受取(一部)"
    }

    return (
        <div className="history-container">
            {sortedHistory.length > 0 ? 
                sortedHistory.map(history => {
                    const date = formatDateTime(history.timestamp);
                    const message = actions[history.userAction];

                    return (
                        <div key={history.id} className="individual-history">
                            <h4>
                                <span className="first-line">{date} :</span>
                                <span className="second-line"> {message}</span>
                            </h4>
                            
                            <h5>在庫変動</h5>
                            <p>{history.previousQuantity / 10}  → {history.newQuantity / 10}</p>
                        </div>
                    )
                })
                :
                (
                    <p>履歴なし</p>
                )
                }
        </div>
    )
}

export default InventoryHistoryList;