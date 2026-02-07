import { useState } from "react";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";


export default function Nav() {
    const [activePage, setActivePage] = useState("home");
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { id: "home", label: "Home", },
        { id: "features", label: "Features" },
        { id: "about", label: "About" },
    ];

    const navigate = useNavigate();
    const location = useLocation();

    function showPage(page) {
        setActivePage(page);
        setMobileOpen(false);

        if (location.pathname !== "/") {
            navigate("/");
            setTimeout(() => {
                const el = document.getElementById(`${page}Page`);
                el?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        } else {
            const el = document.getElementById(`${page}Page`);
            el?.scrollIntoView({ behavior: "smooth" });
        }
    }



    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center border-2 border-black">
                            <i className="fa-solid fa-download text-white text-[22px]"></i>
                        </div>
                        <span className="text-2xl font-bold">MediaDL</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-2">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => showPage(item.id)}
                                className={`nav-link ${activePage === item.id ? "active" : ""}`}
                            >
                                {item.label}
                            </button>

                        ))}
                        <button
                            onClick={() => navigate("/dashboard")} className="btn-primary ml-4">Get Started →</button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 border-2 border-black rounded-lg"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? (
                            // X icon
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            // Hamburger icon
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </button>

                </div>

                {/* Mobile Menu */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-out
    ${mobileOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}
  `}
                >
                    <div className="mt-4 pb-4 flex flex-col gap-2">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => showPage(item.id)}
                                className={`nav-link ${activePage === item.id ? "active" : ""} text-left`}
                            >
                                {item.label}
                            </button>

                        ))}
                        <button
                            onClick={() => navigate("/dashboard")} className="btn-primary mt-2 justify-center">Get Started →</button>
                    </div>
                </div>

            </div>
        </nav>
    );
}
