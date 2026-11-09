import { Link } from "react-router";
import { useNavigate } from "react-router";
import "./Registration.css"
import { ArrowBigLeft } from "lucide-react";

function Registration (){
    const navigate = useNavigate();

    return(
        <div className="registration-home">
            <h1>登録</h1>

            <nav>
                <Link to="/registration/storage">ストレージ</Link>
                <Link to="/registration/item">食材</Link>
            </nav>

            <button
                type="button"
                className="back-to-previous-button clickable"
                onClick={() => navigate("/")}
            ><ArrowBigLeft />
            </button>
        </div>
    )
}

export default Registration;