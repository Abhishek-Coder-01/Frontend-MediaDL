import "./style.css";
import { IoIosVideocam } from "react-icons/io";
import { FaRegFolderOpen } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";

export default function Feature() {
    return (


        //  <!-- FEATURES PAGE -->
        <div id="featuresPage" className="page">
            <section className="grid-bg min-h-screen pt-32 pb-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16" >
                        <span className="tag accent-purple text-white mb-6 inline-block">FEATURES</span>
                        <h2 className="text-6xl md:text-7xl font-bold mb-6"data-aos="fade-up" data-aos-delay="200" data-aos-duration="900" >
                            Powerful <span
                                style={{
                                    background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}>Features</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                            Everything you need to download reels and videos in one solution.
                        </p>
                    </div>

                    {/* <!-- Mouse Features --> */}
                    <div className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div
                                className="w-14 h-14 accent-blue rounded-xl flex items-center justify-center border-2 border-black">
                                <svg
                                    className="w-7 h-7"
                                    fill="none"
                                    stroke="white"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h6v6H4V6z
       M14 6h6v6h-6V6z
       M4 16h6v6H4v-6z
       M14 16h6v6h-6v-6z"
                                    />
                                </svg>

                            </div>
                            <h3 className="text-4xl font-bold" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">Core Features</h3>
                        </div>

                        <div className="feature-grid">
                            <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-blue-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <FaLink className="w-7 h-7 text-black" />
                                </div>
                                <h4 className="text-2xl font-bold mb-2">Link-Based Download</h4>
                                <p className="text-gray-600">Paste video links for instant media fetching</p>
                            </div>

                            <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-blue-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <IoIosVideocam className="w-7 h-7 text-black" />

                                </div>
                                <h4 className="text-2xl font-bold mb-2">Reel & Video Support</h4>
                                <p className="text-gray-600">Download reels and videos in high quality</p>
                            </div>

                            <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-blue-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold mb-2">Fast Processing</h4>
                                <p className="text-gray-600">Quick video extraction with minimal delay</p>
                            </div>

                            <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-blue-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold mb-2">Quality Selection</h4>
                                <p className="text-gray-600">Choose video quality before downloading</p>
                            </div>

                            <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-blue-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <FaRegFolderOpen className="w-7 h-7 text-black" />

                                </div>
                                <h4 className="text-2xl font-bold mb-2">Easy Save</h4>
                                <p className="text-gray-600">Download and store videos directly to your device</p>
                            </div>

                            <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-blue-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                                </div>
                                <h4 className="text-2xl font-bold mb-2">Multi-Platform</h4>
                                <p className="text-gray-600">Works across multiple social media platforms</p>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Keyboard Features --> */}
                    <div>
                        <div className="flex items-center gap-3 mb-8" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                            <div
                                className="w-14 h-14 accent-purple rounded-xl flex items-center justify-center border-2 border-black">
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="white"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 5v14M5 12h14"
                                    />
                                </svg>

                            </div>
                            <h3 className="text-4xl font-bold">Additional Capabilities</h3>
                        </div>

                        <div className="feature-grid" >

                            <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-purple-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <svg className="w-8 h-8" fill="none" stroke="black" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold mb-2">All Platform Support</h4>
                                <p className="text-gray-600">Download from Instagram, TikTok, YouTube, Facebook, Twitter, and more.</p>
                            </div>

                            <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-purple-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold mb-2">Video & Audio Extraction</h4>
                                <p className="text-gray-600">Download videos in MP4 format or extract audio as MP3 files.</p>
                            </div>
                            <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-purple-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold mb-2">No Watermarks</h4>
                                <p className="text-gray-600">Download clean videos without platform watermarks or logos.</p>
                            </div>
                            <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-purple-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <svg className="w-8 h-8" fill="none" stroke="black" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </div>
                                <h4 className="text-2xl font-bold mb-2">Secure Processing</h4>
                                <p className="text-gray-600">Safe and reliable handling of video links.</p>
                            </div>

                            <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-purple-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold mb-2">Web-Based Access</h4>
                                <p className="text-gray-600">No installation required, works directly in browser.</p>
                            </div>

                            <div className="bento-card"     data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                                <div
                                    className="w-14 h-14 mb-4 bg-purple-100 rounded-xl flex items-center justify-center border-2 border-black">
                                    <svg
                                        className="w-7 h-7"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5h18M3 5v10a2 2 0 002 2h14a2 2 0 002-2V5
                                                  M7 21h10
                                                 M9 17v4
                                                  M15 17v4
                                                    M16 10h5v7a1 1 0 01-1 1h-3a1 1 0 01-1-1v-7z"
                                        />
                                    </svg>

                                </div>
                                <h4 className="text-2xl font-bold mb-2">Responsive Design</h4>
                                <p className="text-gray-600">Optimized for desktop and mobile devices.</p>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </div>


    )
}
