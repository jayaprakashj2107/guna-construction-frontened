import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://gunaconstruction.co.in';
const DEFAULT_TITLE = 'GUNA CONSTRUCTION | Premier Building & Civil Contractors | Cheyyur';
const DEFAULT_DESCRIPTION = 'GUNA CONSTRUCTION (Cheyyur, Tamil Nadu) offers premium residential, commercial, renovation, and civil engineering contractor services. Contact 994069800 for expert quotes.';
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`;

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonicalUrl,
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords = 'construction, building contractor, civil contractor, Cheyyur, Tamil Nadu, residential construction, commercial buildings, renovation, structural engineering, GUNA construction',
  noindex = false,
  structuredData = null
}) => {
  const location = useLocation();

  // Automatically compute absolute canonical SEO URL based on current router pathname
  const cleanPath = location.pathname.endsWith('/') && location.pathname !== '/'
    ? location.pathname.slice(0, -1)
    : location.pathname;

  const finalCanonicalUrl = canonicalUrl || `${SITE_URL}${cleanPath}`;
  const finalTitle = title 
    ? (title.includes('GUNA') ? title : `${title} | GUNA CONSTRUCTION`)
    : DEFAULT_TITLE;

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'} />

      {/* Dynamic Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />

      {/* Open Graph / Facebook / WhatsApp SEO Tags */}
      <meta property="og:site_name" content="GUNA CONSTRUCTION" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={finalCanonicalUrl} />

      {/* Structured Schema JSON-LD if provided */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
