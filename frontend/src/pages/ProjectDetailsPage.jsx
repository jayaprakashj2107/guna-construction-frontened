import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjects } from '../services/api';
import EnquiryForm from '../components/EnquiryForm';
import { ArrowLeft, MapPin, Calendar, CheckCircle2, Play, Image as ImageIcon, Send } from 'lucide-react';
import { ROUTES } from '../routes/routes';
import SEO from '../components/SEO';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEnquiry, setShowEnquiry] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProjects()
      .then(data => {
        const found = data.find(p => p.slug === id || String(p.id) === id);
        setProject(found || data[0]);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div style={{ padding: '5rem', textAlign: 'center', color: '#64748b' }}>Loading project details...</div>;
  if (!project) return <div style={{ padding: '5rem', textAlign: 'center', color: '#64748b' }}>Project not found.</div>;

  return (
    <div>
      <SEO 
        title={`${project.title} | Projects`}
        description={project.short_description || project.full_description}
        image={project.main_image}
      />
      <section style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '3.5rem 0',
        borderBottom: '4px solid #f97316'
      }}>
        <div className="container">
          <Link to={ROUTES.PROJECTS} style={{ color: '#f97316', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Projects Showcase
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>{project.title}</h1>
            <span className={`badge badge-${project.status?.toLowerCase()}`} style={{ fontSize: '0.85rem' }}>
              {project.status}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', color: '#cbd5e1', fontSize: '0.95rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <MapPin size={16} color="#f97316" /> {project.location}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              Category: <strong style={{ color: '#ffffff' }}>{project.category}</strong>
            </span>
            {project.completion_date && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={16} color="#f97316" /> Date: {project.completion_date}
              </span>
            )}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          {/* Main Image */}
          <div style={{ borderRadius: '20px', overflow: 'hidden', marginBottom: '3rem', boxShadow: '0 15px 35px rgba(0,0,0,0.12)' }}>
            <img src={project.main_image} alt={project.title} style={{ width: '100%', maxHeight: '520px', objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3.5rem' }} className="project-grid">
            {/* Left Column Description */}
            <div>
              <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '1rem' }}>
                Project Overview & Execution Details
              </h2>
              <p style={{ color: '#475569', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                {project.full_description || project.short_description}
              </p>

              {project.highlights && project.highlights.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1rem' }}>
                    Project Highlights & Technical Specifications
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-grid">
                    {project.highlights.map((item, idx) => (
                      <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        backgroundColor: '#f8fafc',
                        padding: '0.85rem',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0',
                        fontSize: '0.92rem',
                        fontWeight: 600,
                        color: '#334155'
                      }}>
                        <CheckCircle2 color="#10b981" size={18} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery Images if available */}
              {project.images && project.images.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1rem' }}>
                    Project 
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {project.images.map((imgObj, idx) => (
                      <div key={idx} style={{ borderRadius: '10px', overflow: 'hidden', height: '160px' }}>
                        <img src={imgObj.image_url} alt={imgObj.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Embed if available */}
              {project.videos && project.videos.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '1rem' }}>
                    Site Video Walkthrough
                  </h3>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', height: '360px' }}>
                    <iframe
                      src={project.videos[0].video_url}
                      title="Project Video"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Right Column CTA */}
            <div>
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid #e2e8f0',
                position: 'sticky',
                top: '100px'
              }}>
                <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '0.75rem' }}>
                  Interested in a Similar Project?
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Plan your residential, commercial, or structural construction with GUNA CONSTRUCTION in Cheyyur.
                </p>

                <button
                  onClick={() => setShowEnquiry(!showEnquiry)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '1.25rem' }}
                >
                  <Send size={18} /> Enquire About a Similar Project
                </button>

                {showEnquiry && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <EnquiryForm defaultProjectType={project.category} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .project-grid, .form-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </section>
    </div>
  );
};

export default ProjectDetailsPage;
