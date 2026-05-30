import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { invitationData } from '../invitationData';

export default function Envelope({ onOpenComplete }) {
  const [animState, setAnimState] = useState('full'); // 'full' | 'shrunk' | 'openFlap' | 'slideNote' | 'exit'

  const handleTriggerOpen = () => {
    if (animState !== 'full') return;
    
    // Start sequence
    setAnimState('shrunk');

    // 1. Shrink completes in 0.8s -> Open flap
    setTimeout(() => {
      setAnimState('openFlap');

      // 2. Flap opens in 0.8s -> Slide note out
      setTimeout(() => {
        setAnimState('slideNote');

        // 3. Note slides up in 1.1s -> Trigger envelope exit & site slide-up
        setTimeout(() => {
          setAnimState('exit');
          onOpenComplete(); // Notify parent to start sliding up the website
        }, 1200);
      }, 900);
    }, 900);
  };

  // 1. Vertical Envelope Container Dimensions (Animating from full screen to vertical card size)
  const containerVariants = {
    full: {
      width: '100vw',
      height: '100vh',
      borderRadius: '0px',
      maxWidth: '100%',
      boxShadow: 'none',
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
    shrunk: {
      width: window.innerWidth > 480 ? '330px' : '85%',
      height: '450px',
      borderRadius: '8px',
      maxWidth: '340px',
      boxShadow: '0 20px 50px rgba(61, 53, 48, 0.22)',
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
    openFlap: {
      width: window.innerWidth > 480 ? '330px' : '85%',
      height: '450px',
      borderRadius: '8px',
      maxWidth: '340px',
      boxShadow: '0 20px 50px rgba(61, 53, 48, 0.22)'
    },
    slideNote: {
      width: window.innerWidth > 480 ? '330px' : '85%',
      height: '450px',
      borderRadius: '8px',
      maxWidth: '340px',
      boxShadow: '0 20px 50px rgba(61, 53, 48, 0.22)'
    },
    exit: {
      width: window.innerWidth > 480 ? '330px' : '85%',
      height: '450px',
      borderRadius: '8px',
      maxWidth: '340px',
      boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
      pointerEvents: 'none'
    }
  };

  // 2. Envelope Flaps & Backing Exit Animation (Sinking downwards out of the screen)
  const envelopePartsVariants = {
    visible: { y: 0, opacity: 1 },
    exit: { 
      y: '100vh', 
      opacity: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  };

  // 3. Top Flap Rotation (Flipping up)
  const topFlapVariants = {
    closed: { rotateX: 0, zIndex: 5 },
    open: { 
      rotateX: 180, 
      zIndex: 1, 
      transition: { 
        rotateX: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
        zIndex: { delay: 0.3 } // Swap z-index halfway through the flip so it sits behind the note
      } 
    }
  };

  // 4. Wax Seal Split Animations (Cracking effect)
  const sealLeftVariants = {
    visible: { x: 0, rotate: 0, opacity: 1, scale: 1 },
    hidden: { 
      x: -45, 
      rotate: -20, 
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const sealRightVariants = {
    visible: { x: 0, rotate: 0, opacity: 1, scale: 1 },
    hidden: { 
      x: 45, 
      rotate: 20, 
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] }
    }
  };

  // 5. Note Slide Up (Adjusted for vertical aspect ratio)
  const noteVariants = {
    tucked: { y: 0, scale: 0.95, zIndex: 2 },
    slidOut: { 
      y: -260, 
      scale: 1.05,
      zIndex: 10,
      transition: { duration: 1.1, ease: [0.25, 1, 0.5, 1] }
    },
    exit: {
      scale: 1.12,
      opacity: 0,
      y: -300,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const isFlapOpen = animState !== 'full' && animState !== 'shrunk';
  const isNoteSlid = animState === 'slideNote' || animState === 'exit';
  const isExiting = animState === 'exit';

  return (
    <motion.div
      className="envelope-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        background: 'radial-gradient(circle at center, rgba(61, 53, 48, 0.99) 0%, rgba(20, 35, 25, 0.99) 100%)',
        cursor: animState === 'full' ? 'pointer' : 'default'
      }}
      onClick={handleTriggerOpen}
    >
      <motion.div
        className="envelope-container"
        variants={containerVariants}
        initial="full"
        animate={animState}
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
      >
        <div className="envelope-wrapper-inner" style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}>
          
          {/* Group of envelope parts that will fly away together */}
          <motion.div
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}
            variants={envelopePartsVariants}
            animate={isExiting ? 'exit' : 'visible'}
          >
            {/* Back of Envelope */}
            <div className="envelope-back" />

            {/* Top Flap */}
            <motion.div
              className="envelope-flap-top"
              variants={topFlapVariants}
              initial="closed"
              animate={isFlapOpen ? 'open' : 'closed'}
            />

            {/* Left Flap */}
            <div className="envelope-flap-left" />

            {/* Right Flap */}
            <div className="envelope-flap-right" />

            {/* Bottom Flap */}
            <div className="envelope-flap-bottom" />

            {/* Debossed SB text engraving below the seal */}
            <div className="envelope-engraving">
              SB
            </div>

            {/* Breaking Wax Seal (Left and Right halves) */}
            <motion.div
              className="wax-seal-wrapper"
              onClick={(e) => {
                e.stopPropagation(); // Avoid triggering double open if clicking on seal
                handleTriggerOpen();
              }}
            >
              {/* Left Half */}
              <motion.div
                className="wax-seal-half left"
                variants={sealLeftVariants}
                initial="visible"
                animate={isFlapOpen ? 'hidden' : 'visible'}
              >
                <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#6e5010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c-2-2.5-5-3-5-7 0-4 5-8 5-8" />
                  <path d="M12 21c-4-1-7-3-7-7 0-3 3-5 5-6" />
                  <path d="M7 14c-2-1-3-3-3-5 0-2 2-3 4-3" />
                </svg>
              </motion.div>

              {/* Right Half */}
              <motion.div
                className="wax-seal-half right"
                variants={sealRightVariants}
                initial="visible"
                animate={isFlapOpen ? 'hidden' : 'visible'}
              >
                <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="#6e5010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c0-4 5-8 5-8" />
                  <path d="M12 21c4-1 7-3 7-7 0-3-3-5-5-6" />
                  <path d="M17 14c2-1 3-3 3-5 0-2-2-3-4-3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Invitation Card (Note) - Slides out and stays on screen during exit */}
          <motion.div
            className="envelope-note"
            variants={noteVariants}
            initial="tucked"
            animate={isExiting ? 'exit' : (isNoteSlid ? 'slidOut' : 'tucked')}
            style={{
              pointerEvents: isExiting ? 'none' : 'auto'
            }}
          >
            <div className="initials">
              {invitationData.brideInitials} & {invitationData.groomInitials}
            </div>
            <div className="title" style={{ marginTop: '4px' }}>
              {invitationData.bride} & {invitationData.groom}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '8px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Nişan Davetiyesi
            </div>
            {animState === 'openFlap' && (
              <div style={{ marginTop: '12px', color: 'var(--color-gold-dark)', fontSize: '1.1rem', fontFamily: 'var(--font-headings)' }}>
                Davetiyeniz Hazırlanıyor...
              </div>
            )}
            {isNoteSlid && !isExiting && (
              <div style={{ marginTop: '12px', color: 'var(--color-green-dark)', fontSize: '1rem', fontFamily: 'var(--font-headings)', fontStyle: 'italic' }}>
                Aramıza Hoş Geldiniz
              </div>
            )}
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}
