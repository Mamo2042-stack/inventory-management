import { useState } from "react";
import { useAppData } from "../../context/AppDataContext";
import DeleteItemCard from "./DeleteItemCard";
import DeleteItemForm from "./DeleteItemForm";

function DeleteItem(){
    const { appData } = useAppData();
    const { storages, items } = appData;
    const [viewMode, setViewMode] = useState("item-list");
    const [selectedItem, setSelectedItem] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");

    return (
        <section>
            <h2>食材の削除</h2>

            {storages.map(storage => {
                const storedItems = appData.items.filter(item => item.storageId === storage.id);

                return (
                    <div key={storage.id}>
                        <h3>{storage.name}</h3>

                        {storedItems.map(item => (
                            <DeleteItemCard
                                key={item.id}
                                item={item}
                                setSelectedItem={setSelectedItem}
                                setViewMode={setViewMode}
                            />
                        ))}
                    </div>
                )
            })}

            {viewMode === "confirmation" && (
                <DeleteItemForm
                    itemId={selectedItem}
                    setViewMode={setViewMode}
                    setSuccessMsg={setSuccessMsg}
                />
            )}

            {successMsg && (
                <div>
                    <p>食材が削除されました。</p>

                    <button
                        type="button"
                        onClick={() => setSuccessMsg("")}    
                    >❌
                    </button>
                </div>                
            )}

        </section>
    )
}

export default DeleteItem;