import { useAppData } from "../context/useAppData";
import { useNavigate } from "react-router";
import { loadAppData } from "../persistence/loadAppData";

export function SaveDataError () {
    const {loadStatus, setLoadStatus, restoreAppData } = useAppData();
    const navigate = useNavigate();

    function handleClick(){
        const previousSavedData = loadAppData(); 

        if(previousSavedData.status === "invalid") {
            setLoadStatus("invalid");
            return;
        }     
        
        restoreAppData(previousSavedData.data);
        navigate("/");
    }

    return (
        <section>
            <h1>データの保存に失敗しました。</h1>

            {loadStatus === "unsaved_invalid" && (
                <p>データに問題が見つかったため、保存できませんでした。</p>
            )}

            {loadStatus === "unsaved_failure" && (
                <p>ブラウザの保存領域に問題がある可能性があります。</p>
            )}

            <p>保存されていない変更内容を破棄して、
                最後に保存された状態に戻します。
            </p>

            <button 
                onClick={handleClick}
                className="clickable-button"
            >
                変更を破棄して、ホームに戻る
            </button>
        </section>
    )
}