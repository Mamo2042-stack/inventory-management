import { useAppData } from "../context/useAppData";
import { useNavigate } from "react-router";

export function SaveDataError () {
    const { loadStatus, setLoadStatus } = useAppData();
    const navigate = useNavigate;

    function handleClick(){
        setLoadStatus("loaded");
        navigate("/");
    }

    return (
        <section>
            <h1>データの保存に失敗しました。</h1>

            {loadStatus === "unsaved_invalid" && (
                <p>無効なデータです。</p>
            )}

            {loadStatus === "unsaved_failure" && (
                <p>データ保存の不具合です。</p>
            )}

            <button 
                onClick={handleClick}
                className="clickable-button"
            >
                ホームに戻る。
            </button>
        </section>
    )
}