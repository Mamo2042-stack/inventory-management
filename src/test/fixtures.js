export const testAppData = {
    storages: [
        { id: "storage-1", name: "Freezer A" },
        { id: "storage-2", name: "Freezer B" }
    ],
    items: [
        {
            id: "item-1",
            name: "Bacon",
            storageId: "storage-1",
            quantity: 5,
            expectedQuantity: 10,
            replenishmentMethod: "ORDER",
            category: "meat",
            storageUnit: "box",
            pendingOrders: [
                {
                    id: 301,
                    orderedQuantity: 10,
                    receivedQuantity: 5,
                    orderDate: "2026-10-12T00:30:45.123Z"
                },
                {
                    id:302,
                    orderedQuantity: 3,
                    receivedQuantity: 0,
                    orderDate: "2026-10-17T05:30:45.123Z"
                }
            ]
        },
        {
            id:"item-2",
            name: "Bread",
            storageId: "storage-1",
            quantity: 2,
            expectedQuantity: 2,
            replenishmentMethod: "PURCHASE",
            category: "others",
            storageUnit: "roaf"
        }
    ],
    inventoryHistory: []
};