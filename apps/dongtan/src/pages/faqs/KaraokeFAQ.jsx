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
            question: "일반 노래방이나 퍼블릭과 가라오케의 차이는 무엇인가요?",
            answer: "일반 노래방은 '노래'가 목적이지만, 가라오케는 '파티와 음주'가 메인입니다. 전문 DJ 수준의 음향 시설, 웨이터의 서빙 서비스, 그리고 고급 양주 세트가 제공되며, 비즈니스 접대나 생일 파티에 최적화된 대형 룸을 갖추고 있습니다."
        },
        {
            question: "술을 못 마셔도 이용 가능한가요?",
            answer: "물론입니다. 꼭 양주를 드시지 않아도 맥주나 고급 음료 세트로 세팅이 가능합니다. 술보다는 분위기를 즐기러 오시는 분들도 많으며, 논알콜 음료도 다양하게 준비되어 있습니다."
        },
        {
            question: "아가씨(도우미) 시스템은 어떻게 되나요?",
            answer: "동탄 가라오케는 1종 유흥업소가 아닌 곳도 있어 업소마다 다릅니다. 하지만 서우실장이 안내하는 제휴 업소들은 정식 허가를 받아 합법적으로 매니저(TC) 호출이 가능합니다. 퍼블릭급 수질의 매니저들을 초이스하실 수 있습니다."
        },
        {
            question: "생일 파티나 모임 시 혜택이 있나요?",
            answer: "네, 생일자 방문 시 고급 샴페인 1병을 서비스로 제공해 드립니다. 또한 파티룸 데코레이션이나 케이크 픽업 서비스 등 특별한 날을 위한 맞춤형 케어를 지원해 드립니다."
        },
        {
            question: "이용 시간 제한이 있나요?",
            answer: "기본 주대 주문 시 시간 제한은 없습니다(무제한). 다만, 웨이팅이 발생하는 금/토 피크 타임에는 3시간 정도로 제한될 수 있으니 미리 예약 주시면 여유롭게 즐기실 수 있도록 조치해 드립니다."
        },
        {
            question: "여성 손님끼리 가도 되나요?",
            answer: "네, 환영합니다! 최근 '호빠'가 부담스러운 여성 고객님들끼리 안전하고 럭셔리하게 파티를 즐기기 위해 가라오케를 많이 찾으십니다. 여성 전용 우대 가격(할인)도 적용해 드립니다."
        },
        {
            question: "안주는 어떤 것들이 나오나요?",
            answer: "기본 과일 안주 외에도 호텔 셰프 출신 주방장이 만드는 각종 고급 요리(치즈 플레이트, 찹스테이크, 해물 떡볶이 등) 주문이 가능합니다. 식사를 안 하고 오셔도 충분합니다."
        },
        {
            question: "가격은 대략 어느 정도인가요?",
            answer: "양주 1병 세트(12년산 기준) 10만원 중반대부터 시작합니다. 인원수가 많아도 술 추가가 없다면 룸비(TC)만 추가되므로 단체 회식 시 가성비가 매우 훌륭합니다."
        },
        {
            question: "혼자 가서 노래만 불러도 되나요?",
            answer: "네, 혼술 하러 오시는 분들도 많습니다. 대형 룸 혼자 쓰시면서 콘서트장처럼 노래 부르시고 스트레스 푸실 수 있습니다. 매니저 없이 혼자만의 시간을 즐기셔도 됩니다."
        },
        {
            question: "주차는 가능한가요?",
            answer: "모든 제휴 업소는 발렛 파킹을 지원합니다. 입구에서 편하게 내리시면 되며, 대리운전도 카운터에서 바로 호출해 드립니다."
        }
    ];

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>동탄 가라오케 이용 팁 & FAQ | 가격, 파티, 여성 이용 안내</title>
                <meta name="description" content="동탄 가라오케 이용에 대한 모든 궁금증 해결! 가격, 안주, 생일 파티 혜택, 여성 고객 우대, 혼술 가능 여부까지 상세하게 안내해 드립니다." />
                <meta name="keywords" content="동탄 가라오케 가격, 동탄 가라오케 파티, 동탄 가라오케 혼술, 동탄 가라오케 여성전용" />
                <link rel="canonical" href="https://dongtankaraoke.net/dongtan-karaoke-guide/faq" />
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
                            노래, 술, 파티가 있는 곳. <strong className="text-white">동탄 가라오케</strong>를 200% 즐기는 방법을 알려드립니다.
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
                            <Link to="/dongtan-karaoke-guide" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all">
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
