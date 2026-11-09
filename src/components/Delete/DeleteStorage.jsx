import { useState } from "react";
import DeleteStorageList from "./DeleteStorageList";
import DeleteStorageForm from "./DeleteStorageForm";
import { useNavigate } from "react-router";
import "./DeleteStorage.css"
import { ArrowBigLeft } from "lucide-react";

function DeleteStorage (){
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [closeModalOrBackHome, setCloseModalOrBackHome] = useState(undefined);
    const navigate = useNavigate();

    function handleClick(){
        if(!closeModalOrBackHome){
            return;
        }

        if(closeModalOrBackHome === "close_modal"){
            setIsModalOpen(false);
            return;
        }
        
        if(closeModalOrBackHome === "back_home"){
            setIsModalOpen(false);
            navigate("/");
            return;
        }
    }

    return (
        <section className="storage-delete">
            <h1>ストレージ選択</h1>

            <DeleteStorageList
                setSelectedStorage={setSelectedStorage}
                setIsModalOpen={setIsModalOpen}
                setCloseModalOrBackHome={setCloseModalOrBackHome}
            />

            {isModalOpen && (
                <div 
                    className="backdrop-container"
                    onClick={handleClick}
                />
            )}

            <DeleteStorageForm
                selectedStorage={selectedStorage}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setCloseModalOrBackHome={setCloseModalOrBackHome}
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

export default DeleteStorage;