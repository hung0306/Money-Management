import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useBootstrapTooltips } from "../functions/Tooltip";

const Pricing = () => {
  useBootstrapTooltips();
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(1);

  const pricingPlans = [
    {
      id: 0,
      name: "Dùng thử miễn phí",
      subtitle: "Hoàn hảo để bắt đầu",
      price: { monthly: 0, yearly: 0 },
      originalPrice: { monthly: 49000, yearly: 490000 },
      duration: "Miễn phí 14 ngày",
      badge: "Phổ biến nhất",
      badgeColor: "success",
      icon: "bx-gift",
      highlights: [
        "Không cần thẻ tín dụng",
        "Truy cập đầy đủ trong 14 ngày",
        "Thiết lập dễ dàng trong 5 phút",
      ],
    },
    {
      id: 1,
      name: "Cá nhân Pro",
      subtitle: "Tốt nhất cho người dùng cá nhân",
      price: { monthly: 49000, yearly: 39000 },
      originalPrice: { monthly: 79000, yearly: 590000 },
      duration: "mỗi tháng",
      badge: "Khuyến nghị",
      badgeColor: "primary",
      icon: "bx-user",
      highlights: [
        "Tiết kiệm 38% với gói năm",
        "Hủy bất cứ lúc nào",
        "Đảm bảo hoàn tiền 30 ngày",
      ],
    },
    {
      id: 2,
      name: "Gia đình Premium",
      subtitle: "Phù hợp cho gia đình",
      price: { monthly: 89000, yearly: 69000 },
      originalPrice: { monthly: 129000, yearly: 990000 },
      duration: "mỗi tháng",
      badge: "Giá trị nhất",
      badgeColor: "warning",
      icon: "bx-group",
      highlights: [
        "Chia sẻ cho 5 thành viên",
        "Theo dõi đầu tư nâng cao",
        "Hỗ trợ cao cấp 24/7",
      ],
    },
    {
      id: 3,
      name: "Doanh nghiệp Elite",
      subtitle: "Cho doanh nghiệp nhỏ",
      price: { monthly: 149000, yearly: 119000 },
      originalPrice: { monthly: 199000, yearly: 1590000 },
      duration: "mỗi tháng",
      badge: "Doanh nghiệp",
      badgeColor: "info",
      icon: "bx-briefcase",
      highlights: [
        "Không giới hạn thành viên",
        "Tính năng cho doanh nghiệp",
        "Quản lý tài khoản chuyên trách",
      ],
    },
  ];

  const toggleBilling = () => {
    setIsYearly(!isYearly);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  const calculateSavings = (monthly, yearly) => {
    const yearlyTotal = monthly * 12;
    const actualYearly = yearly * 12;
    const savings = yearlyTotal - actualYearly;
    return Math.round((savings / yearlyTotal) * 100);
  };

  return (
    <section className="py-5 bg-white overflow-hidden">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <span
              className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <i className="bx bx-crown me-2"></i>
              Gói giá
            </span>

            <h2
              className="display-5 fw-bold text-dark mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Chọn gói hoàn hảo cho
              <span className="text-primary">
                {" "}
                hành trình tài chính của bạn
              </span>
            </h2>

            <p
              className="lead text-muted mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Bắt đầu với gói dùng thử miễn phí và nâng cấp bất cứ lúc nào. Mọi
              gói đều bao gồm các tính năng quản lý tiền cốt lõi cùng cam kết
              hoàn tiền 30 ngày.
            </p>

            <div
              className="d-flex align-items-center justify-content-center gap-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <span
                className={`fw-semibold ${
                  !isYearly ? "text-primary" : "text-muted"
                }`}
              >
                Theo tháng
              </span>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="billingToggle"
                  checked={isYearly}
                  onChange={toggleBilling}
                  style={{ transform: "scale(1.2)" }}
                />
              </div>
              <span
                className={`fw-semibold ${
                  isYearly ? "text-primary" : "text-muted"
                }`}
              >
                Theo năm
                <span className="badge bg-success bg-opacity-10 text-success ms-2 small">
                  Tiết kiệm tới 30%
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          {pricingPlans.map((plan, index) => (
            <div
              className="col-lg-3 col-md-6"
              key={plan.id}
              data-aos="fade-up"
              data-aos-delay={500 + index * 100}
            >
              <div
                className={`card border-0 shadow h-100 position-relative ${
                  selectedPlan === plan.id ? "border-primary" : ""
                }`}
                style={{ transition: "all 0.3s ease" }}
                onMouseEnter={() => setSelectedPlan(plan.id)}
              >
                {plan.badge && (
                  <div
                    className={`badge bg-${plan.badgeColor} position-absolute top-0 start-50 translate-middle px-3 py-2 rounded-pill`}
                  >
                    <i className="bx bx-star me-1"></i>
                    {plan.badge}
                  </div>
                )}

                <div className="card-body p-4 text-center d-flex flex-column">
                  <div
                    className={`bg-${plan.badgeColor} bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center`}
                    style={{ width: "80px", height: "80px" }}
                  >
                    <i
                      className={`bx ${plan.icon} text-${plan.badgeColor} fs-1`}
                    ></i>
                  </div>

                  <h5 className="fw-bold text-dark mb-1">{plan.name}</h5>
                  <p className="text-muted small mb-3">{plan.subtitle}</p>

                  <div className="mb-3">
                    {plan.id === 0 ? (
                      <div>
                        <h2 className="fw-bold text-success mb-0">MIỄN PHÍ</h2>
                        <p className="text-muted small">{plan.duration}</p>
                        <p className="text-muted small">
                          <span className="text-decoration-line-through">
                            Rp {formatPrice(plan.originalPrice.monthly)}
                          </span>
                        </p>
                      </div>
                    ) : (
                      <div>
                        <div className="d-flex align-items-center justify-content-center gap-2 mb-2">
                          <h2 className="fw-bold text-dark mb-0">
                            Rp{" "}
                            {formatPrice(
                              isYearly ? plan.price.yearly : plan.price.monthly
                            )}
                          </h2>
                          <div className="textMuted small">/tháng</div>
                        </div>
                        {isYearly && (
                          <p className="text-success small mb-0">
                            Tiết kiệm{" "}
                            {calculateSavings(
                              plan.price.monthly,
                              plan.price.yearly
                            )}
                            % mỗi năm
                          </p>
                        )}
                        <p className="text-muted small text-decoration-line-through">
                          Rp{" "}
                          {formatPrice(
                            isYearly
                              ? Math.round(plan.originalPrice.yearly / 12)
                              : plan.originalPrice.monthly
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mb-4 flex-grow-1">
                    {plan.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="d-flex align-items-center justify-content-center mb-2"
                      >
                        <i className="bx bx-check-circle text-success me-2"></i>
                        <small className="text-muted">{highlight}</small>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`btn btn-${plan.badgeColor} w-100 shadow text-white mt-auto`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={
                      plan.id === 0
                        ? "Bắt đầu dùng thử miễn phí ngay!"
                        : plan.id === 1
                        ? "Chọn gói Cá nhân Pro"
                        : plan.id === 2
                        ? "Chọn gói Gia đình Premium"
                        : "Liên hệ đội ngũ bán hàng"
                    }
                  >
                    <i
                      className={`bx ${
                        plan.id === 3
                          ? "bx-phone"
                          : plan.id === 0
                          ? "bx-gift"
                          : "bx-plus"
                      } me-2`}
                    ></i>
                    {plan.id === 0
                      ? "Bắt đầu dùng thử"
                      : plan.id === 1
                      ? "Chọn gói Cá nhân Pro"
                      : plan.id === 2
                      ? "Chọn gói Gia đình Premium"
                      : "Liên hệ bán hàng"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
