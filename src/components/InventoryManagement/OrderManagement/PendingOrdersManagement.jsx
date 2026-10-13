import { useAppData } from "../../../context/AppDataContext";
import { testAppData } from "../../../test/fixtures";
import PendingOrderCard from "./PendingOrderCard";
import { useState } from "react";
import ReceivePendingOrderForm from "./ReceivePendingOrderForm";
import CreateOrderForm from "./CreateOrderForm";


function PendingOrdersManagement ({ selectedItem, setDeeperSection }){
    const { appData, setAppData } = useAppData();
    const { items } = appData;
    const displayItem = items.find(item => item.id === selectedItem);
    const { storageUnit, pendingOrders } = displayItem;
    const [anyDetailModal, setAnyDetailModal] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    return (
        <section>
            <h3>オーダー管理</h3>

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

            <button
                type="button"
                onClick={() => setAnyDetailModal("create")}
            >注文を追加する
            </button>

            <button
                type="button"
                onClick={() => setDeeperSection(null)}
            >閉じる
            </button>

            {/*More Detailed Modals below*/}
            {anyDetailModal === "receipt" ? (
                <ReceivePendingOrderForm
                    key={selectedOrder}
                    selectedOrderData={pendingOrders.find(order => order.id === selectedOrder)}
                    setAnyDetailModal={setAnyDetailModal}
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