import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchServices } from '../services/api';
import { servicesData } from '../data/servicesData';
import EnquiryForm from '../components/EnquiryForm';
import {
  ArrowLeft, CheckCircle2, ShieldCheck, Phone, Mail,
  ArrowRight, Sparkles, Building2, MapPin
} from 'lucide-react';
import { ROUTES } from '../routes/routes';
import SEO from '../components/SEO';

const ServiceDetailsPage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allServices, setAllServices] = useState(servicesData);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetchServices()
      .then(data => {
        const list = data && data.length > 0 ? data : servicesData;
        setAllServices(list);
        const found = list.find(s => s.slug === slug || String(s.id) === slug);
        setService(found || list.find(s => s.slug === 'road-formation-culverts') || list[0]);
      })
      .catch(err => {
        setAllServices(servicesData);
        const found = servicesData.find(s => s.slug === slug || String(s.id) === slug);
        setService(found || servicesData[0]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: '8rem 1rem', textAlign: 'center', color: '#64748b' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>Loading service details...</div>
      </div>
    );
  }

  if (!service) {
    return (
      <div style={{ padding: '8rem 1rem', textAlign: 'center', color: '#64748b' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>Service Not Found</div>
        <Link to={ROUTES.SERVICES} className="btn-primary" style={{ display: 'inline-flex' }}>
          Back to All Services
        </Link>
      </div>
    );
  }

  // Related other services
  const relatedServices = allServices
    .filter(s => (s.slug !== service.slug && (s.id !== service.id)))
    .slice(0, 4);

  return (
    <div>
      <SEO 
        title={`${service.title} in Cheyyur, Tamil Nadu`}
        description={service.short_description || service.full_description}
        image={service.image_url}
      />
      {/* Header Banner */}
      <section style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '3.5rem 0',
        borderBottom: '4px solid #f97316'
      }}>
        <div className="container">
          <Link
            to={ROUTES.SERVICES}
            style={{
              color: '#f97316',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              fontWeight: 700,
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={16} /> Back to All 25 Services
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{
              backgroundColor: '#f97316',
              color: '#ffffff',
              padding: '0.2rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              {service.category || 'Specialized Service'}
            </span>
          </div>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
            {service.title}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginTop: '0.5rem', maxWidth: '750px', lineHeight: 1.6 }}>
            {service.short_description}
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap: '3.5rem',
            alignItems: 'start'
          }} className="service-details-grid">

            {/* Left Content Area */}
            <div>
              {/* Feature Image */}
              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                marginBottom: '2.5rem',
                boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
                backgroundColor: '#0f172a',
                height: '380px'
              }}>
                <img
                  src={service.image_url}
                  alt={service.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Service Description */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '2.5rem',
                boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06)',
                border: '1px solid #e2e8f0',
                marginBottom: '2.5rem'
              }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>
                  Service Overview & Engineering Scope
                </h2>
                <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                  {service.full_description || service.short_description}
                </p>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', fontFamily: 'Outfit, sans-serif' }}>
                  Key Service Highlights & Inclusions
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {service.features && service.features.map((feat, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      backgroundColor: '#f8fafc',
                      padding: '1rem 1.25rem',
                      borderRadius: '12px',
                      border: '1px solid #e2e8f0',
                      fontSize: '0.98rem',
                      color: '#1e293b',
                      fontWeight: 600
                    }}>
                      <CheckCircle2 color="#16a34a" size={22} style={{ flexShrink: 0 }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Standards Card */}
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '2rem',
                border: '1.5px solid #ffedd5',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem'
              }}>
                <div style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  backgroundColor: '#fff7ed',
                  color: '#ea580c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                    100% Quality Guaranteed Execution
                  </h4>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    All work is executed under the direct supervision of qualified site engineers and surveyors adhering to Indian Standard Codes (IS Codes).
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side: Instant Quote & Contact Card */}
            <div>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.08)',
                border: '1px solid #e2e8f0',
                marginBottom: '2rem'
              }}>
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#f97316', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Quick Estimation
                  </span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
                    Enquire for {service.title}
                  </h3>
                </div>
                <EnquiryForm defaultProjectType={service.title} />
              </div>

              {/* Direct Call & Visit Office */}
              <div style={{
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '2rem',
                borderRadius: '20px',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#f97316',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}>
                  <Sparkles size={14} /> Direct Engineering Support
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
                  Speak Directly with Bhaarath Kumar G
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Get expert consultation on site measurements, materials, building approvals, and estimated cost.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <a
                    href="tel:7430004000"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      backgroundColor: '#ea580c',
                      color: '#ffffff',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '10px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      justifyContent: 'center'
                    }}
                  >
                    <Phone size={18} /> Call: 7430004000/9940696800
                  </a>
                  <a
                    href="mailto:Gunaconstruction005@gmail.com"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      color: '#cbd5e1',
                      padding: '0.75rem 1.25rem',
                      borderRadius: '10px',
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <Mail size={16} color="#f97316" /> Gunaconstruction005@gmail.com
                  </a>
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    color: '#94a3b8',
                    fontSize: '0.82rem',
                    padding: '0.5rem 0'
                  }}>
                    <MapPin size={16} color="#f97316" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>863/6B, Bazar St, Cheyyur, Pin: 603302, Tamil Nadu</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Related Services */}
          <div style={{ marginTop: '5rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.5rem', fontFamily: 'Outfit, sans-serif' }}>
              Explore Other Construction Services
            </h3>
            <div className="grid-4" style={{ gap: '1.25rem' }}>
              {relatedServices.map(rel => (
                <Link
                  key={rel.id || rel.slug}
                  to={`/services/${rel.slug}`}
                  style={{
                    backgroundColor: '#ffffff',
                    padding: '1.25rem',
                    borderRadius: '14px',
                    border: '1px solid #e2e8f0',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#f97316';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                      {rel.category}
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                      {rel.title}
                    </div>
                  </div>
                  <div style={{ color: '#f97316', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '0.75rem' }}>
                    View Service <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>

        <style>{`
          @media (max-width: 900px) {
            .service-details-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default ServiceDetailsPage;
