import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Star, Music, GlassWater, Shirt, Flower2, Mic2, Crown } from 'lucide-react';

const services = [
    {
        id: 'highpublic',
        name: '하이퍼블릭',
        desc: '합리적인 가격의 프리미엄',
        path: '/suwon-shirt-highpub-guide',
        icon: Star,
        color: 'text-amber-400'
    },
    {
        id: 'karaoke',
        name: '가라오케',
        desc: '최신 음향 시설 완비',
        path: '/suwon-shirt-karaoke-guide',
        icon: Mic2,
        color: 'text-purple-400'
    },
    {
        id: 'shirtsroom',
        name: '셔츠룸',
        desc: '화이트 셔츠의 매력',
        path: '/suwon-shirt-shirtsroom-guide',
        icon: Shirt,
        color: 'text-white'
    },
    {
        id: 'kimonoroom',
        name: '기모노룸',
        desc: '이색적인 코스튬 테마',
        path: '/suwon-shirt-kimono-room-guide',
        icon: Flower2,
        color: 'text-pink-400'
    },
    {
        id: 'roomsalon',
        name: '룸살롱',
        desc: '비즈니스 접대의 정석',
        path: '/suwon-shirt-room-salon-guide',
        icon: Crown,
        color: 'text-amber-500'
    },
    {
        id: 'hostbar',
        name: '호빠',
        desc: '여성 전용 프리미엄',
        path: '/suwon-shirt-hostbar-guide',
        icon: GlassWater,
        color: 'text-blue-400'
    }
];

const RelatedServices = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Filter out redundant links (current page)
    const otherServices = services.filter(service => service.path !== currentPath);

    return (
        <section className="py-20 bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-white mb-2">다른 서비스 둘러보기</h3>
                    <p className="text-slate-400">수원 최고의 밤문화 코스를 확인해보세요.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {otherServices.map((service) => (
                        <Link
                            key={service.id}
                            to={service.path}
                            className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center ${service.color} group-hover:scale-110 transition-transform`}>
                                    <service.icon size={24} />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">수원 {service.name}</h4>
                                    <p className="text-xs text-slate-400">{service.desc}</p>
                                </div>
                            </div>
                            <ArrowRight size={18} className="text-slate-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedServices;
