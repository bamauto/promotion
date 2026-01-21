import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SchemaJsonLd, { generateServiceSchema, generateFAQSchema } from '../components/SchemaJsonLd';
import RelatedServices from '../components/RelatedServices';
import TableOfContents from '../components/TableOfContents';
import { Music, Clock, GlassWater, Users, Sparkles, CheckCircle, Phone, MapPin, DollarSign, Star, HelpCircle, Mic2, ChevronRight } from 'lucide-react';

const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
        <span className="text-amber-400 font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-3 animate-fade-in-up block">{subtitle}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 relative z-10 animate-fade-in-up delay-100 drop-shadow-sm">{title}</h1>
        <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-transparent mx-auto mt-6"></div>
    </div>
);

const ContentBlock = ({ title, children, id }) => (
    <div id={id} className="mb-12 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm hover:border-purple-500/20 transition-colors">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-purple-500 rounded-full"></div>
            {title}
        </h2>
        <div className="text-slate-300 leading-relaxed text-lg font-light space-y-4">
            {children}
        </div>
    </div>
);

const VenueCard = ({ venue }) => (
    <article className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-2 flex flex-col h-full">
        <div className="h-64 bg-slate-900 relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
            <img
                src={venue.img}
                alt={venue.imgAlt}
                loading="lazy"
                width="400"
                height="256"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase shadow-lg tracking-wider">
                {venue.type}
            </div>
        </div>

        <div className="p-8 relative flex flex-col flex-grow">
            <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{venue.name}</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-slate-800">{venue.desc}</p>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <MapPin className="text-purple-500 w-4 h-4" /> {venue.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <DollarSign className="text-purple-500 w-4 h-4" /> {venue.price}
                </div>
            </div>

            <div className="mb-6 space-y-2 flex-grow">
                <div className="flex flex-wrap gap-2">
                    {venue.features.map((feat, idx) => (
                        <span key={idx} className="text-xs font-medium bg-slate-800/50 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <CheckCircle size={10} className="text-purple-500" /> {feat}
                        </span>
                    ))}
                </div>
            </div>

            <button
                onClick={() => window.location.href = 'tel:01026264833'}
                className="w-full bg-slate-800 hover:bg-purple-600 text-white hover:text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
                <Phone size={18} className="group-hover/btn:animate-bounce" />
                <span className="tracking-widest text-sm">실시간 예약 문의</span>
            </button>
        </div>
    </article>
);

