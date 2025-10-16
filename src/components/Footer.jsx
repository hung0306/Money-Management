import { useState, useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import Swal from "sweetalert2";

const Footer = () => {
  const [email, setEmail] = useState("");

  function handleSendClick() {
    if (!email) {
      Swal.fire({
        title: "Ôi!",
        text: "Vui lòng nhập email của bạn.",
        icon: "warning",
        confirmButtonColor: "#00a8ff",
      });
      return;
    }

    Swal.fire({
      title: "Thành công!",
      text: `Email "${email}" đã được gửi.`,
      icon: "success",
      confirmButtonColor: "#00a8ff",
    });

    setEmail("");
  }
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userLocation, setUserLocation] = useState("Đang lấy vị trí...");
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
                {
                  headers: {
                    "User-Agent": "MoneyManagementTracker/1.0",
                  },
                }
              );
              const data = await response.json();
              if (data.address) {
                const city =
                  data.address.city ||
                  data.address.town ||
                  data.address.village ||
                  "";
                const country = data.address.country || "";
                setUserLocation(
                  city && country ? `${city}, ${country}` : "Không rõ vị trí"
                );
              } else {
                setUserLocation("Không rõ vị trí");
              }
            } catch (error) {
              setLocationError("Không thể lấy thông tin vị trí");
              setUserLocation("Không rõ vị trí");
            }
          },
          (error) => {
            setLocationError(error.message);
            setUserLocation("Bị từ chối truy cập vị trí");
          }
        );
      } else {
        setLocationError("Trình duyệt không hỗ trợ định vị địa lý");
        setUserLocation("Không thể xác định vị trí");
      }
    };

    getUserLocation();

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setCurrentYear(now.getFullYear());
    }, 1000);

    return () => {
      clearInterval(timer);
      AOS.refresh();
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <footer
        className="mt-5 overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          color: "#e0e0e0",
          boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.3)",
          borderTop: "3px solid #0f3460",
        }}
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="container py-5">
          <div className="row g-4">
            <div
              className="col-lg-4 col-md-6"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="d-flex align-items-center mb-4">
                <i
                  className="bx bx-wallet fs-1 me-3"
                  style={{ color: "#00a8ff" }}
                ></i>
                <h4
                  className="mb-0 fw-bold"
                  style={{
                    color: "#ffffff",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  Trình theo dõi quản lý tiền bạc
                </h4>
              </div>
              <p
                className="mb-4"
                style={{ color: "#b0b0b0", lineHeight: "1.6" }}
              >
                Nâng tầm hành trình tài chính của bạn với nền tảng quản lý tiền
                hiện đại. Theo dõi thu nhập, tối ưu chi tiêu và đạt mục tiêu một
                cách dễ dàng.
              </p>
              <div
                className="d-flex gap-3"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {["facebook-circle", "twitter", "instagram", "linkedin"].map(
                  (platform, index) => (
                    <a
                      key={platform}
                      href="#"
                      className="fs-4"
                      style={{
                        color: "#00a8ff",
                        transition: "transform 0.3s ease, color 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.2)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <i className={`bx bxl-${platform}`}></i>
                    </a>
                  )
                )}
              </div>
            </div>

            <div
              className="col-lg-2 col-md-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <h5
                className="mb-4 fw-bold"
                style={{
                  color: "#ffffff",
                  borderBottom: "2px solid #00a8ff",
                  paddingBottom: "8px",
                }}
              >
                <i className="bx bx-link me-2" style={{ color: "#00a8ff" }}></i>
                Liên kết nhanh
              </h5>
              <ul className="list-unstyled">
                {[
                  { icon: "home-alt", text: "Trang chủ" },
                  { icon: "dollar-circle", text: "Thu nhập" },
                  { icon: "receipt", text: "Chi tiêu" },
                  { icon: "bar-chart-alt-2", text: "Báo cáo" },
                ].map((link, index) => (
                  <li key={index} className="mb-3">
                    <a
                      href="#"
                      className="text-decoration-none"
                      style={{
                        color: "#e0e0e0",
                        transition: "color 0.3s ease, padding-left 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#00a8ff";
                        e.currentTarget.style.paddingLeft = "8px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#e0e0e0";
                        e.currentTarget.style.paddingLeft = "0";
                      }}
                    >
                      <i className={`bx bx-${link.icon} me-2`}></i>
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="col-lg-2 col-md-6"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <h5
                className="mb-4 fw-bold"
                style={{
                  color: "#ffffff",
                  borderBottom: "2px solid #00a8ff",
                  paddingBottom: "8px",
                }}
              >
                <i className="bx bx-star me-2" style={{ color: "#00a8ff" }}></i>
                Tính năng
              </h5>
              <ul className="list-unstyled">
                {[
                  { icon: "pie-chart-alt", text: "Lập kế hoạch ngân sách" },
                  { icon: "trending-up", text: "Mục tiêu tài chính" },
                  { icon: "bell", text: "Thông báo" },
                  { icon: "shield", text: "Dữ liệu an toàn" },
                ].map((feature, index) => (
                  <li key={index} className="mb-3">
                    <a
                      href="#"
                      className="text-decoration-none"
                      style={{
                        color: "#e0e0e0",
                        transition: "color 0.3s ease, padding-left 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#00a8ff";
                        e.currentTarget.style.paddingLeft = "8px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#e0e0e0";
                        e.currentTarget.style.paddingLeft = "0";
                      }}
                    >
                      <i className={`bx bx-${feature.icon} me-2`}></i>
                      {feature.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="col-lg-2 col-md-6"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <h5
                className="mb-4 fw-bold"
                style={{
                  color: "#ffffff",
                  borderBottom: "2px solid #00a8ff",
                  paddingBottom: "8px",
                }}
              >
                <i
                  className="bx bx-support me-2"
                  style={{ color: "#00a8ff" }}
                ></i>
                Hỗ trợ
              </h5>
              <ul className="list-unstyled">
                {[
                  { icon: "help-circle", text: "Trung tâm trợ giúp" },
                  { icon: "envelope", text: "Liên hệ" },
                  { icon: "file", text: "Chính sách bảo mật" },
                  { icon: "check-shield", text: "Điều khoản dịch vụ" },
                ].map((support, index) => (
                  <li key={index} className="mb-3">
                    <a
                      href="#"
                      className="text-decoration-none"
                      style={{
                        color: "#e0e0e0",
                        transition: "color 0.3s ease, padding-left 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#00a8ff";
                        e.currentTarget.style.paddingLeft = "8px";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#e0e0e0";
                        e.currentTarget.style.paddingLeft = "0";
                      }}
                    >
                      <i className={`bx bx-${support.icon} me-2`}></i>
                      {support.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="col-lg-2 col-md-12"
              data-aos="fade-left"
              data-aos-delay="700"
            >
              <h5
                className="mb-4 fw-bold"
                style={{
                  color: "#ffffff",
                  borderBottom: "2px solid #00a8ff",
                  paddingBottom: "8px",
                }}
              >
                <i
                  className="bx bx-envelope me-2"
                  style={{ color: "#00a8ff" }}
                ></i>
                Cập nhật thông tin
              </h5>
              <div className="mb-4">
                <div className="input-group input-group-sm">
                  <input
                    type="email"
                    className="form-control rounded-start-pill"
                    placeholder="Nhập email của bạn"
                    aria-label="Đăng ký nhận email"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid #00a8ff",
                      color: "#ffffff",
                      transition: "background 0.3s ease",
                    }}
                    onFocus={(e) =>
                      (e.target.style.background = "rgba(255, 255, 255, 0.2)")
                    }
                    onBlur={(e) =>
                      (e.target.style.background = "rgba(255, 255, 255, 0.1)")
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button
                    className="btn btn-primary rounded-end-pill"
                    type="button"
                    style={{
                      background: "#00a8ff",
                      border: "1px solid #00a8ff",
                      transition: "background 0.3s ease, transform 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    onClick={handleSendClick}
                  >
                    <i className="bx bx-send"></i>
                  </button>
                </div>
              </div>
              <div className="contact-info">
                <p className="small mb-2" style={{ color: "#e0e0e0" }}>
                  <i
                    className="bx bx-phone me-2"
                    style={{ color: "#00a8ff" }}
                  ></i>
                  +6287760347478
                </p>
                <p className="small mb-2" style={{ color: "#e0e0e0" }}>
                  <i
                    className="bx bx-envelope me-2"
                    style={{ color: "#00a8ff" }}
                  ></i>
                  moneytracker@gmail.com
                </p>
                <p className="small mb-0" style={{ color: "#e0e0e0" }}>
                  <i
                    className="bx bx-map me-2"
                    style={{ color: "#00a8ff" }}
                  ></i>
                  {userLocation}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="border-top"
          style={{ borderColor: "#00a8ff !important" }}
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <div className="container py-4">
            <div className="row align-items-center">
              <div
                className="col-md-6 text-center text-md-start"
                data-aos="fade-right"
                data-aos-delay="900"
              >
                <p
                  className="mb-0 small"
                  style={{
                    color: "#e0e0e0",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <i
                    className="bx bx-copyright me-2"
                    style={{ color: "#00a8ff" }}
                  ></i>
                  {currentYear} Trình theo dõi quản lý tiền bạc. Đã đăng ký bản
                  quyền.
                </p>
              </div>
              <div
                className="col-md-6 text-center text-md-end"
                data-aos="fade-left"
                data-aos-delay="900"
              >
                <p
                  className="mb-0 small"
                  style={{
                    color: "#e0e0e0",
                    textShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <i
                    className="bx bx-time me-2"
                    style={{ color: "#00a8ff" }}
                  ></i>
                  {formatDate(currentTime)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        footer {
          position: relative;
          z-index: 1;
        }
        footer::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: url("https://www.transparenttextures.com/patterns/dark-geometric.png");
          opacity: 0.05;
          z-index: -1;
        }
        .social-hover:hover,
        .nav-link-hover:hover {
          color: #40c4ff !important;
          transform: translateX(5px);
        }
        .input-group input:focus {
          box-shadow: 0 0 8px rgba(0, 168, 255, 0.5);
        }
      `}</style>
    </>
  );
};

export default Footer;
