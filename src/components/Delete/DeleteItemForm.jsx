import { useAppData } from "../../context/AppDataContext"
import { useState } from "react";
import deleteItem from "../../operations/deleteItem";
import { useNavigate } from "react-router";

function DeleteItemForm({ itemId, isModalOpen, setIsModalOpen }){
    const { appData, setAppData } = useAppData();
    const [hasSucceeded, setHasSucceeded] = useState(false);
    const navigate = useNavigate();

    // when no items are selelcted //
    if(!itemId){
        return (
            <div className="confirmation-modal"></div>
        );
    }

    const selectedItem = appData.items.find(item => item.id === itemId);
    const itemData = {
        hasStock: selectedItem?.quantity > 0 ? true : false,
        hasPending: selectedItem?.pendingOrders?.length > 0 ? true : false,
    }

    function handleConfirmClick(){
        const result = deleteItem(appData, itemId);

        if(!result.success){
            console.log(result.error);
            return;
        }

        setAppData(result.data);
        setHasSucceeded(true);
    }

    return (
        <div className={`confirmation-modal ${isModalOpen ? "is-open" : ""}`}>
            {itemId && !hasSucceeded && (
                <div className="confirmation-section">
                    <p className="confirmation-message">本当に削除しますか？</p>

                    <div>
                    {itemData.hasStock && (
                        <p>在庫が残っています。</p>
                    )}

                    {itemData.hasPending && (
                        <p>未受取の注文があります。</p>
                    )}

                    <button
                        type="button"
                        onClick={handleConfirmClick}
                    >確定
                    </button>
                    </div>

                    <button
                        type="button"
                        className="back-to-previous-button"
                        onClick={() => setIsModalOpen(false)}
                    >⬅︎
                    </button>
                </div>
            )}

            {itemId && hasSucceeded && (
                <div className="success-section">
                    <p>食材が削除されました。</p>

                    <button
                        type="button"
                        className="back-to-previous-button"
                        onClick={() => navigate("/")}    
                    >ホームに戻る
                    </button>
                </div>  
            )}
        </div>
    )
}

export default DeleteItemForm;