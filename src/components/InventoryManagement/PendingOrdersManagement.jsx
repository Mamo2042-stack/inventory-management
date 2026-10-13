import { useAppData } from "../../context/AppDataContext";
import { testAppData } from "../../test/fixtures";
import PendingOrderCard from "./PendingOrderCard";


function PendingOrdersManagement ({ selectedItem, setDeeperSection }){
    const { items } = testAppData;
    const displayItem = items.find(item => item.id === selectedItem);
    const { storageUnit, pendingOrders } = displayItem;


    return (
        <section>
            <h3>オーダー管理</h3>

            {pendingOrders.length ? 
                pendingOrders.map(order => (
                    <PendingOrderCard 
                        key={order.id}
                        order={order}
                        unit={storageUnit}
                        setDeeperSection={setDeeperSection}
                    />
                ))
                : (
                    <p>表示する注文はありません。</p>
                )
            }

            <button
                type="button"
            >注文を追加する
            </button>

            <button
                type="submit"
                onClick={() => setDeeperSection(null)}>

            </button>
        </section>
    )
}

export default PendingOrdersManagement;