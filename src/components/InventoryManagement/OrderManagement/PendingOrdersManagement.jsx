import { useAppData } from "../../../context/AppDataContext";
import PendingOrderCard from "./PendingOrderCard";
import { useState } from "react";
import ReceivePendingOrderForm from "./ReceivePendingOrderForm";
import CreateOrderForm from "./CreateOrderForm";
import "./PendingOrderManagement.css"
import { useInventoryNavigation } from "../../../context/InventoryNavigationContext";


function PendingOrdersManagement ({ selectedItem, setDeeperSection }){
    const { appData } = useAppData();
    const { items } = appData;
    const { anyDetailModal, setAnyDetailModal } = useInventoryNavigation();
    const displayItem = items.find(item => item.id === selectedItem);
    const { storageUnit, pendingOrders } = displayItem;
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <section className="pending-order-management">
            <h3>{displayItem.name}</h3>

            <h4>オーダー管理</h4>

            <div className="orders">
            {pendingOrders.length ? 
                pendingOrders.map(order => (
                    <PendingOrderCard 
                        key={order.id}
                        order={order}
                        unit={storageUnit}
                        setSelectedOrder={setSelectedOrder}
                        setAnyDetailModal={setAnyDetailModal}
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

            {anyDetailModal === "receipt" ? (
                <ReceivePendingOrderForm
                    key={selectedOrder}
                    selectedOrder={selectedOrder}//order.id//
                    pendingOrders={pendingOrders}
                    setAnyDetailModal={setAnyDetailModal}
                    selectedItem={selectedItem}
                />
            )
                :
                anyDetailModal === "create" ? (
                    <CreateOrderForm
                        storageUnit={storageUnit}
                        setAnyDetailModal={setAnyDetailModal}
                        selectedItem={selectedItem}
                    />
                )
                :
                null
        }
        </section>
    )
}

export default PendingOrdersManagement;