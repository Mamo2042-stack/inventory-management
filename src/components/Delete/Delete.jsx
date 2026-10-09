import { Link } from "react-router";

function Delete () {
    return (
        <section>
            <Link to="/delete/storage"></Link>
            <Link to="/delete/item"></Link>
        </section>
    )
}

export default Delete;