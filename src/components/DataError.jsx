import { useAppData } from "../context/AppDataContext";

function DataError(){
    const { resetAppData } = useAppData();

    return (
        <section>
            <p>無効なデータが見つかりました。</p>
            <button onClick={resetAppData}>
                データをリセットする
            </button>
        </section>
    )
}

export default DataError;