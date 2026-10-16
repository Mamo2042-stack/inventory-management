import { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import ItemCard from "./ItemCard";
import ItemListControls from "./ItemListControls";
import filterItems from "../../utils/sortOutItems";

function ItemList ({ setSelectedItem, setInventoryView }){
    const { appData } = useAppData();
    const storageArry = [];
    appData.storages.forEach(storage => storageArry.push(storage.id));
    const [userInput, setUserInput] = useState({
        category: "",
        storages: storageArry,
        onlyExpected: false
    })
    const displayedItems = filterItems(appData, userInput)
    const { storages, items } = displayedItems;
    const [isControlOpen, setIsControlOpen] = useState(false);

    console.log(storageArry)
    console.log(displayedItems)

    return (
        <section>
            <div>
                <button
                    type="button"
                    onClick={() => setIsControlOpen(prev => !prev)}
                >{ isControlOpen ?   "閉じる" : "フィルター : ソート"}
                </button>

                {isControlOpen && (
                    <ItemListControls
                        userInput={userInput}
                        setUserInput={setUserInput}
                    />
                )}
            </div>

            {storages?.map(storage => {
                const storedItems = items.filter(item => item.storageId === storage.id)

                return (
                    <div key={storage.id}>
                        <h2>{storage.name}</h2>
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