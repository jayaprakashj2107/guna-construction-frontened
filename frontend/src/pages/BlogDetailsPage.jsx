import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchBlogPosts } from '../services/api';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import { ROUTES } from '../routes/routes';
import SEO from '../components/SEO';

const BlogDetailsPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogPosts()
      .then(data => {
        const found = data.find(p => p.slug === slug || String(p.id) === slug);
        setPost(found || data[0]);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div style={{ padding: '5rem', textAlign: 'center', color: '#64748b' }}>Loading blog article...</div>;
  if (!post) return <div style={{ padding: '5rem', textAlign: 'center', color: '#64748b' }}>Article not found.</div>;

  return (
    <div>
      <SEO
        title={`${post.title} | Construction Blog`}
        description={post.excerpt || post.content?.slice(0, 160)}
        type="article"
      />
      <section style={{
        backgroundColor: '#0f172a',
        color: '#ffffff',
        padding: '3.5rem 0',
        borderBottom: '4px solid #f97316'
      }}>
        <div className="container">
          <Link to={ROUTES.BLOG} style={{ color: '#f97316', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span style={{ fontSize: '0.8rem', color: '#f97316', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' }}>
            {post.category}
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.75rem', maxWidth: '850px' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '1.5rem', color: '#cbd5e1', fontSize: '0.9rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><User size={14} color="#f97316" /> {post.author}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} color="#f97316" /> {post.published_at ? new Date(post.published_at).toLocaleDateString() : 'Recent'}</span>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <img src={post.featured_image} alt={post.title} style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }} />
          </div>

          <div style={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#334155',
            whiteSpace: 'pre-line'
          }}>
            {post.content}
          </div>

          {post.tags && (
            <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Tag size={16} color="#f97316" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}>Tags:</span>
              {post.tags.split(',').map((tag, idx) => (
                <span key={idx} style={{ backgroundColor: '#f1f5f9', color: '#0f172a', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600 }}>
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogDetailsPage;
