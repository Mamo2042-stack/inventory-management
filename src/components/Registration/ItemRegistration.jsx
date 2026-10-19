import { useNavigate } from "react-router";
import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";
import registerItem from "../../operations/registerItem";
import { CATEGORIES } from "../../constants/categories";

function ItemRegistration(){
    const [userInput, setUserInput] = useState({
        name: "",
        storageId: "",
        category: "",
        expectedQuantity: "",
        replenishmentMethod: "ORDER",
        storageUnit: "",
    });
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState([]);
    const { appData, setAppData } = useAppData(); 
    const categories = CATEGORIES;

    const { storages } = appData;
    const navigate = useNavigate();

    function handleClick (){
        navigate("/registration");
    }

    function handleChange(e) {
        const {name, value} = e.target;

        setUserInput(previousData => ({
            ...previousData,
            [name]: value
        }));
    }

    function handleSubmit(e){
        e.preventDefault();

        const result = registerItem(appData, userInput);
        
        if(!result.success){
            setErrorMsg(result.error);
            console.log(result.error);
            return;
        }

        setAppData(result.data);
        setUserInput(previous => ({
            ...previous,
            name: "",
            storageId: "",
            category: "",
            expectedQuantity: "",
            replenishmentMethod: "ORDER",
            storageUnit: "",            
        }))
        setIsSuccessModalOpen(true);
    }

    return (
        <section id="item-registration">
            <h2>食材を登録する</h2>

            <form 
                id="item-registration-form"
                onSubmit={e => handleSubmit(e)}
                noValidate
            >
                <label htmlFor="name">名前</label>
                <input
                    name="name"
                    type="text"
                    id="name"
                    value={userInput.name}
                    onChange={e => handleChange(e)}
                    required
                />

                {errorMsg.some(err => err === "EMPTY_INPUT") && (
                    <p>名前を入力して下さい。</p>
                )}

                {errorMsg.some(err => err === "DUPLICATE_NAME") && (
                    <p id="name-error">既に使用されている名前です。</p>
                )}
            
                <label htmlFor="place">保管先ストレージ</label>
                <select 
                    id="place" 
                    name="storageId"
                    value={userInput.storageId}
                    onChange={e => handleChange(e)}
                >
                    <option 
                        value=""
                    >ストレージを選択してください。
                    </option>
                    {storages.map(storage => (
                        <option
                            value={storage.id}
                            key={storage.id}
                        >{storage.name}
                        </option>
                    ))}
                </select>

                {errorMsg.some(err => err === "NO_STORAGE") && (
                    <p id="storage-error">ストレージを選択して下さい。</p>
                )}
                    
                <label htmlFor="category">カテゴリー</label>    
                <select 
                    id="category" 
                    name="category" 
                    value={userInput.category}
                    onChange={e => handleChange(e)}
                >
                    {categories.map(category => (
                        <option
                            key={category.type}
                            value={category.type}
                        >{category.word}
                        </option>
                    ))}
                </select>

                <label htmlFor="storage-unit">単位</label>
                <input
                    name="storageUnit"
                    id="storage-unit"
                    type="text"
                    value={userInput.storageUnit}
                    onChange={e => handleChange(e)}
                    required
                />

                {errorMsg.some(err => err === "NO_STORAGE_UNIT") && (
                    <p id="storageUnit-error">単位を入力して下さい。</p>
                )}

                <label htmlFor="expected-quantity">最低在庫数
                <input
                    name="expectedQuantity"
                    type="number"
                    id="expected-quantity"
                    min="0"
                    value={userInput.expectedQuantity}
                    onChange={e => handleChange(e)}
                />
                ({userInput.storageUnit})
                </label>

                {errorMsg.some(err => err === "INVALID_NUMBER") && (
                    <p id="number-error">有効な数字(0~100)を入力して下さい。</p>
                )}

                <fieldset>
                    <legend>リストック方法</legend>

                    <input
                        name="replenishmentMethod"
                        type="radio"
                        value="ORDER" 
                        id="order-radio"
                        checked={userInput.replenishmentMethod === "ORDER"}
                        onChange={e => handleChange(e)}
                    />
                    <label htmlFor="order-radio">オーダー</label>

                    <input 
                        name="replenishmentMethod"
                        type="radio"
                        value="PURCHASE"
                        id="purchase-radio"
                        checked={userInput.replenishmentMethod === "PURCHASE"}
                        onChange={e => handleChange(e)}
                    />
                    <label htmlFor="purchase-radio">買い出し</label>
                </fieldset>

                <button
                    id="submit-btn"
                    type="submit"
                >登録
                </button>
            </form>

            <button
                className="back-to-home-btn"
                onClick={handleClick}
            >⇠
            </button>

            {isSuccessModalOpen && (
                <div htmlFor="success-modal">
                    <p>食材が登録されました。</p>

                    <button
                        type="button"
                        onClick={() => {
                            setIsSuccessModalOpen(false)
                            navigate("/")
                    }
                    }>⌫
                    </button>
                </div>
            )}
        </section>
    )
}

export default ItemRegistration;