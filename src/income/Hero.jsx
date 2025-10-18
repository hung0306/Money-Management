import { useEffect, useState } from "react";
import { useBootstrapTooltips } from "../functions/Tooltip";
import "aos/dist/aos.css";
import AOS from "aos";
import { getUsername } from "../auth/getUsername";

const Hero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const userName = getUsername();

  useBootstrapTooltips();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    const loadTransactions = () => {
      try {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
          const parsed = JSON.parse(storedTransactions);
          setTransactions(
            parsed.filter((t) => t.date && !isNaN(new Date(t.date).getTime()))
          );
        }
      } catch (error) {
        console.error("Error loading transactions from localStorage:", error);
      }
    };

    loadTransactions();
    window.addEventListener("storage", loadTransactions);
    return () => window.removeEventListener("storage", loadTransactions);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const financialData = {
    totalIncome: transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
    monthlyIncome: transactions
      .filter(
        (t) =>
          t.type === "income" &&
          new Date(t.date).getMonth() === currentTime.getMonth() &&
          new Date(t.date).getFullYear() === currentTime.getFullYear()
      )
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
    averageIncome: (() => {
      const incomeByMonth = transactions
        .filter((t) => t.type === "income")
        .reduce((acc, t) => {
          const date = new Date(t.date);
          if (!isNaN(date.getTime())) {
            const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
            acc[monthKey] = (acc[monthKey] || 0) + (parseFloat(t.amount) || 0);
            return acc;
          }
          return acc;
        }, {});
      const monthlySums = Object.values(incomeByMonth);
      console.log("Income by month:", incomeByMonth);
      console.log("Monthly sums:", monthlySums);
      return monthlySums.length > 0
        ? monthlySums.reduce((sum, val) => sum + val, 0) / monthlySums.length
        : 0;
    })(),
  };

  console.log("Financial Data:", financialData);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 17) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  const getCurrentMonth = () => {
    return currentTime.toLocaleString("id-ID", { month: "long" });
  };

  return (
    <section className="py-5">
      <div className="container" style={{ paddingTop: "60px" }}>
        <div className="row mb-5">
          <div className="col-12">
            <div
              className="bg-white rounded-4 shadow p-4 mb-4 border-0"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                <div>
                  <h2
                    className="fw-bold text-dark mb-2"
                    data-aos="fade-right"
                    data-aos-delay="200"
                  >
                    {getGreeting()}, {userName}! 👋
                  </h2>
                  <p
                    className="text-muted mb-0 lead"
                    data-aos="fade-right"
                    data-aos-delay="300"
                  >
                    Chào mừng bạn trở lại. Dưới đây là tổng quan tài chính của
                    bạn trong tháng này.
                  </p>
                </div>
                <div
                  className="mt-3 mt-md-0"
                  data-aos="fade-left"
                  data-aos-delay="400"
                >
                  <div className="d-flex align-items-center bg-primary bg-opacity-10 rounded-pill px-3 py-2">
                    <i className="bx bx-calendar text-primary me-2"></i>
                    <span className="text-primary fw-semibold">
                      {(() => {
                        const day = currentTime.getDate();
                        const month = currentTime.getMonth() + 1;
                        const year = currentTime.getFullYear();
                        return `${day}/${month}/${year}`;
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
            <div
              className="card border-0 shadow h-100 hover-lift"
              data-aos="fade-up"
              data-aos-delay="500"
              data-bs-toggle="tooltip"
              title="Tổng thu nhập tích lũy của bạn"
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="bg-primary bg-opacity-15 rounded-circle p-3">
                    <i className="bx bx-wallet-alt text-primary fs-3"></i>
                  </div>
                  <div className="badge bg-success bg-opacity-10 text-success">
                    <i className="bx bx-trending-up me-1"></i>
                    +0%
                  </div>
                </div>
                <h3 className="fw-bold text-primary mb-1">
                  {formatCurrency(financialData.totalIncome)}
                </h3>
                <p className="text-muted mb-0 fw-medium">Tổng thu nhập</p>
                <small className="text-muted">Tổng thu từ trước đến nay</small>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
            <div
              className="card border-0 shadow h-100 hover-lift"
              data-aos="fade-up"
              data-aos-delay="600"
              data-bs-toggle="tooltip"
              title={`Thu nhập trong tháng ${getCurrentMonth()}`}
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="bg-success bg-opacity-15 rounded-circle p-3">
                    <i className="bx bx-line-chart text-success fs-3"></i>
                  </div>
                  <div className="badge bg-info bg-opacity-10 text-info">
                    <i className="bx bx-calendar me-1"></i>
                    Tháng này
                  </div>
                </div>
                <h3 className="fw-bold text-success mb-1">
                  {formatCurrency(financialData.monthlyIncome)}
                </h3>
                <p className="text-muted mb-0 fw-medium">Thu nhập tháng này</p>
                <small className="text-muted">
                  Thu nhập tháng {getCurrentMonth()}
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-6 col-md-6 col-12">
            <div
              className="card border-0 shadow h-100 hover-lift"
              data-aos="fade-up"
              data-aos-delay="700"
              data-bs-toggle="tooltip"
              title="Thu nhập trung bình hàng tháng"
            >
              <div className="card-body p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div className="bg-info bg-opacity-15 rounded-circle p-3">
                    <i className="bx bx-bar-chart-alt-2 text-info fs-3"></i>
                  </div>
                  <div className="badge bg-primary bg-opacity-10 text-primary">
                    <i className="bx bx-math me-1"></i>
                    Trung bình
                  </div>
                </div>
                <h3 className="fw-bold text-info mb-1">
                  {formatCurrency(financialData.averageIncome)}
                </h3>
                <p className="text-muted mb-0 fw-medium">Thu nhập trung bình</p>
                <small className="text-muted">Trung bình theo tháng</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
