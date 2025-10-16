import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useBootstrapTooltips } from "../functions/Tooltip";

const Method = () => {
    const navigate = useNavigate();
    useBootstrapTooltips();
    const handleRegisterClick = () => {
        Swal.fire({
            title: 'Bạn muốn đăng ký ngay?',
            text: 'Bạn sẽ được chuyển đến trang đăng ký.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/signup');
            }
        });
    };

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const steps = [
        {
            number: "01",
            icon: "bx-user-plus",
            title: "Tạo tài khoản",
            desc: "Đăng ký với email và tạo mật khẩu an toàn. Nhanh chóng và dễ dàng.",
            color: "primary",
            delay: 200
        },
        {
            number: "02",
            icon: "bx-cog",
            title: "Thiết lập hồ sơ",
            desc: "Hoàn thiện hồ sơ với thông tin cơ bản và mục tiêu tài chính để cá nhân hóa trải nghiệm.",
            color: "success",
            delay: 400
        },
        {
            number: "03",
            icon: "bx-link-alt",
            title: "Kết nối tài khoản",
            desc: "Liên kết an toàn tài khoản ngân hàng và thẻ để tự động theo dõi thu chi.",
            color: "warning",
            delay: 600
        },
        {
            number: "04",
            icon: "bx-rocket",
            title: "Bắt đầu quản lý",
            desc: "Khởi đầu với lập ngân sách thông minh, theo dõi chi tiêu và mục tiêu tiết kiệm.",
            color: "info",
            delay: 800
        }
    ];

    return (
        <section className="py-5 bg-white overflow-hidden">
            <div className="container">

                <div className="row justify-content-center mb-5" data-aos="fade-up">
                    <div className="col-lg-8 text-center">
                        <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill mb-3" data-aos="zoom-in" data-aos-delay="100">
                            <i className="bx bx-check-circle me-2"></i>
                            Đăng ký dễ dàng
                        </span>

                        <h2 className="display-5 fw-bold text-dark mb-4" data-aos="fade-up" data-aos-delay="200">
                            Bắt đầu hành trình tài chính với
                            <span className="text-primary"> 4 bước đơn giản</span>
                        </h2>

                        <p className="lead text-muted mb-4" data-aos="fade-up" data-aos-delay="300">
                            Bắt đầu nhanh chóng và dễ dàng. Làm theo các bước đơn giản để làm chủ tài chính ngay hôm nay.
                        </p>
                    </div>
                </div>

                <div className="row g-4 mb-5">
                    {steps.map((step, index) => (
                        <div className="col-lg-6 col-md-6" key={index} data-aos="fade-up" data-aos-delay={step.delay}>
                            <div className="card border-0 shadow h-100 position-relative overflow-hidden">

                                <div className={`position-absolute top-0 end-0 bg-${step.color} bg-opacity-10`}
                                    style={{ width: '80px', height: '80px', borderRadius: '0 0 0 100%' }}>
                                </div>

                                <div className="card-body p-4 position-relative">
                                    <div className="d-flex align-items-start mb-3">

                                        <div className={`bg-${step.color} bg-opacity-10 rounded-circle p-3 me-3 flex-shrink-0`}
                                            style={{ width: '60px', height: '60px' }}>
                                            <i className={`bx ${step.icon} text-${step.color} fs-3`}></i>
                                        </div>

                                        <div className={`text-${step.color} fw-bold fs-4 ms-auto`}>
                                            {step.number}
                                        </div>
                                    </div>

                                    <h5 className="fw-bold text-dark mb-3">{step.title}</h5>
                                    <p className="text-muted mb-0">{step.desc}</p>

                                    {index < steps.length - 1 && (
                                        <div className="position-absolute bottom-0 start-50 translate-middle-x d-none d-lg-block"
                                            style={{ bottom: '-20px' }}>
                                            <i className={`bx bx-chevron-down text-${step.color} fs-2`}></i>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="d-lg-none mb-5" data-aos="fade-up" data-aos-delay="1000">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-center align-items-center">
                                {steps.map((step, index) => (
                                    <div key={index} className="d-flex align-items-center">
                                        <div className={`bg-${step.color} rounded-circle d-flex align-items-center justify-content-center`}
                                            style={{ width: '40px', height: '40px' }}>
                                            <span className="text-white fw-bold small">{step.number}</span>
                                        </div>
                                        {index < steps.length - 1 && (
                                            <div className="bg-secondary mx-2" style={{ width: '30px', height: '2px' }}></div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-3 mb-4 justify-content-center" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="600">
                    <button className="btn btn-primary btn-lg px-4 py-3 rounded-3 shadow-lg" data-aos="fade-up" data-aos-delay="700" data-bs-toggle="tooltip" title="Bắt đầu miễn phí" onClick={handleRegisterClick}>
                        <i className="bx bx-rocket me-2"></i>
                        Đăng ký ngay
                    </button>
                </div>


            </div>
        </section>
    );
};

export default Method;
