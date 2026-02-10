import "./style.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineOndemandVideo } from "react-icons/md";
import howItWorks from "../assets/MediaDL.mp4";
import API_BASE from "./API";




function Home() {

    const [uptime, setUptime] = useState(0);
    const [latency, setLatency] = useState(0);
    const [wireless, setWireless] = useState(0);





    // STATES
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // REF for stopping retry
    const retryRef = useRef(null);

    // OPEN DASHBOARD
    const openDashboard = () => {
        if (isLoading) {
            setShowModal(true);
            return;
        }
        setIsLoading(true);   // 🔄 button loader
        setShowModal(true);  // 📦 popup
        checkServer();
    };

    // CLOSE MODAL (❌)
    const closeModal = () => {
        setShowModal(false);
    };

    // CHECK SERVER
    const checkServer = async () => {
        try {
            await fetch(API_BASE, { mode: "no-cors" });

            // server ready
            setIsLoading(false);
            retryRef.current = null;
            navigate("/dashboard");

        } catch {
            // retry after 5 sec
            retryRef.current = setTimeout(checkServer, 5000);
        }
    };

    useEffect(() => {
        return () => {
            if (retryRef.current) {
                clearTimeout(retryRef.current);
                retryRef.current = null;
            }
        };
    }, []);


    const [open, setOpen] = useState(false);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        function onKey(e) {
            if (e.key === 'Escape' && open) setOpen(false);
        }
        if (open) {
            document.addEventListener('keydown', onKey);
            // move focus to close button for accessibility
            setTimeout(() => closeButtonRef.current?.focus(), 0);
        }
        return () => document.removeEventListener('keydown', onKey);
    }, [open]);

    useEffect(() => {
        const duration = 1200;
        const startTime = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);

            setUptime(99.9 * progress);
            setLatency(5 * progress);
            setWireless(100 * progress);

            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, []);

    const navigate = useNavigate();

    return (

        // < !--HOME PAGE-- >
        <div id="homePage" className="page active">
            {/* <!-- Hero Section --> */}
            <section className="grid-bg min-h-screen flex items-center pt-24 pb-12">
                <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 mb-6 md:mt-3">
                            <span className="tag accent-green text-white">100% Web-Based</span>
                            <span className="tag bg-white">Internet Powered</span>
                        </div>

                        <h1 className="hero-title text-7xl md:text-8xl font-[700] md:font-bold mb-6 leading-tight text-[52px]" data-aos="fade-up"
                            data-aos-offset="120"
                            data-aos-duration="900"
                            data-aos-easing="cubic-bezier(0.22, 1, 0.36, 1)" >
                            Download Social Media<br />
                            <span
                                className="inline-block"
                                style={{
                                    background: "linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}
                            >
                                Videos Easily
                            </span>
                        </h1>

                        <p className="text-[18px] md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                            Download reels and videos from social media platforms quickly and easily. Save social media videos directly to your device with ease.
                        </p>

                        <div className="
  flex flex-col sm:flex-row
  items-stretch sm:items-center
  justify-center
  gap-3 sm:gap-4 md:gap-6
  mb-12
" data-aos="fade-up" data-aos-delay="400" data-aos-duration="900">
                            {/* BUTTON */}
                            <button
                                onClick={openDashboard}
                                className="btn-primary w-full sm:w-auto text-base sm:text-lg px-5 sm:px-6 md:px-8 py-3 flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    // 🔄 BUTTON LOADER
                                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeDasharray="40"
                                            strokeDashoffset="20"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                ) : (
                                    // ➡️ NORMAL ARROW
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                )}

                                {isLoading ? "Loading…" : "Open Dashboard"}
                            </button>


                            {/* MODAL */}
                            {showModal && (
                                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-xl p-8 w-[320px] text-center relative">

                                        <button
                                            onClick={closeModal}
                                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl"
                                        >
                                            &times;
                                        </button>

                                        {/* MATERIAL LOADER */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 9.8 9.8"
                                            className="w-12 h-12 mx-auto animate-spin"
                                            style={{ animationDuration: "1.4s" }}
                                        >
                                            <circle
                                                cx="50%"
                                                cy="50%"
                                                r="4"
                                                fill="none"
                                                stroke="#1a73e8"
                                                strokeWidth="10%"
                                                strokeLinecap="round"
                                                strokeDasharray="25"
                                                strokeDashoffset="12"
                                            />
                                        </svg>

                                        <p className="mt-4 font-medium">Preparing your dashboard</p>
                                        <p className="text-sm text-gray-500">
                                            This may take a moment on your first visit. Please wait…
                                        </p>


                                    </div>
                                </div>
                            )}




                            <button

                                onClick={() => setOpen(true)}
                                aria-haspopup="dialog"
                                aria-controls="howItWorksModal"
                                type="button"

                                className=" btn-outline w-full sm:w-auto text-base sm:text-lg  px-5 sm:px-6 md:px-8  py-3 flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                Watch Demo
                            </button>


                            {open && (
                                <div id="howItWorksModal" role="dialog" aria-modal="true" aria-labelledby="howItWorksTitle" className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                    {/* backdrop */}
                                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

                                    <div className="relative bg-white rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden transform transition-all">
                                        <div className="flex items-center justify-between p-1 md:p-3 border-b border-gray-100">
                                            <h3 id="howItWorksTitle" className="text-md md:text-lg font-black text-gray-900 pl-2 md:pl-0">How It Works</h3>
                                            <button
                                                ref={closeButtonRef}
                                                onClick={() => setOpen(false)}
                                                aria-label="Close video"
                                                className="ml-3 bg-gray-100 active:scale-90 hover:bg-gray-200 mr-2 md:mr-0 text-gray-800 w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
                                            >
                                                <i className="fa-solid fa-xmark text-red-500 text-sm md:text-lg"></i>
                                            </button>
                                        </div>

                                        <div className="bg-black">
                                            <video controls autoPlay className="w-full max-h-[80vh] bg-black">
                                                <source src={howItWorks} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>


                        {/* <!-- Stats --> */}
                        <div
                            className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-10 text-[14px] sm:text-[16px]"
                            data-aos="fade-up"
                            data-aos-delay="600"
                            data-aos-duration="900"
                        >
                            <div className="stat-box text-center">
                                <div className="stat-number text-[23px]  md:text-[32px] font-bold">
                                    {uptime.toFixed(1)}%
                                </div>
                                <div className="text-[14px] md:text-[15px] font-semibold text-gray-600 mono">
                                    DOWNLOAD SUCCESS
                                </div>
                            </div>

                            <div className="stat-box text-center">
                                <div className="stat-number text-[23px]  md:text-[32px] font-bold">
                                    {latency.toFixed(0)}ms
                                </div>
                                <div className="text-[14px] md:text-[15px] font-semibold text-gray-600 mono">
                                    PROCESSING SPEED
                                </div>
                            </div>

                            <div className="stat-box text-center">
                                <div className="stat-number text-[23px]  md:text-[32px] font-bold">
                                    {wireless.toFixed(0)}%
                                </div>
                                <div className="text-[14px] md:text-[15px] font-semibold text-gray-600 mono">
                                    ONLINE BASED
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* <!-- Device Mockup --> */}
                    <div className="max-w-4xl mx-auto mb-12" data-aos="zoom-in" data-aos-delay="800" data-aos-duration="900">
                        <div className="bento-card bg-gradient-to-br from-gray-50 to-white float-animation">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* <!-- Mouse Control --> */}
                                <div className="text-center">
                                    <div
                                        className="w-24 h-24 mx-auto mb-4 accent-blue rounded-2xl flex items-center justify-center border-2 border-black">

                                        <MdOutlineOndemandVideo className="w-12 h-12 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Reel & Video Download</h3>
                                    <p className="text-gray-600">Save social media videos easily</p>
                                </div>

                                {/* <!-- Keyboard Control --> */}
                                <div className="text-center">
                                    <div
                                        className="w-24 h-24 mx-auto mb-4 accent-purple rounded-2xl flex items-center justify-center border-2 border-black">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor"
                                            viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2">Multiple Platforms</h3>
                                    <p className="text-gray-600">One tool, many sources</p>
                                </div>
                            </div>

                            {/* <!-- Connection Status --> */}
                            <div
                                className="mt-8 p-4 bg-white border-2 border-black rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="font-semibold mono text-sm">READY TO DOWNLOAD</span>
                                </div>
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                                        d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Feature Preview --> */}
                    <div className="feature-grid max-w-6xl mx-auto">
                        <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                            <div className="icon-box mb-4 accent-blue">

                                <svg className="w-8 h-8" fill="none" stroke="#06B6D4" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>

                            </div>
                            <h3 className="text-2xl font-bold mb-3">Ultra-Fast</h3>
                            <p className="text-gray-600 leading-relaxed">Real-time video fetching with minimal processing delay for quick downloads.</p>
                        </div>

                        <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                            <div className="icon-box mb-4 accent-green">
                                <svg className="w-8 h-8" fill="none" stroke="#FF6600" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Secure</h3>
                            <p className="text-gray-600 leading-relaxed">Safe link processing ensures your data and activity remain protected.</p>
                        </div>

                        <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                            <div className="icon-box mb-4 accent-purple">
                                <svg className="w-8 h-8" fill="none" stroke="#9900FF" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Cross-Platform</h3>
                            <p className="text-gray-600 leading-relaxed">Works smoothly on Windows, macOS, and Linux through any modern browser.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* <!-- Tech Stack Marquee --> */}
            <div className="marquee bg-white">
                <div className="marquee-content mono font-semibold text-sm">
                    <span className="px-8">REACT</span>
                    <span className="px-8">•</span>
                    <span className="px-8">VITE</span>
                    <span className="px-8">•</span>
                    <span className="px-8">JAVASCRIPT</span>
                    <span className="px-8">•</span>
                    <span className="px-8">TAILWIND CSS</span>
                    <span className="px-8">•</span>
                    <span className="px-8">PYTHON</span>
                    <span className="px-8">•</span>
                    <span className="px-8">BACKEND API</span>
                    <span className="px-8">•</span>

                    {/* repeat for smooth marquee */}
                    <span className="px-8">REACT</span>
                    <span className="px-8">•</span>
                    <span className="px-8">VITE</span>
                    <span className="px-8">•</span>
                    <span className="px-8">JAVASCRIPT</span>
                    <span className="px-8">•</span>
                    <span className="px-8">TAILWIND CSS</span>
                    <span className="px-8">•</span>
                    <span className="px-8">PYTHON</span>
                    <span className="px-8">•</span>
                </div>

            </div>
        </div>



    )
}

export default Home
