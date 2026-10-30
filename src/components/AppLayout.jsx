import { Outlet, Link } from "react-router"
import { useAppData } from "../context/AppDataContext";
import DataError from "./DataError";
import './AppLayout.css'

function AppLayout () {
    const { loadStatus } = useAppData();

    if(loadStatus === "invalid"){
        return <DataError />;
    }

    return (
        <div className="app-layout">
            <header className="app-header">
                <nav className="app-nav">
                    <Link to="/" className="nav-link">ホーム</Link>
                    <Link to="/registration" className="nav-link">登録</Link>
                    <Link to="/inventoryManagement" className="nav-link">在庫管理</Link>
                    <Link to="/delete" className="nav-link">削除</Link>
                </nav>
            </header>

            <main className="app-main">
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout;