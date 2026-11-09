import { useAppData } from "../../context/useAppData";
import { useState } from "react";
import deleteStorage from "../../operations/deleteStorage";
import { useNavigate } from "react-router";
import { SquareExclamationPoint, ArrowBigLeft } from "lucide-react";

function DeleteStorageForm({ selectedStorage, isModalOpen, setIsModalOpen }){
    const { appData, setAppData } = useAppData();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const navigate = useNavigate();

    function handleClick(){
        const result = deleteStorage(appData, selectedStorage);

        if(!result.success){
            console.log(result.error);
            return;
        }

        setAppData(result.data);
        setIsSuccessModalOpen(true)
    }

    const selectedStorageData = appData.storages.find(storage => storage.id === selectedStorage)

    return (
        <div className={`confirmation-modal ${isModalOpen ? "is-open" : ""}`}>
            {!isSuccessModalOpen && (
                <div className="confirmation-section">
                    <div>
                        <p className="selected-storage-name">{selectedStorageData?.name}</p>

                        <p className="confirmation-message">
                            <SquareExclamationPoint />
                            本当に削除しますか？
                        </p>

                        <button
                            type="button"
                            className="clickable-button"
                            onClick={handleClick}
                        >確定
                        </button>
                    </div>

                    <button
                        type="button"
                        className="back-to-previous-button clickable-button"
                        onClick={() => setIsModalOpen(false)}
                    ><ArrowBigLeft size={18}/>
                    </button>
                </div>
            )}

            {isSuccessModalOpen && (
                <div className="success-section">
                    <p>ストレージが削除されました。</p>

                    <button
                        type="button"
                        onClick={() => navigate("/")}
                    >ホームに戻る
                    </button>
                </div>
            )}
        </div>
    )
}

export default DeleteStorageForm;