function getLastUpdate(appData, item){
    const { inventoryHistory } = appData;

    const allHistory = inventoryHistory.filter(history => history.itemId === item.id);

    if(!allHistory){
        return false;
    }

    const lastUpdate = allHistory[allHistory.length - 1];

    return lastUpdate;
}

export default getLastUpdate;