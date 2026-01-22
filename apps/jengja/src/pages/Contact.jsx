import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, MessageCircle, Send, Clock, ShieldCheck, Star, Users } from 'lucide-react';
import SchemaJsonLd from '../components/SchemaJsonLd';

const ContactCard = ({ icon: Icon, title, id, link, colorClass, btnText, subText, delay }) => (
    <a
        href={link}
        target={link.startsWith('http') ? '_blank' : undefined}
        rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`relative group bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 flex flex-col items-center justify-center text-center transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${delay} overflow-hidden`}
    >
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${colorClass.replace('text-', 'bg-')}`}></div>

        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg ${colorClass.includes('yellow') ? 'bg-[#FEE500] text-slate-900' : colorClass.includes('sky') ? 'bg-[#0088cc] text-white' : 'bg-gradient-to-br from-amber-400 to-amber-600 text-white'}`}>
            <Icon size={40} fill="currentColor" className={colorClass.includes('yellow') ? '' : 'text-white'} />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-xl text-amber-400 font-mono mb-6">{id}</p>

        <div className="text-slate-400 text-sm mb-8 px-4 leading-relaxed">
            {subText}
        </div>

        <span className={`w-full py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 ${colorClass.includes('yellow') ? 'bg-[#FEE500] hover:bg-[#ebd500] text-slate-900' : colorClass.includes('sky') ? 'bg-[#0088cc] hover:bg-[#0077b5] text-white' : 'bg-slate-700 group-hover:bg-amber-600 text-white'}`}>
            {btnText}
        </span>
    </a>
);

const Contact = () => {
    const contactInfo = {
        phone: "010-2626-4833",
        kakao: "@pbsewoo",
        kakaoLink: "http://qr.kakao.com/talk/jMlvTnRecn1PgP4S9gqME2itU7g-",
        telegram: "@pbsewoo",
        telegramLink: "https://t.me/pbsewoo"
    };

    return (
        <>
            <Helmet>
                <title>정자 예약 문의 | 전화·카톡·텔레그램 서우실장</title>
                <meta name="description" content="정자 하이퍼블릭·가라오케 예약 문의. 전화/카톡/텔레그램 24시간 상담, 정자역·정자 카페거리 픽업 안내." />
                <meta name="keywords" content="정자 예약, 정자 상담, 정자 하이퍼블릭 예약, 서우실장 연락처" />
                <meta property="og:title" content="정자 예약 문의 | 전화·카톡·텔레그램 서우실장" />
                <meta property="og:description" content="정자 하이퍼블릭·가라오케 예약 문의. 전화/카톡/텔레그램 24시간 상담, 정자역·정자 카페거리 픽업 안내." />
                <meta property="og:image" content="https://jengjakaraoke.com/og-contact.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="정자 예약 상담 안내" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="정자 예약 문의 | 전화·카톡·텔레그램 서우실장" />
                <meta property="twitter:description" content="정자 하이퍼블릭·가라오케 예약 문의. 전화/카톡/텔레그램 24시간 상담, 정자역·정자 카페거리 픽업 안내." />
                <meta property="twitter:image" content="https://jengjakaraoke.com/og-contact.jpg" />
                <link rel="canonical" href="https://jengjakaraoke.com/contact" />
            </Helmet>
            <SchemaJsonLd data={{
                "@context": "https://schema.org",
                "@type": "ContactPage",
                "name": "정자 서우실장 예약 문의",
                "description": "정자 24시간 실시간 예약 및 견적 상담",
                "url": "https://jengjakaraoke.com/contact"
            }} />

            <div className="pt-28 md:pt-36 min-h-screen bg-slate-950 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                <div className="container mx-auto px-4 pb-20 max-w-6xl relative z-10">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="flex items-center justify-center gap-2 text-amber-400 font-bold tracking-wider uppercase mb-4 animate-fade-in-up">
                            <Clock size={16} /> 24 Hours Service
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 animate-fade-in-up delay-100">
                            실시간 예약 & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">문의하기</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">정자 상권 기준 빠른 예약/상담을 도와드립니다.<br />정자역·정자 카페거리 픽업 포함, 24시간 연결됩니다.</p>
                    </div>

                    {/* Contact Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {/* Phone */}
                        <ContactCard
                            icon={Phone}
                            title="전화 문의"
                            id={contactInfo.phone}
                            link={`tel:${contactInfo.phone.replace(/-/g, '')}`}
                            colorClass="text-amber-500"
                            btnText="전화 걸기"
                            subText="가장 빠르고 정확한 상담이 가능합니다. 터치하시면 바로 연결됩니다."
                            delay="animate-fade-in-up delay-300"
                        />

                        {/* Kakao */}
                        <ContactCard
                            icon={MessageCircle}
                            title="카카오톡"
                            id={contactInfo.kakao}
                            link={contactInfo.kakaoLink}
                            colorClass="text-yellow-400"
                            btnText="카톡 상담하기"
                            subText="부담 없는 1:1 채팅 상담. QR코드 또는 아이디로 친구 추가하세요."
                            delay="animate-fade-in-up delay-400"
                        />

                        {/* Telegram */}
                        <ContactCard
                            icon={Send}
                            title="텔레그램"
                            id={contactInfo.telegram}
                            link={contactInfo.telegramLink}
                            colorClass="text-sky-500"
                            btnText="텔레그램 보내기"
                            subText="비밀 대화가 필요하실 때 이용해주세요. 강력한 보안을 보장합니다."
                            delay="animate-fade-in-up delay-500"
                        />
                    </div>

                    {/* Trust Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center border-t border-slate-800 pt-16">
                        <div className="p-6">
                            <ShieldCheck className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                            <h4 className="text-white font-bold mb-2">100% 예약제 운영</h4>
                            <p className="text-slate-500 text-sm">프라이빗한 이용을 위해<br />사전 예약제로 운영됩니다.</p>
                        </div>
                        <div className="p-6">
                            <Star className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                            <h4 className="text-white font-bold mb-2">정찰제 가격 준수</h4>
                            <p className="text-slate-500 text-sm">투명한 가격 공개로<br />내상 없는 술자리를 약속합니다.</p>
                        </div>
                        <div className="p-6">
                            <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                            <h4 className="text-white font-bold mb-2">맞춤형 케어</h4>
                            <p className="text-slate-500 text-sm">방문 목적에 맞는<br />최적의 코스를 안내해 드립니다.</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Contact;
