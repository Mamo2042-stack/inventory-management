import { useAppData } from "../../context/useAppData";
import { CATEGORIES } from "../../constants/categories";

function FilteringSection({ userInput, setUserInput }){
    const { appData } = useAppData();
    const { storages } = appData;
    const categories = CATEGORIES;

    function handleStoragesChange(e, storageId){

        setUserInput(prev => ({
            ...prev,
            storages: e.target.checked
                ? [...prev.storages, storageId]
                : prev.storages.filter(id => id !== storageId)
        }))
    }

    function handleCategoryChange(e){
        setUserInput(prev => ({
            ...prev,
            category: e.target.value
        }))
    }

    function handleCheckChange(){
        setUserInput(prev => ({
            ...prev,
            onlyExpected: !prev.onlyExpected
        }))
    }

    return (
        <div>
            <h2>フィルター</h2>

                <div>
                    <h3>カテゴリー別</h3>
                    <select
                        id="category_selection"
                        className="selection"
                        value={userInput.category}
                        onChange={handleCategoryChange}
                    >
                        <option 
                            value=""
                        >全カテゴリー</option>
                        {categories.map(category => (
                            <option
                                key={category.type}
                                value={category.type}
                            >{category.word}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <h3>ストレージ別</h3>
                    <div className="checkbox-container">
                        {storages?.map(storage => (
                            <div key={storage.id}>
                                <input
                                    key={storage.id}
                                    type="checkbox"
                                    id={`storage-${storage.id}`}
                                    className="checkbox" 
                                    name={storage.id}
                                    checked={userInput.storages.includes(storage.id)}
                                    onChange={e => handleStoragesChange(e, storage.id)}
                                />
                                <label htmlFor={`storage-${storage.id}`}>{storage.name}</label>
                            </div>
                        ))}
                        <div>
                            <input
                                type="checkbox"
                                id="under_expected"
                                className="checkbox"
                                checked={userInput.onlyExpected}
                                onChange={handleCheckChange}
                            />
                            <label htmlFor="under_expected">最低在庫数より少ない</label>                            
                        </div>

                    </div>
                </div>          
        </div>
    )
}

export default FilteringSection;