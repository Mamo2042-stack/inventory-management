import { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import ItemCard from "./ItemCard";
import { testAppData } from "../../test/fixtures";

function ItemList ({ setSelectedItem, setInventoryView }){
    const { appData } = useAppData();
    const { storages, items } = testAppData;

    return (
        <section>
            {storages.map(storage => {
                const storedItems = items.filter(item => item.storageId === storage.id)

                return (
                    <div key={storage.id}>
                        <h2>{storage.name}</h2>
                        {storedItems.map(item => (
                        <ItemCard 
                            key={item.id}
                            item={item}
                            setSelectedItem={setSelectedItem}
                            setInventoryView={setInventoryView}
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