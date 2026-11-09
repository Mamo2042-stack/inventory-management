import { useState } from "react";
import DeleteItemForm from "./DeleteItemForm";
import DeleteItemList from "./DeleteItemList";
import { useNavigate } from "react-router";
import "./DeleteItem.css"
import { ArrowBigLeft } from "lucide-react";

function DeleteItem(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
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
        <section className="delete-item">
            <h1>食材の削除</h1>

            <DeleteItemList
                setSelectedItem={setSelectedItem}
                setIsModalOpen={setIsModalOpen}
                setCloseModalOrBackHome={setCloseModalOrBackHome}
            />

            {isModalOpen && (
                <div 
                    className="backdrop-container"
                    onClick={handleClick}
                />
            )}

            <DeleteItemForm
                itemId={selectedItem}
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

export default DeleteItem;