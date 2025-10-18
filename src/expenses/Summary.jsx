import { useEffect, useState } from "react";
import { useBootstrapTooltips } from "../functions/Tooltip";
import "aos/dist/aos.css";
import AOS from "aos";
import Swal from "sweetalert2";

const Summary = ({ filteredTransactions = [], onAddTransaction }) => {
  const [transactions, setTransactions] = useState(filteredTransactions);
  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    date: "",
    description: "",
    notes: "",
    paymentMethod: "",
    tags: "",
  });

  const formatCurrency = (value) => {
    if (isNaN(value) || value === null || value === undefined) return "Rp 0";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  };

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
  }, []);

  const calculateTotals = () => {
    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);

    const totalCategories = [
      ...new Set(
        transactions.filter((t) => t.type === "expense").map((t) => t.category)
      ),
    ].length;

    return {
      totalExpense,
      totalCategories,
      transactionCount: transactions.filter((t) => t.type === "expense").length,
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();

    const { category, amount, date, description } = formData;
    if (!category || !amount || !date || !description) {
      Swal.fire("Lỗi", "Vui lòng điền đầy đủ các trường bắt buộc.", "error");
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Swal.fire("Lỗi", "Số tiền phải là số dương.", "error");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      type: "expense",
      category,
      amount: parsedAmount,
      date,
      description,
      notes: formData.notes || "",
      paymentMethod: formData.paymentMethod || "",
      tags: formData.tags
        ? formData.tags.split(",").map((tag) => tag.trim())
        : [],
    };

    try {
      const updatedTransactions = [...transactions, newTransaction];
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
      setTransactions(updatedTransactions);
      setFormData({
        type: "expense",
        category: "",
        amount: "",
        date: "",
        description: "",
        notes: "",
        paymentMethod: "",
        tags: "",
      });

      Swal.fire("Thành công", "Thêm chi tiêu thành công!", "success").then(
        () => {
          const modal = document.getElementById("addTransactionModal");
          if (modal) {
            try {
              const Modal = window.bootstrap && window.bootstrap.Modal;
              if (Modal) {
                const instance = Modal.getInstance(modal) || new Modal(modal);
                instance.hide();
              } else {
                modal.classList.remove("show");
                modal.setAttribute("aria-hidden", "true");
                modal.style.display = "none";
                document.body.classList.remove("modal-open");
                document.body.style.removeProperty("overflow");
                document.body.style.removeProperty("paddingRight");
                const backdrops = document.querySelectorAll(".modal-backdrop");
                backdrops.forEach((b) => b.remove());
                const html = document.documentElement;
                html.style.removeProperty("overflow");
              }
            } catch {}
          }
          // Safety cleanup in case Bootstrap didn’t clear everything
          setTimeout(() => {
            try {
              document.body.classList.remove("modal-open");
              document.body.style.removeProperty("overflow");
              document.body.style.removeProperty("paddingRight");
              document
                .querySelectorAll(".modal-backdrop")
                .forEach((b) => b.remove());
            } catch {}
          }, 50);
          try {
            if (typeof onAddTransaction === "function") {
              onAddTransaction(newTransaction);
            }
            window.dispatchEvent(new Event("transactionsUpdated"));

            // Scroll to the filters section
            setTimeout(() => {
              const filtersSection = document.querySelector(
                "#expenses-filters-section"
              );
              if (filtersSection) {
                filtersSection.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }, 300);
          } catch {}
        }
      );
    } catch (error) {
      console.error("Error saving transaction to localStorage:", error);
      Swal.fire("Lỗi", "Không thể lưu chi tiêu.", "error");
    }
  };

  const totals = calculateTotals();

  return (
    <>
      <div className="row mb-4">
        <div className="col-12">
          <div
            className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4"
            data-aos="fade-down"
          >
            <div>
              <h2 className="fw-bold text-dark mb-2">
                <i className="bx bx-trending-down text-danger me-2"></i>
                Tổng quan chi tiêu
              </h2>
              <p className="text-muted mb-0">
                Theo dõi và quản lý các giao dịch chi tiêu của bạn
              </p>
            </div>
            <div className="mt-3 mt-md-0">
              <button
                className="btn btn-primary btn-lg rounded-3 shadow"
                data-bs-toggle="modal"
                data-bs-target="#addTransactionModal"
                title="Thêm chi tiêu"
              >
                <i className="bx bx-plus me-2"></i>
                Thêm chi tiêu
              </button>
            </div>
          </div>

          <div className="row g-3 mb-4" data-aos="fade-up" data-aos-delay="200">
            <div className="col-md-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body text-center">
                  <i className="bx bx-trending-down text-danger fs-2 mb-2"></i>
                  <h5 className="text-danger fw-bold">
                    {formatCurrency(totals.totalExpense)}
                  </h5>
                  <small className="text-muted">Tổng chi tiêu</small>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body text-center">
                  <i className="bx bx-list-ul text-info fs-2 mb-2"></i>
                  <h5 className="text-info fw-bold">
                    {totals.transactionCount}
                  </h5>
                  <small className="text-muted">
                    Tổng số giao dịch chi tiêu
                  </small>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card border-0 shadow h-100">
                <div className="card-body text-center">
                  <i className="bx bx-pie-chart-alt text-primary fs-2 mb-2"></i>
                  <h5 className="text-primary fw-bold">
                    {totals.totalCategories}
                  </h5>
                  <small className="text-muted">Số danh mục chi tiêu</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addTransactionModal"
        tabIndex="-1"
        aria-labelledby="addTransactionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div
            className="modal-content border-0 shadow"
            data-aos="zoom-in"
            data-aos-duration="300"
          >
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title fw-bold" id="addTransactionModalLabel">
                <i className="bx bx-plus-circle me-2"></i>
                Thêm chi tiêu mới
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-4">
              <form onSubmit={handleAddTransaction}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="bx bx-transfer me-1 text-danger"></i>
                      Loại giao dịch
                    </label>
                    <select
                      className="form-select"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      required
                      disabled
                    >
                      <option value="">Chọn loại</option>
                      <option value="expense">Chi tiêu</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="bx bx-category me-1 text-danger"></i>
                      Danh mục chi tiêu
                    </label>
                    <select
                      className="form-select"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Chọn danh mục</option>
                      <option value="food">Ăn uống</option>
                      <option value="transport">Di chuyển</option>
                      <option value="shopping">Mua sắm</option>
                      <option value="entertainment">Giải trí</option>
                      <option value="bills">Hóa đơn & tiện ích</option>
                      <option value="healthcare">Y tế</option>
                      <option value="education">Giáo dục</option>
                      <option value="housing">Nhà ở & thuê</option>
                      <option value="insurance">Bảo hiểm</option>
                      <option value="personal_care">Chăm sóc cá nhân</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="bx bx-money me-1 text-danger"></i>
                      Số tiền chi tiêu
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light">Rp</span>
                      <input
                        type="number"
                        className="form-control"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        placeholder="0"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="bx bx-calendar me-1 text-danger"></i>
                      Ngày chi tiêu
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      <i className="bx bx-text me-1 text-danger"></i>
                      Mô tả chi tiêu
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Nhập mô tả chi tiêu"
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">
                      <i className="bx bx-note me-1 text-danger"></i>
                      Ghi chú (không bắt buộc)
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Ghi chú thêm cho khoản chi này..."
                    ></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="bx bx-credit-card me-1 text-danger"></i>
                      Phương thức thanh toán
                    </label>
                    <select
                      className="form-select"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                    >
                      <option value="">Chọn phương thức thanh toán</option>
                      <option value="cash">Tiền mặt</option>
                      <option value="credit_card">Thẻ tín dụng</option>
                      <option value="debit_card">Thẻ ghi nợ</option>
                      <option value="bank_transfer">Chuyển khoản</option>
                      <option value="e_wallet">Ví điện tử</option>
                      <option value="other">Khác</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      <i className="bx bx-tag me-1 text-danger"></i>
                      Thẻ (không bắt buộc)
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="Nhập các thẻ, cách nhau bởi dấu phẩy"
                    />
                    <small className="form-text text-muted">
                      ví dụ: gấp, hàng tháng, định kỳ
                    </small>
                  </div>
                </div>
                <div className="modal-footer bg-light mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    data-bs-dismiss="modal"
                  >
                    <i className="bx bx-x me-1"></i>
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-danger">
                    <i className="bx bx-check me-1"></i>
                    Lưu chi tiêu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
