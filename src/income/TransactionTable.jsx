import { useBootstrapTooltips } from "../functions/Tooltip";
import "aos/dist/aos.css";
import { handleView } from "../utils/utility";

const TransactionTable = ({
  totalPages,
  currentPage,
  setCurrentPage,
  indexOfFirstItem,
  indexOfLastItem,
  currentTransactions,
  filteredTransactions,
  formatCurrency,
  formatDate,
  getTypeColor,
  getStatusColor,
  handleDelete,
}) => {
  useBootstrapTooltips();

  return (
    <div className="row">
      <div className="col-12">
        <div
          id="transactions-table"
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
                      <i className="bx bx-dollar me-1"></i>Số tiền
                    </th>
                    <th scope="col">
                      <i className="bx bx-calendar me-1"></i>Ngày
                    </th>
                    <th scope="col">
                      <i className="bx bx-buildings me-1"></i>Nguồn
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
                            <i
                              className={`bx ${
                                transaction.type === "income"
                                  ? "bx-trending-up"
                                  : "bx-trending-down"
                              } me-1`}
                            ></i>
                            {transaction.type.charAt(0).toUpperCase() +
                              transaction.type.slice(1)}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`fw-bold text-${getTypeColor(
                              transaction.type
                            )}`}
                          >
                            {transaction.type === "income" ? "+" : "-"}
                            {formatCurrency(transaction.amount)}
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
                              onClick={() => handleDelete(transaction.id)}
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
            {filteredTransactions && filteredTransactions.length > 0 && (
              <div className="d-flex justify-content-between align-items-center p-4 border-top">
                <div className="text-muted">
                  Hiển thị {indexOfFirstItem + 1} đến{" "}
                  {Math.min(indexOfLastItem, filteredTransactions.length)} trong
                  tổng số {filteredTransactions.length} mục (Trang {currentPage}{" "}
                  / {totalPages})
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
                Transaction Details
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <div className="row g-3" id="viewTransactionDetails"></div>
              <div className="modal-footer bg-light mt-3">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  <i className="bx bx-x me-1"></i>
                  Close
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
