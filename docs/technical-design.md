# Inventory Management Application - Technical design
## 1. Overview

This documents describes the technical design of the Inventory Management Application.

The application is a responsive web application for managing restaurant inventory.
The MVP will run entirely in the browser and use`localStorage` for persistant data storage.

The main technical goals are:

- Keep the application architecture simple enough for the MVP.
- Separate UI components from business logic.
- Keep inventory-related operations predictable and testable.
- Persist application data between browser sessions.
- Make the architecture extensible for a future backend and database.

## 2. Technology Stack

| Area | Technology |
| --- | ---| 
| Frontend | React |
| Build tool | Vite |
| Language | Java Script |
| Styling | CSS |
| Persistence | Browser `localStorage` |
| Version Control | Git |

The MVP does not require a backend or database.

## 3. Architecture

The application uses a client-side architecture.

User
  ↓
React UI
  ↓
App.jsx
  ↓
Application Operations
  ↓
Application State
  ↓
Persistence Layer
  ↓
localStorage

The main responsibilities are separated into three areas:

**Components**

Responsible for:

- Rendering the user interface
- Receiving data through props
- Handling user interaction
- Calling handlers supplied by parent components

Components should not directly manipulate data stored in `localStorage` or implement inventory business rules.

**Operations**

Responsible for: 

- Registering data
- Updating inventory
- Creating orders
- Receiving orders
- Deleting data
- Validating business rules
- Creating history records when appropriate

Each operation receives the current application data when needed and returns updated data.

**Persistence**

Responsible for:

- Loading application data from `localStorage`
- Saving application data to `localStorage`

The persistence layer should not contain UI logic or inventory business rules.

## 4. Application State

The application's central state is stored in `App.jsx`.

```text
const [appData, setAppData] = useState({
    storages: [],
    items: [],
    inventoryHistory: []
});
```

`appData` is an object that contains three top-level collections:

- `storages`: This is registered storages
- `items` : This is responsible for registered items and related information to those items
- `inventoryHistory`: This is responsible for history records of inventory changes

React state represents the application's current in-memory state.

`localStorage` is only used for persistence and is not treated as the application's active state.

## 5. Component Structure

The main component structure is:
```text
APP
├── Home
├── Registration
│       ├── StorageRegistration
│       └── ItemRegistration
├── InventoryManagement
│           ├── ItemList
│           │        └── ItemCard
│           │
│           ├── ItemInteractiveView
│           ├── PendingOrderManagement
│           │             ├── PendingOrderList
│           │             │            └── PendingOrder
│           │             │                        └── ReceiveOrderForm
│           │             └── CreateOrderForm
│           └── InventoryHistory
│
└── DeleteSection
            ├── DeleteStorage
            └── DeleteItem
```

**App**

`App` is the root coordinator.

Responsibilities:

- Own `appData`
- Own applicaiton-level navigation state
- Provide event handlers to child components for operations
- Compose the major application views

`App` should not contain detailed inventory business logic.

**ItemList**

Responsibilities:

- Display registered items
- Display basic information about each item
- Provide filetering and sorting
- Provide an interactive user interface for each item to select an item

**ItemCard**

Responsibilities: 

- Display basic information about one item
- Allow the user to select the item

An `ItemCard` should not contain inventory adjustment logic.

**ItemInteractiveView**

Responsibilities:

- Allow the user to adjust inventory quantity
- Provide navigation to inventory history of the item
- Provide navigation to pending-order management section of the item

**PendingOrderManagement**

Responsibilities:

- Display the user pending orders of an selected item
- Provide order creation
- Provide order receiving

**InventoryHistory**

Responsibilities:

- Display history records of selected item's inventory changes
- Display previous quantity, new quantity, action, and timestamp

## 6. Navigation State

The applicaiton will initially use simple React state for navigation rather than introducing a routing library.

The navigation state will represent:

- The current major section
- The currently selected item, when applicable
- The current view within Inventory Management

The exact state structure and rendering conditions will be defined based on the application's navigation flow.

For example: 

```text
const [selectedItemId, setSelectedItemId] = useState(null);
```

When no item is selected:

ItemList 
is displayed.

When an item is selected:

ItemInteractionView 
is displayed.

The selected item can be cleared to return to the item list.

Additional application-level view state can be introduced if the number of views grows enough to justify it.

## 7. Component Data Flow

Data flows down through props.

User actions flow upward through callback functions.

Example:

```text
ItemManagement
 ↓
ItemList
 │
 ├── item 
 ↓
ItemCard
 │
 └── onSelect()
 ↓
ItemManagement
 │
 └── selectedItemId
 ↓
ItemInteractiveView
```

selectedItemId manages the item users currently focus on.

