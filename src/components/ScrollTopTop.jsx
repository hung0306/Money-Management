import { useState, useEffect } from "react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);


    const scrollToTop = () => {
        setIsClicked(true);
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

     
        setTimeout(() => {
            setIsClicked(false);
        }, 1000);
    };

    const buttonSize = isMobile ? 50 : 60;
    const buttonPosition = isMobile ? 20 : 30;
    const rippleSize = isMobile ? 150 : 200;

    return (
        <>
            
            {isVisible && (
                <div 
                    className="scroll-to-top-btn"
                    onClick={scrollToTop}
                    style={{
                        position: 'fixed',
                        bottom: `${buttonPosition}px`,
                        right: `${buttonPosition}px`,
                        width: `${buttonSize}px`,
                        height: `${buttonSize}px`,
                        backgroundColor: '#007bff',
                        color: 'white',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(0, 123, 255, 0.3)',
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        zIndex: 1000,
                        border: 'none',
                        outline: 'none',
                        overflow: 'hidden',
                        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(100px) scale(0)',
                        opacity: isVisible ? 1 : 0,
                    }}
                    onMouseEnter={(e) => {
                        if (!isMobile) {
                            e.target.style.transform = 'translateY(-3px) scale(1.05)';
                            e.target.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.4)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (!isMobile) {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = '0 4px 20px rgba(0, 123, 255, 0.3)';
                        }
                    }}
                >
                  
                    <i 
                        className="bx bx-chevron-up"
                        style={{
                            fontSize: isMobile ? '20px' : '24px',
                            zIndex: 2
                        }}
                    />

                 
                    <div 
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: isClicked ? `${rippleSize}px` : '0',
                            height: isClicked ? `${rippleSize}px` : '0',
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                            transform: 'translate(-50%, -50%)',
                            transition: 'all 0.4s ease',
                            pointerEvents: 'none',
                            zIndex: 1
                        }}
                    />
                </div>
            )}

            
            {isVisible && !isClicked && (
                <div 
                    style={{
                        position: 'fixed',
                        bottom: `${buttonPosition}px`,
                        right: `${buttonPosition}px`,
                        width: `${buttonSize}px`,
                        height: `${buttonSize}px`,
                        borderRadius: '50%',
                        border: '3px solid rgba(0, 123, 255, 0.4)',
                        zIndex: 999,
                        pointerEvents: 'none',
                        animation: 'pulse 2s infinite'
                    }}
                />
            )}

            <style jsx>{`
                @keyframes pulse {
                    0% {
                        transform: scale(1);
                        opacity: 0.8;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 0.4;
                    }
                    100% {
                        transform: scale(1.4);
                        opacity: 0;
                    }
                }

                .scroll-to-top-btn:active {
                    transform: translateY(0) scale(0.95) !important;
                }

              
                @media (max-width: 768px) {
                    .scroll-to-top-btn:active {
                        transform: translateY(0) scale(0.9) !important;
                        transition: transform 0.1s ease;
                    }
                }

                .scroll-to-top-btn * {
                    transition: inherit;
                }
            `}</style>
        </>
    );
};

export default ScrollToTop;