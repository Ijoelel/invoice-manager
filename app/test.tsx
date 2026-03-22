import { useQuery } from "@tanstack/react-query";

const Test = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["test"],
        queryFn: async () => {
            const res = await fetch("http://localhost:3000/invoices");
            return res.json();
        },
    });

    if (isLoading) return <div>Loading...</div>;

    return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Test;
