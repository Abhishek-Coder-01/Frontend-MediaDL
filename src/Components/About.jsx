import "./style.css";

export default function About() {
  return (
    
    
    //   <!-- ABOUT PAGE -->
    <div id="aboutPage" className="page">
        <section className="grid-bg min-h-screen pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16" >
                    <span className="tag accent-orange text-white mb-6 inline-block">ABOUT US</span>
                    <h2 className="text-6xl md:text-7xl font-bold mb-6" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                        Meet{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            mediaDL
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="400" data-aos-duration="900">
                       A fast and easy way to download videos by simply pasting a link.
                    </p>
                </div>

                {/* <!-- Vision & Problem --> */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                        <h3 className="text-4xl font-bold mb-6">Our Vision</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                       We believe downloading media should adapt to you. mediaDL turns pasted links into instant video downloads online easily.
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                           No software, no confusion. Just fast video downloads that work instantly.
                        </p>
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border-2 border-black">
                            <div
                                className="w-14 h-14 accent-orange rounded-xl flex items-center justify-center border-2 border-black">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-lg">Innovation First</div>
                                <div className="text-gray-600">Pushing simple downloads </div>
                            </div>
                        </div>
                    </div>

                    <div className="bento-card " data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                        <h3 className="text-4xl font-bold mb-6">Problems We Solve</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl border-2 border-white/20">
                                <div
                                    className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Complex Downloads</h4>
                                    <p className=" text-sm">Traditional tools require too many steps and extra software.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/10 rounded-xl border-2 border-white/20">
                                <div
                                    className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">Unlimited Access</h4>
                                    <p className=" text-sm">Many platforms make saving videos slow or difficult.</p>
                                </div>
                            </div>

                            <div
                                className="flex items-start gap-4 p-4 bg-green-500/20 rounded-xl border-2 border-green-500">
                                <div
                                    className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-bold mb-1">mediaDL Solution</h4>
                                    <p className=" text-sm">Simple, fast video downloads</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- How It Works --> */}
                <div className="bento-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
                    <h3 className="text-4xl font-bold mb-12 text-center">How It Works</h3>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div
                                className="w-20 h-20 mx-auto mb-6 accent-blue rounded-2xl flex items-center justify-center border-2 border-black">
                                <span className="text-3xl font-bold text-white">1</span>
                            </div>
                            <h4 className="font-bold text-xl mb-2">Copy Link</h4>
                            <p className="text-gray-600">Copy the video link</p>
                        </div>

                        <div className="text-center">
                            <div
                                className="w-20 h-20 mx-auto mb-6 accent-purple rounded-2xl flex items-center justify-center border-2 border-black">
                                <span className="text-3xl font-bold text-white">2</span>
                            </div>
                            <h4 className="font-bold text-xl mb-2">Paste Link</h4>
                            <p className="text-gray-600">Paste the link into mediaDL</p>
                        </div>

                        <div className="text-center">
                            <div
                                className="w-20 h-20 mx-auto mb-6 accent-green rounded-2xl flex items-center justify-center border-2 border-black">
                                <span className="text-3xl font-bold text-white">3</span>
                            </div>
                            <h4 className="font-bold text-xl mb-2">Choose Format</h4>
                            <p className="text-gray-600">Select video quality or format</p>
                        </div>

                        <div className="text-center">
                            <div
                                className="w-20 h-20 mx-auto mb-6 accent-orange rounded-2xl flex items-center justify-center border-2 border-black">
                                <span className="text-3xl font-bold text-white">4</span>
                            </div>
                            <h4 className="font-bold text-xl mb-2">Start Download</h4>
                            <p className="text-gray-600">Download your video in seconds</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>


  )
}
