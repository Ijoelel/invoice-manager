import { useState } from "react";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { sidebarItems, user } from "../config/sidebar.config";
import SidebarItem from "./SidebarItem";

const NavLink = ({ item, currentPath }) => {
    const Icon = item.icon;
    const active = currentPath === item.path;

    return (
        <a
            href={item.path}
            onClick={(e) => e.preventDefault()}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
        ${
            active
                ? "bg-surface-dim text-primary font-bold"
                : "text-slate-600 hover:bg-surface-dim/50 font-medium"
        }`}
        >
            <Icon size={18} strokeWidth={active ? 2.5 : 2} />
            <span>{item.label}</span>
        </a>
    );
};

export default function Sidebar() {
    // Track which groups are collapsed. All open by default.
    const [collapsed, setCollapsed] = useState({});
    const [currentPath, setCurrentPath] = useState("/");

    const toggleGroup = (group) =>
        setCollapsed((prev) => ({ ...prev, [group]: !prev[group] }));

    return (
        <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-60 p-5 bg-surface-container-low z-50">
            {/* Brand */}
            <div className="flex items-center gap-3 mb-8">
                <div>
                    <span className="text-lg font-extrabold tracking-tight text-primary font-headline">
                        Velto
                    </span>
                    <p className="text-[10px] text-slate-500 font-semibold">
                        {user.plan}
                    </p>
                </div>
            </div>

            {/* Create Button */}
            <button className="w-full mb-6 flex items-center justify-between px-4 py-2.5 bg-primary text-white rounded-lg font-bold text-sm shadow-card hover:bg-primary-light transition-colors">
                <div className="flex items-center gap-2">
                    <Plus size={18} />
                    Create
                </div>
                <span className="text-[10px] opacity-60">N</span>
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
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                {group}
                            </span>
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
                                        onClick={() =>
                                            setCurrentPath(item.path)
                                        }
                                    >
                                        <SidebarItem
                                            item={item}
                                            currentPath={currentPath}
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
