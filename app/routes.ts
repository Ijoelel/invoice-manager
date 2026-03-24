import {
    type RouteConfig,
    route,
    index,
    layout,
    prefix,
} from "@react-router/dev/routes";

export default [
    // layout utama
    layout("./layout/AppLayout.tsx", [
        // dashboard
        index("./features/dashboard/pages/DashboardPage.tsx"),

        // invoices

        ...prefix("invoices", [
            index("./features/invoices/pages/InvoiceListPage.tsx"),
            route("create", "./features/invoices/pages/CreateInvoicePage.tsx"),
            route(":id", "./features/invoices/pages/InvoiceDetailPage.tsx"),
        ]),

        // customers (bonus)
        ...prefix("customers", [
            route(":id", "./features/customers/pages/CustomerProfilePage.tsx"),
        ]),
        route("/test", "./test.tsx"),
    ]),
] satisfies RouteConfig;
