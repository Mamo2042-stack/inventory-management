import { useState } from "react";
import DeleteItemForm from "./DeleteItemForm";
import DeleteItemList from "./DeleteItemList";
import { useNavigate } from "react-router";

function DeleteItem(){
    const [viewMode, setViewMode] = useState("item-list");
    const [selectedItem, setSelectedItem] = useState(null);
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

    return (
        <section>
            <h1>食材の削除</h1>

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
                    >✕
                    </button>
                </div>                
            )}

            <button
                type="button"
                onClick={() => navigate("/delete")}
            >⇠
            </button>

        </section>
    )
}

export default DeleteItem;