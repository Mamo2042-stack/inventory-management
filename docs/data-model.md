# Inventory Management Application - Data Model
## 1. Overview

The application manages inventory items stored in different storage locations.

The main entities are:

-Storage
-Item
-Inventory History

The relation ship between these entities are:

```text

Storage
   |
   | 1 to many
   |
   ▼
  Item
   │
   ├── pendingOrders[]
   │
   └── InventoryHistory
```

## 2. Storage

A `Storage` represents a physical location where inventory items are stored.

### 2.1 Properties

| Property | Description|
| --- | ---|
| id | Unique identifier for each storage|
| name | Individual Storage name|

### 2.2 Example

```text
Storage {
    id: 1,
    name: "Freeser A"
}
```

### 2.3 Relationship

Each Storage can contain multiple items.

```text
Storage1
|-- Item A
|-- Item B
|-- Item C
```

## 3. Item

An `Item` represents an inventory item that user manages.

### 3.1 Properties

| Property | Description |
| --- | --- |
| id | Unique identifier |
| name | Individual name |
| storageId | Identifier that indicates which storage an item is kept in| 
| quantity | Current quantity of an item|
| expectedQuantity | Quantity of an item expected to stored |
| replenishmentMethod | Determines how an item is restocked | 
| category | Categorizes an item |
| storageUnit | Unit used to represent an item's inventory quantity|
| pendingOrders | A list of pending orders when applicable |


### 3.2 Example

```text
Item {
    id: 1,
    name: "Bacon"
    storageId: 1,
    quantity: 3,
    expectedQuantity: 5,
    replenishmentMethod: "ORDER",
    category: "Meat",
    storageUnit: "box"
    pendingOrders: []
}
```

### 3.3 Relationship

An item belongs to one storage location.

An item can contain zero or more pending orders.

A pending order belongs to exactly one item.

When pending order is fully received, the pending order must be removed.

Each `InventoryHistory` record references the item through `itemId`.

```text
Item 1 ───────< InventoryHistory
```

## 4. Pending Order

A `pendingOrder` represents an order that have been placed but has not yet been fully received.

### 4.1 Properties

| Property | Description |
| --- | --- |
| id | Unique identifier for each order |
| orderedQuantity | Quantity of the item being ordered |
| receivedQuantity | Quantity of an item that have been received |
| purchasingUnit | Unit used when ordering an item |
| orderDate | Date the order was placed |

### 4.2 Example

```text
item {
    id: 1,
    name: "Bacon",
    storageId: 1,
    quantity: 3,
    expectedQuantity: 5,
    replenishmentMethod: "ORDER",
    category: "Meat",
    storageUnit: "box",

    pendingOrders: [
        {
            id: 101, 
            orderedQuantity: 10,
            receivedQuantity: 6,
            purchasingUnit : "box",
            orderDate: "2026-09-28"
        },
        {
            id: 102,
            orderedQuantity: 5,
            receivedQuantity: 0,
            purchasingUnit: "box",
            orderDate: "2026-10-5"
        }
    ]
}
```

### 4.3 Lifecycle

A pending order remains in `pendingOrders` as long as it has not yet been fully received.

If: 

receivedQuantity < orderedQuantity

the order remains pending.

If: 

receivedQuantity = orderedQuantity 

the order is considered fully received and is removed from `pendingOrders`.

### 4.4 Relationship

The relationship is represented by the nested structure:

```text
Item
├── Pending Order 1
├── Pending Order 2
└── ...
```

A pending order belongs to exactly one item, and an item may contain zero or more pending orders.

## 5. Inventory History

An `InventoryHistory` record represents an inventory change caused by a user action.

### 5.1 Properties

| Property | Description |
| --- | --- |
| id | Unique identifier for each activity |
| itemId | Link to an item affected by the activity |
| userAction | A type of action a user is taking |
| previousQuantity | Quantity before the change |
| newQuantity | Quantity after the change |
| timeStamp | Time at which the change occurred |

### 5.2 Example

```text
InventoryHistory {
    id: 301,
    itemId: 1, 
    userAction: "complete a pending order"
    previousQuantity: 5,
    newQuantity: 10,
    timestamp: "2026-10-05T14:30:00+09:00"
}
```

### 5.3 Relationships

Each history record belongs to one item.

An item can contain many history records.

```text
Bacon
├── History 301
├── History 302
├── History 303
└── ...
```

### 5.4 User Actions

These are examples of possible user actions:

- UPDATE_QUANTITY
- RECEIVE_PARTIAL_ORDER
- COMPLE_ORDER

## 6. Relationships
### 6.1 Storage > Item

One storage location can contain multiple items.

The relationship is represented by: 

```text
Item.storageId → Storage.id
```

### 6.2 Item > Pending Order

One item can contain multiple pending orders.

Each pending order belongs to one item.

The relationship is represented by:

```text
Item [
    pendingOrder1,
    pendingOrder2,
    ...
]
```

### 6.3 Item > Inventory History

One item can contain many inventory change records.

Each record belongs to one item.

The relationship is represented by: 

```text
InventoryHistory.itemId → Item.id
```

## 7. Derived Values

Some information does not need to be stored directly because it can be calculated from exisiting data.

### 7.1 Low-stock

This indicates an item is low-stock when:

```text
qunatity < expectedQuantity
```

## 8. Data lifecycle Examples

### 8.1 Updating Inventory
```text
Current quantity: 5
        ↓
Physical count: 6
        ↓
Create InventoryHistory record
        ↓
Current quantity becomes 6
```

### 8.2 Creating an Order

```text
Item
quantity: 1
expectedQuanityt: 3

        ↓
Create PendingOrder
orderedQuantity: 2
receivedQuantity: 0
```

### 8.3 Receiving an Order

```text
Current quantity: 4

Pending order: 
orderedQuantity: 5
receivedQuantity: 0

        ↓
Received: 3

        ↓
Current quantity: 7
receivedQuantity: 3

        ↓
The order remains pending
```

### 8.4 Completing an Order

```text
Pending order:
orderedQuantity: 5

        ↓
Received: 5
The order is fully received

        ↓
Remove the order from the pending orders
```

## 9. Deletion Consideration

When an item is deleted, related data must also be considered.

The application must determine whether:

- The item's inventory history should also be deleted.
- The item's pending orders should also be deleted.
- Historical records should be retained even after an item is deleted.

This behavior has not yet been finalized.