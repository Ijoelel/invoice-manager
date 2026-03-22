import { FileText, LayoutDashboard, Plus } from "lucide-react";

export const sidebarItems = [
    {
        group: "Overview",
        items: [
            {
                label: "Dashboard",
                path: "/",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        group: "Billing",
        items: [
            { label: "Invoices", path: "/invoices", icon: FileText },
            { label: "Create Invoice", path: "/invoices/create", icon: Plus },
        ],
    },
];

export const user = {
    name: "Sarah Smither",
    email: "sarahsmither@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=47",
    plan: "Professional Plan",
};
