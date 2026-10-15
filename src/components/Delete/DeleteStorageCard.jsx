import { useAppData } from "../../context/AppDataContext"

function DeleteStorageCard({ storageData, setSelectedStorage, setViewMode }){
    const { appData } = useAppData();
    const hasItems = appData.items.some(item => item.storageId === storageData.id);

    function handleClick(){
        setSelectedStorage(storageData.id);
        setViewMode("confirmation");
    }

    return (
        <>
            <button
                type="button"
                disabled={hasItems}
                onClick={handleClick}
            >
                <p>{storageData.name}</p>

                {hasItems && (
                    <p>ストレージ内の食材を削除してください。</p>
                )}

            </button>
        </>
    )
}

export default DeleteStorageCard;