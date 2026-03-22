import { NavLink } from "react-router";

const SidebarItem = ({ item, currentPath }) => {
    const Icon = item.icon;
    const active = currentPath === item.path;

    return (
        <NavLink
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
        ${
            active
                ? "bg-surface-dim text-primary font-bold"
                : "text-slate-600 hover:bg-surface-dim/50 font-medium"
        }`}
        >
            <Icon size={18} strokeWidth={active ? 2.5 : 2} />
            <span>{item.label}</span>
        </NavLink>
    );
};
export default SidebarItem;
