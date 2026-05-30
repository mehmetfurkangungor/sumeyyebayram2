import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { invitationData } from '../invitationData';

export default function Envelope({ onOpenComplete }) {
  const [status, setStatus] = useState('closed'); // 'closed' | 'opening' | 'opened'

  const handleOpen = () => {
    if (status !== 'closed') return;
    setStatus('opening');
    
    // Sequence timelines:
    // 0.0s: Wax seal fades out, flap opens.
    // 0.8s: Top flap is fully opened, card starts sliding out.
    // 1.8s: Card is fully slid out, trigger fade out of the entire overlay.
    setTimeout(() => {
      setStatus('opened');
      setTimeout(() => {
        onOpenComplete();
      }, 1000); // Allow overlay to fade out smoothly
    }, 2000);
  };

  // Framer Motion Variants
  const overlayVariants = {
    visible: { opacity: 1 },
    hidden: { 
      opacity: 0,
      transition: { duration: 0.8, ease: 'easeInOut' }
    }
  };

  const topFlapVariants = {
    closed: { 
      rotateX: 0,
      zIndex: 5,
      transition: { duration: 0.6, ease: 'easeInOut' }
    },
    opening: { 
      rotateX: 180,
      zIndex: 1,
      transition: { duration: 0.8, ease: 'easeInOut' }
    },
    opened: {
      rotateX: 180,
      zIndex: 1
    }
  };

  const sealVariants = {
    closed: { scale: 1, opacity: 1 },
    opening: { 
      scale: 0.6, 
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    opened: { scale: 0.6, opacity: 0 }
  };

  const noteVariants = {
    closed: { 
      y: 0, 
      scale: 0.95,
      zIndex: 2
    },
    opening: { 
      y: -140, 
      scale: 1.05,
      zIndex: 10,
      transition: { 
        delay: 0.7, 
        duration: 1.1, 
        ease: [0.25, 1, 0.5, 1] 
      }
    },
    opened: { 
      y: -140, 
      scale: 1.05,
      zIndex: 10 
    }
  };

  return (
    <motion.div
      className="envelope-overlay"
      variants={overlayVariants}
      initial="visible"
      animate={status === 'opened' ? 'hidden' : 'visible'}
    >
      <div className="envelope-container" onClick={handleOpen}>
        <motion.div 
          className="envelope-wrapper-inner"
          animate={status === 'opening' ? { y: [0, -8, 0], transition: { duration: 0.5 } } : {}}
        >
          {/* Back of Envelope */}
          <div className="envelope-back" />

          {/* Invitation Card Inside */}
          <motion.div
            className="envelope-note"
            variants={noteVariants}
            initial="closed"
            animate={status}
          >
            <div className="initials">
              {invitationData.brideInitials} & {invitationData.groomInitials}
            </div>
            <div className="title">
              {invitationData.bride} & {invitationData.groom}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Nişan Davetiyesi
            </div>
            <div style={{ marginTop: '12px', color: 'var(--color-gold-dark)', fontSize: '1.2rem', fontFamily: 'var(--font-headings)' }}>
              Açılıyor...
            </div>
          </motion.div>

          {/* Top Flap (closes over the note) */}
          <motion.div
            className="envelope-flap-top"
            style={{ transformOrigin: 'top' }}
            variants={topFlapVariants}
            initial="closed"
            animate={status}
          />

          {/* Left Flap */}
          <div className="envelope-flap-left" />

          {/* Right Flap */}
          <div className="envelope-flap-right" />

          {/* Bottom Flap */}
          <div className="envelope-flap-bottom" />

          {/* Wax Seal */}
          <motion.div
            className="wax-seal"
            variants={sealVariants}
            initial="closed"
            animate={status}
          >
            <span className="wax-seal-text">
              {invitationData.brideInitials}{invitationData.groomInitials}
            </span>
          </motion.div>
        </motion.div>

        {status === 'closed' && (
          <div className="tap-indicator">
            Davetiyeyi Açmak İçin Dokununuz
          </div>
        )}
      </div>
    </motion.div>
  );
}
