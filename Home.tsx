import React from 'react';
import SEO from '../../components/SEO';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Hero from '../../components/Hero';
import Services from '../../components/Services';
import GlassVisualizer from '../../components/GlassVisualizer';
import ProjectStats from '../../components/ProjectStats';
import Features from '../../components/Features';
import TrustedPartners from '../../components/TrustedPartners';
import SplashAnimation from '../../components/SplashAnimation';

export default function Home() {
  return (
    <>
      <SEO title="الرئيسية | شركة زجاج الرياض" description="شركة زجاج الرياض لتركيب الواجهات والقواطع الزجاجية." />
      <SplashAnimation />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Features />
        <GlassVisualizer />
        <ProjectStats />
        <TrustedPartners />
      </main>
      <Footer />
    </>
  );
}
