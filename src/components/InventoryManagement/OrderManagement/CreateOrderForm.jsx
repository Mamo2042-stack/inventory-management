import { useAppData } from "../../../context/AppDataContext";
import { useState } from "react";
import createOrder from "../../../operations/createOrder";
import "./CreateOrderForm.css"

function CreateOrderForm ({ storageUnit, setAnyDetailModal, selectedItem }){
    const [userInput, setUserInput] = useState("1");
    const [errorMsg, setErrorMsg] = useState("");
    const { appData, setAppData } = useAppData();

    function handleChange(e){
        setUserInput(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();

        const result = createOrder( appData, selectedItem, userInput);

        if(!result.success){
            console.log(result.error);
            if(result.error === "EMPTY_INPUT"){
                setErrorMsg("有効な数字を入力して下さい。");
            }

            if(result.error === "INVALID_QUANTITY"){
                setErrorMsg("一度に注文できる数は1~100です。")
            }
            return;
        }

        setAppData(result.data);
        setAnyDetailModal(null);
    }

    return (
        <div className="create-order-panel">
            <h5>新規注文</h5>

            <form 
                className="new-order-form"
                onSubmit={e => handleSubmit(e)}
                noValidate
            >
                <div className="new-quantity">
                    <label htmlFor="order-quantity">数量:</label>
                    <input
                        type="number"
                        min="1"
                        max="100"
                        id="order-quantity"
                        value={userInput}
                        required
                        onChange={e => handleChange(e)}
                    />
                    <p>{storageUnit}</p>
                

                    {errorMsg && (
                        <p className="error-msg">{errorMsg}</p>
                    )}
                </div>

                <button
                    type="submit"
                >確定</button>
            </form>

            <button
                type="button"
                className="close-create-order-button"
                onClick={() => {
                    setAnyDetailModal(null)
                }}
            >✕
            </button>
        </div>
    )
}

export default CreateOrderForm;