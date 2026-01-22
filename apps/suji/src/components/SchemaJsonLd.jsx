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
    "name": "수지 하이퍼블릭·가라오케 서우실장",
    "image": "https://sujikaraoke.com/og-image.jpg",
    "telephone": "010-2626-4833",
    "url": "https://sujikaraoke.com/",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "수지역 일대",
        "addressLocality": "Yongin-si",
        "addressRegion": "Gyeonggi-do",
        "addressCountry": "KR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.3219,
        "longitude": 127.0961
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
        { "@type": "City", "name": "Suji" },
        { "@type": "Place", "name": "Suji Station" },
        { "@type": "Place", "name": "Jukjeon" },
        { "@type": "Place", "name": "Gwanggyo" },
        { "@type": "Place", "name": "Sanghyeon" },
        { "@type": "Place", "name": "Giheung" },
        { "@type": "Place", "name": "Jeongja" },
        { "@type": "Place", "name": "Seongbok" },
        { "@type": "Place", "name": "Bundang" }
    ]
});

export const generateServiceSchema = (serviceName, description, url, offerPrice) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceName,
    "provider": {
        "@type": "LocalBusiness",
        "name": "수지 하이퍼블릭·가라오케 서우실장",
        "image": "https://sujikaraoke.com/og-image.jpg",
        "telephone": "010-2626-4833"
    },
    "areaServed": {
        "@type": "City",
        "name": "Suji"
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
    "name": "서우실장 수지 하이퍼블릭·가라오케",
    "alternateName": "수지 서우실장",
    "url": "https://sujikaraoke.com",
    "logo": "https://sujikaraoke.com/logo.png",
    "image": "https://sujikaraoke.com/og-home.jpg",
    "description": "수지 하이퍼블릭·가라오케·룸살롱 프리미엄 가이드. 수지역·죽전 중심 상권 맞춤 안내, 24시간 예약.",
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
        "streetAddress": "수지역 일대",
        "addressLocality": "용인시",
        "addressRegion": "경기도",
        "addressCountry": "KR"
    }
});

export default SchemaJsonLd;
