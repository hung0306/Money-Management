import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Summary = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentTime] = useState(new Date());

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, offset: 50 });

    const loadTransactions = () => {
      try {
        const storedTransactions = localStorage.getItem("transactions");
        if (storedTransactions) {
          const parsed = JSON.parse(storedTransactions).filter(
            (t) => t.date && !isNaN(new Date(t.date).getTime())
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
    return () => window.removeEventListener("storage", loadTransactions);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount || 0);
  };

  const calculateTotals = () => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    const totalExpense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0);
    return { totalIncome, totalExpense, balance: totalIncome - totalExpense };
  };

  const { totalIncome, totalExpense, balance } = calculateTotals();

  const getLastSixMonths = () => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth() - i,
        1
      );
      months.push({
        month: date.toLocaleString("id-ID", { month: "short" }),
        year: date.getFullYear(),
        monthIndex: date.getMonth(),
      });
    }
    return months;
  };

  const monthlyData = getLastSixMonths().map(({ month, year, monthIndex }) => ({
    month,
    income: transactions
      .filter(
        (t) =>
          t.type === "income" &&
          new Date(t.date).getMonth() === monthIndex &&
          new Date(t.date).getFullYear() === year
      )
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
    expenses: transactions
      .filter(
        (t) =>
          t.type === "expense" &&
          new Date(t.date).getMonth() === monthIndex &&
          new Date(t.date).getFullYear() === year
      )
      .reduce((sum, t) => sum + (parseFloat(t.amount) || 0), 0),
  }));

  const categoryData = (() => {
    const categorySums = transactions
      .filter(
        (t) =>
          new Date(t.date).getMonth() === currentTime.getMonth() &&
          new Date(t.date).getFullYear() === currentTime.getFullYear()
      )
      .reduce((acc, t) => {
        const category = t.category || "Other";
        const key = `${
          t.type === "income" ? "Income" : "Expense"
        }: ${category}`;
        acc[key] = (acc[key] || 0) + (parseFloat(t.amount) || 0);
        return acc;
      }, {});
    return Object.entries(categorySums).map(([name, value], index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
      color: ["#34D399", "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8"][
        index % 6
      ],
    }));
  })();

  const COLORS = [
    "#34D399",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
  ];

  return (
    <section className="py-5 bg-gradient-to-br from-red-50 to-orange-100 overflow-hidden min-vh-100">
      <div className="container" style={{ paddingTop: "80px" }}>
        <div className="row justify-content-center mb-5" data-aos="fade-up">
          <div className="col-lg-8 text-center">
            <span
              className="badge bg-danger bg-opacity-10 text-danger px-3 py-2 rounded-pill mb-3"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <i className="bx bx-wallet me-2"></i>
              Tóm tắt tài chính
            </span>
            <h2
              className="display-5 fw-bold text-dark mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Tài chính của bạn
              <span className="text-danger"> trong nháy mắt</span>
            </h2>
            <p
              className="lead text-muted mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Theo dõi xu hướng thu chi với thông tin rõ ràng và báo cáo trực
              quan.
            </p>
          </div>
        </div>

        <div className="row g-4 mb-5">
          {[
            {
              icon: "bx-trending-up",
              title: "Tổng thu nhập",
              amount: totalIncome,
              color: "success",
              bgGradient: "from-green-400 to-emerald-500",
              delay: 500,
            },
            {
              icon: "bx-trending-down",
              title: "Tổng chi tiêu",
              amount: totalExpense,
              color: "danger",
              bgGradient: "from-red-400 to-rose-500",
              delay: 600,
            },
            {
              icon: "bx-wallet",
              title: "Số dư",
              amount: balance,
              color: balance >= 0 ? "success" : "danger",
              bgGradient:
                balance >= 0
                  ? "from-green-400 to-emerald-500"
                  : "from-red-400 to-rose-500",
              delay: 700,
            },
          ].map((item, index) => (
            <div
              className="col-lg-4 col-md-6"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={item.delay}
            >
              <div className="card border-0 shadow h-100 position-relative overflow-hidden">
                <div
                  className={`position-absolute top-0 start-0 w-100 h-2 bg-gradient-to-r ${item.bgGradient}`}
                ></div>
                <div className="card-body p-4 text-center">
                  <div
                    className={`bg-${item.color} bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center`}
                    style={{ width: "80px", height: "80px" }}
                  >
                    <i
                      className={`bx ${item.icon} text-${item.color} fs-1`}
                    ></i>
                  </div>
                  <h6 className="text-muted mb-2">{item.title}</h6>
                  <h3 className={`text-${item.color} fw-bold mb-0`}>
                    {formatCurrency(item.amount)}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          <div className="col-lg-8" data-aos="fade-right" data-aos-delay="800">
            <div className="card border-0 shadow h-100">
              <div className="card-header bg-white border-0 pb-0">
                <div className="d-flex align-items-center">
                  <div className="bg-danger bg-opacity-10 rounded-circle p-2 me-3">
                    <i className="bx bx-bar-chart text-danger fs-4"></i>
                  </div>
                  <div>
                    <h5 className="mb-0 fw-bold">
                      Thu nhập & Chi tiêu hàng tháng
                    </h5>
                    <small className="text-muted">
                      Tổng quan 6 tháng gần đây
                    </small>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value) =>
                        `${(value / 1000000).toFixed(1)}M`
                      }
                    />
                    <Tooltip
                      formatter={(value, name) => [formatCurrency(value), name]}
                      labelStyle={{ color: "#666" }}
                    />
                    <Legend />
                    <Bar
                      dataKey="income"
                      fill="#34D399"
                      name="Thu nhập"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="expenses"
                      fill="#EF4444"
                      name="Chi tiêu"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="col-lg-4" data-aos="fade-left" data-aos-delay="900">
            <div className="card border-0 shadow h-100">
              <div className="card-header bg-white border-0 pb-0">
                <div className="d-flex align-items-center">
                  <div className="bg-warning bg-opacity-10 rounded-circle p-2 me-3">
                    <i className="bx bx-pie-chart text-warning fs-4"></i>
                  </div>
                  <div>
                    <h5 className="mb-0 fw-bold">Danh mục giao dịch</h5>
                    <small className="text-muted">
                      Phân bổ trong tháng này
                    </small>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-3">
                  {categoryData.map((category, index) => (
                    <div
                      key={index}
                      className="d-flex align-items-center justify-content-between mb-2"
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle me-2"
                          style={{
                            width: "12px",
                            height: "12px",
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                        <small className="text-muted">{category.name}</small>
                      </div>
                      <small className="fw-semibold">
                        {totalIncome + totalExpense > 0
                          ? (
                              (category.value / (totalIncome + totalExpense)) *
                              100
                            ).toFixed(1)
                          : 0}
                        %
                      </small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Summary;
