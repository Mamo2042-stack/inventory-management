import { useState } from "react";
import DeleteStorageList from "./DeleteStorageList";
import DeleteStorageForm from "./DeleteStorageForm";
import { useNavigate } from "react-router";

function DeleteStorage (){
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [viewMode, setViewMode] = useState("storage-list");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate();

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
                    <p>ストレージが削除されました。</p>

                    <button
                        type="button"
                        onClick={() => setSuccessMsg("")}
                    >✕
                    </button>
                </div>
            )}

            <button
                type="button"
                onClick={() => navigate("/delete")}
            >⇠                
            </button>
        </section>
    )
}

export default DeleteStorage;