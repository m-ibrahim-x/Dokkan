import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../../shared/layout/navbar";
import Footer from "../../shared/layout/footer";

const MainLayout = () => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    return (
        <div className="space-y-8">
            <Navbar />

            <main className={isHomePage ? "" : "pt-20 sm:pt-24"}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default MainLayout;