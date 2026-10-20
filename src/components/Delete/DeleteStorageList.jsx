import DeleteStorageCard from "./DeleteStorageCard";
import { useAppData } from "../../context/AppDataContext"

function DeleteStorageList({ setSelectedStorage, setViewMode }){
    const { appData } = useAppData();
    const { storages } = appData;

    return (
        <section>
            <h1>ストレージ選択</h1>
            {storages?.map(storage => (
                <DeleteStorageCard
                   key={storage.id}
                   storageData={storage}
                   setSelectedStorage={setSelectedStorage}
                   setViewMode={setViewMode}
                /> 
            ))}
        </section>
    )
}

export default DeleteStorageList;