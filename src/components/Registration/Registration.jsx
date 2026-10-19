import { Link } from "react-router";
import { useNavigate } from "react-router";

function Registration (){
    const navigate = useNavigate();

    return(
        <div>
            <nav>
                <Link to="/registration/storage">ストレージ</Link>
                <Link to="/registration/item">食材</Link>
            </nav>

            <button
                type="button"
                onClick={() => navigate("/")}
            >⇠
            </button>
        </div>
    )
}

export default Registration;