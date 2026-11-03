import { useState } from "react"
import receiveOrder from "../../../operations/receiveOrder";
import { useAppData } from "../../../context/useAppData";
import { isValidQuantity } from "../../../utils/isValidQuantity";

function ReceivePendingOrderForm ({ order, setIsReceiving, selectedItem }){
    const { appData, setAppData } = useAppData();
    const [isChecked, setIsChecked] = useState(false);
    const { orderedQuantity, receivedQuantity } = order;
    const [userInput, setUserInput] = useState(String((orderedQuantity - receivedQuantity) / 10));
    const [errorMsg, setErrorMsg] = useState("");
    const [isDisabled , setIsDisabled] = useState(false);

    function handleCheckboxChange(e){
        setIsChecked(e.target.checked);
        setUserInput(String((orderedQuantity - receivedQuantity) / 10));
        setErrorMsg("");
    }

    function handleInputChange(e){

        setErrorMsg("");

        const value = e.target.value;
        setUserInput(value);

        if(!isValidQuantity(value)){
            setIsDisabled(true);
        } else if(Number(value) === 0){
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }


    function handleSubmit(e){
        e.preventDefault();

        const input = userInput;
        const result = receiveOrder(appData, selectedItem, order.id, input);
        
        if(!result.success){
            console.error(result.error);

            if(result.error === "INSUFFICIENT_QUANTITY"){
                setErrorMsg("注文数を超えています。");
            }

            if(result.error === "INSUFFICIENT_SPACE_IN_STORAGE"){
                setErrorMsg("ストレージに十分な空きがありません。");
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
                        className="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}              
                    />
                    <label htmlFor="is-partial-receive">一部受取</label>
                
                    {isChecked && (
                        <div>
                            <p>未受取数: {(orderedQuantity - receivedQuantity) / 10}</p>

                            <div className="user-input-for-receipt">
                                <div>
                                <label htmlFor="received-quantity">受取数: </label>
                                <input
                                    type="number"
                                    max={(orderedQuantity - receivedQuantity) / 10}
                                    min="1"
                                    id="received-quantity"
                                    className="form-input"
                                    value={userInput}
                                    required
                                    onChange={e => handleInputChange(e)}
                                    />
                                </div>

                            </div>
                        </div>
                    )}    
                </div>

                {isDisabled && (
                    <p className="error-message">(1~注文数、小数点第1位まで)を入力して下さい。</p>
                )}

                {errorMsg && (
                    <p className="error-message">{errorMsg}</p>
                )}
                
                <button
                    type="submit"
                    className="receipt-button clickable-button"
                    disabled={isDisabled}
                >{!isChecked ? "全て受取" : "登録"}
                </button>
            </fieldset>
        </form>
    )
}

export default ReceivePendingOrderForm;