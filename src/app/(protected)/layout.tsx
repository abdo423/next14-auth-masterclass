import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500 to-blue-800">
      <Navbar/>
      {children}
    </div>
  );
};

export default ProtectedLayout;
