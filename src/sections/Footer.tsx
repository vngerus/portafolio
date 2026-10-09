export default function Footer() {
  return (
    <footer className="font-jetbrains mx-auto flex max-w-280 flex-wrap justify-between gap-4 border-t border-line px-[clamp(20px,4vw,40px)] py-7 text-[11px] text-dim">
      <span>© 2026 Angel Smith</span>
      <span>
        Hecho con Next.js · Santiago, Chile · Emotes:{' '}
        <a
          href="https://googlefonts.github.io/noto-emoji-animation/"
          target="_blank"
          rel="noreferrer"
          className="underline decoration-edge underline-offset-2 hover:text-accent"
        >
          Google Noto (CC BY 4.0)
        </a>
      </span>
    </footer>
  );
}
