import { ChevronLeft } from "lucide-react";
import InvoiceForm from "./InvoiceForm";

const CreateInvoicePage = () => {
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center justify-center">
                    <ChevronLeft className="w-6" />
                    <h1 className="text-xl font-bold">Create Invoice</h1>
                </div>
            </div>

            {/* Main */}
            <section>
                <InvoiceForm />
            </section>
        </div>
    );
};
export default CreateInvoicePage;
