import QueryProvider from "./QueryProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return <QueryProvider>{children}</QueryProvider>;
};

export default AppProvider;
