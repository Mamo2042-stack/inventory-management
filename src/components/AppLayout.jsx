import { Outlet, Link } from "react-router"
import '/Users/towa/Documents/inventory-management/src/AppLayout.css'

function AppLayout () {
    return (
        <>
            <header className="app-header">
                <nav className="app-nav">
                    <Link to="/">ホーム</Link>
                    <Link to="/registration">登録</Link>
                    <Link to="/inventoryManagement">在庫管理</Link>
                    <Link to="/delete">削除</Link>
                </nav>
            </header>

            <main className="app-main">
                <Outlet />
            </main>
        </>
    )
}

export default AppLayout;