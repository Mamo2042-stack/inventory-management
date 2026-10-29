# Inventory Management Application - User Flows

## 1. Overview

This document describes the main workflows users can perform in the application and how the application handles data during each workflow.

The main workflows are:

* Register a storage location
* Register an item
* Update inventory quantity
* Create a pending order
* Receive a pending order
* Delete an item
* Delete a storage
* View inventory history
* Identify low-stock

## 2. Register a Storage Location

### 2.1 Purpose

Users can register storage locations for physical storage where each item is kept.

### 2.2 Flow

```text
User

  ↓

Open storage registration

  ↓

Submit

  ↓

Validate the input

  ↓

Create Storage

  ↓

Storage becomes available for item registration
```

### 2.3 Data Changes

A new `Storage` is created in this format.

```text
Storage {

    id,
    name

}
```

## 3. Register an Item

### 3.1 Purpose

Allow users to register an inventory item and associate it with a registered storage location.

### 3.2 Flow

```text
User

  ↓

Open item registration

  ↓

Fill out the form to enter the item's information

  ↓

Submit

  ↓

Validate the input

  ↓

Create the item

  ↓

Item becomes available for managing its inventory
```

### 3.3 Data Changes

A new `Item` is created with the initial information users submit.

```text
Item {

    id,

    name,

    storageId,

    quantity,

    expectedQuantity,

    replenishmentMethod,

    category,

    storageUnit,

    pendingOrders: []

}
```

## 4. Update Inventory Quantity

### 4.1 Purpose

Allow users to adjust the quantity of items when there is a difference between the recorded quantity and physical quantity, by increasing or decreasing it.

### 4.2 Flow

```text
User

  ↓

Select an item

  ↓

Choose increase or decrease

  ↓

Enter a number to adjust quantity

or

Clicking on a UI button

  ↓

Submit

  ↓

Validate input

  ↓

Update Item.quantity

  ↓

Create InventoryHistory
```

For valid input, user input must follow:

```text
adjustment >= 0

if decreasing:

adjustment <= current inventory quantity
```

### 4.3 Data Changes

If a user attempts to update inventory quantity:

Before:

```text
Item.quantity = 2
```

The user adds 2:

Then:

```text
Item.quantity = 4
```

Then, a history record is created:

```text
InventoryHistory {

    id,

    itemId,

    userAction,

    previousQuantity: 2,

    newQuantity: 4,

    timestamp

}
```

### 4.4 Result

The current inventory quantity is updated and the change is recorded in `InventoryHistory`.

## 5. Create a Pending Order

### 5.1 Purpose

Allow users to record an order that has been placed but has not yet been fully received.

### 5.2 Flow

```text
User

  ↓

Select an item

  ↓

Create an order

  ↓

Enter ordered quantity

  ↓

Submit

  ↓

Validate input

  ↓

Create PendingOrder

  ↓

Add PendingOrder to the item's pending orders
```

### 5.3 Data Changes

A new `PendingOrder` is created and stored in the item's pending orders.

```text
pendingOrders [

    {

        id,

        orderedQuantity,

        receivedQuantity: 0,

        orderDate

    }

]
```

The current inventory quantity doesn't change at this point because the order has not yet been received.

However, the unreceived quantity should be shown on the item card, separately from its current quantity.

## 6. Receive a Pending Order

### 6.1 Purpose

Allow users to add to the current inventory quantity based on receipt of pending orders and complete pending orders when they have been fully received.

### 6.2 Flow

```text
User

  ↓

Select an item

  ↓

Select a pending order

  ↓

Enter quantity received

  ↓

Submit

  ↓

Validate input

  ↓

Increase the current inventory quantity

  ↓

Create InventoryHistory

  ↓

Update receivedQuantity

  ↓

Evaluate whether the order is fully received.
```

For input validation, the system only allows users to input:

```text
receivedQuantity <= orderedQuantity

receivedQuantity > 0

additional receivedQuantity <= remaining quantity
```

### 6.3 Partial Delivery

If the received quantity is lower than the ordered quantity, this is considered incomplete.

```text
Pending order:

orderedQuantity: 10

receivedQuantity: 0

        ↓

Receive 4

        ↓

receivedQuantity: 4
```

Now,

```text
receivedQuantity < orderedQuantity
```

The order remains pending and in `pendingOrders` of the belonging item.

The current inventory quantity is also increased by the received quantity.

```text
Current quantity: 2

        ↓

Receive 4

        ↓

Current quantity: 6
```

Then an `InventoryHistory` record is created.

### 6.4 Full Delivery

If the order has been fully received:

```text
Pending order

orderedQuantity: 10

receivedQuantity: 4

        ↓

User receives 6

        ↓

additionalReceivedQuantity = 6

        ↓

receivedQuantity: 10
```

Now,

```text
receivedQuantity = orderedQuantity
```

This is considered a complete order.

The pending order is removed from `pendingOrders` of the belonging item.

The current inventory quantity is also increased by the received quantity.

A new `InventoryHistory` record is created.

## 7. Delete an Item

### 7.1 Purpose

Allow users to remove a previously registered item from the inventory.

### 7.2 Flow

```text
User

  ↓

Select an item

  ↓

Request deletion

  ↓

Confirm deletion

  ↓

Delete item
```

### 7.3 Related Data

The treatment of related `PendingOrder` and `InventoryHistory` records has not yet been finalized.

This behavior will be determined separately.

## 8. View Inventory History

### 8.1 Purpose

Allow users to review records of inventory change history.

### 8.2 Flow

```text
User

  ↓

Select an item

  ↓

Open inventory history

  ↓

Access the item's inventory history
```

### 8.3 Information Displayed

Each history record should contain:

* User action
* Timestamp
* Previous quantity
* New quantity

This information helps users understand how the item's quantity has changed over time.

## 9. Identify Low Stock

### 9.1 Purpose

Identify whether each item needs to be replenished based on expected quantity.

### 9.2 Rule

For the filtering feature:

```text
quantity < expectedQuantity
```

For the low-stock indicator on item cards:

```text
quantity + upcomingQuantity < expectedQuantity
```

### 9.3 Flow

```text
Item quantity changes

        ↓

Compare the current quantity with expected quantity

        ↓

Current quantity < expectedQuantity?

        /               \

      Yes               No

       ↓                 ↓

    Low-Stock          Normal
```

Low-stock status is derived from the current item data and does not need to be stored separately.

## 10. Workflow Relationship

The major workflow can be summarized as:

```text
Register Storage

        ↓

Register Item

   ┌───┼───────────────┐

   ↓   ↓               ↓

Update  Create Order    View History

   ↓         ↓

History    Pending Order

              ↓

        ┌─────┴─────┐

        ↓           ↓

     Partial       Full

        ↓           ↓

   Remains       Removed

   Pending       from Pending

        ↓           ↓

        └─────┬─────┘

              ↓

           History
```
