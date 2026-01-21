import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SchemaJsonLd, { generateFAQSchema } from '../../components/SchemaJsonLd';
import { HelpCircle, ChevronRight, Phone, ShieldCheck } from 'lucide-react';

const FAQItem = ({ question, answer }) => (
    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-amber-600/30 transition-all duration-300">
        <h3 className="text-lg md:text-xl font-bold text-amber-600 mb-3 flex items-start gap-2">
            <span className="bg-amber-600/10 p-1 rounded text-sm mt-1">Q</span>
            {question}
        </h3>
        <p className="text-slate-300 leading-relaxed pl-8">
            <span className="font-bold text-slate-500 mr-2">A.</span>
            {answer}
        </p>
    </div>
);

const RoomSalonFAQ = () => {
    const faqList = [
        {
            question: "비즈니스 접대 시, 법인 비용 처리가 확실한가요?",
            answer: "네, 가장 중요한 부분입니다. 저희가 안내해 드리는 모든 룸살롱은 정식 허가 업체로, 법인 카드 결제 및 세금계산서 발행이 100% 가능합니다. 영수증 표기 내역도 '일반 음식점' 등으로 고객사가 원하는 형태로 맞춰드릴 수 있으니 예약 시 담당 실장과 상의해주세요."
        },
        {
            question: "접대 자리에 어울리는 매니저 배정이 가능한가요?",
            answer: "물론입니다. 단순한 유흥을 넘어 비즈니스 대화의 격을 맞춰줄 수 있는 '에이스급' 매니저들이 준비되어 있습니다. 외국어가 가능하거나, 골프/경제 등 대화 주제를 맞출 수 있는 인원들을 우선 배정해 드립니다."
        },
        {
            question: "주대가 부담스러운데, 가성비 있게 이용하는 방법이 있나요?",
            answer: "오후 8시 이전 '얼리버드 이벤트'를 활용하시거나, 담당 실장에게 미리 예산을 말씀해 주시면 그에 맞춰 주류 등급을 조정해 최적의 견적을 산출해 드립니다. 무리한 바가지는 절대 씌우지 않습니다."
        },
        {
            question: "룸 안에서의 보안(Privacy)은 철저한가요?",
            answer: "VVIP 고객님들이 많이 찾으시는 만큼 보안을 생명처럼 여깁니다. 다른 손님과 마주치지 않는 독립된 동선, 룸 내 도청 방지 등 철저한 프라이빗 시스템을 갖추고 있습니다."
        },
        {
            question: "지명(Choice) 예약이 가능한가요?",
            answer: "네, 기존에 방문하셔서 마음에 드셨던 매니저가 있다면 사전 지명 예약이 가능합니다. 인기 매니저는 예약이 빨리 차므로 최소 하루 전, 늦어도 당일 오후 5시 전에는 연락 주셔야 확실한 배정이 가능합니다."
        },
        {
            question: "강남 룸살롱과 정자의 차이는 무엇인가요?",
            answer: "퀄리티 면에서는 강남 텐카페/쩜오에 뒤지지 않으면서, 가격 거품은 뺀 것이 정자의 장점입니다. 강남 대비 약 70~80% 수준의 비용으로 동급의 서비스를 즐기실 수 있어 실속파 사장님들이 많이 넘어오십니다."
        },
        {
            question: "혼자 방문해서 조용히 술 마실 수 있나요?",
            answer: "가능합니다. 비즈니스로 지친 대표님들이 혼자 오셔서 편안하게 대화 나누고 쉬다 가시는 경우가 많습니다. 1인 방문 시에도 홀대 없이 VVIP 룸으로 배정해 드립니다."
        },
        {
            question: "외국인 바이어 접대도 가능한가요?",
            answer: "영어, 일본어, 중국어 등 기초 회화가 가능한 매니저들이 상주하고 있습니다. 외국인 바이어 접대 경험이 풍부한 실장이 의전을 담당하여 불편함 없이 모십니다."
        },
        {
            question: "양주를 다 못 마시면 보관(키핑) 되나요?",
            answer: "네, 남은 술은 최대 3개월간 보관(Keeping) 해드립니다. 다음 방문 시에는 룸비(TC)와 기본 안주 비용만 내고 저렴하게 이용하실 수 있습니다."
        },
        {
            question: "풀살롱(Full Salon) 시스템도 운영하나요?",
            answer: "현재 소개하고 있는 정통 룸살롱은 2차를 필수로 하는 '풀싸롱'과는 다릅니다. 고급스러운 술자리를 지향하는 '비즈니스 클럽'입니다. 다만 고객님의 니즈에 따라 연계 가능한 시스템을 안내해 드릴 수는 있으니 전화 문의 바랍니다."
        }
    ];

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>정자 룸살롱 비즈니스 접대 FAQ | 법인 결제, 지명 예약, 견적 문의</title>
                <meta name="description" content="성공적인 비즈니스 접대를 위한 정자 룸살롱 이용 가이드. 법인 비용 처리, 외국어 가능 매니저, 프라이빗 보안 시스템 등 접대 담당자가 가장 궁금해하는 10가지 질문에 답해드립니다." />
                <meta name="keywords" content="정자 룸살롱 접대, 정자 룸살롱 법인카드, 정자 룸살롱 가격, 강남 정자 룸살롱 비교" />
                <link rel="canonical" href="https://www.jengjakaraoke.com/jeongja-room-salon-guide/faq" />
            </Helmet>
            <SchemaJsonLd data={faqSchema} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950 px-4 pb-20">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <div className="flex justify-center mb-4">
                            <ShieldCheck className="w-12 h-12 text-amber-600 opacity-80" />
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-700 mb-6">
                            비즈니스 접대 & FAQ
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                            중요한 바이어를 모시는 자리, 실수하면 안 되니까.<br />
                            <strong className="text-white">서우실장</strong>이 접대의 A to Z를 상세히 안내해 드립니다.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {faqList.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg">
                                <Phone size={20} /> 접대 견적 상담
                            </button>
                            <Link to="/jeongja-room-salon-guide" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all">
                                <ChevronRight size={20} /> 룸살롱 정보 더보기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoomSalonFAQ;
