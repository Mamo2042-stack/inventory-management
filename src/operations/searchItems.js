function searchItems(appData, query){
    const normalizedQuery = query.trim().toLowerCase();

    if(!normalizedQuery){
        return appData;
    }

    return {
        ...appData,
        items: appData.items.filter(item =>
            item.name.toLowerCase().includes(normalizedQuery)
        )
    }
}

export default searchItems;