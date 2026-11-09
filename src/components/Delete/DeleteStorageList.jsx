import DeleteStorageCard from "./DeleteStorageCard";
import { useAppData } from "../../context/useAppData"

function DeleteStorageList({ setSelectedStorage, setIsModalOpen, setCloseModalOrBackHome }){
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
                   setCloseModalOrBackHome={setCloseModalOrBackHome}
                /> 
            ))}

            {storages.length % 2 === 1 && (
                <div className="empty-box"></div>
            )}
        </div>
    )
}

export default DeleteStorageList;