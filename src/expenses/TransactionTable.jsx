import { useEffect, useState } from "react";
import { useBootstrapTooltips } from "../functions/Tooltip";
import "aos/dist/aos.css";
import AOS from "aos";
import Swal from "sweetalert2";

const TransactionTable = ({ currentPage, setCurrentPage }) => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const itemsPerPage = 5;

  useBootstrapTooltips();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
    return () => AOS.refresh();
  }, []);

  useEffect(() => {
    const loadTransactions = () => {
      try {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
          const parsed = JSON.parse(storedTransactions).filter(
            (t) => t.type === "expense"
          );
          setTransactions(parsed);
        }
      } catch (error) {
        console.error("Error loading transactions from localStorage:", error);
        Swal.fire("Lỗi", "Không thể tải giao dịch.", "error");
      }
    };

    loadTransactions();
    window.addEventListener("storage", loadTransactions);
    window.addEventListener("transactionsUpdated", loadTransactions);
    return () => {
      window.removeEventListener("storage", loadTransactions);
      window.removeEventListener("transactionsUpdated", loadTransactions);
    };
  }, []);

  const formatCurrency = (value) => {
    if (isNaN(value) || value === null || value === undefined) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTypeColor = (type) => {
    return type === "expense" ? "danger" : "success";
  };

  const getStatusColor = (status) => {
    return status === "completed" ? "success" : "warning";
  };

  const handleDelete = (id, transactions, setTransactions) => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const updatedTransactions = transactions.filter((t) => t.id !== id);
          localStorage.setItem(
            "transactions",
            JSON.stringify(updatedTransactions)
          );
          setTransactions(updatedTransactions);
          Swal.fire("Đã xóa!", "Giao dịch của bạn đã được xóa.", "success");
        } catch (error) {
          console.error("Error deleting transaction:", error);
          Swal.fire("Lỗi", "Không thể xóa giao dịch.", "error");
        }
      }
    });
  };

  const handleView = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = indexOfFirstItem + itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="row">
      <div className="col-12">
        <div
          className="card border-0 shadow"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">
                      <i className="bx bx-hash me-1"></i>ID
                    </th>
                    <th scope="col">
                      <i className="bx bx-text me-1"></i>Tiêu đề
                    </th>
                    <th scope="col">
                      <i className="bx bx-category me-1"></i>Loại
                    </th>
                    <th scope="col">
                      <i className="bx bx-money me-1"></i>Số tiền
                    </th>
                    <th scope="col">
                      <i className="bx bx-calendar me-1"></i>Ngày
                    </th>
                    <th scope="col">
                      <i className="bx bx-credit-card me-1"></i>Phương thức
                    </th>
                    <th scope="col">
                      <i className="bx bx-check-circle me-1"></i>Trạng thái
                    </th>
                    <th scope="col">
                      <i className="bx bx-cog me-1"></i>Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.length > 0 ? (
                    currentTransactions.map((transaction, index) => (
                      <tr
                        key={transaction.id}
                        data-aos="fade-up"
                        data-aos-delay={500 + index * 50}
                      >
                        <td className="fw-semibold">#{transaction.id}</td>
                        <td>
                          <div>
                            <div className="fw-semibold">
                              {transaction.description}
                            </div>
                            <small className="text-muted">
                              {transaction.notes || transaction.description}
                            </small>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge bg-${getTypeColor(
                              transaction.type
                            )} bg-opacity-15 text-${getTypeColor(
                              transaction.type
                            )} rounded-pill`}
                          >
                            <i className="bx bx-trending-down me-1"></i>
                            Chi tiêu
                          </span>
                        </td>
                        <td>
                          <span
                            className={`fw-bold text-${getTypeColor(
                              transaction.type
                            )}`}
                          >
                            -{formatCurrency(transaction.amount)}
                          </span>
                        </td>
                        <td className="text-muted">
                          {formatDate(transaction.date)}
                        </td>
                        <td>
                          <div>
                            <div className="fw-semibold">
                              {transaction.paymentMethod || "Không xác định"}
                            </div>
                            <small className="text-muted text-capitalize">
                              {transaction.category}
                            </small>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`badge bg-${getStatusColor(
                              "completed"
                            )} bg-opacity-15 text-${getStatusColor(
                              "completed"
                            )} rounded-pill`}
                          >
                            <i className="bx bx-check me-1"></i>
                            Hoàn tất
                          </span>
                        </td>
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              className="btn btn-sm btn-outline-info me-2"
                              data-bs-toggle="modal"
                              data-bs-target="#viewTransactionModal"
                              onClick={() => handleView(transaction)}
                              title="Xem chi tiết"
                            >
                              <i className="bx bx-show"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() =>
                                handleDelete(
                                  transaction.id,
                                  transactions,
                                  setTransactions
                                )
                              }
                              title="Xóa giao dịch"
                            >
                              <i className="bx bx-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="py-4">
                        <div className="d-flex align-items-center justify-content-center">
                          <i className="bx bx-info-circle text-muted fs-3 me-2"></i>
                          <span className="text-muted">Không có dữ liệu</span>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {transactions.length > 0 && (
              <div className="d-flex justify-content-between align-items-center p-4 border-top">
                <div className="text-muted">
                  Hiển thị {indexOfFirstItem + 1} đến{" "}
                  {Math.min(indexOfLastItem, transactions.length)} trong tổng số{" "}
                  {transactions.length} mục
                </div>
                <nav>
                  <ul className="pagination mb-0">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link shadow"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <i className="bx bx-chevron-left"></i>
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link shadow"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link shadow"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <i className="bx bx-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="viewTransactionModal"
        tabIndex="-1"
        aria-labelledby="viewTransactionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div
            className="modal-content border-0 shadow"
            data-aos="zoom-in"
            data-aos-duration="300"
          >
            <div className="modal-header bg-info text-white">
              <h5
                className="modal-title fw-bold"
                id="viewTransactionModalLabel"
              >
                <i className="bx bx-show me-2"></i>
                Chi tiết chi tiêu
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              {selectedTransaction ? (
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">ID</label>
                    <p className="mb-0">#{selectedTransaction.id}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Loại</label>
                    <p className="mb-0 text-capitalize">Chi tiêu</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Danh mục</label>
                    <p className="mb-0 text-capitalize">
                      {selectedTransaction.category}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Số tiền</label>
                    <p className="mb-0">
                      {formatCurrency(selectedTransaction.amount)}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Ngày</label>
                    <p className="mb-0">
                      {formatDate(selectedTransaction.date)}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Phương thức
                    </label>
                    <p className="mb-0 text-capitalize">
                      {selectedTransaction.paymentMethod || "Unknown"}
                    </p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Mô tả</label>
                    <p className="mb-0">{selectedTransaction.description}</p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Ghi chú</label>
                    <p className="mb-0">
                      {selectedTransaction.notes || "Không có ghi chú"}
                    </p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Thẻ</label>
                    <p className="mb-0">
                      {selectedTransaction.tags.length > 0
                        ? selectedTransaction.tags.join(", ")
                        : "Không có thẻ"}
                    </p>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Trạng thái</label>
                    <p className="mb-0 text-capitalize">Hoàn tất</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted">Chưa chọn giao dịch</p>
              )}
              <div className="modal-footer bg-light mt-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  <i className="bx bx-x me-1"></i>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
