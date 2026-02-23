import Hero from "@/components/sections/Hero";
import PartnersLogos from "@/components/sections/PartnersLogos";
import About from "@/components/sections/About";
import Statistics from "@/components/sections/Statistics";
import Events from "@/components/sections/Events";
import Team from "@/components/sections/Team";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Newsletter from "@/components/sections/Newsletter";
import Contact from "@/components/sections/Contact";

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Hero />
            <PartnersLogos />
            <About />
            <Statistics />
            <Events />
            <Team />
            <Testimonials />
            <FAQ />
            <Newsletter />
            <Contact />
        </div>
    );
}
