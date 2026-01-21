import React from 'react';
import { Sparkles, Phone, Clock, Shield, Gift, CheckCircle } from 'lucide-react';

const HotEventSection = () => {
    const handleCall = () => {
        window.location.href = 'tel:01026264833';
    };

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-amber-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-5xl mx-auto bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] p-8 md:p-14 shadow-[0_0_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    {/* Top Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left: Text & Offer */}
                        <div className="text-center md:text-left space-y-6">
                            <div className="inline-flex items-center gap-2 border border-amber-500 text-amber-500 px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase">
                                <Sparkles size={14} /> 광교 서우실장 프로모션
                            </div>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1]">
                                광교 유흥 전문가<br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-sm">서우실장 특별 혜택</span>
                            </h2>

                            <p className="text-lg text-slate-300 font-light leading-relaxed">
                                광교 가라오케, 하이퍼블릭 15년 경력의 서우실장이<br />
                                고객님 취향에 맞는 최적의 장소를 추천해 드립니다.
                            </p>

                            {/* Benefits List */}
                            <ul className="space-y-3 text-left">
                                {[
                                    '100% 정찰제 - 바가지 ZERO',
                                    '24시간 무료 픽업 서비스',
                                    '첫 방문 VIP 혜택 제공',
                                    '맞춤 파트너 매칭 서비스'
                                ].map((benefit, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                                        <CheckCircle size={18} className="text-amber-500 flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right: CTA Card */}
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-8 border border-slate-700/50 relative group">
                            <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="text-center mb-8">
                                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">광교 가라오케·하이퍼블릭 예약</h3>

                                {/* Trust Badges */}
                                <div className="flex justify-center gap-4 mb-6">
                                    <div className="flex flex-col items-center">
                                        <Clock className="w-8 h-8 text-amber-500 mb-2" />
                                        <span className="text-xs text-slate-400">24시간 운영</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Shield className="w-8 h-8 text-amber-500 mb-2" />
                                        <span className="text-xs text-slate-400">100% 정찰제</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <Gift className="w-8 h-8 text-amber-500 mb-2" />
                                        <span className="text-xs text-slate-400">첫 방문 혜택</span>
                                    </div>
                                </div>

                                <p className="text-slate-300 text-sm mb-6">
                                    전화 한 통으로 광교 최고의 밤을 경험하세요.<br />
                                    서우실장이 책임지고 안내해 드립니다.
                                </p>
                            </div>

                            <button
                                onClick={handleCall}
                                className="w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                            >
                                <Phone size={24} fill="currentColor" /> 010-2626-4833 예약 문의
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-4">
                                * 광교중앙역·상현역 무료 픽업 서비스 제공
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HotEventSection;
