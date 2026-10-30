import { useNavigate } from "react-router";
import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";
import registerItem from "../../operations/registerItem";
import { CATEGORIES } from "../../constants/categories";
import "./ItemRegistration.css"

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
        <section className="item-registration">
            <h1>食材を登録する</h1>

            <form 
                className="item-registration-form"
                onSubmit={e => handleSubmit(e)}
                noValidate
            >
                <div>
                    <label htmlFor="name">名前</label>
                    <input
                        name="name"
                        type="text"
                        id="name"
                        maxLength={10}
                        value={userInput.name}
                        onChange={e => handleChange(e)}
                        required
                    />

                    {errorMsg.some(err => err === "EMPTY_INPUT") && (
                        <p className="error-message">名前を入力して下さい。</p>
                    )}

                    {errorMsg.some(err => err === "DUPLICATE_NAME") && (
                        <p className="error-message">既に使用されている名前です。</p>
                    )}

                    {errorMsg.some(err => err === "TOO_MANY_LETTERS_NAME") && (
                        <p className="error-message">文字数の上限は10文字です。</p>
                    )}

                </div>

                <div>
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
                        <p className="error-message">ストレージを選択して下さい。</p>
                    )}
                </div>    

                <div>
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
                </div>

                <div>
                    <label htmlFor="storage-unit">単位</label>
                    <input
                        name="storageUnit"
                        id="storage-unit"
                        type="text"
                        maxLength={8}
                        value={userInput.storageUnit}
                        onChange={e => handleChange(e)}
                        required
                    />

                    {errorMsg.some(err => err === "NO_STORAGE_UNIT") && (
                        <p className="error-message">単位を入力して下さい。</p>
                    )}

                    {errorMsg.some(err => err === "TOO_MANY_LETTERS_UNIT")}
                    </div>

                <div>
                <label htmlFor="expected-quantity">最低在庫数</label>
                <div className="quantity-with-unit">
                    <input
                        name="expectedQuantity"
                        type="number"
                        id="expected-quantity"
                        min="0"
                        max="100"
                        value={userInput.expectedQuantity}
                        onChange={e => handleChange(e)}
                    />
                    <p>({userInput.storageUnit})</p>
                </div>
                    {errorMsg.some(err => err === "INVALID_NUMBER" || "INVALID_QUANTITY") && (
                        <p className="error-message">有効な数字(0~1000、小数点第1位まで)を入力して下さい。</p>
                    )}
                </div>

                <fieldset className="replenishment-method-field">
                    <legend>リストック方法</legend>

                    <div>
                    <input
                        name="replenishmentMethod"
                        className="replenishmethod-option"
                        type="radio"
                        value="ORDER" 
                        id="order-radio"
                        checked={userInput.replenishmentMethod === "ORDER"}
                        onChange={e => handleChange(e)}
                    />
                    <label htmlFor="order-radio">オーダー</label>
                    </div>

                    <div>
                    <input 
                        name="replenishmentMethod"
                        className="replenishment-option"
                        type="radio"
                        value="PURCHASE"
                        id="purchase-radio"
                        checked={userInput.replenishmentMethod === "PURCHASE"}
                        onChange={e => handleChange(e)}
                    />
                    <label htmlFor="purchase-radio">買い出し</label>
                    </div>
                </fieldset>

                <button
                    className="submit-button"
                    type="submit"
                >登録
                </button>
            </form>

            <button
                className="back-to-previous-button"
                onClick={handleClick}
            >⬅︎
            </button>

            {isSuccessModalOpen && (
                <div className="success-modal-backdrop"
                />
            )}


            <div className={`success-modal ${isSuccessModalOpen ? "is-open" : ""}`}>
                <p>食材が登録されました。</p>

                <button
                    type="button"
                    onClick={() => {
                        setIsSuccessModalOpen(false)
                        navigate("/")
                }
                }>⬅︎ ホーム
                </button>
            </div>
        </section>
    )
}

export default ItemRegistration;