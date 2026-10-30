import { useAppData } from "../../../context/useAppData";
import PendingOrderCard from "./PendingOrderCard";
import CreateOrderForm from "./CreateOrderForm";
import "./PendingOrderManagement.css"
import { useInventoryNavigation } from "../../../context/useInventoryNavigation";


function PendingOrdersManagement ({ selectedItem, setDeeperSection }){
    const { appData } = useAppData();
    const { items } = appData;
    const { anyDetailModal, setAnyDetailModal } = useInventoryNavigation();
    const displayItem = items.find(item => item.id === selectedItem);
    const { storageUnit, pendingOrders } = displayItem

    return (
        <section className="pending-order-management">

            <h4>オーダー管理</h4>

            <div className="orders">
            {pendingOrders.length ? 
                pendingOrders.map(order => (
                    <PendingOrderCard 
                        key={order.id}
                        order={order}
                        unit={storageUnit}
                        selectedItem={selectedItem}
                    />
                ))
                : (
                    <p>表示する注文はありません。</p>
                )
            }
            </div>
            
            <div className="buttons">
                <button
                    type="button"
                    className="add-order-btn"
                    onClick={() => setAnyDetailModal("create")}
                >注文を追加する
                </button>

                <button
                    type="button"
                    className="exit-to-regular"
                    onClick={() => {
                        setDeeperSection(null)
                        setAnyDetailModal(null)
                    }}
                >➡︎
                </button>
            </div>
            
            {/*More Detailed Modals below*/}

            {anyDetailModal === "create" && (
                <div
                    className="create-order-backdrop"
                    onClick={() => setAnyDetailModal(null)}
                />
            )}

            {anyDetailModal === "create" && (
                    <CreateOrderForm
                        storageUnit={storageUnit}
                        setAnyDetailModal={setAnyDetailModal}
                        selectedItem={selectedItem}
                    />
                )}
        </section>
    )
}

export default PendingOrdersManagement;