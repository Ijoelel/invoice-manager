import { ChevronLeft } from "lucide-react";
import InvoiceForm from "../components/InvoiceForm";

const CreateInvoicePage = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Main */}
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center justify-center">
                    <h1 className="text-xl font-bold">Create Invoice</h1>
                </div>
            </div>
            <section>
                <InvoiceForm />
            </section>
        </div>
    );
};
export default CreateInvoicePage;
