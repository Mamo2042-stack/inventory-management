import { Link } from "react-router";
import { useNavigate } from "react-router";

function Delete () {
    const navigate = useNavigate();

    return (
        <div>
            <nav>
                <Link to="/delete/storage">ストレージ削除</Link>
                <Link to="/delete/item">食材削除</Link>
            </nav>

            <button
                type="button"
                onClick={() => navigate("/")}
            >⇠
            </button>
        </div>
    )
}

export default Delete;