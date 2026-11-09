import { useState } from "react";
import DeleteItemForm from "./DeleteItemForm";
import DeleteItemList from "./DeleteItemList";
import { useNavigate } from "react-router";
import "./DeleteItem.css"
import { ArrowBigLeft } from "lucide-react";

function DeleteItem(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    return (
        <section className="delete-item">
            <h1>食材の削除</h1>

            <DeleteItemList
                setSelectedItem={setSelectedItem}
                setIsModalOpen={setIsModalOpen}
            />

            {isModalOpen && (
                <div 
                    className="backdrop-container"
                    onClick={() => setIsModalOpen(false)}
                />
            )}

            <DeleteItemForm
                itemId={selectedItem}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

            <button
                type="button"
                className="back-to-previous-button clickable-button"
                onClick={() => navigate("/delete")}
            ><ArrowBigLeft size={20}/>
            </button>

        </section>
    )
}

export default DeleteItem;