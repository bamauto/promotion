import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, Timer, Users, ArrowRight, Zap, Bell, CheckCircle2 } from 'lucide-react';

const HotEventSection = () => {
    // State
    const [visitors, setVisitors] = useState(12840);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [activeNotifications, setActiveNotifications] = useState([]);
    const [claimed, setClaimed] = useState(false);
    const cardRef = useRef(null);

    const notifications = [
        '김O수님 수원역 예약완료',
        '이O진님 팔달문 라인 문의중',
        '박O훈님 수원 가라오케 입장',
        '최O영님 수원 이벤트 참여',
        '정O우님 수원역 예약완료'
    ];

    // Consolidated animation loop using requestAnimationFrame
    useEffect(() => {
        let lastVisitorUpdate = Date.now();
        let lastNotification = Date.now();
        let rafId;

        const update = () => {
            const now = Date.now();

            // Countdown (every frame)
            const endDate = new Date('2026-12-31T23:59:59');
            const diff = endDate - new Date();
            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((diff / 1000 / 60) % 60),
                    seconds: Math.floor((diff / 1000) % 60),
                });
            }

            // Visitor update (every 5 seconds)
            if (now - lastVisitorUpdate > 5000) {
                setVisitors(prev => Math.max(128, prev + Math.floor(Math.random() * 5) - 1));
                lastVisitorUpdate = now;
            }

            // Notification spawn (every 5 seconds)
            if (now - lastNotification > 5000) {
                const newNotif = {
                    id: Date.now(),
                    text: notifications[Math.floor(Math.random() * notifications.length)],
                };
                setActiveNotifications(prev => [...prev.slice(-1), newNotif]);
                lastNotification = now;
            }

            rafId = requestAnimationFrame(update);
        };

        rafId = requestAnimationFrame(update);
        return () => cancelAnimationFrame(rafId);
    }, []);

    // Throttle helper
    const throttle = (func, delay) => {
        let lastCall = 0;
        return (...args) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                func(...args);
            }
        };
    };

    // Throttled 3D Tilt Effect
    const handleMouseMove = useCallback(
        throttle((e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            requestAnimationFrame(() => {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
        }, 16), // 60fps
        []
    );

    const handleMouseLeave = () => {
        if (cardRef.current) {
            cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    };

    const handleClaim = () => {
        setClaimed(true);
        // Trigger confetti logic here if we had a library
        setTimeout(() => {
            window.location.href = 'tel:01026264833';
        }, 800);
    };

    const TimeBox = ({ val, label }) => (
        <div className="flex flex-col items-center bg-slate-900/80 border border-slate-700 rounded-xl p-3 w-16 md:w-20 backdrop-blur-md shadow-inner relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/10 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700"></div>
            <span className="text-2xl md:text-3xl font-black text-white font-mono">{String(val).padStart(2, '0')}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</span>
        </div>
    );

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden flex items-center justify-center">
            {/* Dynamic Background */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[300px] h-[300px] bg-amber-600/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 perspective-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>

                {/* Floating Notifications */}
                <div className="absolute -top-12 right-0 md:right-10 flex flex-col gap-2 pointer-events-none z-20">
                    {activeNotifications.map(n => (
                        <div key={n.id} className="animate-fade-in-up bg-slate-900/90 border border-amber-500/30 text-white text-xs py-2 px-4 rounded-full shadow-xl flex items-center gap-2 backdrop-blur-md">
                            <Bell size={12} className="text-amber-500 animate-wiggle" />
                            {n.text} <span className="text-slate-500 text-[10px] ml-1">방금 전</span>
                        </div>
                    ))}
                </div>

                <div
                    ref={cardRef}
                    className="max-w-5xl mx-auto bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 rounded-[2rem] p-8 md:p-14 shadow-[0_0_60px_rgba(0,0,0,0.5)] relative overflow-hidden transition-transform duration-200 ease-out"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Top Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>

                    {/* Content Grid */}
                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                        {/* Left: Text & Offer */}
                        <div className="text-center md:text-left space-y-6">
                            <div className="inline-flex items-center gap-2 border border-amber-500 text-amber-500 px-4 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase hover:bg-amber-500 hover:text-black transition-colors cursor-default">
                                <Sparkles size={14} /> Official Event
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1]">
                                TODAY'S <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 drop-shadow-sm">SPECIAL OFFER</span>
                            </h2>

                            <p className="text-lg text-slate-300 font-light leading-relaxed">
                                오늘 밤 수원 팔달문 방문 고객을 위한 단독 혜택.<br />
                                프리미엄 양주 세트 할인과 대기 시간 단축 혜택을 제공합니다.
                            </p>

                            <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                                <div className="text-center">
                                    <div className="text-sm text-slate-400 mb-1">현재 대기자</div>
                                    <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                                        <span className="text-xl font-bold text-white tabular-nums">{visitors.toLocaleString()}</span>
                                    </div>
                                </div>
                                <div className="h-10 w-px bg-slate-700"></div>
                                <div className="text-center">
                                    <div className="text-sm text-slate-400 mb-1">남은 쿠폰</div>
                                    <div className="text-xl font-bold text-amber-500">3장 <span className="text-xs text-slate-500 font-normal">/ 50장</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Timer & Interactive Card */}
                        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-3xl p-8 border border-slate-700/50 relative group">
                            <div className="absolute inset-0 bg-amber-500/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <div className="text-center mb-8">
                                <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-4">Limited Time Remaining</h3>
                                <div className="flex justify-center gap-3">
                                    <TimeBox val={timeLeft.hours} label="HRS" />
                                    <span className="text-3xl font-bold text-slate-600 self-center pb-4">:</span>
                                    <TimeBox val={timeLeft.minutes} label="MIN" />
                                    <span className="text-3xl font-bold text-slate-600 self-center pb-4">:</span>
                                    <TimeBox val={timeLeft.seconds} label="SEC" />
                                </div>
                            </div>

                            <button
                                onClick={handleClaim}
                                disabled={claimed}
                                className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 ${claimed
                                        ? 'bg-green-600 text-white cursor-default'
                                        : 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]'
                                    }`}
                            >
                                {claimed ? (
                                    <>
                                        <CheckCircle2 size={24} /> 혜택 적용됨 (전화 연결 중...)
                                    </>
                                ) : (
                                    <>
                                        <Zap size={24} fill="currentColor" /> 지금 혜택 받기
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-4">
                                * 버튼 클릭 시 자동으로 예약 전화로 연결됩니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-3deg); }
                    50% { transform: rotate(3deg); }
                }
                .animate-wiggle {
                    animation: wiggle 1s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default HotEventSection;
