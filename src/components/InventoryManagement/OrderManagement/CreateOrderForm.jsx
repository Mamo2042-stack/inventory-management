import { useAppData } from "../../../context/AppDataContext";
import { testAppData } from "../../../test/fixtures";
import { useState } from "react";
import createOrder from "../../../operations/createOrder";

function CreateOrderForm ({ storageUnit, setAnyDetailModal, selectedItem }){
    const [userInput, setUserInput] = useState("1");
    const { appData, setAppData } = useAppData();

    function handleChange(e){
        setUserInput(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();

        const result = createOrder( appData, selectedItem, userInput);

        if(!result.success){
            console.log(result.error);
        }

        setAppData(result.data);
        setAnyDetailModal(null);
    }

    return (
        <div>
            <h5>新規注文</h5>

            <form 
                id="new-order-creation"
                onSubmit={e => handleSubmit(e)}
            >
                <label htmlFor="order-quantity">数量</label>
                <input
                    type="number"
                    min="1"
                    id="order-quantity"
                    value={userInput}
                    onChange={e => handleChange(e)}
                />
                <p> {storageUnit}</p>

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