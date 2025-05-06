export default function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl md:text-4xl font-serif text-neutral-dark mb-4">
      {children}
    </h2>
  );
}
