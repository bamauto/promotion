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
    "name": "기흥 하이퍼블릭·가라오케 서우실장",
    "image": "https://giheungkaraoke.com/og-image.jpg",
    "telephone": "010-2626-4833",
    "url": "https://giheungkaraoke.com/",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "기흥역 상권 인근",
        "addressLocality": "Yongin-si",
        "addressRegion": "Gyeonggi-do",
        "addressCountry": "KR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.2750,
        "longitude": 127.1160
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
        { "@type": "City", "name": "Giheung-gu" },
        { "@type": "Place", "name": "Giheung Station" },
        { "@type": "Place", "name": "Giheung Samsung Campus" },
        { "@type": "Place", "name": "Guseong Station" },
        { "@type": "Place", "name": "Singal Station" },
        { "@type": "Place", "name": "Suji" }
    ]
});

export const generateServiceSchema = (serviceName, description, url, offerPrice) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceName,
    "provider": {
        "@type": "LocalBusiness",
        "name": "기흥 하이퍼블릭·가라오케 서우실장",
        "image": "https://giheungkaraoke.com/og-image.jpg",
        "telephone": "010-2626-4833"
    },
    "areaServed": {
        "@type": "City",
        "name": "Giheung"
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

export const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "서우실장 기흥 하이퍼블릭·가라오케",
    "alternateName": "기흥 서우실장",
    "url": "https://giheungkaraoke.com",
    "logo": "https://giheungkaraoke.com/logo.png",
    "image": "https://giheungkaraoke.com/og-home.jpg",
    "description": "기흥 하이퍼블릭·가라오케·룸살롱 프리미엄 가이드. 기흥역·삼성전자 기흥캠퍼스 중심 상권 맞춤 안내, 24시간 예약.",
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
        "streetAddress": "기흥역 상권 인근",
        "addressLocality": "용인시",
        "addressRegion": "경기도",
        "addressCountry": "KR"
    }
});

export default SchemaJsonLd;
