import React from 'react';
import { Helmet } from 'react-helmet-async';
import SchemaJsonLd, { generateLocalBusinessSchema, generateOrganizationSchema } from '../components/SchemaJsonLd';
import { ArrowRight, Star, MapPin, Phone, Shield, Clock, Users, Zap, CheckCircle, Menu, X, ChevronDown, ChevronUp, Crown, ShieldCheck, Car, GlassWater, MessageCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import HotEventSection from '../components/HotEventSection';
import BlogSection from '../components/BlogSection';

const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
        <span className="text-amber-400 font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-3 animate-fade-in-up block">{subtitle}</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 relative z-10 animate-fade-in-up delay-100 drop-shadow-sm">{title}</h2>
        <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-transparent mx-auto mt-6"></div>
    </div>
);

const FeatureItem = ({ icon: Icon, title, desc, delay }) => (
    <div className={`flex flex-col items-center text-center p-8 bg-gradient-to-b from-slate-800/30 to-slate-900/30 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all duration-500 hover:bg-slate-800/50 group hover:-translate-y-2 animate-fade-in-up h-full`} style={{ animationDelay: `${delay}ms` }}>
        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,0,0,0.3)] border border-slate-800 group-hover:border-amber-500/50 transition-colors relative flex-shrink-0">
            <div className="absolute inset-0 bg-amber-500/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
            <Icon size={36} className="text-slate-400 group-hover:text-amber-400 transition-colors relative z-10" />
        </div>
        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{title}</h4>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

