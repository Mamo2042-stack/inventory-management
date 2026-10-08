import { useState } from 'react';

function Delete ({ setWhichToDel}) {
    return (
        <div>
            <button
                id="delete-storage-btn"
                onClick={() => setWhichToDel("storage")}
            >
                ストレージ
            </button>

            <button
                id="delete-item-btn"
                onClick={() => setWhichToDel("item")}
            >
                食材
            </button>
        </div>
    )
}

export default Delete;