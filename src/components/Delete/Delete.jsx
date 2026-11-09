import { Link } from "react-router";
import { useNavigate } from "react-router";
import "./Delete.css"
import { ArrowBigLeft } from "lucide-react";

function Delete () {
    const navigate = useNavigate();

    return (
        <section className="delete">
            <h1>削除</h1>

            <nav>
                <Link to="/delete/storage">ストレージ削除</Link>
                <Link to="/delete/item">食材削除</Link>
            </nav>

            <button
                type="button"
                className="back-to-previous-button clickable-button"
                onClick={() => navigate("/")}
            ><ArrowBigLeft size={20}/>
            </button>
        </section>
    )
}

export default Delete;