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
    "name": "영통 하이퍼블릭·가라오케 서우실장",
    "image": "https://yeongtongkaraoke.com/og-image.jpg",
    "telephone": "010-2626-4833",
    "url": "https://yeongtongkaraoke.com/",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "영통역 일대",
        "addressLocality": "Suwon-si",
        "addressRegion": "Gyeonggi-do",
        "addressCountry": "KR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.2500,
        "longitude": 127.0561
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
        { "@type": "City", "name": "영통" },
        { "@type": "Place", "name": "영통역" },
        { "@type": "Place", "name": "망포역" },
        { "@type": "Place", "name": "삼성디지털시티" },
        { "@type": "Place", "name": "매탄동" },
        { "@type": "City", "name": "수원" }
    ],
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
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
        "name": "영통 하이퍼블릭·가라오케 서우실장",
        "image": "https://yeongtongkaraoke.com/og-image.jpg",
        "telephone": "010-2626-4833"
    },
    "areaServed": {
        "@type": "City",
        "name": "Yeongtong"
    },
    "description": description,
    "url": url,
    "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "KRW",
        "lowPrice": offerPrice || "180000",
        "highPrice": "500000",
        "offerCount": "6",
        "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "reviewCount": "89",
        "bestRating": "5"
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
    "name": "서우실장 영통 하이퍼블릭·가라오케",
    "alternateName": "영통 서우실장",
    "url": "https://yeongtongkaraoke.com",
    "logo": "https://yeongtongkaraoke.com/logo.png",
    "image": "https://yeongtongkaraoke.com/og-home.jpg",
    "description": "영통 하이퍼블릭·가라오케·룸살롱 프리미엄 가이드. 영통역·망포역·삼성디지털시티 중심 상권 맞춤 안내, 24시간 예약.",
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
        "streetAddress": "영통역 일대",
        "addressLocality": "수원시",
        "addressRegion": "경기도",
        "addressCountry": "KR"
    }
});

export default SchemaJsonLd;
