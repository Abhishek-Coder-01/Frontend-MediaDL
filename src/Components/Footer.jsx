import "./style.css";

export default function About() {
    return (


        //   <!-- FOOTER -->
        <footer className="bg-white border-t-2 border-black">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    {/* <!-- Logo & Description --> */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-12 h-12 bg-black rounded-xl flex items-center justify-center border-2 border-black">
                                <i className="fa-solid fa-download text-white text-[22px]"></i>
                            </div>
                            <span className="text-2xl font-bold">MediaDL</span>
                        </div>
                        <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
                            Next-gen media downloads. Turn video link into fast reliable downloads for seamless viewing everywhere.!
                        </p>
                        <div className="flex gap-3">
                            <a href="https://www.linkedin.com/in/abhishek-yadav-292ba9308/"
                                className="w-12 h-12 border-2 border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.93-2.06-2.07 0-1.14.92-2.06 2.06-2.06s2.06.92 2.06 2.06c0 1.14-.92 2.07-2.06 2.07zM20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.44-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z" />
                                </svg>

                            </a>
                            <a href="https://github.com/Abhishek-Coder-01"
                                className="w-12 h-12 border-2 border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path
                                        d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/a._k._y._121/"
                                className="w-12 h-12 border-2 border-black rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10z" />
                                    <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6z" />
                                    <circle cx="17.5" cy="6.5" r="1.2" />
                                </svg>

                            </a>

                        </div>
                    </div>

                    {/* <!-- Navigation --> */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 mono">NAVIGATION</h4>
                        <div className="space-y-2">
                            <a
                                href="#homePage"
                                className="block text-gray-600 hover:text-black font-medium transition-colors"
                            >
                                Home
                            </a>
                            <a
                                href="#aboutPage"
                                className="block text-gray-600 hover:text-black font-medium transition-colors"
                            >
                                About
                            </a>
                            <a
                                href="#featuresPage"
                                className="block text-gray-600 hover:text-black font-medium transition-colors"
                            >
                                Features
                            </a>
                            <a
                                href="#featuresPage"
                                className="block text-gray-600 hover:text-black font-medium transition-colors"
                            >
                                Deshboard
                            </a>
                        </div>
                    </div>

                    {/* <!-- Tech Stack --> */}
                    <div>
                        <h4 className="font-bold text-lg mb-4 mono">TECH STACK</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="tag bg-white text-xs">HTML5</span>
                            <span className="tag bg-white text-xs">Tailwind</span>
                            <span className="tag bg-white text-xs">JavaScript</span>
                            <span className="tag bg-white text-xs">Python</span>
                            <span className="tag bg-white text-xs">Lockalstroge</span>
                            <span className="tag bg-white text-xs">Wi-Fi</span>
                        </div>
                    </div>
                </div>

                {/* <!-- Copyright --> */}
                <div className="border-t-2 border-black pt-8 text-center">
                    <p className="text-gray-600 font-medium mono text-sm">© 2026 MediaDL ❤️. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>



    )
}
