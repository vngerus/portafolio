export default function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex flex-col gap-2.5 mb-10">
      <span className="font-jetbrains text-xs tracking-[0.08em] text-accent">{num}</span>
      <h2 className="text-[clamp(30px,4vw,44px)] font-semibold tracking-[-0.02em]">{title}</h2>
    </div>
  );
}
