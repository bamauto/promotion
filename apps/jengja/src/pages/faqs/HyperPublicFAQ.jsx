import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SchemaJsonLd, { generateFAQSchema } from '../../components/SchemaJsonLd';
import { HelpCircle, ChevronRight, Phone, MessageCircle } from 'lucide-react';

const FAQItem = ({ question, answer }) => (
    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/30 transition-all duration-300">
        <h3 className="text-lg md:text-xl font-bold text-amber-500 mb-3 flex items-start gap-2">
            <span className="bg-amber-500/10 p-1 rounded text-sm mt-1">Q</span>
            {question}
        </h3>
        <p className="text-slate-300 leading-relaxed pl-8">
            <span className="font-bold text-slate-500 mr-2">A.</span>
            {answer}
        </p>
    </div>
);

const HyperPublicFAQ = () => {
    const faqList = [
    {
        question: "정자 하이퍼블릭과 퍼블릭의 차이는 무엇인가요?",
        answer: "하이퍼블릭은 퍼블릭 대비 인테리어와 서비스 퀄리티를 높인 타입입니다. 정자·판교 테크 직장인 이용이 많아 조용한 대화와 프라이빗 동선에 초점을 둡니다."
    },
    {
        question: "혼자 방문해도 괜찮나요?",
        answer: "네, 1인 방문도 환영합니다. 정자 상권 특성상 1:1 요청이 많아 감각적인하게 안내드립니다."
    },
    {
        question: "픽업은 어디까지 가능한가요?",
        answer: "픽업은 정자역, 정자 카페거리, 판교테크노밸리, 미금역 중심으로 운영됩니다. 예약 시 동선을 맞춰드립니다."
    },
    {
        question: "주대와 TC 기준이 궁금합니다.",
        answer: "주대 18만원 이상, TC 10만원 이상 기준이며 시간·코스·인원에 따라 달라질 수 있습니다. 상세는 문의 바랍니다."
    },
    {
        question: "예약은 꼭 필요한가요?",
        answer: "피크 타임에는 대기 가능성이 있어 예약을 권장합니다. 사전 예약 시 동선과 룸 타입을 미리 맞춰드립니다."
    },
    {
        question: "복장 제한이 있나요?",
        answer: "강제 드레스 코드는 없지만 깔끔한 캐주얼을 추천합니다. 비즈니스 목적이라면 포멀한 복장이 좋습니다."
    }
];

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>정자 하이퍼블릭 FAQ | 가격·픽업·예약 안내</title>
                <meta name="description" content="정자 하이퍼블릭 이용 전 필독 FAQ. 주대/TC 기준, 픽업 범위, 예약 팁을 정리했습니다." />
                <meta name="keywords" content="정자 하이퍼블릭 FAQ, 정자 하이퍼블릭 가격, 정자 하이퍼블릭 예약" />
                <link rel="canonical" href="https://jengjakaraoke.com/jeongja-highpub-guide/faq" />
            </Helmet>
            <SchemaJsonLd data={faqSchema} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950 px-4 pb-20">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-6">
                            하이퍼블릭 이용 가이드 & FAQ
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                            궁금한 점이 많으셨죠? <strong className="text-white">서우실장</strong>이 고객님들이 가장 많이 묻는 질문들을 모아 시원하게 답변해 드립니다.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {faqList.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-slate-400 mb-6">더 궁금한 점이 있으신가요? 24시간 언제든 물어보세요.</p>
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all">
                                <Phone size={20} /> 전화로 물어보기
                            </button>
                            <Link to="/jeongja-highpub-guide" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all">
                                <ChevronRight size={20} /> 정자 하이퍼블릭 메인으로
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HyperPublicFAQ;
