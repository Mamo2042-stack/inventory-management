import { Link } from "react-router";
import { useNavigate } from "react-router";
import "./Delete.css"

function Delete () {
    const navigate = useNavigate();

    return (
        <section className="delete">
            <nav>
                <Link to="/delete/storage">ストレージ削除</Link>
                <Link to="/delete/item">食材削除</Link>
            </nav>

            <button
                type="button"
                className="back-to-previous-button"
                onClick={() => navigate("/")}
            >⬅︎
            </button>
        </section>
    )
}

export default Delete;