function calUpcomingQuantity (item){
    if(item.replenishmentMethod !== "ORDER"){
        return 0;
    }

    const { pendingOrders } = item;

    if(!pendingOrders.length){
        return 0;
    }

    let totalQuantity = 0;

    totalQuantity += pendingOrders.reduce((sum, order) => sum + (order.orderedQuantity - order.receivedQuantity), 0);

    return totalQuantity;
}

export default calUpcomingQuantity;