## 8. Operation Layer

Business operations are implemented as pure application functions where practical.

Each operation receives the current application data and returns updated application data.

**Register Storage**

registerStorage(appData, storageData)

Responsibilities:

- Validate the input
- Create a unique storage ID
- Add the new storage
- Return Updated application data

**Register Item**

registerItem(appData, itemData)

Responsibilities:

- Validate the input 
- Validate the referenced storage
- Create a unique item ID
- Add the item 
- Return updated application data

**Adjust Inventory**

adjustInventory(appData, itemId, changeTo)

Responsibilities: 

- Validate the item
- Validate the adjustment quantity
- Ensure the output of calculation is not negative
- Update the item
- Create an `InventoryHistory` records
- Return updated application data

**Create Order**

createOrder(appData, itemId, orderData)

Responsibilities:

- Validate the item
- Validate the order data
- Create a pending order
- Add it to the item's `pendingOrders`
- Return updated application data

This operation does not create an inventory history record.

**Receive Order**

receiveOrder(appData, itemId, orderId, receivedQuantity)

Responsibilities:

- Validate the item
- Validate the order
- Validate the received quantity
- Update `receivedQuantity`
- Increase the current quantity 
- Remove the order if fully received
- Leave the order pending if partially received
- Create a `InventoryHistory`

**Delete Item**

deleteItem(appData, itemId)

Responsibilities:

- Validate the item
- Delete the item, its pending orders, and relating inventory history records
- Update application data
- Return application data

**Delete Storaeg**

deleteStorage(appData, storageId)

A storage can be deleted only when empty.

Responsibilities:

- Validate the storage
- Ensure it's empty before deletion
- Update application data
- Return application data

## 9. React Integration

React event handlers in `App.jsx` connect UI actions to each operation.

For example:

```text
function handleAdjustInventory (itemId, quantity, direction) {
    setAppData(currentData => 
        adjustInventory(currentData, itemId, quantity, direction)
    );
}
```

The operation itself does not call `setAppData`.

This keeps React-specific state management separate from appliation business logic.

## 10. Validation and Error Handling

Business validation is performed in the operation layer.

For example, `adjustInventory()` must reject:

- Item ids that don't exist
- Quantity less than or equal to zero
- Decrease by a nubmer larger than a current quantity

The UI may perform additional validation to provide an immediate indicater for users to notify the invalid input, but this is not the authoritative source of business rules.

The final error-reporting mechanism will be determined alongside the implementation.

## 11. Persistence

The application uses `localStorage` for the MVP

**Loading**

When the application starts:

```text
localStorage
 ↓
loadAppData()
 ↓
React initial state
```

Conceptually:

```text
const [appData, setAppDada] = useState(() => loadAppData());
```

**Saving**

When application state changes:

```text
React state changes
 ↓
saveAppData(appData)
 ↓
localStorage
```

A React effect can be used for persistence:

```text
useEffect(() => {
    saveAppData(appData);
}, [appData]);
```

## 12. Data Relationships

- Each item in `items` is associated with a storage with `storageId`
- Each item can contain several pending orders in `pendingOrders`
- Each inventory history record is associated with a correcponding item with `itemId`.

## 13. Derived Data

Some information will not be stored. 
They will be calculated or referenced from other data.

For example:
```text
const isLowStock = item.quantity < item.expectedQuantity;
```

Low-Stock status is therefore derived from the current item data.

Other derived data: 

- Latest updata: This represents a date when an item was updated. This derives from `timestamp` in inventory history record.

## 14. Unique IDs

Some entities require unique IDs to identify their stored elements.

The mechanism for generating IDs will be determined alongside the implementation.

## 15. Testing Strategy

Testing will initially focus on application operations because they contain the main business rules.

Important cases include:

**Inventory Adjustment**

This allows users to update inventory quantity.

- Increase quantity
- Decrease quantity
- Decrease to zero
- Attempt to decreae below zero
- Attempt to input zero or negative number
- Unkown item ID

**Pending orders**

This invloves management and handling operations on pending orders.

- Create an order
- Receive an order partially
- Receive an order completely
- Attempt to input larger received quantity than remaining 
- Unknown item ID and order ID

**Deletion of item**

- Delete an item
- Verify its pending orders are removed
- Verify its inventory history is removed

**Deletion of storaeg**

- Delete a storage
- Verify a storage is empty

UI testing will be added after the core operations are implemented.

## 16. Future Architecture

The MVP intentionally avoids a backend and database.

If the application later needs to support multiple devices and users accesses, the architecture can evolve toward:

```text 
React Frontend
    ↓
API / Backend
    ↓
Database
```

The current separation between components, operations, and persistence is designed for later architectual upgrade as the application grows up.

