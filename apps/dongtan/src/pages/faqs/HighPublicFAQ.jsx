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

const HighPublicFAQ = () => {
    const faqList = [
        {
            question: "하이퍼블릭과 일반 퍼블릭의 차이점은 무엇인가요?",
            answer: "가장 큰 차이는 '수질(매니저 퀄리티)'과 '시설'입니다. 하이퍼블릭은 텐카페급의 외모를 가진 매니저들이 근무하며, 인테리어 또한 5성급 호텔 수준으로 업그레이드된 곳입니다. 가격은 퍼블릭과 비슷하지만 만족도는 훨씬 높습니다."
        },
        {
            question: "혼자 방문해도(독고) 괜찮나요? 가격 차이가 있나요?",
            answer: "네, 동탄 하이퍼블릭 방문객의 약 40%가 1인 손님입니다. 가격 차이는 없으며, 오히려 1:1로 집중적인 케어를 받으실 수 있어 만족도가 높습니다. 어색하지 않게 담당 실장이 케어해 드립니다."
        },
        {
            question: "초이스는 어떤 방식으로 진행되나요?",
            answer: "최신 트렌드인 '매직미러' 초이스와 전통적인 '조별' 초이스가 모두 가능합니다. 매직미러 룸에서는 안에서 밖을 보며 편안하게 선택하실 수 있고, 마음에 드는 매니저가 없을 시 무한 초이스를 제공합니다."
        },
        {
            question: "1인당 평균 예산(주대)은 얼마 정도인가요?",
            answer: "기본 양주 세트(약 13~16만원)에 아가씨 봉사료(T/C, 약 13만원)와 웨이터 팁(3~5만원)을 합산하여 계산합니다. 인원수와 추가 병 수에 따라 달라지므로, 방문 전 전화 문의 주시면 정확한 견적을 뽑아드립니다."
        },
        {
            question: "예약 없이 워킹으로 방문해도 되나요?",
            answer: "가능은 하지만 추천드리지 않습니다. 피크 타임에는 룸 대기가 발생할 수 있고, 담당 실장의 특별 서비스(주류 업그레이드 등)를 받기 어렵습니다. 출발 전 전화 한 통으로 룸을 잡아주시는 것이 좋습니다."
        },
        {
            question: "법인 카드 결제나 세금계산서 발행이 가능한가요?",
            answer: "네, 모든 업소가 합법적인 1종 유흥업소 허가를 받았으므로 카드 결제 및 계산서 발행이 100% 가능합니다. 접대 증빙 처리에 문제가 없도록 완벽하게 지원합니다."
        },
        {
            question: "아가씨들의 연령대는 어떻게 되나요?",
            answer: "주로 20대 초중반의 대학생, 모델 지망생들이 많습니다. 동탄역점은 영(Young)한 스타일, 동탄2점은 고급스럽고 세련된 스타일 등 업소별 특색이 있으니 취향을 말씀해 주시면 맞춤 추천해 드립니다."
        },
        {
            question: "2차(애프터)가 가능한가요?",
            answer: "하이퍼블릭은 원칙적으로 2차가 없는 '테이블 비즈니스 클럽'입니다. 다만, 매니저와의 합의나 업소 상황에 따라 롱 타임 연장 등 유동적인 부분이 있을 수 있으니 담당 실장에게 별도 문의 부탁드립니다."
        },
        {
            question: "픽업 서비스 이용 방법은 어떻게 되나요?",
            answer: "동탄 전 지역(동탄역, 동탄2, 반송동, 영천동, 능동, 청계동) 어디든 24시간 무료 픽업 차량을 보내드립니다. 예약 시 계신 곳 위치만 알려주세요."
        },
        {
            question: "복장 제한이 있나요?",
            answer: "특별한 드레스 코드는 없습니다. 편안한 캐주얼 복장도 환영하며, 반바지나 슬리퍼 차림도 입장에 제한은 없으나 비즈니스 룸 특성상 깔끔한 복장을 권장드립니다."
        }
    ];

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>동탄 하이퍼블릭 FAQ | 비용, 초이스, 혼술 등 자주 묻는 질문 10선</title>
                <meta name="description" content="동탄 하이퍼블릭 이용 전 필독! 가격, 초이스 방식, 혼자 방문(독고), 2차 여부 등 고객님들이 가장 궁금해하시는 10가지 질문에 대해 서우실장이 솔직하게 답변해 드립니다." />
                <meta name="keywords" content="동탄 하이퍼블릭 FAQ, 동탄 하이퍼블릭 가격, 하이퍼블릭 혼자, 하이퍼블릭 초이스, 하이퍼블릭 2차" />
                <link rel="canonical" href="https://dongtankaraoke.net/dongtan-highpub-guide/faq" />
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
                            <Link to="/dongtan-highpub-guide" className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-2 transition-all">
                                <ChevronRight size={20} /> 하이퍼블릭 메인으로
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HighPublicFAQ;
