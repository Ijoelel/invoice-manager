import { Outlet, useLocation } from "react-router";
import Navbar from "~/shared/layout/components/Navbar";
import Sidebar from "~/shared/layout/components/Sidebar";
import { useSidebarStore } from "~/stores/sidebar/useSidebarStore";

const AppLayout = () => {
    const { isOpen } = useSidebarStore();
    const { pathname } = useLocation();

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <Sidebar />

            <div
                className={`${isOpen ? "md:pl-60" : "md:pl-20"} min-h-screen flex flex-col`}
            >
                <Navbar />

                <main className="flex-1 px-8 pb-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
export default AppLayout;
