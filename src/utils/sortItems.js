import getLastUpdate from "./getLastUpdate";

function sortItems(appData, option){
    if(option === ""){
        return appData;
    }

    const { items } = appData;

    if(option === "low-to-high"){
        const sortedItems = [...items].sort((a, b) => a.quantity - b.quantity);
        return {
            ...appData,
            items: sortedItems
        };
    }

    if(option === "letter"){
        const collator = new Intl.Collator("ja", {
            numeric: true,
            sensitivity: "base"
        });

        const sortedItems = [...items].sort((a, b) => collator.compare(a.name, b.name));

        return {
            ...appData,
            items: sortedItems
        }
    }

    if(option === "last-update"){
        const eachLastUpdate = items.map(item => {
            const lastUpdate = getLastUpdate(appData, item);

            if(lastUpdate){
                return {
                    id: item.id,
                    lastHistory: new Date(lastUpdate.timestamp)
                }
            }
            return {
                id: item.id,
                lastHistory: undefined
            }
        })

        const compare = (a,b) => {
            if(!a && !b){
                return 0;
            } else if (!a){
                return 1;
            } else if(!b){
                return -1;
            }
            
            if(a > b){
                return 1;
            } else if (a < b){
                return -1;
            } else {
                return 0;
            }
        }

        const sortedItems = [...items].sort((a, b) => {
            const aHistory = eachLastUpdate.find(his => his.id === a.id).lastHistory;
            const bHistory = eachLastUpdate.find(his => his.id === b.id).lastHistory;

            return compare(aHistory, bHistory)
        });

        return {
            ...appData,
            items: sortedItems
        }
    }
}

export default sortItems;