import { Link } from "react-router";

function Registration (){
    return(
        <section id="registration">
            <Link to="/registration/storage">ストレージ</Link>
            <Link to="/registration/item">食材</Link>
        </section>
    )
}

export default Registration;