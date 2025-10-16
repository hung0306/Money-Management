import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const testimonials = [
        {
            id: 1,
            name: "Ahmad Rizki",
            role: "Software Developer",
            company: "Startup ID",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "Simple, effective, and powerful. The expense tracking feature helped me identify spending leaks I never noticed before.",
            savings: "Rp 8,500,000",
            period: "4 months"
        },
        {
            id: 2,
            name: "Linda Sari",
            role: "Business Owner",
            company: "Fashion Store",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "As a business owner, managing personal and business finances was chaotic. This app brought clarity and control back to my life.",
            savings: "Rp 25,000,000",
            period: "8 months"
        },
        {
            id: 3,
            name: "David Kurniawan",
            role: "Financial Analyst",
            company: "Bank Mandiri",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "Even as a financial professional, I struggled with personal budgeting. This tool made it incredibly easy and automated.",
            savings: "Rp 12,750,000",
            period: "5 months"
        },
        {
            id: 4,
            name: "Maya Putri",
            role: "Teacher",
            company: "SMA Negeri 1",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "Teaching doesn't pay much, but this app helped me maximize every rupiah. I finally have an emergency fund and vacation savings!",
            savings: "Rp 6,200,000",
            period: "7 months"
        },
        {
            id: 5,
            name: "Budi Santoso",
            role: "Freelancer",
            company: "Independent",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
            rating: 5,
            text: "Irregular income as a freelancer made budgeting impossible. This app's smart categorization and alerts keep me on track.",
            savings: "Rp 9,800,000",
            period: "6 months"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };


    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <i key={i} className={`bx ${i < rating ? 'bxs-star' : 'bx-star'} text-warning`}></i>
        ));
    };

    return (
        <section className="py-5 bg-white overflow-hidden">
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-lg-5 col-md-12 mb-5 mb-lg-0" data-aos="fade-right">
                        <div className="pe-lg-4">

                            <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill mb-3" data-aos="zoom-in" data-aos-delay="200">
                                <i className="bx bx-heart me-2"></i>
                                Cảm nhận người dùng
                            </span>

                            <h2 className="display-5 fw-bold text-dark mb-4" data-aos="fade-up" data-aos-delay="300">
                                Người thật,
                                <span className="text-success"> kết quả thật</span>
                            </h2>

                            <p className="lead text-muted mb-4" data-aos="fade-up" data-aos-delay="400">
                                Tham gia cùng hàng ngàn người dùng đã thay đổi cuộc sống tài chính với công cụ của chúng tôi.
                            </p>

                            <div className="card border-0 shadow rounded-4 p-4 mb-4" data-aos="fade-up" data-aos-delay="500">
                                <div className="row text-center g-0">
                                    <div className="col-4">
                                        <div className="border-end border-light">
                                            <div className="bg-primary bg-opacity-10 rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                <i className="bx bx-user text-primary fs-5"></i>
                                            </div>
                                            <h5 className="fw-bold text-primary mb-0">50K+</h5>
                                            <small className="text-muted">Người dùng hài lòng</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="border-end border-light">
                                            <div className="bg-success bg-opacity-10 rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                                <i className="bx bx-trending-up text-success fs-5"></i>
                                            </div>
                                            <h5 className="fw-bold text-success mb-0">85%</h5>
                                            <small className="text-muted">Tiết kiệm hơn</small>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="bg-warning bg-opacity-10 rounded-circle mx-auto mb-2 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                            <i className="bx bx-star text-warning fs-5"></i>
                                        </div>
                                        <h5 className="fw-bold text-warning mb-0">4.9</h5>
                                        <small className="text-muted">Đánh giá</small>
                                    </div>
                                </div>
                            </div>


                            <div className="d-flex align-items-center gap-3" data-aos="fade-up" data-aos-delay="600">
                                <div className="d-flex align-items-center">
                                    <i className="bx bx-check-shield text-success me-2 fs-5"></i>
                                    <small className="text-muted">Được tin dùng bởi 50.000+ người</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="bx bxs-star text-warning me-2 fs-5"></i>
                                    <small className="text-muted">4.9★ Người dùng thực</small>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="col-lg-7 col-md-12" data-aos="fade-left" data-aos-delay="700">
                        <div className="position-relative">

                            <div className="testimonial-carousel overflow-hidden rounded-4 shadow">
                                <div
                                    className="d-flex transition-all"
                                    style={{
                                        transform: `translateX(-${currentSlide * 100}%)`,
                                        transition: 'transform 0.5s ease-in-out'
                                    }}
                                >
                                    {testimonials.map((testimonial) => (
                                        <div key={testimonial.id} className="w-100 flex-shrink-0 px-2" style={{ minWidth: '100%', boxSizing: 'border-box' }}>
                                            <div className="card card-testimonials border-0  rounded-4 p-4 h-100">

                                                <div className="d-flex align-items-center mb-3">
                                                    <img
                                                        src={testimonial.image}
                                                        alt={testimonial.name}
                                                        className="rounded-circle me-3"
                                                        width="60"
                                                        height="60"
                                                        style={{ objectFit: 'cover' }}
                                                    />
                                                    <div className="flex-grow-1">
                                                        <h6 className="fw-bold mb-0">{testimonial.name}</h6>
                                                        <p className="text-muted small mb-1">{testimonial.role}</p>
                                                        <p className="text-primary small mb-0">{testimonial.company}</p>
                                                    </div>
                                                    <div className="text-end">
                                                        <div className="mb-1">
                                                            {renderStars(testimonial.rating)}
                                                        </div>
                                                        <small className="text-muted">Người dùng xác thực</small>
                                                    </div>
                                                </div>


                                                <div className="position-relative mb-4">
                                                    <i className="bx bxs-quote-alt-left text-primary fs-1 opacity-25 position-absolute" style={{ top: '-10px', left: '-10px' }}></i>
                                                    <p className="text-muted lead ps-4">
                                                        {testimonial.text}
                                                    </p>
                                                </div>

                                                <div className="row g-3 mt-auto">
                                                    <div className="col-6">
                                                        <div className="bg-success bg-opacity-10 rounded-3 p-3 text-center">
                                                            <i className="bx bx-wallet text-success fs-4 mb-1"></i>
                                                            <div className="fw-bold text-success small">{testimonial.savings}</div>
                                                            <small className="text-muted">Tổng tiền tiết kiệm</small>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="bg-info bg-opacity-10 rounded-3 p-3 text-center">
                                                            <i className="bx bx-time text-info fs-4 mb-1"></i>
                                                            <div className="fw-bold text-info small">{testimonial.period}</div>
                                                            <small className="text-muted">Thời gian sử dụng</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                className="btn btn-primary rounded-circle position-absolute top-50 start-0 translate-middle-y d-none d-lg-flex align-items-center justify-content-center shadow"
                                style={{ width: '50px', height: '50px', left: '-25px', zIndex: 10 }}
                                onClick={prevSlide}
                                type="button"
                            >
                                <i className="bx bx-chevron-left fs-4"></i>
                            </button>

                            <button
                                className="btn btn-primary rounded-circle position-absolute top-50 end-0 translate-middle-y d-none d-lg-flex align-items-center justify-content-center shadow"
                                style={{ width: '50px', height: '50px', right: '-25px', zIndex: 10 }}
                                onClick={nextSlide}
                                type="button"
                            >
                                <i className="bx bx-chevron-right fs-4"></i>
                            </button>


                            <div className="d-flex justify-content-center mt-4 gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`btn rounded-circle p-0 ${index === currentSlide ? 'bg-primary' : 'bg-light border'}`}
                                        style={{ width: '12px', height: '12px' }}
                                        onClick={() => goToSlide(index)}
                                        type="button"
                                        aria-label={`Go to slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </section>
    );
};

export default Testimonials;