const venues = {
    karaoke: [
        {
            id: 'k-1',
            name: '평촌 파티센터',
            type: '30인 대형 파티룸',
            location: '평촌역 5번 출구 도보 3분',
            price: '기본가 100,000원 ~',
            desc: '평촌 신도시 직장인 회식 1위 선호 업소. 최대 30명 수용 대형 파티룸으로 IT기업·학원가 학부모 모임에 최적화. 2025년 리뉴얼 완료, 최신 JBL 사운드 시스템과 LED 사이키 조명으로 클럽 분위기 연출.',
            features: ['30인 파티룸', '평촌 학원가 5분', '무료 주차 50대', 'DJ 섭외 가능'],
            img: '/anyang-highpublic-2.webp',
            imgAlt: '평촌역 가라오케 대형 파티룸 - 직장인 회식'
        },
        {
            id: 'k-2',
            name: '범계 로데오 라운지',
            type: '2024 신규 오픈',
            location: '범계 로데오거리 중심',
            price: '기본가 150,000원 ~',
            desc: '범계 로데오거리 핫플레이스! 2024년 12월 신규 오픈한 트렌디 라운지. 20대 초반 MZ세대 매니저 전원 배치. 인스타그램 포토존과 네온 인테리어로 SNS 감성 충만.',
            features: ['2024 신규', '인스타 포토존', '20대 매니저', 'EDM 파티'],
            img: '/anyang-shirtsroom-1.webp',
            imgAlt: '범계 로데오거리 가라오케 - 2024 신규 오픈'
        },
        {
            id: 'k-3',
            name: '인덕원 IT 접대 전문',
            type: 'Private Business',
            location: '인덕원역 1번 출구 도보 5분',
            price: '비즈니스 SET 130,000원 ~',
            desc: '인덕원역 IT단지·과학벨트 임원분들 선호 업소. 완벽한 방음 시설과 별도 VIP 엘리베이터로 프라이버시 보장. 법인카드 결제·세금계산서 발행 OK. 바이어 접대 성공률 98%.',
            features: ['IT기업 특화', '법인카드 OK', '방음 완비', 'VIP 엘리베이터'],
            img: '/anyang-roomsalon-2.webp',
            imgAlt: '인덕원 가라오케 - IT기업 비즈니스 접대'
        },
        {
            id: 'k-4',
            name: '안양역 가성비 킹',
            type: '대학생 할인',
            location: '안양역 2번 출구 도보 7분',
            price: '기본가 80,000원 ~',
            desc: '안양역 상권 가성비 1위! 대학생·사회초년생 할인 이벤트 상시 진행. 평일 저녁 해피아워 주대 30% 할인. 강남 대비 40% 저렴한 가격으로 동일 수질 보장.',
            features: ['대학생 할인', '해피아워 30%', '생일 샴페인', '가성비 최고'],
            img: '/anyang-nightlife-1.webp',
            imgAlt: '안양역 가라오케 - 대학생 할인 가성비'
        },
        {
            id: 'k-5',
            name: '평촌 프리미엄 음향',
            type: 'High-End Sound',
            location: '평촌역 도보 3분',
            price: '프리미엄 SET 180,000원 ~',
            desc: '안양 유일 Bose 전관 음향 시스템 도입. 노래 좋아하시는 분들께 강력 추천. 평촌 신도시 중년층·40대 동호회 정기 모임 단골 업소. 금연 룸 5개 완비.',
            features: ['Bose 음향', '금연 룸 완비', '동호회 환영', '정기 예약 할인'],
            img: '/anyang-entertainment-main.webp',
            imgAlt: '평촌 가라오케 - 프리미엄 Bose 음향 시스템'
        },
        {
            id: 'k-6',
            name: '범계 새벽 영업',
            type: 'Late Night Special',
            location: '범계역 4번 출구 도보 5분',
            price: '새벽 해피아워',
            desc: '범계 로데오거리 유일 새벽 5시까지 영업! 2차·3차 후 마무리 장소로 인기. 새벽 2시 이후 주대 20% 할인 해피아워 적용. 귀가 시 범계역까지 무료 픽업.',
            features: ['새벽 5시 영업', '새벽 할인 20%', '범계역 픽업', '2차 최적'],
            img: '/anyang-hostbar-1.webp',
            imgAlt: '범계 가라오케 - 새벽 영업 해피아워'
        }
    ]
};

