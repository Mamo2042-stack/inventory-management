import { useNavigate } from "react-router";
import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";
import registerItem from "../../operations/registerItem";

function ItemRegistration(){
    const [userInput, setUserInput] = useState({
        name: "",
        storageId: "",
        category: "",
        expectedQuantity: "",
        replenishmentMethod: "ORDER",
        storageUnit: "",
    });
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState([]);
    const errorMsgs = {
        "DUPLICATE_NAME": "既に使用されている名前です。",
        "NO_STORAGE": "ストレージが存在しません。",
        "INVALID_EXPEC_NUM": "無効な数字入力です。"
    }
    const { appData, setAppData } = useAppData(); 

    const { storages } = appData;
    const navigate = useNavigate();

    function handleClick (){
        navigate("/");
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
            setIsErrorModalOpen(true);
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
            
                <label htmlFor="place">保管先ストレージ</label>
                <select 
                    id="place" 
                    name="storageId"
                    value={userInput.storageId}
                    onChange={e => handleChange(e)}
                >
                    <option 
                        value="">ストレージを洗濯してください。
                    </option>
                    {storages.map(storage => (
                        <option
                            value={storage.id}
                            key={storage.id}
                        >{storage.name}
                        </option>
                    ))}
                </select>
                    
                <label htmlFor="category">カテゴリー</label>    
                <select 
                    id="category" 
                    name="category" 
                    value={userInput.category}
                    onChange={e => handleChange(e)}
                >
                    <option value=""></option>
                    <option value="meat">肉</option>
                    <option value="seafood">魚介</option>
                    <option value="vegetable">野菜</option>
                    <option value="tenshin">天心</option>
                    <option value="drink">ドリンク</option>
                    <option value="seasoning">調味料</option>
                    <option value="others">その他</option>
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

                <label htmlFor="expected-quantity">最低在庫数:({userInput.storageUnit})</label>
                <input
                    name="expectedQuantity"
                    type="number"
                    id="expected-quantity"
                    value={userInput.expectedQuantity}
                    onChange={e => handleChange(e)}
                />

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
            >ホームに戻る
            </button>

            {isSuccessModalOpen && (
                <div id="success-modal">
                    <p>登録完了しました。</p>

                    <button
                        type="button"
                        onClick={() => {
                        setIsSuccessModalOpen(false)
                        navigate("/")
                    }
                    }>閉じる
                    </button>
                </div>
            )}

            {isErrorModalOpen && (
                <div id="error-modal">
                    <p>不正な入力です。</p>
                    <p>以下を参照ください。</p>

                    <ul>
                        {errorMsg.map(( err, index ) => (
                            <li key={index}>{errorMsgs[err]}</li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        onClick={() => {
                            setErrorMsg([]);
                            setIsErrorModalOpen(false);
                    }}>閉じる
                        </button>
                </div>
            )}

        </section>
    )
}

export default ItemRegistration;