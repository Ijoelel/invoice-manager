import { Bell, Check, HelpCircle, Search, Share, Star } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router";

const Navbar = () => {
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    return (
        <header className="flex justify-between items-center w-full px-8 py-4 sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-b-gray-300">
            <div className="flex items-center gap-5 ml-auto">
                <div className="flex items-center gap-3">
                    <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                        <Share size={18} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full transition-colors relative">
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                        <HelpCircle size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
};
export default Navbar;
