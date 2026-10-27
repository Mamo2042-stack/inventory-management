import { useAppData } from "../../context/AppDataContext"

function DeleteStorageCard({ storageData, setSelectedStorage, setIsModalOpen }){
    const { appData } = useAppData();
    const hasItems = appData.items.some(item => item.storageId === storageData.id);

    function handleClick(){
        setSelectedStorage(storageData.id);
        setIsModalOpen(true);
    }

    return (
        <>
            <button
                type="button"
                className="storage-card"
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