import { useState } from "react"
import receiveOrder from "../../../operations/receiveOrder";
import { useAppData } from "../../../context/AppDataContext";

function ReceivePendingOrderForm ({ order, setIsReceiving, selectedItem }){
    const { appData, setAppData } = useAppData();
    const [isChecked, setIsChecked] = useState(false);
    const { orderedQuantity, receivedQuantity } = order;
    const [userInput, setUserInput] = useState(orderedQuantity - receivedQuantity);
    const [errorMsg, setErrorMsg] = useState("");

    function handleCheckboxChange(e){
        setIsChecked(e.target.checked);
        setUserInput(orderedQuantity - receivedQuantity);
        setErrorMsg("");
    }

    function handleInputChange(e){
        setUserInput(e.target.value);
    }


    function handleSubmit(e){
        e.preventDefault();

        const input = userInput;
        const result = receiveOrder(appData, selectedItem, order.id, input);
        
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
        setIsReceiving(false);
    }

    return (
        <form 
            onSubmit={e => handleSubmit(e)} 
            noValidate
        >
            <fieldset className="receipt">
                <h6>オーダー受取</h6>

                <div className="partial-receipt">
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

                            <div className="user-input-for-receipt">
                                <div>
                                <label htmlFor="received-quantity">受取数: </label>
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
                                {errorMsg && (
                                    <p className="error-message">{errorMsg}</p>
                                )}
                            </div>
                        </div>
                    )}    



                </div>
                <button
                    type="submit"
                    className="receipt-button"
                >{!isChecked ? "全て受取" : "登録"}
                </button>
            </fieldset>
        </form>
    )
}

export default ReceivePendingOrderForm;