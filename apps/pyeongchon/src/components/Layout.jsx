import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Phone, MessageCircle, Menu, X, Send } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import Breadcrumbs from './Breadcrumbs';

const contactInfo = {
    phone: "010-2626-4833",
    kakao: "@pbsewoo",
    kakaoLink: "http://qr.kakao.com/talk/jMlvTnRecn1PgP4S9gqME2itU7g-",
    telegram: "@pbsewoo",
    telegramLink: "https://t.me/pbsewoo",
    email: "ymimi9512@gmail.com",
};

const NavLink = ({ to, label, currentPath, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className={`relative px-4 py-2 text-sm md:text-base font-medium transition-all duration-300 group ${currentPath === to ? 'text-amber-400' : 'text-slate-400 hover:text-white'}`}
    >
        <span className="relative z-10">{label}</span>
        <span className={`absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-300 ${currentPath === to ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
    </Link>
);

const Layout = ({ children }) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    React.useEffect(() => {
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (

        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500 selection:text-black overflow-x-hidden flex flex-col">

            {/* Header */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-slate-800 py-2' : 'bg-transparent border-transparent py-4'}`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 cursor-pointer group">
                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform overflow-hidden">
                            <img src="/logo.webp" alt="서우실장 로고" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-amber-500 font-bold tracking-widest uppercase">프리미엄 라운지</span>
                            <span className="text-xl font-bold text-white tracking-tight">서우실장</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-2">
                        <NavLink to="/" label="HOME" currentPath={location.pathname} />
                        <div className="w-px h-4 bg-slate-800 my-auto mx-2"></div>
                        <NavLink to="/pyeongchon-highpub-guide" label="하이퍼블릭" currentPath={location.pathname} />
                        <NavLink to="/pyeongchon-karaoke-guide" label="가라오케" currentPath={location.pathname} />
                        <NavLink to="/pyeongchon-shirtsroom-guide" label="셔츠룸" currentPath={location.pathname} />
                        <NavLink to="/pyeongchon-kimono-room-guide" label="기모노룸" currentPath={location.pathname} />
                        <NavLink to="/pyeongchon-room-salon-guide" label="룸살롱" currentPath={location.pathname} />
                        <NavLink to="/pyeongchon-hostbar-guide" label="호빠" currentPath={location.pathname} />
                        <div className="w-px h-4 bg-slate-800 my-auto mx-2"></div>
                        <a href="/blog" className="relative px-4 py-2 text-sm md:text-base font-medium transition-all duration-300 group text-slate-400 hover:text-white">
                            <span className="relative z-10">블로그</span>
                            <span className="absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-300 w-0 group-hover:w-full"></span>
                        </a>
                        <NavLink to="/contact" label="문의하기" currentPath={location.pathname} />
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-white p-2 rounded-lg hover:bg-slate-800 transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Nav */}
                <div className={`md:hidden absolute w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                    <nav className="flex flex-col items-center py-8 space-y-6 h-screen">
                        <NavLink to="/" label="홈" currentPath={location.pathname} />
                        <NavLink to="/pyeongchon-highpub-guide" label="하이퍼블릭" currentPath={location.pathname} />
                        <NavLink to="/pyeongchon-karaoke-guide" label="가라오케" currentPath={location.pathname} />
                        <NavLink to="/pyeongchon-shirtsroom-guide" label="셔츠룸" currentPath={location.pathname} />
                        <NavLink to="/pyeongchon-kimono-room-guide" label="기모노룸" currentPath={location.pathname} />
                        <NavLink to="/pyeongchon-room-salon-guide" label="룸살롱" currentPath={location.pathname} />
                        <NavLink to="/pyeongchon-hostbar-guide" label="호빠" currentPath={location.pathname} />
                        <a href="/blog" className="relative px-4 py-2 text-sm md:text-base font-medium transition-all duration-300 group text-slate-400 hover:text-white">
                            <span className="relative z-10">블로그</span>
                            <span className="absolute bottom-0 left-0 h-[2px] bg-amber-500 transition-all duration-300 w-0 group-hover:w-full"></span>
                        </a>
                        <NavLink to="/contact" label="문의하기" currentPath={location.pathname} />
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow pt-0">
                <Breadcrumbs />
                {children}
            </main>

            <footer className="bg-slate-950 border-t border-slate-900 py-16 pb-32 md:pb-16 text-center text-slate-500 text-sm">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center border border-slate-800 shadow-lg transition-transform hover:scale-110">
                            <img src="/logo.webp" alt="서우실장 로고" className="w-5 h-5 grayscale-0 brightness-110" />
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">서우실장</span>
                    </div>

                    <div className="max-w-2xl mx-auto mb-8">
                        <p className="text-slate-400 leading-relaxed mb-4 italic">
                            "단 한 번의 인연도 결코 가벼이 어기지 않겠습니다.<br />
                            평촌 유흥의 품격 있는 기준, 믿음직한 파트너로서<br />
                            언제나 정상을 다하는 서우실장이 되겠습니다."
                        </p>
                        {/* Social Media Links */}
                        <div className="flex justify-center items-center gap-4 mb-6">
                            <a
                                href="https://t.me/pbsewoo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0088cc] flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                                aria-label="텔레그램으로 문의하기"
                            >
                                <Send size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                            </a>
                            <a
                                href="http://qr.kakao.com/talk/jMlvTnRecn1PgP4S9gqME2itU7g-"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#FEE500] flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                                aria-label="카카오톡으로 문의하기"
                            >
                                <MessageCircle size={18} className="text-slate-400 group-hover:text-black transition-colors" />
                            </a>
                            <a
                                href="tel:010-2626-4833"
                                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-500 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                                aria-label="전화로 문의하기"
                            >
                                <Phone size={18} className="text-slate-400 group-hover:text-white transition-colors" />
                            </a>
                        </div>

                        <div className="h-px w-12 bg-amber-500/30 mx-auto mb-4"></div>
                        <div className="flex justify-center gap-4 text-xs font-medium mb-3">
                            <Link to="/terms" className="text-slate-500 hover:text-amber-500 transition-colors">이용약관</Link>
                            <span className="text-slate-700">|</span>
                            <Link to="/privacy" className="text-slate-500 hover:text-amber-500 transition-colors">개인정보처리방침</Link>
                        </div>
                        <p className="text-xs text-slate-600 font-medium">평촌 유흥의 모든 것, 서우 실장 | 대표: 서우 | 사업자등록번호: 000-00-00000 | 010-2626-4833</p>
                    </div>

                    <p className="opacity-30 text-xs">© COPYRIGHT 2026, 평촌 서우실장. ALL RIGHTS RESERVED.</p>
                </div>
            </footer>

            {/* Sticky Bottom Bar (Mobile Only) */}
            <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden animate-fade-in-up">
                <div className="bg-slate-900/90 backdrop-blur-lg border border-slate-700/50 p-2 rounded-2xl shadow-2xl flex justify-between items-center gap-3">
                    <button onClick={() => document.location.href = `tel:${contactInfo.phone}`} className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-transform">
                        <Phone size={18} fill="currentColor" /> 전화문의
                    </button>
                    <button
                        onClick={() => window.open(contactInfo.kakaoLink, '_blank', 'noopener,noreferrer')}
                        className="flex-1 bg-[#FEE500] text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform"
                    >
                        <MessageCircle size={18} fill="currentColor" /> 카카오톡
                    </button>
                </div>
            </div>

        </div>

    );
};

export default Layout;
