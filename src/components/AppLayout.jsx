import { Outlet, Link } from "react-router"
import { useAppData } from "../context/useAppData";
import DataError from "./DataError";
import { SaveDataError } from "./SaveDataError";
import './AppLayout.css'
import { House, PenLine, FileText, Trash } from "lucide-react";

function AppLayout () {
    const { loadStatus } = useAppData();

    if(loadStatus === "invalid"){
        return <DataError />;
    }

    if(loadStatus === "unsaved_invaid" || loadStatus === "unsaved_failure"){
        return <SaveDataError />
    }

    return (
        <div className="app-layout">
            <header className="app-header">
                <nav className="app-nav">
                    <Link to="/" className="nav-link">
                        <House className="icon-for-mobile"/>
                        <p>ホーム</p>
                    </Link>
                    <Link to="/registration" className="nav-link">
                        <PenLine className="icon-for-mobile"/>
                        <p>登録</p>
                    </Link>
                    <Link to="/inventoryManagement" className="nav-link">
                        <FileText className="icon-for-mobile"/>
                        <p>在庫管理</p>
                    </Link>
                    <Link to="/delete" className="nav-link">
                        <Trash className="icon-for-mobile"/>
                        <p>削除</p>
                    </Link>
                </nav>
            </header>

            <main className="app-main">
                <Outlet />
            </main>
        </div>
    )
}

export default AppLayout;