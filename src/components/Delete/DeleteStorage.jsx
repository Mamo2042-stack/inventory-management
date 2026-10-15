import { useState } from "react";
import DeleteStorageList from "./DeleteStorageList";
import DeleteStorageForm from "./DeleteStorageForm";

function DeleteStorage (){
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [viewMode, setViewMode] = useState("storage-list");
    const [successMsg, setSuccessMsg] = useState("");

    return (
        <section>
            <DeleteStorageList
                setSelectedStorage={setSelectedStorage}
                setViewMode={setViewMode}
            />

            {viewMode === "confirmation" && (
                <DeleteStorageForm
                    selectedStorage={selectedStorage}
                    setViewMode={setViewMode}
                    setSuccessMsg={setSuccessMsg}
                />
            )}

            {successMsg && (
                <div>
                    <p></p>

                    <button
                        type="button"
                        onClick={() => setSuccessMsg("")}
                    >閉じる
                    </button>
                </div>
            )}

        </section>
    )
}

export default DeleteStorage;