import { use, useState } from "react"
import receiveOrder from "../../../operations/receiveOrder";
import { useAppData } from "../../../context/AppDataContext";

function ReceivePendingOrderForm ({ selectedOrder, pendingOrders, setAnyDetailModal, selectedItem }){
    const { appData, setAppData } = useAppData();
    const [isChecked, setIsChecked] = useState(false);
    const selectedOrderData = pendingOrders.find(order => order.id === selectedOrder)
    const { orderedQuantity, receivedQuantity } = selectedOrderData;
    const [userInput, setUserInput] = useState(orderedQuantity - receivedQuantity);
    const [errorMsg, setErrorMsg] = useState("");

    function handleCheckboxChange(e){
        setIsChecked(e.target.checked);
        setUserInput(orderedQuantity - receivedQuantity);
    }

    function handleInputChange(e){
        console.log(e.target.value)
        setUserInput(e.target.value);
    }


    function handleSubmit(e){
        e.preventDefault();

        const input = userInput;
        const result = receiveOrder(appData, selectedItem, selectedOrder, input);
        
        if(!result.success){
            console.log(result.error);

            if(result.error === "EMPTY_INPUT"){
                setErrorMsg("有効な数字を入力して下さい。");
            }

            if(result.error === "INVALID_QUANTITY"){
                setErrorMsg("1以上の数字を入力して下さい。");
            }

            if(result.error === "INSUFFICIENT_QUANTITY"){
                setErrorMsg("注文数を超えています。");
            }

            return;
        }

        setAppData(result.data);
        setAnyDetailModal(null);
    }

    return (
        <form 
            onSubmit={e => handleSubmit(e)} 
            noValidate
        >
            <fieldset>
                <legend>オーダー受取</legend>

                <input
                    type="checkbox"
                    id="is-partial-receive"
                    checked={isChecked}
                    onChange={handleCheckboxChange}              
                />
                <label htmlFor="is-partial-receive">一部受取</label>
                    
                {isChecked && (
                    <div>
                    <p>未受取数: {orderedQuantity - receivedQuantity}</p>

                    <label htmlFor="received-quantity">受取数</label>
                    <input
                        type="number"
                        max={orderedQuantity - receivedQuantity}
                        min="1"
                        id="received-quantity"
                        value={userInput}
                        required
                        onChange={e => handleInputChange(e)}
                    />
                    </div>
                    )}

                    {errorMsg && (
                        <p className="error-message">{errorMsg}</p>
                    )}

                    <button
                        type="submit"
                    >登録</button>

                    <button
                        type="button"
                        onClick={() => {
                            setIsChecked(false)
                            setAnyDetailModal(null)
                        }}
                    >閉じる
                    </button>
            </fieldset>
        </form>
    )
}

export default ReceivePendingOrderForm;