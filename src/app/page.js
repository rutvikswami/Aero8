'use client';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Team from '@/components/Team';
import KitUniverse from '@/components/KitUniverse';
import FAQ from '@/components/FAQ';
import MissionLog from '@/components/MissionLog';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import AuthModal from '@/components/AuthModal';

export default function Home() {
  return (
    <>
      <Navbar />
      <AuthModal />
      <main>
        <Hero />
        <MissionLog />
        <About />
        <Team />
        <KitUniverse />
        <Newsletter />
        <FAQ />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
