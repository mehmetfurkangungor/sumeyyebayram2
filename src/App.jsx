import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  MessageCircle,
  ChevronDown
} from 'lucide-react';

import { invitationData } from './invitationData';
import Envelope from './components/Envelope';
import Countdown from './components/Countdown';
import LeafParticles from './components/LeafParticles';

export default function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  // Manage body scroll locking during the envelope stage
  useEffect(() => {
    if (!envelopeOpened) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [envelopeOpened]);

  // Framer Motion Animation Variants for Section Scroll-In
  const sectionVariants = {
    initial: { 
      opacity: 0, 
      y: 40,
      filter: 'blur(6px)'
    },
    whileInView: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.9, 
        ease: [0.21, 1.02, 0.43, 1.01] 
      }
    },
    viewport: { once: true, margin: '-80px' }
  };

  const romanticQuoteVariants = {
    initial: { opacity: 0, scale: 0.95 },
    whileInView: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: 'easeOut' }
    },
    viewport: { once: true, margin: '-50px' }
  };

  const whatsappUrl = `https://wa.me/${invitationData.rsvp.phoneNumber}?text=${encodeURIComponent(invitationData.rsvp.messageTemplate)}`;

  return (
    <>
      {/* Background Layer & Atmospheric Lighting Effects */}
      <div className="app-bg-container" />
      <div className="light-leak light-leak-1" />
      <div className="light-leak light-leak-2" />
      
      {/* Grain noise texture for high-end look */}
      <div className="grain-overlay" />

      {/* SVG filter definition for grain noise overlay (safari support) */}
      <svg style={{ display: 'none' }}>
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.05 0" />
        </filter>
      </svg>

      {/* Particle Leaves Effect (active post-envelope opening) */}
      <LeafParticles active={envelopeOpened} />

      {/* 1. Opening Envelope Scene overlay */}
      <AnimatePresence>
        {!envelopeOpened && (
          <Envelope onOpenComplete={() => setEnvelopeOpened(true)} />
        )}
      </AnimatePresence>

      {/* Main Single Page Web App (Visible when envelope is opened/fading) */}
      {envelopeOpened && (
        <div className="mobile-wrapper">
          
          {/* 2. Hero / Nişan Davetiyesi Kartı */}
          <motion.section 
            className="glass-card hero-card"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={sectionVariants.viewport}
            style={{ marginTop: '24px' }}
          >
            <div className="gold-frame" />
            <div className="gold-frame-corner corner-tl" />
            <div className="gold-frame-corner corner-tr" />
            <div className="gold-frame-corner corner-bl" />
            <div className="gold-frame-corner corner-br" />

            <div className="initials" style={{ 
              fontFamily: 'var(--font-names)', 
              fontSize: '2.5rem', 
              color: 'var(--color-gold)',
              marginBottom: '8px'
            }}>
              {invitationData.brideInitials} & {invitationData.groomInitials}
            </div>

            <div className="hero-divider" />

            <h1 className="hero-names">
              {invitationData.bride} & {invitationData.groom}
            </h1>

            <h3 className="hero-tagline">
              Nişanımıza Davetlisiniz
            </h3>

            <p className="body-text" style={{ fontStyle: 'italic', marginBottom: '24px' }}>
              "Bu özel günümüzde mutluluğumuza ortak olmanızdan onur duyarız."
            </p>

            <div className="hero-info-grid">
              <div className="info-item">
                <Calendar size={18} className="info-icon" />
                <span>{invitationData.eventDateText}</span>
              </div>
              <div className="info-item">
                <MapPin size={18} className="info-icon" />
                <span>{invitationData.location.address}</span>
              </div>
            </div>

            <motion.div 
              style={{ marginTop: '20px' }}
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            >
              <ChevronDown size={20} style={{ color: 'var(--color-gold)' }} />
            </motion.div>
          </motion.section>

          {/* 3. "İki kalp tek ritim" Romantik Metin Bölümü */}
          <motion.section 
            className="glass-card"
            variants={romanticQuoteVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={romanticQuoteVariants.viewport}
          >
            <Heart size={28} style={{ color: 'var(--color-gold)', marginBottom: '12px' }} />
            <h2 className="section-title" style={{ fontSize: '1.8rem', fontFamily: 'var(--font-headings)' }}>
              {invitationData.romanticQuote.title}
            </h2>
            <p className="body-text" style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', lineHeight: '1.8' }}>
              "{invitationData.romanticQuote.text}"
            </p>
          </motion.section>

          {/* 4. Geri Sayım Bölümü */}
          <motion.section 
            className="glass-card"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={sectionVariants.viewport}
          >
            <h2 className="section-title">Geri Sayım</h2>
            <p className="section-subtitle">Kavuşmaya kalan zaman</p>
            <Countdown targetDate={invitationData.countdownTargetDate} />
          </motion.section>

          {/* 5. Etkinlik Bilgileri & 6. Harita Butonu */}
          <motion.section 
            className="glass-card"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={sectionVariants.viewport}
          >
            <h2 className="section-title">Etkinlik Detayları</h2>
            <p className="section-subtitle">{invitationData.eventTitle}</p>

            <div className="details-list">
              <div className="detail-row">
                <div className="detail-icon-box">
                  <Calendar size={20} />
                </div>
                <div className="detail-info">
                  <span className="detail-label">Tarih</span>
                  <span className="detail-value">{invitationData.eventDateText}</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-icon-box">
                  <Clock size={20} />
                </div>
                <div className="detail-info">
                  <span className="detail-label">Saat</span>
                  <span className="detail-value">Açıklanacak</span>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-icon-box">
                  <MapPin size={20} />
                </div>
                <div className="detail-info">
                  <span className="detail-label">Konum / Adres</span>
                  <span className="detail-value">{invitationData.location.title}</span>
                  <span className="detail-sub">{invitationData.location.address}</span>
                </div>
              </div>
            </div>

            {/* Harita Butonu */}
            <motion.a 
              href={invitationData.location.googleMapsUrl}
              className="btn-secondary"
              style={{ width: '100%', marginTop: '12px' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MapPin size={18} />
              Haritada Konumu Göster
            </motion.a>
          </motion.section>

          {/* 7. Günün Programı */}
          <motion.section 
            className="glass-card"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={sectionVariants.viewport}
          >
            <h2 className="section-title">Günün Programı</h2>
            <p className="section-subtitle">Zaman Akışı</p>

            <div className="program-list">
              {invitationData.program.map((item, idx) => (
                <div key={idx} className="program-card">
                  <div className="program-time">{item.time}</div>
                  <div className="program-content">
                    <h4 className="program-title">{item.title}</h4>
                    <p className="program-desc">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 8. Hikaye / Romantik Bölüm */}
          <motion.section 
            className="glass-card"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={sectionVariants.viewport}
          >
            <h2 className="section-title">{invitationData.loveStory.title}</h2>
            <p className="section-subtitle">{invitationData.loveStory.subtitle}</p>

            <div className="timeline-story">
              {invitationData.loveStory.timeline.map((step, idx) => (
                <div key={idx} className="story-node">
                  <div className="story-year">{step.year}</div>
                  <h4 className="story-title">{step.title}</h4>
                  <p className="story-desc">{step.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 9. Katılım Bilgisi Ver (RSVP) WhatsApp Butonu */}
          <motion.section 
            className="glass-card"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={sectionVariants.viewport}
            style={{ 
              border: '1px solid rgba(30, 53, 37, 0.25)',
              background: 'rgba(238, 243, 239, 0.85)' 
            }}
          >
            <h2 className="section-title">Lütfen LCV Bildiriniz</h2>
            <p className="body-text" style={{ marginBottom: '20px', color: 'var(--color-text-muted)' }}>
              {invitationData.rsvp.deadlineText}
            </p>

            <motion.a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ width: '100%' }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageCircle size={20} />
              WhatsApp ile Katılım Durumu Bildir
            </motion.a>
          </motion.section>

          {/* 10. Kapanış */}
          <motion.section 
            className="glass-card closing-card"
            variants={sectionVariants}
            initial="initial"
            whileInView="whileInView"
            viewport={sectionVariants.viewport}
          >
            <div className="gold-frame" />
            <div className="gold-frame-corner corner-tl" />
            <div className="gold-frame-corner corner-tr" />
            <div className="gold-frame-corner corner-bl" />
            <div className="gold-frame-corner corner-br" />

            <Heart size={24} style={{ color: 'var(--color-gold)', marginBottom: '16px' }} />
            
            <p className="closing-quote">
              "{invitationData.closingMessage.text}"
            </p>
            
            <div className="closing-signature">
              {invitationData.closingMessage.signature}
            </div>
          </motion.section>

          {/* Footer credits */}
          <div className="footer-credits">
            {invitationData.brideInitials} & {invitationData.groomInitials} • {invitationData.eventTitle}
          </div>
        </div>
      )}
    </>
  );
}
