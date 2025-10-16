import { useEffect } from "react";
import useCounter from "../functions/useCounter";
import AOS from "aos";
import "aos/dist/aos.css";

const Problem = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const income = useCounter(8500000);
    const expenses = useCounter(8750000);
    const deficit = useCounter(250000);
    const coffee = useCounter(450000);
    const impulse = useCounter(850000);
    const subscriptions = useCounter(320000);

    return (
        <section className="py-5 bg-white overflow-hidden">
            <div className="container">
                <div className="row justify-content-center mb-5" data-aos="fade-up">
                    <div className="col-lg-8 text-center">
                        <span className="badge bg-danger bg-opacity-10 text-danger px-3 py-2 rounded-pill mb-3" data-aos="zoom-in" data-aos-delay="200">
                            <i className="bx bx-error-circle me-2"></i>
                            Vấn đề tài chính
                        </span> 

                        <h2 className="display-5 fw-bold text-dark mb-4" data-aos="fade-up" data-aos-delay="300">
                            Tiền hết rất nhanh,
                            <span className="text-danger"> nhưng không biết đi đâu?</span>
                        </h2>

                        <p className="lead text-muted mb-4" data-aos="fade-up" data-aos-delay="400">
                            Bạn không cô đơn! Hàng triệu người gặp những khó khăn tài chính tương tự.
                            Hãy cùng xem vài con số đáng chú ý về quản lý tài chính cá nhân.
                        </p>
                    </div>
                </div>

                <div className="row g-4 mb-5" data-aos="fade-up" data-aos-delay="500">
                    {[
                        {
                            icon: "bx-money",
                            percentage: 78,
                            title: "Người Indonesia",
                            desc: "Sống dựa vào lương, không có quỹ khẩn cấp",
                            color: "danger"
                        },
                        {
                            icon: "bx-trending-down",
                            percentage: 65,
                            title: "Người lao động trẻ",
                            desc: "Bị rò rỉ chi tiêu hàng tháng",
                            color: "warning"
                        },
                        {
                            icon: "bx-calculator",
                            percentage: 82,
                            title: "Đa số mọi người",
                            desc: "Không bao giờ theo dõi chi tiêu hằng ngày",
                            color: "info"
                        }
                    ].map((stat, index) => {
                        const count = useCounter(stat.percentage);
                        return (
                            <div className="col-lg-4 col-md-6" key={index} data-aos="zoom-in" data-aos-delay={600 + index * 200}>
                                <div className="card border-0 shadow h-100 text-center p-4">
                                    <div className={`bg-${stat.color} bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center`} style={{ width: '80px', height: '80px' }}>
                                        <i className={`bx ${stat.icon} text-${stat.color} fs-1`}></i>
                                    </div>
                                    <h3 className={`text-${stat.color} fw-bold mb-2`}>{count}%</h3>
                                    <h6 className="fw-semibold text-dark mb-2">{stat.title}</h6>
                                    <p className="text-muted small mb-0">{stat.desc}</p>
                                </div>
                            </div>
                        );  
                    })}
                </div>

                <div className="row align-items-center mb-5">
                    <div className="col-lg-6 col-md-12 mb-4 mb-lg-0" data-aos="fade-right" data-aos-delay="700">
                        <h3 className="fw-bold text-dark mb-4">
                            <i className="bx bx-error text-danger me-2"></i>
                            Những vấn đề tài chính thường gặp
                        </h3>

                        <div className="accordion accordion-flush" id="problemAccordion">
                            {[
                                {
                                    id: "problem1",
                                    icon: "bx-money",
                                    title: "Rò rỉ chi tiêu không kiểm soát",
                                    desc: "Tiền biến mất vào những thứ nhỏ nhặt, không cần thiết. Cà phê, đồ ăn online, các gói đăng ký quên hủy — âm thầm làm ví bạn vơi đi."
                                },
                                {
                                    id: "problem2",
                                    icon: "bx-calendar-x",
                                    title: "Lương không đủ đến cuối tháng",
                                    desc: "Tuần thứ ba đã phải vay mượn; tuần thứ tư lại mì gói. Dù tăng lương vẫn thấy không đủ."
                                },
                                {
                                    id: "problem3",
                                    icon: "bx-notepad",
                                    title: "Không theo dõi chi tiêu",
                                    desc: "Lười, phức tạp hoặc hay quên. Không theo dõi thì khó tìm chỗ cắt giảm và dễ kẹt trong vấn đề tài chính."
                                },
                                {
                                    id: "problem4",
                                    icon: "bx-target-lock",
                                    title: "Không có mục tiêu tài chính rõ ràng",
                                    desc: "Sống không kế hoạch tài chính. Không mục tiêu tiết kiệm, không đầu tư, không quỹ khẩn cấp — mọi thứ trôi nổi."
                                },
                                {
                                    id: "problem5",
                                    icon: "bx-time-five",
                                    title: "Quản lý thời gian tài chính kém",
                                    desc: "Trễ hạn thanh toán, quên trả góp, không có thời gian theo dõi chi tiêu. Mất cả thời gian lẫn tiền bạc."
                                }
                            ].map((problem) => (
                                <div className="accordion-item border-0 mb-3" key={problem.id} data-aos="fade-up" data-aos-delay="800">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed bg-light rounded-3 shadow"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${problem.id}`}
                                            aria-expanded="false"
                                        >
                                            <div className="d-flex align-items-center">
                                                <div className="bg-danger bg-opacity-10 rounded-circle p-2 me-3">
                                                    <i className={`bx ${problem.icon} text-danger`}></i>
                                                </div>
                                                <span className="fw-semibold">{problem.title}</span>
                                            </div>
                                        </button>
                                    </h2>
                                    <div
                                        id={problem.id}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#problemAccordion"
                                    >
                                        <div className="accordion-body bg-light rounded-bottom-3 text-muted">
                                            {problem.desc}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12" data-aos="fade-left" data-aos-delay="900">
                        <div className="position-relative">
                            <div className="card border-0 shadow rounded-4 p-4 bg-gradient-to-br from-red-50 to-orange-100">
                                <div className="text-center mb-4">  
                                    <div className="bg-danger bg-opacity-10 rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                                        <i className="bx bx-wallet text-danger" style={{ fontSize: '3rem' }}></i>
                                    </div>
                                    <h5 className="fw-bold text-danger mb-2">Tình trạng tài chính hiện tại</h5>
                                    <p className="text-muted small">Bức tranh thực tế về tài chính của đa số mọi người</p>
                                </div>

                                <div className="row g-3 mb-4">
                                    <div className="col-6" data-aos="fade-up" data-aos-delay="1000">
                                        <div className="bg-success bg-opacity-10 rounded-3 p-3 text-center">
                                            <i className="bx bx-plus-circle text-success fs-3 mb-2"></i>
                                            <div className="fw-bold text-success">Rp {income.toLocaleString('id-ID')}</div>
                                            <small className="text-muted">Thu nhập</small>
                                        </div>
                                    </div>
                                    <div className="col-6" data-aos="fade-up" data-aos-delay="1100">
                                        <div className="bg-danger bg-opacity-10 rounded-3 p-3 text-center">
                                            <i className="bx bx-minus-circle text-danger fs-3 mb-2"></i>
                                            <div className="fw-bold text-danger">Rp {expenses.toLocaleString('id-ID')}</div>
                                            <small className="text-muted">Chi tiêu</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white rounded-3 p-3 text-center border border-danger border-opacity-25" data-aos="fade-up" data-aos-delay="1200">
                                    <i className="bx bx-error-circle text-danger fs-4 mb-2"></i>
                                    <div className="fw-bold text-danger">-Rp {deficit.toLocaleString('id-ID')}</div>
                                    <small className="text-muted">Thâm hụt hàng tháng</small>
                                </div>
                            </div>

                            <div className="position-absolute top-0 start-0" data-aos="fade-down" data-aos-delay="1300">
                                <div className="card shadow border-0 rounded-3 p-3" style={{ width: '120px' }}>
                                    <div className="text-center">
                                        <i className="bx bx-coffee text-warning fs-4"></i>
                                        <div className="fw-bold small text-dark">Rp {coffee.toLocaleString('id-ID')}</div>
                                        <small className="text-muted">Cà phê & đồ ăn vặt</small>
                                    </div>
                                </div>
                            </div>

                            <div className="position-absolute top-0 end-0" data-aos="fade-down" data-aos-delay="1400">
                                <div className="card shadow border-0 rounded-3 p-3" style={{ width: '130px' }}>
                                    <div className="text-center">
                                        <i className="bx bx-shopping-bag text-info fs-4"></i>
                                        <div className="fw-bold small text-dark">Rp {impulse.toLocaleString('id-ID')}</div>
                                        <small className="text-muted">Mua sắm bốc đồng</small>
                                    </div>
                                </div>
                            </div>

                            <div className="position-absolute bottom-0 start-0" data-aos="fade-down" data-aos-delay="1500">
                                <div className="card shadow border-0 rounded-3 p-3" style={{ width: '140px' }}>
                                    <div className="text-center">
                                        <i className="bx bx-credit-card text-danger fs-4"></i>
                                        <div className="fw-bold small text-dark">Rp {subscriptions.toLocaleString('id-ID')}</div>
                                        <small className="text-muted">Đăng ký quên hủy</small>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Problem;
