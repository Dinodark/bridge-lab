export const metadata = {
  title: "Tribe Dev — Bridge",
  description: "Прототипы и эксперименты в стиле Tribe",
};

export default function TribeDevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FCFCFC]" style={{ fontFamily: "'Inter Tight', Inter, sans-serif" }}>
      {children}
    </div>
  );
}
