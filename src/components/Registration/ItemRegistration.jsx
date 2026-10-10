import { useNavigate } from "react-router";
import { useAppData } from "../../context/AppDataContext";
import { useState } from "react";

function ItemRegistration(){
    const [userInput, setUserInput] = useState({
        name: "",
        storageId: "",
        category: "",
        expectedQuantity: "",
        replenishmentMethod: "ORDER",
        storageUnit: "",
    });

    const { appData, setAppData } = useAppData();

    const storages = appData.storages;
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

    return (
        <section id="item-registration">
            <h2>食材を登録する</h2>

            <form>
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
                        selected
                    />
                    <label htmlFor="order-radio">オーダー</label>

                    <input 
                        name="replenishmentMethod"
                        type="radio"
                        value="PURCHASE"
                        id="purchase-radio"
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

        </section>
    )
}

export default ItemRegistration;