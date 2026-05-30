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

  // 1. Envelope Container Dimensions (Animating from full screen to card size)
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
      width: window.innerWidth > 480 ? '420px' : '90%',
      height: '280px',
      borderRadius: '16px',
      maxWidth: '420px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    },
    openFlap: {
      width: window.innerWidth > 480 ? '420px' : '90%',
      height: '280px',
      borderRadius: '16px',
      maxWidth: '420px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
    },
    slideNote: {
      width: window.innerWidth > 480 ? '420px' : '90%',
      height: '280px',
      borderRadius: '16px',
      maxWidth: '420px',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
    },
    exit: {
      width: window.innerWidth > 480 ? '420px' : '90%',
      height: '280px',
      borderRadius: '16px',
      maxWidth: '420px',
      boxShadow: '0 0px 0px rgba(0, 0, 0, 0)',
      pointerEvents: 'none'
    }
  };

  // 2. Envelope Flaps & Backing Exit Animation (Flying upwards out of the screen)
  const envelopePartsVariants = {
    visible: { y: 0, opacity: 1 },
    exit: { 
      y: '-150vh', 
      opacity: 0,
      transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
    }
  };

  // 3. Top Flap Rotation (Flipping up)
  const topFlapVariants = {
    closed: { rotateX: 0, zIndex: 5 },
    open: { 
      rotateX: 180, 
      zIndex: 1, 
      transition: { duration: 0.8, ease: 'easeInOut' } 
    }
  };

  // 4. Wax Seal Fade Out
  const sealVariants = {
    visible: { scale: 1, opacity: 1 },
    hidden: { 
      scale: 0.6, 
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  // 5. Note Slide Up
  const noteVariants = {
    tucked: { y: 0, scale: 0.95, zIndex: 2 },
    slidOut: { 
      y: -140, 
      scale: 1.05,
      zIndex: 10,
      transition: { duration: 1.1, ease: [0.25, 1, 0.5, 1] }
    }
  };

  const isFlapOpen = animState !== 'full' && animState !== 'shrunk';
  const isNoteSlid = animState === 'slideNote' || animState === 'exit';
  const isExiting = animState === 'exit';

  return (
    <motion.div
      className="envelope-overlay"
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0, transition: { delay: 0.4, duration: 0.8 } } : {}}
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

            {/* Gold Wax Seal */}
            <motion.div
              className="wax-seal"
              variants={sealVariants}
              initial="visible"
              animate={isFlapOpen ? 'hidden' : 'visible'}
            >
              <span className="wax-seal-text">
                {invitationData.brideInitials}{invitationData.groomInitials}
              </span>
            </motion.div>
          </motion.div>

          {/* Invitation Card (Note) - Slides out and stays on screen during exit */}
          <motion.div
            className="envelope-note"
            variants={noteVariants}
            initial="tucked"
            animate={isNoteSlid ? 'slidOut' : 'tucked'}
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
            {isNoteSlid && (
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
