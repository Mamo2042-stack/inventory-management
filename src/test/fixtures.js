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
            quantity: 50,
            expectedQuantity: 100,
            replenishmentMethod: "ORDER",
            category: "meat",
            storageUnit: "box",
            pendingOrders: [
                {
                    id: 301,
                    orderedQuantity: 100,
                    receivedQuantity: 50,
                    orderDate: "2026-10-12T00:30:45.123Z"
                },
                {
                    id:302,
                    orderedQuantity: 30,
                    receivedQuantity: 0,
                    orderDate: "2026-10-17T05:30:45.123Z"
                }
            ]
        },
        {
            id:"item-2",
            name: "Bread",
            storageId: "storage-1",
            quantity: 20,
            expectedQuantity: 20,
            replenishmentMethod: "PURCHASE",
            category: "others",
            storageUnit: "roaf"
        },
        {
            id:"item-3",
            name: "Rice",
            storageId: "storage-1",
            quantity: 30,
            expectedQuantity: 50,
            replenishmentMethod: "ORDER",
            category: "vegetable",
            storageUnit: "kg",
            pendingOrders: []
        },
        {
            id:"item-4",
            name: "Chicken",
            storageId: "storage-2",
            quantity: 30,
            expectedQuantity: 50,
            replenishmentMethod: "ORDER",
            category: "meat",
            storageUnit: "kg",
            pendingOrders: []
        }
    ],
    inventoryHistory: []
};