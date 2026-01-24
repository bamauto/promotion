import React from 'react';
import { Helmet } from 'react-helmet-async';

const SchemaJsonLd = ({ data }) => {
    // Handle both single schema and array of schemas
    const schemas = Array.isArray(data) ? data : [data];

    return (
        <Helmet>
            {schemas.map((schema, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
};

export const generateLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    "name": "오산 하이퍼블릭·가라오케 서우실장",
    "image": "https://osankaraoke.com/og-image.jpg",
    "telephone": "010-2626-4833",
    "url": "https://osankaraoke.com/",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "오산역 상권 인근",
        "addressLocality": "Osan-si",
        "addressRegion": "Gyeonggi-do",
        "addressCountry": "KR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.1496,
        "longitude": 127.0696
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "18:00",
            "closes": "23:59"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "06:00"
        }
    ],
    "priceRange": "$$",
    "areaServed": [
        { "@type": "City", "name": "Osan-si" },
        { "@type": "Place", "name": "Osan Station" },
        { "@type": "Place", "name": "Osan University Station" },
        { "@type": "Place", "name": "Segyo New City" },
        { "@type": "Place", "name": "Dongtan" },
        { "@type": "Place", "name": "Pyeongtaek" }
    ],
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "247",
        "bestRating": "5",
        "worstRating": "1"
    }
});

export const generateServiceSchema = (serviceName, description, url, offerPrice) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceName,
    "provider": {
        "@type": "LocalBusiness",
        "name": "오산 하이퍼블릭·가라오케 서우실장",
        "image": "https://osankaraoke.com/og-image.jpg",
        "telephone": "010-2626-4833"
    },
    "areaServed": {
        "@type": "City",
        "name": "Osan"
    },
    "description": description,
    "url": url,
    "offers": {
        "@type": "Offer",
        "priceCurrency": "KRW",
        "price": offerPrice || "180000",
        "availability": "https://schema.org/InStock"
    }
});

export const generateFAQSchema = (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
});

export const generateBreadcrumbSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
    }))
});

export const generateHowToSchema = () => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "오산 가라오케 예약 방법",
    "description": "오산 가라오케 예약하는 방법을 단계별로 안내합니다.",
    "step": [
        {
            "@type": "HowToStep",
            "name": "전화 또는 카카오톡 문의",
            "text": "010-2626-4833으로 전화하거나 카카오톡 @pbsewoo로 문의합니다."
        },
        {
            "@type": "HowToStep",
            "name": "희망 날짜/시간/인원 전달",
            "text": "방문 희망 날짜, 시간, 인원수를 알려주세요."
        },
        {
            "@type": "HowToStep",
            "name": "예약 확정",
            "text": "서우실장이 최적의 업소와 룸을 매칭해 예약을 확정합니다."
        }
    ]
});

export const generateProductSchema = (serviceName, price) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": serviceName,
    "description": `오산 ${serviceName} 예약 서비스`,
    "offers": {
        "@type": "Offer",
        "priceCurrency": "KRW",
        "price": price,
        "availability": "https://schema.org/InStock"
    }
});

export const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "서우실장 오산 하이퍼블릭·가라오케",
    "alternateName": "오산 서우실장",
    "url": "https://osankaraoke.com",
    "logo": "https://osankaraoke.com/logo.png",
    "image": "https://osankaraoke.com/og-home.jpg",
    "description": "오산 하이퍼블릭·가라오케·룸살롱 프리미엄 가이드. 오산역·세교신도시 중심 상권 맞춤 안내, 24시간 예약.",
    "telephone": "+82-10-2626-4833",
    "sameAs": [
        "https://t.me/pbsewoo",
        "http://qr.kakao.com/talk/jMlvTnRecn1PgP4S9gqME2itU7g-"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+82-10-2626-4833",
        "contactType": "customer service",
        "availableLanguage": ["Korean"],
        "areaServed": "KR",
        "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "18:00",
            "closes": "06:00"
        }
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "오산역 상권 인근",
        "addressLocality": "오산시",
        "addressRegion": "경기도",
        "addressCountry": "KR"
    }
});

export const generateArticleSchema = (title, description, url, datePublished) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "datePublished": datePublished,
    "dateModified": datePublished,
    "author": {
        "@type": "Person",
        "name": "서우실장"
    },
    "publisher": {
        "@type": "Organization",
        "name": "오산 서우실장",
        "logo": {
            "@type": "ImageObject",
            "url": "https://osankaraoke.com/logo.png"
        }
    }
});

export const generateItemListSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "offers": {
            "@type": "Offer",
            "priceCurrency": "KRW",
            "price": item.price
        }
    }))
});

export default SchemaJsonLd;
