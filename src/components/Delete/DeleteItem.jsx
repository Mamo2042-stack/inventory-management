import { useState } from "react";
import DeleteItemForm from "./DeleteItemForm";
import DeleteItemList from "./DeleteItemList";

function DeleteItem(){
    const [viewMode, setViewMode] = useState("item-list");
    const [selectedItem, setSelectedItem] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");

    return (
        <section>
            <h2>食材の削除</h2>

            <DeleteItemList
                setSelectedItem={setSelectedItem}
                setViewMode={setViewMode}
            />

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