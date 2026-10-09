import { Link } from "react-router";

function Home() {
    return (
        <section>
            <h1>在庫管理アプリ</h1>
            <div id="selection-btn">
                <Link to="/registration">登録</Link>
                <Link to="/inventoryManagement">在庫管理</Link>
                <Link to="/delete">削除</Link>
            </div>
        </section>
    )
}

export default Home ;