import { CartDrawer } from './components/CartDrawer';
import { Intro } from './components/Intro';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Cultivo } from './components/Cultivo';
import { Historia } from './components/Historia';
import { Azeites } from './components/Azeites';
import { Onde } from './components/Onde';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <a href="#historia" className="mono skip" onFocus={(e) => (e.currentTarget.style.top = '12px')} onBlur={(e) => (e.currentTarget.style.top = '-60px')}>Ir para o conteúdo</a>
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Historia />
        <Cultivo />
        <Azeites />
        <Onde />
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppFloat />
    </>
  );
}
