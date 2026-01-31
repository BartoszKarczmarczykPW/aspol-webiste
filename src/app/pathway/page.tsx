"use client";


import SmoothBackground from "@/components/ui/effects/SmoothBackground";
import RippleButton from "@/components/ui/RippleButton";
import SpotlightCard from "@/components/ui/cards/SpotlightCard";
import ConstellationPoints from "@/components/ui/effects/ConstellationPoints";
import { GraduationIcon } from "@/components/icons/GraduationIcon";
import { GlobeIcon } from "@/components/icons/GlobeIcon";
import Link from "next/link";


const universities = [
    { name: "Sciences Po", url: "/pathway/sciences-po", logo: "/images/logos/sciences-po.png" },
    { name: "École Polytechnique", url: "/pathway/cole-polytechnique", logo: "/images/logos/polytechnique.png" },
    { name: "ESSEC Business School", url: "/pathway/essec", logo: "/images/logos/essec.png" },
    { name: "HEC Paris", url: "/pathway/hec-paris", logo: "/images/logos/hec.png" },
    { name: "École Normale Supérieure", url: "/pathway/cole-normale-suprieure", logo: "/images/logos/ens.png" },
    { name: "ESCP Business School", url: "/pathway/escp-paris", logo: "/images/logos/escp.png" },
    { name: "Université Paris-Saclay", url: "/pathway/universit-paris-saclay", logo: "/images/logos/saclay.png" },
    { name: "INSEAD", url: "/pathway/insead", logo: "/images/logos/insead.png" },
    { name: "Panthéon-Assas University", url: "/pathway/panthon-assas", logo: "/images/logos/assas.png" },
];

