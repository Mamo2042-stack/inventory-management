# Inventory management Application - Requirements
## 1. Over View
### 1.1 Purpose

This application is designed to help workers keep track of each item in inventories, without having to manually checking out stocks and inventories periodically.

### 1.2 Problem

The current system for inventory tracking is done by staffs manually checking out each item, potentially causing overlooking or miscounting. Additionally, the difficulty and unclear visibility of checking items stored at the bottom of freezers makes it inefficient to get the inventory checking done, taking much time, which in turn, leads to more electoricity use.

### 1.3 Target Users

-Staff responsible for inventory management

## 2. Goals

This application should: 

-Eliminate the necessity for manual ocasional checking
-Maintain a history of inventory changes
-Update quantity of stocked items
-Help users track items that have been ordered but not yet received
-Help users identify items that require replenishment

## 3. MVP

The MVP will include: 

-Storage-location management
-Item registration and management
-Inventory quantity management
-Inventory history
-Expected-quantity management
-Low-stock identification
-Replenishment management
-Pending-order management
-Item filtering and sorting
-Responsive user interface
-Local data persistence

The MVP will not include: 

-Advanced data analytics
-Barcode scanning
-Supplier management
-Multiple users for the same inventory
-Convert between storage units and purchasing units automatically
-Cloud-based data synchronization

## 4. Functional Requirements

### FR-001 - Register Inventories

The user must be able to register multiple storage locations
where inventory items are kept.

Each storage location must contain:
-Id
-Name

### FR-002 - Register Items

The user must be able to register items the user stores in their inventories.

Each item must contain:

-Name
-Id
-Storage Id
-Quantity
-ExpectedQuantity
-ReplenishmentMethod
-Category
-Storage Unit
-Last update

### FR-003 - Update Inventory Quantity

The user must be able to update the current quantity of an item.

### FR-004 - Delete Items

The user must be able to delete an item from the list of registered items.

### FR-005 - Delete Storages

The user must be able to delete a storage.
The user must not be able to delete a storage if it has any items stored in.

### FR-006 - Record Inventory History

The user must be able to record history of each inventory change and user activity.

Each history must contain: 

-Id
-Item Id
-Previous quantity
-New quantity
-Timestamp
-User action

### FR-007 - View Current Inventory State

The user must be able to view a current inventory state.

Inventory information must contain:

-Item
-Latest update when applicable
-Current quantity
-Expected quantity when applicable
-Storage location
-Pending order status, when applicable
-Replenishment status, when applicable

### FR-008 - View Inventory History

The uesr must be able to view inventory changes.

### FR-009 - Filter Items 

The uesr must be able to filer items by catogeries.

### FR-010 - Sort Items 

The uesr must be able to sort out items based on criterion.

### FR-011 - Set Expected Quantity

The uesr must be able to set an expected quantity for each item.

### FR-012 - Identify Low-Stock Items

The application must identify items whose current quantity
is below their expected quantity.

Business Rule:
An item is considered low-stock when:

current quantity < expected quantity

if there are any pending orders, the unreceived quantity should be included in the current quantity.
This helps prevent users from accidentally ordering items unnecessary.

### FR-013 - Notify Users of Low Stock

The system must inform the user when an item requires attention because of its inventory state.

The system must indicate:

-When an item is below its expected quantity

The indication must be available when:

-The user checks the current inventory state
-The user updates or withdraws inventory
-The user manages replenishment

#### AC-013-1

When an inventory update causes an item's quantity to fall below its expected quantity, the system must indicate that the item is low-stock.

### FR-014 - Create Pending Orders

For items replenished by ordering, the user must be able to record orders that have been placed but not yet fully received.

An item may have zero or more pending orders.

Each order must contain:

-Id
-Ordered quantity
-Received quantity
-Order date

Unit for each order must match the storage unit of the corresponding item.

### FR-015 — Display Pending Orders

The system must indicate when an item has a pending order.

#### AC-015-1

When the user checks an item's inventory, the system must display any pending orders associated with that item.

#### AC-015-2

The system must distinguish pending quantities from currently available inventory quantities.

### FR-016 — Receive Pending Orders

The user must be able to record quantities received for a pending order.

When receiving an order, the user must:

Enter the quantity received.
Indicate whether the order was fully delivered.

The system must:

-Increase the item's current inventory quantity by the received quantity.
-Record the inventory change in inventory history.
-Update the received quantity of the pending order.
-If the order was fully delivered, remove the order from the item's pending orders.
-If the order was not fully delivered, keep its status as pending.

#### AC-016-1

If an order is not fully delivered, the order must remain pending after the received quantity has been recorded.

#### AC-016-2

When a pending order is fully received, the system must remove the order from the item's pending orders.

### FR-017 - Set Replenishment Method

The user must specify how an item is normally replenished.

The system must support at least:

-Ordering
-Manual purchase

### FR-018 - Apply Replenishment Rules Based on Method

The system must apply replenishment functionality according to the item's replenishment method.

For items replenished by ordering:

-The user must be able to create and manage pending orders.

For items replenished by manual purchase:

-The item must not be treated as having a pending order.
-Low-stock identification must still apply.

## 5. Non-Functional Requirements

### NFR-001 - Responsive Design

The application must be usable on both smartphones and computers.

### NFR-002 - Data Persistence 

Inventory and history data must persist after the application is closed and reopened.

### NFR-003 - Data Validation

The application must prevent invalid inventory data from being submitted.

### NFR-004 - Usability

The application should allow users to perform frequent inventory-management operations efficiently, particularly quantity updates and replenishment-related actions.

## 6. Future Considerations

Potential future features include: 

-Multiple users
-User authenticaion and authorization
-Data synchoronization across devices
-Data analytics
-Cloud database
-Automatic conversion between purchasing units and storage units
-Reorder URLs or direct links to ordering sources

## 7. Open Questions

-Should users be able to attach a URL for reordering an item?
-Should users be able to change an item's storage location after registration?
-Should an item be allowed to exist in multiple storage locations?
-Should reorder URLs be associated with an item or with a specific supplier/order?