import { useEffect } from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { getUsername } from "../auth/getUsername";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const userName = getUsername();

  let loggedInUser = { fullName: "Guest", email: "Not logged in" };
  try {
    const userData = localStorage.getItem("loggedInUser");
    if (userData) {
      loggedInUser = JSON.parse(userData);
    }
  } catch (error) {
    console.error("Error parsing loggedInUser from localStorage:", error);
  }

  const handleClearLocalStorage = () => {
    Swal.fire({
      title: "Bạn có chắc muốn xóa toàn bộ dữ liệu?",
      text: "Tất cả dữ liệu trong localStorage sẽ bị xóa vĩnh viễn!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa tất cả!",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        Swal.fire(
          "Đã xóa!",
          "Toàn bộ dữ liệu localStorage đã được xóa.",
          "success"
        ).then(() => {
          window.location.reload();
        });
      }
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const result = await Swal.fire({
      title: "Thêm thu nhập",
      text: "Bạn có chắc muốn thêm thu nhập?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      navigate("/income");
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (loggedInUser.email === "Not logged in") {
      Swal.fire("Lỗi", "Vui lòng đăng nhập để xóa tài khoản.", "error");
      return;
    }
    const result = await Swal.fire({
      title: "Xóa tài khoản",
      text: "Bạn có chắc muốn xóa tài khoản? Hành động này không thể hoàn tác.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Không",
      reverseButtons: true,
      confirmButtonColor: "#dc3545",
    });
    if (result.isConfirmed) {
      let users = [];
      try {
        users = JSON.parse(localStorage.getItem("users")) || [];
      } catch (error) {
        console.error("Error parsing users from localStorage:", error);
      }
      const updatedUsers = users.filter(
        (user) => user.email !== loggedInUser.email
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.removeItem("loggedInUser");
      Swal.fire("Đã xóa", "Tài khoản của bạn đã được xóa.", "success").then(
        () => {
          navigate("/login");
        }
      );
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    if (loggedInUser.email === "Not logged in") {
      Swal.fire("Lỗi", "Vui lòng đăng nhập để đăng xuất.", "error");
      return;
    }
    const result = await Swal.fire({
      title: "Đăng xuất",
      text: "Bạn có chắc muốn đăng xuất?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Không",
      reverseButtons: true,
    });
    if (result.isConfirmed) {
      localStorage.removeItem("loggedInUser");
      Swal.fire("Đã đăng xuất", "Bạn đã đăng xuất.", "success").then(() => {
        navigate("/login");
      });
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg fixed-top py-3 bg-white shadow"
        data-aos="fade-down"
        data-aos-duration="1000"
      >
        <div className="container">
          <a
            href="#"
            className="navbar-brand d-flex align-items-center text-primary"
            data-aos="fade-down"
            data-aos-duration="600"
          >
            <i className="bx bx-wallet fs-4 me-2"></i>
            Quản lý Tiền bạc
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav ms-auto d-flex align-items-center"
              data-aos="fade-down"
            >
              <li className="nav-item">
                <Link
                  to="/"
                  className={`nav-link ${isActive("/") ? "active" : ""}`}
                  aria-current={isActive("/") ? "page" : undefined}
                  data-aos-delay="800"
                >
                  <i className="bx bx-home-alt me-1"></i>
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/income"
                  className={`nav-link ${isActive("/income") ? "active" : ""}`}
                  aria-current={isActive("/income") ? "page" : undefined}
                  data-aos-delay="700"
                >
                  <i className="bx bx-dollar-circle me-1"></i>
                  Thu nhập
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/expenses"
                  className={`nav-link ${
                    isActive("/expenses") ? "active" : ""
                  }`}
                  aria-current={isActive("/expenses") ? "page" : undefined}
                  data-aos-delay="600"
                >
                  <i className="bx bx-receipt me-1"></i>
                  Chi tiêu
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/reports"
                  className={`nav-link ${isActive("/reports") ? "active" : ""}`}
                  aria-current={isActive("/reports") ? "page" : undefined}
                  data-aos-delay="500"
                >
                  <i className="bx bx-bar-chart-alt-2 me-1"></i>
                  Báo cáo
                </Link>
              </li>
              {userName === "Guest" ? (
                <li className="nav-item" data-aos-delay="400">
                  <Link
                    to="/login"
                    className="nav-link"
                    data-bs-tooltip="tooltip"
                    title="Đăng nhập vào tài khoản của bạn"
                  >
                    <i className="bx bx-log-in me-1"></i>
                    Đăng nhập
                  </Link>
                </li>
              ) : (
                <li className="nav-item dropdown" data-aos-delay="400">
                  <a
                    className="nav-link dropdown-toggle d-flex align-items-center"
                    href="#"
                    id="profileDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-tooltip="tooltip"
                    title="Tùy chọn hồ sơ"
                  >
                    <i className="bx bx-id-card me-1"></i>
                    {userName}
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end border-0 shadow rounded-3 p-3"
                    aria-labelledby="profileDropdown"
                    data-aos="fade-down"
                    data-aos-delay="100"
                    style={{ minWidth: "300px" }}
                  >
                    <div className="card border-0">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center mb-2 shadow p-2 rounded-3">
                          <i className="bx bx-user-circle fs-4 text-primary me-2"></i>
                          <div>
                            <h6 className="fw-bold mb-0">{userName}</h6>
                            <small className="text-muted">
                              {loggedInUser.email}
                            </small>
                          </div>
                        </div>
                        <hr className="my-2" />
                        <button
                          className="btn btn-outline-danger w-100 rounded-3 mb-2"
                          onClick={handleDeleteAccount}
                          data-bs-tooltip="tooltip"
                          title="Xóa tài khoản của bạn"
                        >
                          <i className="bx bx-trash me-1"></i>
                          Xóa tài khoản
                        </button>

                        <button
                          className="btn btn-outline-warning w-100 rounded-3 mb-2"
                          onClick={handleClearLocalStorage}
                          data-bs-tooltip="tooltip"
                          title="Xóa toàn bộ dữ liệu localStorage"
                        >
                          <i className="bx bx-trash me-1"></i>
                          Xóa toàn bộ dữ liệu
                        </button>

                        <button
                          className="btn btn-outline-primary w-100 rounded-3"
                          onClick={handleLogout}
                          data-bs-tooltip="tooltip"
                          title="Đăng xuất khỏi tài khoản của bạn"
                        >
                          <i className="bx bx-log-out me-1"></i>
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )}
              <li className="nav-item" data-aos-delay="300">
                <a
                  href="#"
                  className="btn btn-primary btn-sm ms-lg-3 mt-2 mt-lg-0 d-flex align-items-center shadow-lg justify-content-center"
                  data-bs-toggle="tooltip"
                  data-bs-placement="right"
                  onClick={handleClick}
                  title="Thêm thu nhập"
                >
                  <i className="bx bx-plus me-1"></i>
                  Thêm thu nhập
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar .nav-link {
          color: #6c757d;
          transition: all 0.2s ease;
          border-radius: 8px;
          padding: 0.35rem 0.75rem;
        }
        .navbar .nav-link:hover {
          color: #0d6efd;
          background: rgba(13, 110, 253, 0.06);
        }
        .navbar .nav-link.active {
          color: #0d6efd !important;
          font-weight: 700;
          background: rgba(13, 110, 253, 0.12);
          position: relative;
        }
        .navbar .nav-link.active::after {
          content: "";
          position: absolute;
          left: 0.5rem;
          right: 0.5rem;
          bottom: -0.35rem;
          height: 3px;
          background: #0d6efd;
          border-radius: 3px;
        }
        .navbar .nav-link i {
          color: inherit;
        }
        .navbar-brand {
          font-weight: 700;
        }
      `}</style>
    </>
  );
};

export default Navbar;
