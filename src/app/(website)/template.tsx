export default function Template({ children }: { children: React.ReactNode }) {
    // Page-enter transition is pure CSS (.page-in in globals.css): it plays on
    // every route change, needs no JS, and is neutralised for reduced-motion users.
    return <div className="page-in">{children}</div>;
}
