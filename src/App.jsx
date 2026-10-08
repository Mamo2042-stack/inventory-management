import { useState } from 'react';
import Home from './components/Home/Home.jsx';
import Registration from './components/Registration/Registration.jsx';
import Delete from './components/Delete/Delete.jsx';
import StorageRegistration from './components/Registration/StorageRegistration.jsx';
import ItemRegistration from './components/Registration/ItemRegistration.jsx';
import DeleteStorage from './components/Delete/DeleteStorage.jsx';
import DeleteItem from './components/Delete/DeleteItem.jsx';

function App () {
  const [currentSection, setCurrentSection] = useState("home");
  const [whichReg, setWhichReg] = useState(null);
  const [whichToDel, setWhichToDel] = useState(null);

  return (
    <>
      {currentSection === "home" && (
        <Home setCurrentSection={setCurrentSection} />
      )}

      {currentSection === "registration" && 
        whichReg === null ? 
        (
          <Registration setWhichReg={setWhichReg}/>
        ) : 
        whichReg === "storage" ? 
        (
          <StorageRegistration />
        ) :
        (
          <ItemRegistration />
        )}

        {currentSection === "delete" && 
          whichToDel === null ? 
          (
            <Delete setWhichToDel={setWhichToDel} />
          ) : whichToDel === "storage" ? 
          (
            <DeleteStorage />
          ) :
          (
            <DeleteItem />
          )
        }
    </>
  );
}

export default App;