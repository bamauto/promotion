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
        { id: 'giheung-highpub-guide', title: '하이퍼블릭', sub: '프라이빗 / 시크릿', img: '/highpublic_main.webp', desc: '기흥역 중심 프라이빗 라운지' },
        { id: 'giheung-karaoke-guide', title: '가라오케', sub: '프리미엄 / 라운지', img: '/karaoke_main.webp', desc: '기흥역 상권 파티/모임 룸' },
        { id: 'giheung-shirtsroom-guide', title: '셔츠룸', sub: '초이스 / 화이트셔츠', img: '/shirtsroom_main.webp', desc: '삼성전자 기흥캠퍼스 빠른 초이스' },
        { id: 'giheung-kimono-room-guide', title: '기모노룸', sub: '이색 테마 / 코스프레', img: '/kimonoroom_main.webp', desc: '구성역 테마 포인트' },
        { id: 'giheung-room-salon-guide', title: '룸살롱', sub: '정통 / 비즈니스', img: '/roomsalon_main.webp', desc: '기흥역 비즈니스 라인' },
        { id: 'giheung-hostbar-guide', title: '호빠', sub: '프리미엄 / 여성전용', img: '/hostbar_main.webp', desc: '기흥역 상권 여성전용 라운지' }
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
                <title>기흥 가라오케·하이퍼블릭 예약 | 기흥역 프리미엄 가이드 2025</title>
                <meta name="description" content="기흥 가라오케·하이퍼블릭 최고급 예약 가이드. 기흥역·삼성전자 기흥캠퍼스 중심 프리미엄 서비스. 셔츠룸·호빠·기모노룸까지 한 번에. 주대 18만원 이상. 상담 010-2626-4833" />
                <meta name="keywords" content="기흥 가라오케, 기흥 하이퍼블릭, 기흥 셔츠룸, 기흥 호빠, 기흥 기모노룸, 기흥 룸살롱, 기흥역 가라오케, 기흥역 상권 하이퍼블릭, 삼성전자 기흥캠퍼스, 용인 가라오케" />
                <meta property="og:title" content="기흥 가라오케·하이퍼블릭 예약 | 기흥역 프리미엄 가이드 2025" />
                <meta property="og:description" content="기흥 가라오케·하이퍼블릭 최고급 예약 가이드. 기흥역·삼성전자 기흥캠퍼스 중심 프리미엄 서비스. 셔츠룸·호빠·기모노룸까지 한 번에. 주대 18만원 이상. 상담 010-2626-4833" />
                <meta property="og:image" content="https://giheungkaraoke.com/og-home.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="기흥 하이퍼블릭·가라오케 메인 가이드" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="og:site_name" content="기흥 유흥 가이드" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="기흥 가라오케·하이퍼블릭 예약 | 기흥역 프리미엄 가이드 2025" />
                <meta property="twitter:description" content="기흥 가라오케·하이퍼블릭 최고급 예약 가이드. 기흥역·삼성전자 기흥캠퍼스 중심 프리미엄 서비스. 셔츠룸·호빠·기모노룸까지 한 번에. 주대 18만원 이상. 상담 010-2626-4833" />
                <meta property="twitter:image" content="https://giheungkaraoke.com/og-home.jpg" />
                <link rel="canonical" href="https://giheungkaraoke.com" />
            </Helmet>
            <SchemaJsonLd data={[generateLocalBusinessSchema(), generateOrganizationSchema()]} />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
                {/* Background overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 z-0"></div>

                <div className="relative z-10 container mx-auto px-4 text-center mt-10">
                    <div className="animate-fade-in-up">
                        <span className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-900/10 backdrop-blur-md text-amber-400 px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] mb-8 uppercase hover:bg-amber-900/20 transition-colors cursor-default">
                            <Crown size={12} fill="currentColor" /> 기흥 유흥 컨설팅 전문
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-2xl">
                            기흥 가라오케 & 하이퍼블릭<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">서우실장 추천 가이드</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">기흥 가라오케·기흥 하이퍼블릭 중심으로 기흥역·기흥역 상권 라인을 소개합니다.<br />셔츠룸·호빠·기모노룸·룸살롱까지 목적별로 매칭해 드립니다.<br />주대 18만원 이상·TC 10만원 이상 기준이며 상세 문의 부탁드립니다.</p>
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
                                to="/giheung-highpub-guide"
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
                <SectionTitle title="왜 전문 컨설팅인가?" subtitle="차별화된 가치" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureItem icon={ShieldCheck} title="투명한 가격 구조" desc="사전에 명확한 비용 안내로 예상치 못한 추가금을 방지합니다." delay={0} />
                    <FeatureItem icon={Users} title="취향 기반 매칭" desc="고객 성향과 니즈를 분석하여 최적의 파트너를 연결해 드립니다." delay={100} />
                    <FeatureItem icon={Crown} title="15년 업계 경험" desc="오랜 경험과 네트워크를 바탕으로 신뢰할 수 있는 정보를 제공합니다." delay={200} />
                    <FeatureItem icon={Car} title="편리한 이동 지원" desc="기흥 전 지역 이동 편의를 위한 픽업 서비스를 운영합니다." delay={300} />
                </div>
            </section>

            {/* New Interactive Gallery Section */}
            <section className="py-24 bg-slate-950 overflow-hidden">
                <div className="container mx-auto px-4 mb-16 text-center">
                    <span className="text-amber-500 font-bold tracking-[0.3em] uppercase mb-4 block animate-pulse">프리미엄 파트너 라인업</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight break-keep">
                        다양한 스타일의 <br className="md:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">매력적인 파트너</span> 상시 대기
                    </h2>
                    <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed break-keep">
                        기흥 지역 최고 수준의 네트워크를 바탕으로<br />
                        다양한 스타일의 파트너를 보유하고 있습니다.<br className="hidden md:block" /><br />
                        고객님의 취향과 성향을 세심하게 파악하여<br />
                        <strong className="text-white">최적의 파트너십을 경험하실 수 있도록</strong><br className="md:hidden" /> 맞춤형 매칭을 제공합니다.
                    </p>
                    <div className="w-24 h-1 bg-amber-500 mx-auto mt-10"></div>
                </div>

                <div className="relative flex overflow-hidden">
                    <div className="flex animate-infinite-scroll whitespace-nowrap group hover:[animation-play-state:paused]">
                        {/* Double the images for seamless loop */}
                        {[
                            { src: '/partner/partner-01.webp', alt: '기흥 가라오케 프리미엄 매니저 - 서우실장 엄선 파트너' },
                            { src: '/partner/partner-02.webp', alt: '기흥 하이퍼블릭 최고급 매니저 - 기흥구 서우실장 추천' },
                            { src: '/partner/partner-03.webp', alt: '기흥 가라오케 VIP 매니저 - 기흥역 프리미엄' },
                            { src: '/partner/partner-04.webp', alt: '기흥 하이퍼블릭 프리미엄 파트너 - 기흥역 서우실장' },
                            { src: '/partner/partner-05.webp', alt: '기흥 셔츠룸 인기 매니저 - 서우실장 베스트 초이스' },
                            { src: '/partner/partner-06.webp', alt: '기흥 하이퍼블릭 엄선 매니저 - 기흥 서우실장' },
                            { src: '/partner/partner-07.webp', alt: '기흥 가라오케 TOP 매니저 - 기흥구 서우실장 추천' },
                            { src: '/partner/partner-01.webp', alt: '기흥 가라오케 프리미엄 매니저 - 서우실장 엄선 파트너' },
                            { src: '/partner/partner-02.webp', alt: '기흥 하이퍼블릭 최고급 매니저 - 기흥구 서우실장 추천' },
                            { src: '/partner/partner-03.webp', alt: '기흥 가라오케 VIP 매니저 - 기흥구 라운지' },
                            { src: '/partner/partner-04.webp', alt: '기흥 하이퍼블릭 프리미엄 파트너 - 기흥역 서우실장' },
                            { src: '/partner/partner-05.webp', alt: '기흥 셔츠룸 인기 매니저 - 서우실장 베스트 초이스' },
                            { src: '/partner/partner-06.webp', alt: '기흥 하이퍼블릭 엄선 매니저 - 기흥 서우실장' },
                            { src: '/partner/partner-07.webp', alt: '기흥 가라오케 TOP 매니저 - 기흥구 서우실장 추천' },
                        ].map((img, idx) => (
                            <div key={idx} className="inline-block px-4">
                                <div className="w-[300px] h-[450px] md:w-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative group/card">
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        title="기흥 가라오케 최상급 매니저"
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
                        <span className="text-amber-500 font-bold tracking-widest uppercase mb-2 block">1인 방문 가이드</span>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            혼자 방문해도<br />편안합니다
                        </h3>
                        <div className="space-y-6 text-slate-300 text-lg font-light leading-relaxed">
                            <p>
                                최근 <strong className="text-white">1인 방문 고객이 40% 이상</strong>을 차지합니다.<br />
                                혼자 오시는 분들도 어색하지 않도록 1:1 맞춤형 세팅과<br />
                                프라이빗한 환경을 제공해 드립니다.
                            </p>
                            <p>
                                조용히 대화를 나누고 싶은 날, 화끈하게 놀고 싶은 날,<br />
                                원하시는 분위기만 말씀해 주세요. 고객님의 성향을 파악하여<br />
                                가장 어울리는 파트너와 <strong className="text-amber-500">최적의 시간</strong>을 설계해 드립니다.
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

            {/* 기흥 특화 콘텐츠 섹션 - SEO 최적화 */}
            <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="container mx-auto px-4">
                    <SectionTitle title="왜 기흥인가?" subtitle="지역 특화 분석" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* 삼성전자 본사 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <Zap className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">삼성전자 본사 인접</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                <strong className="text-amber-400">삼성전자·SK하이닉스</strong> 본사가 위치한 기흥역 인근은
                                대한민국 반도체 산업의 심장부입니다. 고소득 엔지니어들의
                                <strong className="text-white">세련된 접대 문화</strong>가 형성되어 있습니다.
                            </p>
                        </article>

                        {/* 더블역세권 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <MapPin className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">환승 허브</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                <strong className="text-amber-400">환승역</strong>으로
                                강남 15분, 판교 5분의 최적 접근성.
                                <strong className="text-white">카페거리·맛집골목</strong> 인근에서
                                1차부터 2차까지 완벽한 동선을 제안합니다.
                            </p>
                        </article>

                        {/* 젊은 전문직 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <Users className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">2030 IT 전문직 밀집</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                평균 연령 <strong className="text-amber-400">28~35세</strong> IT 전문직이 밀집한 기흥구.
                                트렌디하고 모던한 분위기를 선호하는 고객층에 맞춰
                                <strong className="text-white">감각적인 인테리어</strong>의 업소들이 모여 있습니다.
                            </p>
                        </article>

                        {/* 비즈니스 미팅 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <Crown className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">비즈니스 네트워킹</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                기흥구은 <strong className="text-amber-400">비즈니스 미팅·협력사 접대</strong>의 핫플레이스.
                                <strong className="text-white">프라이빗한 VIP룸</strong>에서
                                비즈니스 성공을 위한 네트워킹을 즐기세요.
                            </p>
                        </article>
                    </div>
                </div>
            </section>

            {/* Hot Event Section */}
            <HotEventSection />

            {/* Blog Section */}
            <BlogSection />

            {/* Venue Preview - Horizontal Accordion */}
            <section className="py-24 container mx-auto px-4">
                <SectionTitle title="제휴 업소 안내" subtitle="기흥 유흥 핫플레이스" />

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
                                style={{ backgroundImage: `url('${venue.img}')`, aspectRatio: '16/9' }}>
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
