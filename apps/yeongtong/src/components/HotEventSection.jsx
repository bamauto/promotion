import React, { useState } from 'react';
import { Sparkles, ArrowRight, Zap, Phone, MessageCircle, Gift, Clock, Star } from 'lucide-react';

/**
 * HotEventSection - 영통 프로모션 섹션
 * SEO 최적화: 가짜 데이터 제거, 실제 프로모션 정보로 대체
 * E-E-A-T 준수: 투명한 정보 제공
 */
const HotEventSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    const benefits = [
        { icon: Gift, text: '신규 방문 고객 웰컴 드링크 서비스', highlight: true },
        { icon: Star, text: '단체 예약(4인 이상) 룸 업그레이드' },
        { icon: Clock, text: '평일 Early Bird(18-20시) 10% 할인' },
    ];

    return (
        <section className="py-20 bg-slate-950 relative overflow-hidden" aria-labelledby="promo-heading">
            {/* Background Effect */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-amber-600/15 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">

                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 border border-amber-500/50 text-amber-500 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
                            <Sparkles size={14} /> 영통 서우실장 특별 혜택
                        </div>

                        <h2 id="promo-heading" className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
                            영통 가라오케·하이퍼블릭
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                                VIP 고객 혜택
                            </span>
                        </h2>

                        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            영통역·영통동 프리미엄 유흥 가이드 서우실장을 통해 예약하시면
                            <br className="hidden md:block" />
                            다양한 특별 혜택을 제공해 드립니다.
                        </p>
                    </div>

                    {/* Benefits List */}
                    <div className="grid gap-4 mb-10">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                                    benefit.highlight
                                        ? 'bg-amber-500/10 border border-amber-500/30'
                                        : 'bg-slate-800/50 border border-slate-700/50'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    benefit.highlight ? 'bg-amber-500 text-black' : 'bg-slate-700 text-amber-500'
                                }`}>
                                    <benefit.icon size={20} />
                                </div>
                                <span className={`font-medium ${benefit.highlight ? 'text-white' : 'text-slate-300'}`}>
                                    {benefit.text}
                                </span>
                                {benefit.highlight && (
                                    <span className="ml-auto text-xs bg-amber-500 text-black px-2 py-1 rounded-full font-bold">
                                        추천
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:010-2626-4833"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-4 px-8 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300 hover:-translate-y-1"
                        >
                            <Phone size={20} fill="currentColor" />
                            <span>전화 예약하기</span>
                            <ArrowRight size={18} className={`transition-transform ${isHovered ? 'translate-x-1' : ''}`} />
                        </a>

                        <a
                            href="http://qr.kakao.com/talk/jMlvTnRecn1PgP4S9gqME2itU7g-"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 bg-[#FEE500] text-black font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <MessageCircle size={20} fill="currentColor" />
                            <span>카카오톡 문의</span>
                        </a>
                    </div>

                    {/* Trust Signal */}
                    <p className="text-center text-sm text-slate-500 mt-6">
                        ✓ 100% 정찰제 · ✓ 24시간 상담 가능 · ✓ 영통역 무료 픽업
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HotEventSection;
