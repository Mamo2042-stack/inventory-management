import { useAppData } from "../../../context/AppDataContext";
import { useState } from "react";
import createOrder from "../../../operations/createOrder";

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
        <div className="create-order-form">
            <h5>新規注文</h5>

            <form 
                id="new-order-creation"
                onSubmit={e => handleSubmit(e)}
                noValidate
            >
                <label htmlFor="order-quantity">数量</label>
                <input
                    type="number"
                    min="1"
                    max="100"
                    id="order-quantity"
                    value={userInput}
                    required
                    onChange={e => handleChange(e)}
                />
                <p> {storageUnit}</p>

                {errorMsg && (
                    <p>{errorMsg}</p>
                )}

                <button
                    type="submit"
                >登録</button>
            </form>

            <button
                type="button"
                onClick={() => {
                    setAnyDetailModal(null)
                }}
            >戻る
            </button>
        </div>
    )
}

export default CreateOrderForm;