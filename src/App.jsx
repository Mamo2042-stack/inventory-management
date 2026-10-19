import { Routes, Route } from "react-router"
import "./App.css";
import Home from './components/Home/Home.jsx';
import Registration from './components/Registration/Registration.jsx';
import Delete from './components/Delete/Delete.jsx';
import StorageRegistration from './components/Registration/StorageRegistration.jsx';
import ItemRegistration from './components/Registration/ItemRegistration.jsx';
import InventoryManagement from './components/InventoryManagement/InventoryManagement.jsx'
import DeleteStorage from './components/Delete/DeleteStorage.jsx';
import DeleteItem from './components/Delete/DeleteItem.jsx';

import AppLayout from "./components/AppLayout.jsx";

function App () {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />

        <Route path="registration">
          <Route index element={<Registration />} />
          <Route path="storage" element={<StorageRegistration />} />
          <Route path="item" element={<ItemRegistration />} />
        </Route>

        <Route path="inventoryManagement">
          <Route index element={<InventoryManagement />} />
        </Route>

        <Route path="delete">
          <Route index element={<Delete />} />
          <Route path="storage" element={<DeleteStorage />} />
          <Route path="item" element={<DeleteItem />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;