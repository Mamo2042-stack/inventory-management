import DeleteItemCard from "./DeleteItemCard";
import { useAppData } from "../../context/useAppData";

function DeleteItemList({ setSelectedItem, setIsModalOpen, setCloseModalOrBackHome }){
    const { appData } = useAppData();
    const { storages } = appData;

    return (
        <div className="item-list-container">
            {storages?.map(storage => {
                const storedItems = appData.items.filter(item => item.storageId === storage.id);
                const hasItems = storedItems.length > 0;
                
                return (
                    <div key={storage.id} className="item-container">
                        <h2>{storage.name}</h2>

                        <div className="items">
                            {hasItems && 
                            storedItems.map(item => (
                                <DeleteItemCard
                                    key={item.id}
                                    item={item}
                                    setSelectedItem={setSelectedItem}
                                    setIsModalOpen={setIsModalOpen}
                                    setCloseModalOrBackHome={setCloseModalOrBackHome}
                                />
                            ))}

                            {!hasItems && (
                                <p className="no-item-message">表示する食材がありません。</p>
                            )}

                        </div>

                    </div>
                )
            })}            
        </div>
    )
}

export default DeleteItemList;