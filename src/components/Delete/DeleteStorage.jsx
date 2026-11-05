import { useState } from "react";
import DeleteStorageList from "./DeleteStorageList";
import DeleteStorageForm from "./DeleteStorageForm";
import { useNavigate } from "react-router";
import "./DeleteStorage.css"

function DeleteStorage (){
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <section className="storage-delete">
            <h1>ストレージ選択</h1>

            <DeleteStorageList
                setSelectedStorage={setSelectedStorage}
                setIsModalOpen={setIsModalOpen}
            />

            {isModalOpen && (
                <div 
                    className="backdrop-container"
                    onClick={() => setIsModalOpen(false)}
                />
            )}

            <DeleteStorageForm
                selectedStorage={selectedStorage}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />

            <button
                type="button"
                className="back-to-previous-button clickable-button"
                onClick={() => navigate("/delete")}
            >⬅︎          
            </button>
        </section>
    )
}

export default DeleteStorage;