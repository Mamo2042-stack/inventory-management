function filterItems(appData, filterBy){
    const { category, storages, onlyExpected } = filterBy;
    const condition = (item) => {

        if(category === ""){
            return true;
        }

        if(item.category === category){
            return true;
        }

        if(onlyExpected){
            const needForRestock = item.quantity < item.expectedQuantity;
            if(needForRestock){
                return true;
            } else {
                return false;
            }
        }

        return true;
    }

    return {
        ...appData,
        storages: appData.storages.filter(storage => storages.includes(storage.id)),
        items: appData.items.filter(item => condition(item))
    }
}

export default filterItems;