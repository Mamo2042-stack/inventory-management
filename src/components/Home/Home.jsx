import { Link } from "react-router";
import '/Users/towa/Documents/inventory-management/src/components/Home/Home.css'

function Home() {
    return (
        <section>
            <h1>在庫管理アプリ</h1>
            <div className="section-links">
                <Link to="/inventoryManagement" className="inventory-link">
                    在庫管理
                </Link>

                <div className="secondary-links">
                    <Link to="/registration" className="registration-link">
                        登録
                    </Link>

                    <Link to="/delete" className="delete-link">
                        削除
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Home ;