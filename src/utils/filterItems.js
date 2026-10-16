function filterItems(appData, filterBy){
    const { category, storages, onlyExpected } = filterBy;
    const condition = (category, onlyExpected, item) => {

        let result = false;

        if(onlyExpected){
            const needForRestock = item.quantity < item.expectedQuantity;
            if(needForRestock){
                if(category === "" || item.category === category){
                    result = true;
                }
            }
        } else if(category === "" || item.category === category){
            result = true;
        }

        return result;
    }

    return {
        ...appData,
        storages: appData.storages.filter(storage => storages.includes(storage.id)),
        items: appData.items.filter(item => condition(category, onlyExpected, item))
    }
}

export default filterItems;