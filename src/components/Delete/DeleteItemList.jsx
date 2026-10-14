import DeleteItemCard from "./DeleteItemCard";
import { useAppData } from "../../context/AppDataContext";

function DeleteItemList({ setSelectedItem, setViewMode }){
    const { appData } = useAppData();
    const { storages } = appData;

    return (
        <section>
            {storages?.map(storage => {
                const storedItems = appData.items.filter(item => item.storageId === storage.id);

                return (
                    <div key={storage.id}>
                        <h3>{storage.name}</h3>

                        {storedItems.map(item => (
                            <DeleteItemCard
                                key={item.id}
                                item={item}
                                setSelectedItem={setSelectedItem}
                                setViewMode={setViewMode}
                            />
                        ))}
                    </div>
                )
            })}            
        </section>
    )
}

export default DeleteItemList;