const Karaoke = () => {
    const faqList = [
        {
            question: "노래방 기기는 최신인가요?",
            answer: "네, 매월 신곡이 업데이트되는 최신형 기기를 사용합니다. 음향 세팅도 전문가가 주기적으로 점검합니다."
        },
        {
            question: "외부 주류 반입이 가능한가요?",
            answer: "원칙적으로는 불가합니다. 다만, 특별한 기념일 와인 등은 콜키지 비용 지불 후 반입 가능하오니 미리 상의해 주세요."
        },
        {
            question: "여성 손님도 많이 오시나요?",
            answer: "네, 생일파티나 파티룸 이용을 위해 2030 여성 고객님들도 많이 찾아주십니다. 안전하고 즐거운 분위기를 보장합니다."
        }
    ];

    const sections = [
        { id: "features", title: "1. 안양 가라오케 특징" },
        { id: "recommendation", title: "2. 추천 업소 TOP 6" },
        { id: "pricing", title: "3. 이용 가격 및 시스템" },
        { id: "faq", title: "4. 이용 꿀팁 및 FAQ" }
    ];

    const serviceSchema = generateServiceSchema(
        "Karaoke",
        "안양 가라오케 추천 및 가격표. 최신 음향 시설과 대형 룸 완비.",
        "https://anyangkaraoke.com/anyang-karaoke-guide",
        "100000"
    );

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>안양 가라오케 가격 예약 | 평촌역·범계역·평촌 신도시 NO.1 서우실장</title>
                <meta name="description" content="안양 가라오케 TOP 6 완벽 가이드. 평촌역·범계역·평촌 신도시·평촌동·범계동·인덕원·만안구 고급 음향시설. 파티룸·VIP룸·생일파티·회식 특화. 안양 전문직 직장인 선호. 단체 환영 | 24시간 예약 ☎ 010-2626-4833" />
                <meta name="keywords" content="안양 가라오케, 안양 가라오케 가격, 안양 가라오케 예약, 평촌역·범계역 가라오케, 평촌 신도시 가라오케, 안양 파티룸, 안양 노래방" />
                <meta property="og:title" content="안양 가라오케 가격 예약 | NO.1 서우실장" />
                <meta property="og:description" content="평촌역·범계역·평촌 신도시 TOP 6 | 고급 음향시설 | 파티룸·VIP룸 | 24시간 예약 ☎ 010-2626-4833" />
                <meta property="og:image" content="https://anyangkaraoke.com/og-karaoke.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="안양 가라오케 가격 및 예약 가이드" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="안양 가라오케 | NO.1 서우실장" />
                <meta property="twitter:description" content="평촌역·범계역·평촌 신도시 TOP 6 | 고급 음향시설 | 24시간 예약" />
                <meta property="twitter:image" content="https://anyangkaraoke.com/og-karaoke.jpg" />
                <link rel="canonical" href="https://anyangkaraoke.com/anyang-karaoke-guide" />
            </Helmet>
            <SchemaJsonLd data={[serviceSchema, faqSchema]} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950">
                <div className="container mx-auto px-4 pb-12 max-w-6xl">
                    <SectionTitle title="안양 가라오케 가이드" subtitle="Luxury & Fun" />

                    {/* Intro Text */}
                    <div className="mb-20 text-center max-w-4xl mx-auto">
                        <p className="text-xl text-slate-300 leading-relaxed font-light">
                            스트레스를 한 번에 날려버릴 <strong className="text-purple-400">최고의 사운드</strong>와 <strong className="text-white">프라이빗한 공간</strong>.<br />
                            안양 서우실장이 엄선한 프리미엄 가라오케에서<br />
                            당신의 소중한 사람들과 잊지 못할 뜨거운 밤을 만들어 보세요.
                        </p>
                    </div>

                    <TableOfContents sections={sections} />

                    {/* 1. Definition */}
                    <ContentBlock id="features" title="1. 안양 가라오케의 특징">
                        <p>
                            안양 가라오케는 단순한 노래방을 넘어선 <strong>'토탈 엔터테인먼트 공간'</strong>을 지향합니다. 강남의 고급 가라오케 시스템을 그대로 도입하여,
                            웨이터의 격식 있는 서빙과 호텔 셰프 수준의 고급 안주, 그리고 무엇보다 <strong>콘서트장을 방불케 하는 하이엔드 음향 시설</strong>을 갖추고 있습니다.
                        </p>
                        <p>
                            비즈니스 접대로도 손색없는 고급스러운 인테리어 룸부터, 2030 세대를 위한 힙한 감성의 파티룸까지 다양한 컨셉의 룸을 보유하고 있어 방문 목적에 맞게 선택하실 수 있습니다.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-slate-800 p-4 rounded-xl text-center border border-slate-700">
                                <Mic2 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                <span className="block text-white font-bold mb-1">High-End Sound</span>
                                <span className="text-xs text-slate-400">최고급 음향 시스템</span>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl text-center border border-slate-700">
                                <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                <span className="block text-white font-bold mb-1">Party & Biz</span>
                                <span className="text-xs text-slate-400">모임 목적별 맞춤 룸</span>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl text-center border border-slate-700">
                                <GlassWater className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                <span className="block text-white font-bold mb-1">Premium F&B</span>
                                <span className="text-xs text-slate-400">호텔급 안주 & 주류</span>
                            </div>
                        </div>
                    </ContentBlock>

                    {/* 2. Recommendations */}
                    <div id="recommendation" className="mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-8 bg-purple-500 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white">2. 안양 가라오케 추천 TOP 6</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                            {venues.karaoke.map(venue => <VenueCard key={venue.id} venue={venue} />)}
                        </div>

                        {/* Gallery Section */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <Sparkles className="text-purple-500" /> 안양 가라오케 갤러리
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { src: '/partner/kr-gallery-01.webp', alt: '안양 가라오케 프리미엄 매니저 - 평촌역·범계역 VIP 서비스' },
                                    { src: '/partner/kr-gallery-02.webp', alt: '안양 가라오케 최고급 파트너 - 평촌학원가 럭셔리 룸' },
                                    { src: '/partner/kr-gallery-03.webp', alt: '안양 가라오케 VIP 매니저 - 평촌 신도시 프리미엄' },
                                    { src: '/partner/kr-gallery-04.webp', alt: '안양 가라오케 프리미엄 서비스 - 안양 24시간' },
                                ].map((img, idx) => (
                                    <div key={idx} className="aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all duration-300 group">
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            title="안양 가라오케 프리미엄 매니저"
                                            loading="lazy"
                                            width="300"
                                            height="400"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Pricing & System */}
                    <ContentBlock id="pricing" title="3. 이용 가격 및 시스템 안내">
                        <p>
                            안양 가라오케는 투명한 정찰제로 운영됩니다.
                            <strong>양주 SET</strong>가 가장 인기 있는 기본 메뉴이며, 인원수와 시간에 따라 추가 비용이 발생할 수 있습니다.
                        </p>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">A. 기본 주대 가이드</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse mt-2">
                                <thead>
                                    <tr className="border-b border-slate-700 text-purple-400">
                                        <th className="py-3 px-4">세트 메뉴</th>
                                        <th className="py-3 px-4">구성</th>
                                        <th className="py-3 px-4">가격 (예상)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">양주 A SET</td>
                                        <td className="py-3 px-4">12년산 (골든블루 등) + 과일 + 마른안주 + 음료</td>
                                        <td className="py-3 px-4">150,000원 ~</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">양주 B SET</td>
                                        <td className="py-3 px-4">17년산 프리미엄 + 특선 과일 + 모듬 안주 + 음료</td>
                                        <td className="py-3 px-4">200,000원 ~</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">맥주 SET</td>
                                        <td className="py-3 px-4">맥주 기본 + 기본 안주 (평일/이른 시간 전용)</td>
                                        <td className="py-3 px-4">문의</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">* 위 가격은 평균적인 시세이며, 업소 상황 및 이벤트에 따라 변동될 수 있습니다. 정확한 견적은 전화 문의 바랍니다.</p>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">B. 운영 정책</h4>
                        <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
                            <li><strong>영업 시간</strong>: 365일 연중무휴 (보통 저녁 6시 ~ 다음날 점심까지 운영)</li>
                            <li><strong>노래 시간</strong>: 기본 2~3시간 제공, 뒤에 대기 손님이 없을 경우 서비스 시간 팍팍 드립니다.</li>
                            <li><strong>매니저</strong>: 가라오케도 매니저 호출이 가능합니다. (TC 별도 문의)</li>
                        </ul>
                    </ContentBlock>

                    {/* 4. FAQ */}
                    <div id="faq" className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Star className="text-purple-500" /> 서우실장의 가라오케 Tip
                            </h3>
                            <ul className="space-y-4 text-slate-300 font-light">
                                <li className="flex gap-3">
                                    <CheckCircle className="text-purple-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>생일 파티 혜택</strong>: 생일이신 고객님께는 샴페인 1병 서비스 또는 특별 안주 서비스를 제공해 드립니다. 예약 시 꼭 말씀해 주세요!</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-purple-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>단체 회식</strong>: 10인 이상 대형 룸도 완비되어 있습니다. 단체 방문 시 픽업 서비스 차량 2대 배차 등 편의를 제공합니다.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-purple-900/10 p-8 rounded-2xl border border-purple-500/20">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <HelpCircle className="text-purple-500" /> 자주 묻는 질문 (FAQ)
                            </h3>
                            <div className="space-y-6">
                                {faqList.map((faq, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-purple-400 mb-1">Q. {faq.question}</p>
                                        <p className="text-slate-300 text-sm">A. {faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <Link to="/anyang-karaoke-guide/faq" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold transition-colors">
                                    더 많은 질문과 답변 보기 <ChevronRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">오늘 밤, 당신이 무대의 주인공입니다</h2>
                        <p className="text-purple-100 mb-8 max-w-2xl mx-auto relative z-10">
                            최고의 시설에서 터질 듯한 사운드와 함께 스트레스를 풀어보세요.<br />
                            안양 1등 가라오케 예약은 서우실장이 가장 빠르고 저렴합니다.
                        </p>
                        <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-white text-purple-900 font-bold py-4 px-12 rounded-full shadow-lg hover:scale-105 transition-transform relative z-10 flex items-center gap-2 mx-auto">
                            <Phone fill="currentColor" size={20} /> 010-2626-4833 간편 예약
                        </button>
                    </div>


                    <RelatedServices />

                </div>
            </div >
        </>
    );
};

export default Karaoke;
