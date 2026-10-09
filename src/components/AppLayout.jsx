import { Outlet, Link } from "react-router"

function AppLayout () {
    return (
        <>
            <header>
                <nav>
                    <Link to="/">Home</Link>
                    {" | "}
                    <Link to="/registration">Registration</Link>
                    {" / "}
                    <Link to="/inventoryManagement"></Link>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
}

export default AppLayout;