export default function PathwayPage() {
    return (
        <main className="min-h-screen bg-white">


            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 min-h-[60vh] flex items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
                    <ConstellationPoints color="15, 23, 42" /> {/* aspol-navy rgb */}
                </div>

                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/40 to-white pointer-events-none z-0" />

                <div className="max-w-5xl mx-auto text-center relative z-10 transition-opacity duration-700 ease-out">
                    <span className="inline-block px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-aspol-navy uppercase bg-white/90 backdrop-blur-md rounded-full border border-aspol-navy/10 shadow-sm ring-1 ring-aspol-navy/5">
                        Education & Mentoring
                    </span>
                    <h1 className="text-5xl xs:text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-aspol-dark mb-8 tracking-tight leading-[1.1] drop-shadow-sm">
                        Pathway to <span className="text-aspol-red">French Universities</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-aspol-navy/80 max-w-3xl mx-auto leading-relaxed font-light">
                        ASPOL connects dreams with reality. We empower Polish students to pursue their academic future in France through mentorship and guidance.
                    </p>
                </div>
            </section>

            {/* University Guide Section */}
            <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-white via-gray-50/50 to-white relative z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-aspol-dark mb-6 tracking-tight">French University Guide</h2>
                        <p className="text-xl text-aspol-navy/80 max-w-2xl mx-auto font-light leading-relaxed">
                            Explore undergraduate and graduate study options at France's most prestigious institutions. Curated by our students.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {universities.map((uni, index) => (
                            <Link
                                key={index}
                                href={uni.url}
                                className="group block relative"
                            >
                                <SpotlightCard className="h-full bg-white border border-gray-100/50 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-aspol-navy/5 transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                                    <div className="p-8 flex flex-col items-center justify-center text-center h-[320px] relative z-10">

                                        {/* Logo Container with enhanced hover effect */}
                                        <div className="w-full h-32 flex items-center justify-center mb-8 relative grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:scale-105">
                                            {/* Using standard img tag to avoid domain config issues with external URLs */}
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={uni.logo}
                                                alt={`${uni.name} Logo`}
                                                className="max-w-[80%] max-h-full object-contain filter drop-shadow-sm"
                                            />
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-aspol-red transition-colors duration-300 mb-3 px-4 leading-tight">
                                            {uni.name}
                                        </h3>

                                        {/* Hidden "call to action" that appears on hover */}
                                        <div className="mt-2 h-6 flex items-center justify-center overflow-hidden">
                                            <span className="text-sm font-medium text-aspol-red flex items-center gap-1 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                                View Guide <span className="text-xs transition-transform group-hover:translate-x-0.5">→</span>
                                            </span>
                                        </div>
                                    </div>
                                    {/* Decorative background blur */}
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-aspol-red/5 rounded-full blur-2xl group-hover:bg-aspol-red/10 transition-colors duration-500 pointer-events-none" />
                                </SpotlightCard>
                            </Link>
                        ))}
                    </div>

                    {/* Campus France Partnership - Improved Design */}
                    <div className="mt-24 bg-white p-8 md:p-12 lg:p-16 rounded-[2rem] border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 max-w-5xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 relative overflow-hidden group">
                        {/* Subtle background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-bl-full -z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="flex-1 text-center md:text-left relative z-10">
                            <span className="text-aspol-blue font-bold text-sm tracking-wider uppercase mb-2 block">Official Partner</span>
                            <h3 className="text-3xl md:text-4xl font-bold text-aspol-navy mb-5 tracking-tight">Partnered with Campus France</h3>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                                We are proud to verify our information and collaborate directly with <strong>Campus France Pologne</strong>, a French government agency dedicated to promoting higher education and international mobility.
                            </p>
                            <RippleButton
                                href="https://www.pologne.campusfrance.org/pl"
                                target="_blank"
                                className="px-8 py-3.5 bg-white text-aspol-navy border-2 border-aspol-navy font-semibold rounded-xl hover:bg-aspol-navy hover:text-white transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2 group/btn"
                            >
                                Visit Campus France Pologne
                            </RippleButton>
                        </div>
                        <div className="w-full md:w-5/12 flex justify-center md:justify-end shrink-0 relative z-10">
                            <div className="w-64 md:w-80 h-auto relative flex items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-50 group-hover:scale-[1.02] transition-transform duration-500">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/logos/campus-france.png"
                                    alt="Campus France Pologne"
                                    className="max-w-full h-auto object-contain drop-shadow-sm"
                                />
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* Main Content (Mentoring & Visits) */}
            <section className="py-24 px-6 md:px-12 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-32">

                    {/* Mentoring Section */}
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="space-y-8 order-2 md:order-1">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 text-aspol-red rounded-2xl mb-2 shadow-sm border border-red-100/50">
                                <GraduationIcon className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-aspol-dark tracking-tight">Mentoring Program</h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                                <p>
                                    We offer a <strong>free, comprehensive mentoring program</strong> for high school students in Poland. We connect ambitious students directly with undergraduates and graduates from various French universities.
                                </p>
                                <p>
                                    Our mentors provide personalized guidance on:
                                </p>
                                <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-aspol-red">
                                    <li>Choosing the right course and university</li>
                                    <li>Navigating the complex application process (Parcoursup & specific portals)</li>
                                    <li>Preparing for student life in France</li>
                                </ul>
                            </div>
                        </div>
                        <div className="relative h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100 group order-1 md:order-2 border-4 border-white ring-1 ring-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/mentoring.jpg"
                                alt="Mentoring Program"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-60 mix-blend-multiply pointer-events-none" />
                        </div>
                    </div>

                    {/* School Visits Section */}
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="relative h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gray-100 group border-4 border-white ring-1 ring-gray-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/highschool.jpg"
                                alt="School Presentations"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-60 mix-blend-multiply pointer-events-none" />
                        </div>
                        <div className="space-y-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-aspol-blue rounded-2xl mb-2 shadow-sm border border-blue-100/50">
                                <GlobeIcon className="w-8 h-8" />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-aspol-dark tracking-tight">School Presentations</h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
                                <p>
                                    ASPOL actively promotes educational opportunities in France by organizing <strong>interactive presentations</strong> at Polish high schools.
                                </p>
                                <p>
                                    We conduct sessions both online and in-person to broaden awareness of study opportunities, scholarships, and career paths available in France.
                                </p>
                                <p className="font-medium text-aspol-navy/80 italic border-l-4 border-aspol-blue pl-4 py-1 bg-aspol-blue/5 rounded-r-lg">
                                    "Bringing the French university experience directly to your classroom."
                                </p>
                            </div>
                            <div className="pt-4">
                                <Link
                                    href="/#contact"
                                    className="inline-flex items-center text-aspol-red font-bold hover:text-aspol-red/80 text-lg group bg-aspol-red/5 px-6 py-3 rounded-xl transition-colors hover:bg-aspol-red/10 border border-aspol-red/10 hover:border-aspol-red/20"
                                >
                                    Arrange a Visit
                                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


        </main>
    );
}
