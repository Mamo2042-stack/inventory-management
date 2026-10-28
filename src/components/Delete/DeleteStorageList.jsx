import DeleteStorageCard from "./DeleteStorageCard";
import { useAppData } from "../../context/AppDataContext"

function DeleteStorageList({ setSelectedStorage, setIsModalOpen }){
    const { appData } = useAppData();
    const { storages } = appData;

    return (
        <div className="storages-container">
            {storages?.map(storage => (
                <DeleteStorageCard
                   key={storage.id}
                   storageData={storage}
                   setSelectedStorage={setSelectedStorage}
                   setIsModalOpen={setIsModalOpen}
                /> 
            ))}

            {storages.length % 2 === 1 && (
                <div className="empty-box"></div>
            )}
        </div>
    )
}

export default DeleteStorageList;