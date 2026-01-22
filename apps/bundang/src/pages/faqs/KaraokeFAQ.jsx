import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SchemaJsonLd, { generateFAQSchema } from '../../components/SchemaJsonLd';
import { HelpCircle, ChevronRight, Phone } from 'lucide-react';

const FAQItem = ({ question, answer }) => (
    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-purple-500/30 transition-all duration-300">
        <h3 className="text-lg md:text-xl font-bold text-purple-400 mb-3 flex items-start gap-2">
            <span className="bg-purple-500/10 p-1 rounded text-sm mt-1">Q</span>
            {question}
        </h3>
        <p className="text-slate-300 leading-relaxed pl-8">
            <span className="font-bold text-slate-500 mr-2">A.</span>
            {answer}
        </p>
    </div>
);

const KaraokeFAQ = () => {
    const faqList = [
    {
        question: "분당 가라오케는 어떤 흐름으로 이용하나요?",
        answer: "예약 후 룸 배정 → 기본 세팅 → 노래 및 파티 진행 순으로 안내됩니다. (분당 상권 기준)"
    },
    {
        question: "단체나 회식도 가능한가요?",
        answer: "가능합니다. 판교·서현 직장인 회식 수요가 많아 단체 룸도 준비되어 있습니다."
    },
    {
        question: "픽업 가능 지역은 어디인가요?",
        answer: "서현역 로데오거리, 야탑역 먹자골목, 판교테크노밸리, 미금역 주변 중심으로 운영됩니다."
    },
    {
        question: "주대/TC 기준이 어떻게 되나요?",
        answer: "주대 18만원 이상, TC 10만원 이상 기준이며 상세는 상담 시 안내드립니다. (분당 상권 기준)"
    },
    {
        question: "예약 없이 방문해도 되나요?",
        answer: "가능은 하지만 분당 상권 기준은 대기 발생 가능성이 있어 예약을 추천드립니다."
    },
    {
        question: "기기나 음향 퀄리티는 어떤가요?",
        answer: "최신 음향과 대형 스크린을 기준으로 관리하며, 룸별로 세팅이 다를 수 있습니다. (분당 상권 기준)"
    }
];

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>분당 가라오케 FAQ | 예약·픽업·이용 안내</title>
                <meta name="description" content="분당 가라오케 이용 FAQ. 단체/회식, 픽업 범위, 예약 흐름을 안내합니다." />
                <meta name="keywords" content="분당 가라오케 FAQ, 분당 가라오케 예약, 분당 가라오케 가격" />
                <link rel="canonical" href="https://bundanghipublic.com/bundang-karaoke-guide/faq" />
            </Helmet>
            <SchemaJsonLd data={faqSchema} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950 px-4 pb-20">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <div className="flex justify-center mb-4">
                            <div className="w-1.5 h-12 bg-purple-500 rounded-full"></div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-purple-500 mb-6">
                            가라오케 A to Z (FAQ)
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
                            노래, 술, 파티가 있는 곳. <strong className="text-white">분당 가라오케</strong>를 200% 즐기는 방법을 알려드립니다.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {faqList.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <div className="flex flex-col md:flex-row justify-center gap-4">
                            <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-purple-500/25">
                                <Phone size={20} /> 실시간 예약 문의
                            </button>
                            <Link to="/bundang-karaoke-guide" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all">
                                <ChevronRight size={20} /> 가라오케 메인으로
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default KaraokeFAQ;
