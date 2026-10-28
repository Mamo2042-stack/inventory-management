import DeleteItemCard from "./DeleteItemCard";
import { useAppData } from "../../context/AppDataContext";

function DeleteItemList({ setSelectedItem, setIsModalOpen }){
    const { appData } = useAppData();
    const { storages } = appData;

    return (
        <div className="item-list-container">
            {storages?.map(storage => {
                const storedItems = appData.items.filter(item => item.storageId === storage.id);

                return (
                    <div key={storage.id} className="item-container">
                        <h2>{storage.name}</h2>

                        <div className="items">
                            {storedItems?.map(item => (
                                <DeleteItemCard
                                    key={item.id}
                                    item={item}
                                    setSelectedItem={setSelectedItem}
                                    setIsModalOpen={setIsModalOpen}
                                />
                            ))}
                        </div>

                        {storedItems.length === 0 && (
                            <p>表示する食材がありません。</p>
                        )}
                    </div>
                )
            })}            
        </div>
    )
}

export default DeleteItemList;