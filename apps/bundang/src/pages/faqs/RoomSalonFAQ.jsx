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
        question: "분당 룸살롱의 특징은 무엇인가요?",
        answer: "조용한 대화와 비즈니스 접대에 초점을 둔 프라이빗 룸 중심 서비스입니다."
    },
    {
        question: "접대나 회의 목적도 가능한가요?",
        answer: "네. 판교·서현 직장인 접대 수요가 많아 비즈니스 라운지 타입도 운영합니다."
    },
    {
        question: "픽업 지원은 어디까지 되나요?",
        answer: "서현역 로데오거리, 야탑역 먹자골목, 판교테크노밸리, 미금역 중심 픽업을 안내합니다."
    },
    {
        question: "주대/TC 기준은 어떻게 되나요?",
        answer: "주대 18만원 이상, TC 10만원 이상 기준이며 코스에 따라 달라집니다."
    },
    {
        question: "예약은 필수인가요?",
        answer: "원활한 룸 배정을 위해 사전 예약을 권장합니다."
    },
    {
        question: "복장에 제한이 있나요?",
        answer: "비즈니스 목적이라면 포멀한 복장이 추천되며, 일반 캐주얼도 가능합니다."
    }
];

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>분당 룸살롱 FAQ | 접대·예약·가격 안내</title>
                <meta name="description" content="분당 룸살롱 FAQ. 비즈니스 접대, 예약 방법, 주대/TC 기준을 정리했습니다." />
                <meta name="keywords" content="분당 룸살롱 FAQ, 분당 룸살롱 예약, 분당 룸살롱 가격" />
                <link rel="canonical" href="https://bundanghipublic.com/bundang-room-salon-guide/faq" />
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
                            <Link to="/bundang-room-salon-guide" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all">
                                <ChevronRight size={20} /> 분당 룸살롱 정보 더보기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoomSalonFAQ;
