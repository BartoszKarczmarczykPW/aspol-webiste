import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero";
import PartnersLogos from "@/components/sections/PartnersLogos";
import About from "@/components/sections/About";
import Statistics from "@/components/sections/Statistics";
import Events from "@/components/sections/Events";

const Team = dynamic(() => import("@/components/sections/Team"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const Newsletter = dynamic(() => import("@/components/sections/Newsletter"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

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
