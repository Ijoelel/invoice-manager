import { Outlet } from "react-router";
import Navbar from "~/shared/layout/components/Navbar";
import Sidebar from "~/shared/layout/components/Sidebar";

const AppLayout = () => {
    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <Sidebar />

            <div className="md:pl-60 min-h-screen flex flex-col">
                <Navbar />

                <main className="flex-1 px-8 pb-8">
                    
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
export default AppLayout;
