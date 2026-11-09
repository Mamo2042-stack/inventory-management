import { useAppData } from "../../context/useAppData"

function DeleteStorageCard({ storageData, setSelectedStorage, setIsModalOpen, setCloseModalOrBackHome }){
    const { appData } = useAppData();
    const hasItems = appData.items.some(item => item.storageId === storageData.id);

    function handleClick(){
        setSelectedStorage(storageData.id);
        setIsModalOpen(true);
        setCloseModalOrBackHome("close_modal")
    }

    return (
        <>
            <button
                type="button"
                className="storage-card clickable-button"
                disabled={hasItems}
                onClick={handleClick}
            >
                <p>{storageData.name}</p>

                {hasItems && (
                    <p className="has-item-message">
                        <span>ストレージ内の食材を</span>
                        <span>削除してください。</span>
                    </p>
                )}

            </button>
        </>
    )
}

export default DeleteStorageCard;