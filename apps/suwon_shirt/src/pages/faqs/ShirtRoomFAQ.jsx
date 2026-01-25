import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SchemaJsonLd, { generateFAQSchema } from '../../components/SchemaJsonLd';
import { HelpCircle, ChevronRight, Phone, MessageCircle, Shirt, DollarSign, Clock, Users, MapPin, CheckCircle } from 'lucide-react';

const FAQItem = ({ question, answer }) => (
    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-blue-500/30 transition-all duration-300">
        <h3 className="text-lg md:text-xl font-bold text-blue-400 mb-3 flex items-start gap-2">
            <span className="bg-blue-500/10 p-1 rounded text-sm mt-1">Q</span>
            {question}
        </h3>
        <p className="text-slate-300 leading-relaxed pl-8">
            <span className="font-bold text-slate-500 mr-2">A.</span>
            {answer}
        </p>
    </div>
);

const ShirtRoomFAQ = () => {
    const faqList = [
        {
            question: "수원 셔츠룸이란 무엇인가요?",
            answer: "수원 셔츠룸은 화이트 셔츠를 입은 매니저들이 서비스하는 프리미엄 룸입니다. 일반 홀복 대신 깔끔한 와이셔츠 룩으로 세련된 분위기를 연출하며, 인계동·수원역 상권에서 비즈니스 접대와 모임에 인기가 높습니다."
        },
        {
            question: "수원 셔츠룸 가격은 얼마인가요?",
            answer: "수원 셔츠룸 기본 주대는 18만원 이상이며, 매니저 TC(봉사료)는 10만원 이상입니다. 주대에는 12년산 양주, 과일/마른안주, 음료가 포함됩니다. 시간대와 인원에 따라 가격이 달라질 수 있으니 상담 시 정확한 견적을 확인하세요."
        },
        {
            question: "수원 셔츠룸 예약은 어떻게 하나요?",
            answer: "수원 셔츠룸 예약은 전화(010-2626-4833) 또는 카카오톡(@pbsewoo)으로 가능합니다. 인원수, 방문 시간, 원하는 룸 타입을 말씀해 주시면 최적의 세팅을 준비해 드립니다. 피크 타임(밤 10시~12시)은 사전 예약을 권장합니다."
        },
        {
            question: "수원 셔츠룸 1인 방문도 가능한가요?",
            answer: "네, 1인 방문도 환영합니다. 인계동 상권은 직장인 고객이 많아 1:1 매칭 요청이 잦습니다. 혼자 오셔도 어색하지 않도록 프라이빗하게 세팅해 드리며, 취향에 맞는 파트너를 추천해 드립니다."
        },
        {
            question: "수원 셔츠룸 초이스 시스템은 어떻게 되나요?",
            answer: "수원 셔츠룸은 미러 초이스(매직미러 뒤에서 선택)와 조별 초이스(5~10명씩 룸에 입장) 방식을 운영합니다. 마음에 드는 매니저가 없으면 '다음 조'를 요청할 수 있으며, 무한 초이스 혜택도 제공됩니다."
        },
        {
            question: "수원 셔츠룸 픽업 서비스가 있나요?",
            answer: "네, 픽업 서비스를 운영합니다. 수원역, 인계동 상권, 삼성 디지털시티, 광교 중심으로 픽업이 가능합니다. 예약 시 픽업 위치를 말씀해 주시면 동선을 조율해 드립니다."
        },
        {
            question: "수원 셔츠룸 영업시간은 언제인가요?",
            answer: "수원 셔츠룸은 24시간 운영됩니다. 저녁 7시~9시 이른 시간대에 방문하시면 주대 할인 이벤트가 적용되는 경우가 많습니다. 새벽 시간도 정상 운영되니 편한 시간에 연락 주세요."
        },
        {
            question: "수원 셔츠룸과 하이퍼블릭의 차이는?",
            answer: "셔츠룸은 화이트 셔츠 착용 컨셉으로 시각적 임팩트와 터치 마인드가 오픈된 편이고, 하이퍼블릭은 프라이빗한 분위기와 대화 중심의 라운지 스타일입니다. 화끈한 분위기를 원하시면 셔츠룸, 조용한 접대를 원하시면 하이퍼블릭을 추천드립니다."
        },
        {
            question: "수원 셔츠룸 복장 규정이 있나요?",
            answer: "강제 드레스 코드는 없지만 깔끔한 캐주얼 복장을 권장합니다. 비즈니스 접대 목적이라면 포멀한 복장이 분위기에 더 어울립니다. 슬리퍼, 반바지 등 너무 캐주얼한 복장은 피해 주세요."
        },
        {
            question: "수원 셔츠룸 결제 방법은?",
            answer: "현금과 카드 결제 모두 가능합니다. 현금 결제 시 할인 혜택이 적용될 수 있습니다. 법인카드 사용도 가능하며, 영수증 처리 방법은 현장에서 안내받으실 수 있습니다."
        }
    ];

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>수원 셔츠룸 FAQ | 가격·예약·초이스 완벽 가이드</title>
                <meta name="description" content="수원 셔츠룸 이용 전 필수 FAQ. 가격(주대 18만원~), 예약 방법, 초이스 시스템, 픽업 서비스, 1인 방문 안내까지 모든 궁금증을 해결해 드립니다." />
                <meta name="keywords" content="수원 셔츠룸 FAQ, 수원 셔츠룸 가격, 수원 셔츠룸 예약, 수원 셔츠룸 후기, 인계동 셔츠룸" />
                <meta property="og:title" content="수원 셔츠룸 FAQ | 가격·예약·초이스 완벽 가이드" />
                <meta property="og:description" content="수원 셔츠룸 이용 전 필수 FAQ. 가격, 예약 방법, 초이스 시스템, 픽업 서비스까지 모든 궁금증 해결." />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <link rel="canonical" href="https://suwonshirt.com/suwon-shirt-shirtsroom-guide/faq" />
            </Helmet>
            <SchemaJsonLd data={faqSchema} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950 px-4 pb-20">
                <div className="container mx-auto max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
                            <Shirt size={16} /> 셔츠룸 전문 가이드
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-500 mb-6">
                            수원 셔츠룸 FAQ
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                            수원 셔츠룸 이용 전 궁금한 점을 모두 정리했습니다.<br />
                            <strong className="text-white">서우실장</strong>이 가격, 예약, 시스템까지 상세히 안내드립니다.
                        </p>
                    </div>

                    {/* Quick Summary Box - Featured Snippet Target */}
                    <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 p-6 md:p-8 rounded-2xl border border-blue-500/30 mb-12">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <DollarSign className="text-blue-400" /> 수원 셔츠룸 핵심 정보 요약
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 text-slate-300">
                                <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                                <span><strong className="text-white">기본 주대:</strong> 18만원 이상</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                                <span><strong className="text-white">매니저 TC:</strong> 10만원 이상</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                                <span><strong className="text-white">영업시간:</strong> 24시간 연중무휴</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                                <span><strong className="text-white">예약:</strong> 010-2626-4833</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                                <span><strong className="text-white">위치:</strong> 수원역·인계동 상권</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-300">
                                <CheckCircle size={18} className="text-blue-500 flex-shrink-0" />
                                <span><strong className="text-white">픽업:</strong> 수원역·삼성SDC 무료</span>
                            </div>
                        </div>
                    </div>

                    {/* FAQ List */}
                    <div className="grid gap-6">
                        {faqList.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 text-center">
                        <p className="text-slate-400 mb-6">더 궁금한 점이 있으신가요? 24시간 언제든 물어보세요.</p>
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all">
                                <Phone size={20} /> 전화로 문의하기
                            </button>
                            <Link to="/suwon-shirt-shirtsroom-guide" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all">
                                <ChevronRight size={20} /> 수원 셔츠룸 메인으로
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShirtRoomFAQ;