const Home = () => {
    const [activeVenue, setActiveVenue] = React.useState(0);

    const venues = [
        { id: 'pyeongchon-highpub-guide', title: '하이퍼블릭', sub: '프라이빗 / 시크릿', img: '/highpublic_main.webp', desc: '범계역 중심 프라이빗 라운지' },
        { id: 'pyeongchon-karaoke-guide', title: '가라오케', sub: '프리미엄 / 라운지', img: '/karaoke_main.webp', desc: '평촌역 파티/모임 룸' },
        { id: 'pyeongchon-shirtsroom-guide', title: '셔츠룸', sub: '초이스 / 화이트셔츠', img: '/shirtsroom_main.webp', desc: '인덕원역 빠른 초이스' },
        { id: 'pyeongchon-kimono-room-guide', title: '기모노룸', sub: '이색 테마 / 코스프레', img: '/kimonoroom_main.webp', desc: '평촌역·평촌1번가 테마 포인트' },
        { id: 'pyeongchon-room-salon-guide', title: '룸살롱', sub: '정통 / 비즈니스', img: '/roomsalon_main.webp', desc: '범계역 비즈니스 라인' },
        { id: 'pyeongchon-hostbar-guide', title: '호빠', sub: '프리미엄 / 여성전용', img: '/hostbar_main.webp', desc: '평촌역 여성전용 라운지' }
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Header height approx
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }

    return (
        <>
            <Helmet>
                <title>평촌 가라오케·셔츠룸·호빠 | 하이퍼블릭 예약 안내</title>
                <meta name="description" content="평촌 가라오케·하이퍼블릭·셔츠룸·호빠·기모노룸 예약. 범계역·평촌역 프리미엄 클럽. 주대 18만원 이상. 상담 010-2626-4833" />
                <meta name="keywords" content="평촌 가라오케, 평촌 하이퍼블릭, 평촌 셔츠룸, 평촌 호빠, 평촌 기모노룸, 평촌 룸살롱, 범계역 가라오케, 평촌역 하이퍼블릭" />
                <meta property="og:title" content="평촌 가라오케·하이퍼블릭 예약 | 범계역·평촌역 서우실장" />
                <meta property="og:description" content="평촌 가라오케·평촌 하이퍼블릭 메인 가이드. 범계역·평촌역 중심 상권에서 평촌·범계 직장인 맞춤 코스를 안내합니다. 평촌 셔츠룸·호빠·기모노룸·룸살롱까지 한 번에. 주대 18만원 이상, TC 10만원 이상, 상세 문의. 24시간 상담 ☎ 010-2626-4833" />
                <meta property="og:image" content="https://pc-karaoke.com/og-home.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="평촌 하이퍼블릭·가라오케 메인 가이드" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="og:site_name" content="평촌 서우실장" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="평촌 가라오케·하이퍼블릭 예약 | 범계역·평촌역 서우실장" />
                <meta property="twitter:description" content="평촌 가라오케·평촌 하이퍼블릭 메인 가이드. 범계역·평촌역 중심 상권에서 평촌·범계 직장인 맞춤 코스를 안내합니다. 평촌 셔츠룸·호빠·기모노룸·룸살롱까지 한 번에. 주대 18만원 이상, TC 10만원 이상, 상세 문의. 24시간 상담 ☎ 010-2626-4833" />
                <meta property="twitter:image" content="https://pc-karaoke.com/og-home.jpg" />
                <link rel="canonical" href="https://pc-karaoke.com" />
            </Helmet>
            <SchemaJsonLd data={[generateLocalBusinessSchema(), generateOrganizationSchema()]} />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
                {/* Background with gradient */}
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent z-0"></div>

                <div className="relative z-10 container mx-auto px-4 text-center mt-10">
                    <div className="animate-fade-in-up">
                        <span className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-900/10 backdrop-blur-md text-amber-400 px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] mb-8 uppercase hover:bg-amber-900/20 transition-colors cursor-default">
                            <Crown size={12} fill="currentColor" /> 프리미엄 하이퍼블릭 서비스
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-2xl">
                            평촌 가라오케 & 하이퍼블릭<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">서우실장 추천 가이드</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">평촌 가라오케·평촌 하이퍼블릭 중심으로 범계역·평촌역 라인을 소개합니다.<br />셔츠룸·호빠·기모노룸·룸살롱까지 목적별로 매칭해 드립니다.<br />주대 18만원 이상·TC 10만원 이상 기준이며 상세 문의 부탁드립니다.</p>
                        <div className="flex flex-col sm:flex-row gap-5 justify-center">
                            <button
                                onClick={() => window.location.href = 'tel:01026264833'}
                                className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold rounded-xl transition-all hover:scale-105 shadow-[0_0_40px_rgba(245,158,11,0.4)] overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                <span className="relative flex items-center justify-center gap-2">
                                    <Phone size={20} className="group-hover:animate-bounce" /> VIP 예약하기
                                </span>
                            </button>
                            <Link
                                to="/pyeongchon-highpub-guide"
                                className="px-10 py-5 bg-slate-900/50 backdrop-blur text-white font-bold rounded-xl border border-slate-700 hover:border-amber-500 hover:text-amber-400 transition-all hover:bg-slate-900 flex items-center justify-center gap-2"
                            >
                                <GlassWater size={20} /> 라운지 투어
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Down Indicator */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500 cursor-pointer" onClick={() => scrollToSection('features')}>
                    <ChevronDown size={32} />
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 bg-slate-950 container mx-auto px-4 relative">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
                <SectionTitle title="왜 서우실장인가?" subtitle="특별한 서비스" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureItem icon={MapPin} title="4호선 트리플 역세권" desc="평촌역·범계역·인덕원역 3개 역 5분 거리 픽업. 서울 사당 15분, 강남 30분 접근성." delay={0} />
                    <FeatureItem icon={Crown} title="범계 로데오거리 네트워크" desc="경기 남부 최대 상권 제휴 업소 12곳. 트렌디한 분위기부터 프리미엄 VIP까지." delay={100} />
                    <FeatureItem icon={Users} title="1기 신도시 고소득층 맞춤" desc="평촌 신도시 전문직·자영업자 취향 분석. 성숙한 문화와 합리적 소비 성향 반영." delay={200} />
                    <FeatureItem icon={ShieldCheck} title="100% 정찰제 + 가성비" desc="강남 대비 20% 저렴한 가격, 동일한 수질. 바가지 ZERO 투명 정책." delay={300} />
                </div>
            </section>

            {/* 평촌 특화 콘텐츠 섹션 - SEO 최적화 */}
            <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="container mx-auto px-4">
                    <SectionTitle title="왜 평촌인가?" subtitle="지역 특화 분석" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* 1기 신도시 프리미엄 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <Crown className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">1기 신도시 프리미엄</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                <strong className="text-amber-400">평촌 신도시</strong>는 대한민국 1기 신도시를 대표하는 생활권입니다.
                                고소득 전문직·자영업자 중심의 안정적인 거주 인구와
                                <strong className="text-white"> 높은 교육열</strong>로 유명한 지역입니다.
                                성숙한 문화와 합리적인 소비 성향이 특징입니다.
                            </p>
                        </article>

                        {/* 4호선 교통 허브 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <MapPin className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">4호선 트리플 역세권</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                <strong className="text-amber-400">평촌역·범계역·인덕원역</strong> 3개 역이 밀집된 최강 접근성.
                                서울 사당역까지 단 15분, 강남까지 30분대 접근 가능.
                                수도권 광역 고객층이 쉽게 방문할 수 있어
                                <strong className="text-white"> 프리미엄 업소</strong>가 집중되어 있습니다.
                            </p>
                        </article>

                        {/* 로데오 상권 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <Zap className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">범계 로데오거리 상권</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                경기 남부권 최대 상권 <strong className="text-amber-400">범계 로데오거리</strong>.
                                젊은층부터 직장인까지 다양한 연령대가 모이는 핫플레이스입니다.
                                트렌디한 분위기의 <strong className="text-white">신개념 하이퍼블릭·가라오케</strong>가
                                밀집해 있어 선택의 폭이 넓습니다.
                            </p>
                        </article>

                        {/* 여성 친화 호빠 문화 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <Star className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">여성 친화적 호빠 문화</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                평촌의 <strong className="text-amber-400">20~40대 여성층</strong>은
                                높은 구매력과 자체 소비력을 갖추고 있습니다.
                                평촌 학원가 학부모·직장 여성 모임 수요가 급증하며
                                <strong className="text-white"> 호빠·여성 전용 클럽</strong> 시장이
                                건강하게 성장 중입니다.
                            </p>
                        </article>
                    </div>

                    {/* 평촌 상권 지도 */}
                    <div className="mt-16 max-w-4xl mx-auto bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                        <h3 className="text-2xl font-bold text-white text-center mb-8">평촌 4대 유흥 상권</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                                <div className="text-amber-500 font-bold mb-2">평촌역</div>
                                <div className="text-slate-400 text-sm">학원가 인접<br/>고소득 전문직</div>
                            </div>
                            <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                                <div className="text-amber-500 font-bold mb-2">범계역</div>
                                <div className="text-slate-400 text-sm">로데오거리<br/>젊은층·트렌디</div>
                            </div>
                            <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                                <div className="text-amber-500 font-bold mb-2">인덕원역</div>
                                <div className="text-slate-400 text-sm">IT·과학단지<br/>조용한 비즈니스</div>
                            </div>
                            <div className="text-center p-4 bg-slate-900/50 rounded-xl">
                                <div className="text-amber-500 font-bold mb-2">평촌역</div>
                                <div className="text-slate-400 text-sm">전통 상권<br/>실속형·직장인</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* New Interactive Gallery Section */}
            <section className="py-24 bg-slate-950 overflow-hidden">
                <div className="container mx-auto px-4 mb-16 text-center">
                    <span className="text-amber-500 font-bold tracking-[0.3em] uppercase mb-4 block animate-pulse">서우실장 프리미엄 컬렉션</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight break-keep">
                        전국 1% <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">수질 아가씨</span> 항시 대기
                    </h2>
                    <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed break-keep">
                        전국 유흥 업계 최대 규모의 인프라를 바탕으로<br />
                        가장 많은 아가씨를 보유하고 있습니다.<br className="hidden md:block" /><br />
                        고객님 한 분 한 분의 스타일과 취향을 분석하여<br />
                        <strong className="text-white">100% 만족하실 수 있도록</strong><br className="md:hidden" /> 완벽하게 매칭해 드립니다.
                    </p>
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-10"></div>
                </div>

                <div className="relative flex overflow-hidden">
                    <div className="flex animate-infinite-scroll whitespace-nowrap group hover:[animation-play-state:paused]">
                        {/* Double the images for seamless loop */}
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num, idx) => (
                            <div key={idx} className="inline-block px-4">
                                <div className="w-[300px] h-[450px] md:w-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative group/card">
                                    <img
                                        src={`/home-gallery-${num.toString().padStart(2, '0')}.webp`}
                                        alt={`평촌 가라오케 프리미엄 매니저 - 평촌역 서우실장 추천 ${num}번`}
                                        title="평촌 가라오케 최상급 매니저"
                                        loading="lazy"
                                        width="400"
                                        height="600"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity"></div>
                                    <div className="absolute bottom-6 left-8">
                                        <span className="text-amber-500 font-bold tracking-widest text-sm uppercase">PREMIUM CHOICE</span>
                                        <div className="w-8 h-0.5 bg-amber-500 mt-2 group-hover/card:w-16 transition-all duration-500"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Introduction Text - Parallax like */}
            <section className="py-24 md:py-32 relative md:bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560624052-449f5ddf0c31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
                <div className="absolute inset-0 bg-slate-950/90"></div>
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16 relative z-10">
                    <div className="md:w-1/2 order-2 md:order-1">
                        <span className="text-amber-500 font-bold tracking-widest uppercase mb-2 block">1인 고객 맞춤 케어</span>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            혼자여서<br />망설이시나요?
                        </h3>
                        <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed">
                            <p>
                                오직 한 분만을 위한 <strong className="text-white">특별한 VIP 케어</strong>가 준비되어 있습니다.<br />
                                서우 실장은 혼자 오시는 고객님이 어색함 없이 최고의 시간을<br />
                                보내실 수 있도록 더욱 세심하고 은밀하게 밀착 케어해 드립니다.
                            </p>
                            <p>
                                단 둘만의 프라이빗하고 오붓한 시간부터 화끈한 파티 분위기까지,<br />
                                원하시는 스타일만 말씀해 주세요. 격이 다른 서비스와 세팅을 통해<br />
                                귀하의 소중한 밤을 <strong className="text-amber-500">완벽하게 디자인</strong>해 드리겠습니다.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-4">
                            {[
                                "1인 방문 절대 환영", "24시간 항시 대기", "프라이빗 룸 완비", "맞춤형 파트너 추천"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                                    <CheckCircle size={18} className="text-amber-500 flex-shrink-0" />
                                    <span className="text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 order-1 md:order-2 flex md:justify-center">
                        <div className="relative">
                            <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-amber-500 to-purple-600 rounded-2xl opacity-30 blur-2xl animate-pulse"></div>
                            <div className="aspect-[4/5] md:h-[500px] bg-slate-800 rounded-2xl overflow-hidden relative border border-slate-700 shadow-2xl md:transform md:rotate-2 hover:rotate-0 transition-transform duration-700">
                                <div className="absolute inset-0 bg-[url('/private_room_bg_v2.jpg')] bg-cover bg-[center_20%] opacity-90"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                                <div className="absolute bottom-0 p-8">
                                    <h3 className="text-3xl font-bold text-white">프라이빗 룸</h3>
                                    <p className="text-amber-500 font-bold tracking-widest uppercase text-sm">럭셔리 & 시크릿</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hot Event Section */}
            <HotEventSection />

            {/* Blog Section */}
            <BlogSection />

            {/* Venue Preview - Horizontal Accordion */}
            <section className="py-24 container mx-auto px-4">
                <SectionTitle title="제휴 업소 안내" subtitle="평촌 유흥 핫플레이스" />

                {/* Desktop: Horizontal Accordion, Mobile: Vertical Grid */}
                <div className="flex flex-col lg:flex-row h-[1200px] lg:h-[600px] gap-4">
                    {venues.map((venue, idx) => (
                        <Link
                            to={`/${venue.id}`}
                            key={idx}
                            onMouseEnter={() => setActiveVenue(idx)}
                            className={`relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 ease-in-out group
                                ${activeVenue === idx ? 'lg:flex-[3]' : 'lg:flex-[1]'}
                                flex-1 flex flex-col justify-end
                            `}
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url('${venue.img}')` }}>
                            </div>

                            {/* Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent transition-opacity duration-300
                                ${activeVenue === idx ? 'opacity-90' : 'opacity-70 group-hover:opacity-80'}`}>
                            </div>

                            {/* Content */}
                            <div className="relative z-10 p-8 transform transition-transform duration-500">
                                <div className={`flex items-center gap-3 mb-2 transition-all duration-300 ${activeVenue === idx ? 'opacity-100 translate-y-0' : 'lg:opacity-0 lg:translate-y-4 opacity-100'}`}>
                                    <div className="w-10 h-0.5 bg-amber-500"></div>
                                    <span className="text-amber-500 font-bold uppercase tracking-wider text-sm">{venue.sub}</span>
                                </div>

                                <h3 className={`font-bold text-white transition-all duration-300 ${activeVenue === idx ? 'text-4xl mb-4' : 'text-2xl lg:mb-0 mb-4 lg:rotate-[-90deg] lg:origin-bottom-left lg:absolute lg:bottom-12 lg:left-8 lg:w-[300px] lg:text-3xl'}`}>
                                    {venue.title}
                                </h3>

                                <div className={`overflow-hidden transition-all duration-500 ${activeVenue === idx ? 'max-h-[200px] opacity-100' : 'max-h-0 lg:opacity-0 max-h-[100px] opacity-100'}`}>
                                    <p className="text-slate-300 text-lg mb-6 leading-relaxed max-w-md">
                                        {venue.desc}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-white border border-white/30 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-slate-950 transition-colors">
                                        자세히 보기 <ArrowRight size={16} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
            {/* Mini Contact Section */}
            <section className="py-20 bg-slate-900/50 border-t border-slate-800">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-amber-400 font-bold tracking-wider uppercase text-sm mb-2 block">24 Hours Service</span>
                        <h2 className="text-3xl font-bold text-white">실시간 예약 문의</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Phone */}
                        <a href="tel:01026264833" className="group bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-amber-500/50 transition-all hover:-translate-y-1 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">전화 문의</h3>
                                    <p className="text-slate-400 text-sm">010-2626-4833</p>
                                </div>
                            </div>
                            <ArrowRight size={20} className="text-slate-500 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                        </a>

                        {/* Kakao */}
                        <a href="http://qr.kakao.com/talk/jMlvTnRecn1PgP4S9gqME2itU7g-" target="_blank" rel="nofollow noopener noreferrer" className="group bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-[#FEE500]/50 transition-all hover:-translate-y-1 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#FEE500]/10 rounded-full flex items-center justify-center text-[#FEE500] group-hover:bg-[#FEE500] group-hover:text-slate-900 transition-colors">
                                    <MessageCircle size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">카카오톡</h3>
                                    <p className="text-slate-400 text-sm">@pbsewoo</p>
                                </div>
                            </div>
                            <ArrowRight size={20} className="text-slate-500 group-hover:text-[#FEE500] group-hover:translate-x-1 transition-all" />
                        </a>

                        {/* Telegram */}
                        <a href="https://t.me/pbsewoo" target="_blank" rel="nofollow noopener noreferrer" className="group bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-sky-500/50 transition-all hover:-translate-y-1 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-sky-500/10 rounded-full flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                                    <Send size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">텔레그램</h3>
                                    <p className="text-slate-400 text-sm">@pbsewoo</p>
                                </div>
                            </div>
                            <ArrowRight size={20} className="text-slate-500 group-hover:text-sky-500 group-hover:translate-x-1 transition-all" />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
