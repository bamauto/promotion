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
        { id: 'bundang-hyperpub-guide', title: '하이퍼블릭', sub: '프라이빗 / 시크릿', img: '/hyperpublic_main.webp', desc: '서현역 로데오거리 중심 프라이빗 라운지' },
        { id: 'bundang-karaoke-guide', title: '가라오케', sub: '프리미엄 / 라운지', img: '/karaoke_main.webp', desc: '야탑역 먹자골목 파티/모임 룸' },
        { id: 'bundang-shirtsroom-guide', title: '셔츠룸', sub: '초이스 / 화이트셔츠', img: '/shirtsroom_main.webp', desc: '판교테크노밸리 빠른 초이스' },
        { id: 'bundang-kimono-room-guide', title: '기모노룸', sub: '이색 테마 / 코스프레', img: '/kimonoroom_main.webp', desc: '미금역 테마 포인트' },
        { id: 'bundang-room-salon-guide', title: '룸살롱', sub: '정통 / 비즈니스', img: '/roomsalon_main.webp', desc: '서현역 로데오거리 비즈니스 라인' },
        { id: 'bundang-hostbar-guide', title: '호빠', sub: '프리미엄 / 여성전용', img: '/hostbar_main.webp', desc: '야탑역 먹자골목 여성전용 라운지' }
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
                <title>분당 가라오케·셔츠룸·호빠 | 하이퍼블릭 예약 안내</title>
                <meta name="description" content="분당 가라오케·하이퍼블릭·셔츠룸·호빠·기모노룸 예약. 서현역·야탑역 프리미엄 클럽. 주대 18만원 이상. 상담 010-2626-4833" />
                <meta name="keywords" content="분당 가라오케, 분당 하이퍼블릭, 분당 셔츠룸, 분당 호빠, 분당 기모노룸, 분당 룸살롱, 서현역 로데오거리 가라오케, 야탑역 먹자골목 하이퍼블릭" />
                <meta property="og:title" content="분당 가라오케·하이퍼블릭 예약 | 서현역 로데오거리·야탑역 먹자골목 서우실장" />
                <meta property="og:description" content="분당 가라오케·분당 하이퍼블릭 메인 가이드. 서현역 로데오거리·야탑역 먹자골목 중심 상권에서 판교·서현 직장인 맞춤 코스를 안내합니다. 분당 셔츠룸·호빠·기모노룸·룸살롱까지 한 번에. 주대 18만원 이상, TC 10만원 이상, 상세 문의. 24시간 상담 ☎ 010-2626-4833" />
                <meta property="og:image" content="https://bundanghipublic.com/og-home.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="분당 하이퍼블릭·가라오케 메인 가이드" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="og:site_name" content="분당 서우실장" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="분당 가라오케·하이퍼블릭 예약 | 서현역 로데오거리·야탑역 먹자골목 서우실장" />
                <meta property="twitter:description" content="분당 가라오케·분당 하이퍼블릭 메인 가이드. 서현역 로데오거리·야탑역 먹자골목 중심 상권에서 판교·서현 직장인 맞춤 코스를 안내합니다. 분당 셔츠룸·호빠·기모노룸·룸살롱까지 한 번에. 주대 18만원 이상, TC 10만원 이상, 상세 문의. 24시간 상담 ☎ 010-2626-4833" />
                <meta property="twitter:image" content="https://bundanghipublic.com/og-home.jpg" />
                <link rel="canonical" href="https://bundanghipublic.com" />
            </Helmet>
            <SchemaJsonLd data={[generateLocalBusinessSchema(), generateOrganizationSchema()]} />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center bg-slate-950 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-slate-950 z-0"></div>

                <div className="relative z-10 container mx-auto px-4 text-center mt-10">
                    <div className="animate-fade-in-up">
                        <span className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-900/10 backdrop-blur-md text-amber-400 px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] mb-8 uppercase hover:bg-amber-900/20 transition-colors cursor-default">
                            <Crown size={12} fill="currentColor" /> 프리미엄 하이퍼블릭 서비스
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-8 leading-tight drop-shadow-2xl">
                            분당 하이퍼블릭 & 가라오케<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">서우실장 추천 가이드</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">분당 가라오케·분당 하이퍼블릭 중심으로 서현역 로데오거리·야탑역 먹자골목 라인을 소개합니다.<br />셔츠룸·호빠·기모노룸·룸살롱까지 목적별로 매칭해 드립니다.<br />주대 18만원 이상·TC 10만원 이상 기준이며 상세 문의 부탁드립니다.</p>
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
                                to="/bundang-hyperpub-guide"
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
                    <FeatureItem icon={ShieldCheck} title="100% 정찰제" desc="추가금 없는 투명한 가격 정책으로 신뢰를 드립니다." delay={0} />
                    <FeatureItem icon={Users} title="최고 수준 매니저" desc="철저한 교육과 마인드를 갖춘 70여명의 매니저 대기." delay={100} />
                    <FeatureItem icon={Crown} title="1:1 맞춤 초이스" desc="고객님의 이상형과 취향을 고려한 완벽한 매칭." delay={200} />
                    <FeatureItem icon={Car} title="고급 세단 픽업" desc="편안한 이동을 위해 고급 세단 픽업 서비스를 제공합니다." delay={300} />
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
                        {[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7].map((num, idx) => (
                            <div key={idx} className="inline-block px-4">
                                <div className="w-[300px] h-[450px] md:w-[400px] md:h-[600px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative group/card">
                                    <img
                                        src={`/seewoo_${num}.webp`}
                                        alt={`분당 하이퍼블릭 프리미엄 매니저 - 서현역 서우실장 추천 ${num}번`}
                                        title="분당 하이퍼블릭 최상급 매니저"
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

            {/* 분당 특화 콘텐츠 섹션 - SEO 최적화 */}
            <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="container mx-auto px-4">
                    <SectionTitle title="왜 분당인가?" subtitle="지역 특화 분석" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* IT벨리 중심지 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <Zap className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">판교 IT벨리 중심지</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                <strong className="text-amber-400">네이버·카카오·NHN</strong> 등 국내 대표 IT기업이 밀집한
                                판교테크노밸리 인접 지역으로, 고소득 IT 종사자들의 프리미엄 접대 문화가 발달했습니다.
                                <strong className="text-white">강남급 품격</strong>을 합리적 가격에 경험하세요.
                            </p>
                        </article>

                        {/* 1기 신도시 프리미엄 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <Crown className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">1기 신도시 프리미엄</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                30년 역사의 <strong className="text-amber-400">대한민국 1기 신도시</strong> 분당은
                                안정적인 고소득층이 밀집해 있습니다. 서현역·야탑역 상권에는
                                <strong className="text-white">오랜 경험의 프리미엄 업소</strong>들이
                                검증된 서비스를 제공합니다.
                            </p>
                        </article>

                        {/* 교통 접근성 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <MapPin className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">분당선·신분당선 더블역세권</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                <strong className="text-amber-400">분당선·신분당선</strong> 더블역세권으로
                                강남까지 15분, 판교까지 5분의 최적 접근성.
                                서현역·야탑역 인근 <strong className="text-white">핵심 상권</strong>에서
                                편리하게 픽업 서비스를 이용하세요.
                            </p>
                        </article>

                        {/* 비즈니스 문화 */}
                        <article className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:border-amber-500/30 transition-all">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                                    <Users className="text-amber-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">격조 높은 비즈니스 접대</h3>
                            </div>
                            <p className="text-slate-300 leading-relaxed">
                                대기업 임원진·스타트업 CEO들의 <strong className="text-amber-400">비즈니스 접대</strong>가
                                일상인 분당에서는 품격과 프라이버시를 최우선으로 합니다.
                                <strong className="text-white">VIP룸·시크릿 입구</strong> 등
                                철저한 보안이 보장됩니다.
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
                <SectionTitle title="제휴 업소 안내" subtitle="분당 유흥 핫플레이스" />

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
