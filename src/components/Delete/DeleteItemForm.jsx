import { useAppData } from "../../context/AppDataContext"
import deleteItem from "../../operations/deleteItem";

function DeleteItemForm({itemId, setViewMode, setSuccessMsg}){
    const { appData, setAppData } = useAppData();
    const selectedItem = appData.items.find(item => item.id === itemId);
    const itemData = {
        hasStock: selectedItem.quantity > 0 ? true : false,
        hasPending: selectedItem.pendingOrders?.length > 0 ? true : false,
    }

    function handleConfirmClick(){
        const result = deleteItem(appData, itemId);

        if(!result.success){
            console.log(result.error);
            return;
        }

        setAppData(result.data);
        setViewMode("item-list");
        setSuccessMsg("SUCCEED");
    }

    return (
        <section>
            <h3>本当に削除しますか？</h3>

            {itemData.hasStock && (
                <p>在庫が残っています。</p>
            )}

            {itemData.hasPending && (
                <p>未受取の注文があります。</p>
            )}

            <button
                type="button"
                onClick={() => setViewMode("item-list")}
            >戻る
            </button>

            <button
                type="submit"
                onClick={handleConfirmClick}
            >確定
            </button>
        </section>
    )
}

export default DeleteItemForm;