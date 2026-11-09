import { useNavigate } from "react-router";
import { useAppData } from "../../context/useAppData";
import { useState } from "react";
import registerItem from "../../operations/registerItem";
import { CATEGORIES } from "../../constants/categories";
import "./ItemRegistration.css"
import { ArrowBigLeft } from "lucide-react";

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
            console.error(result.error);
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
                    <label htmlFor="name" className="label">名前</label>
                    <input
                        name="name"
                        type="text"
                        id="name"
                        className="form-input"
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
                    <label htmlFor="place" className="label">保管先ストレージ</label>
                    <select 
                        id="place" 
                        name="storageId"
                        className="selection"
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
                    <label htmlFor="category" className="label">カテゴリー</label>    
                    <select 
                        id="category" 
                        name="category" 
                        className="selection"
                        value={userInput.category}
                        onChange={e => handleChange(e)}
                    >

                        <option value="">
                            カテゴリーを選択して下さい。
                        </option>
                        {categories.map(category => (
                            <option
                                key={category.type}
                                value={category.type}
                            >{category.word}
                            </option>
                        ))}
                    </select>

                    {errorMsg.some(err => err === "INVALID_CATEGORY") && (
                        <p className="error-message">カテゴリーを選択して下さい。</p>
                    )}
                </div>

                <div>
                    <label htmlFor="storage-unit" className="label">単位</label>
                    <input
                        name="storageUnit"
                        id="storage-unit"
                        className="form-input"
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
                <label htmlFor="expected-quantity" className="label">最低在庫数</label>
                <div className="quantity-with-unit">
                    <input
                        name="expectedQuantity"
                        type="number"
                        id="expected-quantity"
                        className="form-input"
                        min="0"
                        max="100"
                        value={userInput.expectedQuantity}
                        onChange={e => handleChange(e)}
                    />
                    <p>({userInput.storageUnit})</p>
                </div>
                    {errorMsg.some(err => err === "INVALID_NUMBER" || err === "INVALID_QUANTITY") && (
                        <p className="error-message">有効な数字(0~1000、小数点第1位まで)を入力して下さい。</p>
                    )}
                </div>

                <fieldset className="replenishment-method-field">
                    <legend className="label">リストック方法</legend>

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
                        <label htmlFor="order-radio" className="label">オーダー</label>
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
                        <label htmlFor="purchase-radio" className="label">買い出し</label>
                    </div>
                </fieldset>

                <button
                    className="submit-button clickable-button"
                    type="submit"
                >登録
                </button>
            </form>

            <button
                className="back-to-previous-button clickable-button"
                onClick={handleClick}
            ><ArrowBigLeft />
            </button>

            {isSuccessModalOpen && (
                <div className="success-modal-backdrop"
                />
            )}


            <div className={`success-modal ${isSuccessModalOpen ? "is-open" : ""}`}>
                <p className="success-message">
                    <span>食材が</span>
                    <span>登録されました。</span></p>

                <button
                    type="button"
                    className="back-to-previous-button clickable-button"
                    onClick={() => {
                        setIsSuccessModalOpen(false)
                        navigate("/")
                }
                }><span className="on-the-same-line"><ArrowBigLeft size={20} /> ホーム</span>
                </button>
            </div>
        </section>
    )
}

export default ItemRegistration;