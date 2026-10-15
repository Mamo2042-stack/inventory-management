import { useAppData } from "../../context/AppDataContext";
import deleteStorage from "../../operations/deleteStorage";

function DeleteStorageForm({ selectedStorage, setViewMode, setSuccessMsg }){
    const { appData, setAppData } = useAppData();

    function handleClick(){
        const result = deleteStorage(appData, selectedStorage);

        if(!result.success){
            console.log(result.error);
        }

        setAppData(result.data);
        setViewMode("storage-list");
        setSuccessMsg("SUCCEED");
    }

    return (
        <div>
            <h3>本当に削除しますか？</h3>

            <button
                type="button"
                onClick={handleClick}
            >確定
            </button>

            <button
                type="button"
                onClick={() => setViewMode("storage-list")}
            >❌
            </button>
        </div>
    )
}

export default DeleteStorageForm;