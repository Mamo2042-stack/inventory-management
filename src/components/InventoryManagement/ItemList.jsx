import { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import ItemCard from "./ItemCard";
import ItemListControls from "./ItemListControls";
import filterItems from "../../utils/filterItems";
import sortItems from "../../utils/sortItems";
import SearchSection from "./SearchSection";
import searchItems from "../../operations/searchItems";
import "./ItemList.css"
import "./ItemListControl.css"

function ItemList ({ setSelectedItem, setInventoryView }){
    const { appData } = useAppData();
    const storageArry = [];
    appData.storages.forEach(storage => storageArry.push(storage.id));
    const [userInput, setUserInput] = useState({
        category: "",
        storages: storageArry,
        onlyExpected: false
    })//Used to determine filtering condition//
    const [searchWord, setSearchWord] = useState("");
    const [sortingOption, setSortingOption] = useState("");
    const displayedItems = filterItems(appData, userInput)//Recalculate whenver appData is updated//
    const searchedItems = searchItems(displayedItems, searchWord);
    const sortedItems = sortItems(searchedItems, sortingOption);
    const { storages, items, inventoryHistory } = sortedItems;
    const [isControlOpen, setIsControlOpen] = useState(false);

    console.log(sortingOption)

    return (
        <section>
            <div className="item-controlers">
                <div className="search-section">
                    <SearchSection
                        searchWord={searchWord}
                        setSearchWord={setSearchWord}
                    />
                </div>
    
                <div>
                    <button
                        type="button"
                        onClick={() => setIsControlOpen(prev => !prev)}
                        className="control-panel-button"
                    > フィルター | ソート 
                    </button>

                    {isControlOpen && (
                        <div
                            className="controls-backdrop"
                            onClick={() => setIsControlOpen(false)}
                        />
                    )}

                    <ItemListControls
                            userInput={userInput}
                            sortingOption={sortingOption}
                            setUserInput={setUserInput}
                            setSortingOption={setSortingOption}
                            isControlOpen={isControlOpen}
                            setIsContorlOpen={setIsControlOpen}
                    />
                </div>
            </div>

            {storages?.map(storage => {
                const storedItems = items.filter(item => item.storageId === storage.id)

                return (
                    <div key={storage.id} className="storage-container">
                        <h2 className="storage-name">{storage.name}</h2>
                        {storedItems?.map(item => (
                        <ItemCard 
                            key={item.id}
                            item={item}
                            setSelectedItem={setSelectedItem}
                            setInventoryView={setInventoryView}
                            history={inventoryHistory}
                        />
                        ))}

                        {storedItems.length === 0 && (
                            <p>表示するアイテムがありません</p>
                        )}
                    </div>
                )
            })}
        </section>
    )
}

export default ItemList;