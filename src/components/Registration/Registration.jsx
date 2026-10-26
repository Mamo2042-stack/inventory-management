import { Link } from "react-router";
import { useNavigate } from "react-router";
import "./Registration.css"

function Registration (){
    const navigate = useNavigate();

    return(
        <div className="registration-home">
            <nav>
                <Link to="/registration/storage">ストレージ</Link>
                <Link to="/registration/item">食材</Link>
            </nav>

            <button
                type="button"
                className="back-to-previous-button"
                onClick={() => navigate("/")}
            >⬅︎
            </button>
        </div>
    )
}

export default Registration;