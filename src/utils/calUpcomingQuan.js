function calUpcomingQuantity (item){
    if(item.replenishmentMethod !== "ORDER"){
        return 0;
    }

    const { pendingOrders } = item;

    if(!pendingOrders.length){
        return 0;
    }

    let totalQuantity = 0;

    totalQuantity += pendingOrders.reduce((sum, order) => sum + Math.round((order.orderedQuantity - order.receivedQuantity)), 0);

    return Math.round(totalQuantity);
}

export default calUpcomingQuantity;