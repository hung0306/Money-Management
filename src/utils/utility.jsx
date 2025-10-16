import Swal from "sweetalert2";

export const handleDelete = (id, transactions, setTransactions) => {
    Swal.fire({
        title: "Delete Transaction",
        text: "Are you sure you want to delete this transaction? This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "No",
        reverseButtons: true,
        confirmButtonColor: "#dc3545"
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                const updatedTransactions = transactions.filter(t => t.id !== id);
                localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
                setTransactions(updatedTransactions);
                Swal.fire("Deleted", "Transaction has been deleted.", "success");
            } catch (error) {
                console.error("Error deleting transaction:", error);
                Swal.fire("Error", "Failed to delete transaction.", "error");
            }
        }
    });
};

export const handleView = (transaction) => {
    const modalBody = document.querySelector("#viewTransactionModal .modal-body #viewTransactionDetails");
    if (modalBody) {
        modalBody.innerHTML = `
            <div className="col-md-6">
                <strong>Transaction Type:</strong> ${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
            </div>
            <div className="col-md-6">
                <strong>Category:</strong> ${transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
            </div>
            <div className="col-md-6">
                <strong>Amount:</strong> Rp${transaction.amount.toLocaleString('id-ID')}
            </div>
            <div className="col-md-6">
                <strong>Date:</strong> ${new Date(transaction.date).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
            </div>
            <div className="col-12">
                <strong>Description:</strong> ${transaction.description}
            </div>
            <div className="col-12">
                <strong>Notes:</strong> ${transaction.notes || '-'}
            </div>
            <div className="col-md-6">
                <strong>Payment Method:</strong> ${transaction.paymentMethod || 'Unknown'}
            </div>
            <div className="col-md-6">
                <strong>Tags:</strong> ${transaction.tags.length > 0 ? transaction.tags.join(", ") : '-'}
            </div>
        `;
    }
};