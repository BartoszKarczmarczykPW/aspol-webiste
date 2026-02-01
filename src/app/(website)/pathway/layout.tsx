import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pathway to French Universities",
    description: "Explore study opportunities at France's most prestigious universities. Get free mentoring, university guides, and support from ASPOL for your academic journey in France.",
    openGraph: {
        title: "Pathway to French Universities | ASPOL",
        description: "Free mentoring and comprehensive guides for Polish students applying to French universities like Sciences Po, HEC Paris, and École Polytechnique.",
        type: "website",
    },
    keywords: ["study in France", "French universities", "Sciences Po", "HEC Paris", "École Polytechnique", "Polish students", "study abroad", "mentoring program"],
};

export default function PathwayLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
