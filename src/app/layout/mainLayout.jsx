import { Outlet } from "react-router-dom";
import Navbar from "../../shared/layout/navbar";
import Footer from "../../shared/layout/footer";

const mainLayout = () => {
    return (
        <div className="space-y-8">
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}


export default mainLayout