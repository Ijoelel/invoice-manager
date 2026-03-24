import { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    PanelLeftClose,
    PanelLeftOpen,
    Plus,
} from "lucide-react";
import { sidebarItems, user } from "../config/sidebar.config";
import SidebarItem from "./SidebarItem";
import { useSidebarStore } from "~/stores/sidebar/useSidebarStore";
import { useLocation, useNavigate, useParams, useRoutes } from "react-router";

export default function Sidebar() {
    // Track which groups are collapsed. All open by default.
    const [collapsed, setCollapsed] = useState({});
    const currentPath = useLocation();
    const navigate = useNavigate();
    const { isOpen, toggle } = useSidebarStore();

    const toggleGroup = (group) =>
        setCollapsed((prev) => ({ ...prev, [group]: !prev[group] }));

    return (
        <aside
            className={`
                fixed inset-y-0 left-0 z-50 flex flex-col p-5 bg-surface-container-low border-r border-r-gray-300 transition-all duration-300
                ${isOpen ? "w-60" : "w-20"}
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
            `}
        >
            {/* Brand */}
            <div className="flex w-full justify-between items-start gap-3 mb-8">
                {isOpen && (
                    <div>
                        <span className="text-lg font-extrabold text-primary">
                            Velto
                        </span>
                        <p className="text-[10px] text-slate-500 font-semibold">
                            {user.plan}
                        </p>
                    </div>
                )}

                <button onClick={toggle}>
                    {isOpen ? (
                        <PanelLeftClose size={18} />
                    ) : (
                        <PanelLeftOpen size={18} />
                    )}
                </button>
            </div>

            {/* Create Button */}
            <button
                className={`w-full mb-6 flex items-center ${
                    isOpen ? "gap-2 px-4" : "justify-center px-2"
                } py-2.5 bg-primary text-white rounded-lg font-bold text-sm`}
            >
                <Plus size={18} />
                {isOpen && <span>Create</span>}
            </button>

            {/* Nav groups */}
            <nav className="flex-1 space-y-5 overflow-y-auto">
                {sidebarItems.map(({ group, items }) => (
                    <div key={group}>
                        {/* Group header */}
                        <button
                            onClick={() => toggleGroup(group)}
                            className="w-full flex items-center justify-between px-3 mb-1"
                        >
                            {isOpen && (
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    {group}
                                </span>
                            )}
                            {collapsed[group] ? (
                                <ChevronDown
                                    size={12}
                                    className="text-slate-400"
                                />
                            ) : (
                                <ChevronUp
                                    size={12}
                                    className="text-slate-400"
                                />
                            )}
                        </button>

                        {/* Group items */}
                        {!collapsed[group] && (
                            <div className="space-y-0.5">
                                {items.map((item) => (
                                    <div
                                        key={item.path}
                                        onClick={() => navigate(item.path)}
                                    >
                                        <SidebarItem
                                            item={item}
                                            currentPath={currentPath.pathname}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Upgrade card */}
            <div className="mt-auto pt-6">
                {/* user */}
                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/10">
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 overflow-hidden">
                        <p className="text-[11px] font-bold text-on-surface truncate">
                            {user.name}
                        </p>
                        <p className="text-[9px] text-slate-400 truncate">
                            {user.email}
                        </p>
                    </div>
                    <ChevronDown
                        size={14}
                        className="text-slate-400 shrink-0"
                    />
                </div>
            </div>
        </aside>
    );
}
