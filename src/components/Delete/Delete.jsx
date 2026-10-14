import { Link } from "react-router";

function Delete () {
    return (
        <section>
            <Link to="/delete/storage">ストレージ削除</Link>
            <Link to="/delete/item">食材削除</Link>
        </section>
    )
}

export default Delete;