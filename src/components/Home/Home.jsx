function Home({ setCurrentSection }) {
    return (
        <div>
            <h1>在庫管理アプリ</h1>
            <div id="selection-btn">
                <button id="registration" onClick={() => setCurrentSection("registration")}>登録</button>
                <button id="inventory" onClick={() => setCurrentSection("inventory")}>在庫管理</button>
                <button id="delete" onClick={() => setCurrentSection("delete")}>削除</button>
            </div>
        </div>
    )
}

export default Home ;