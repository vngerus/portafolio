"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import ProjectIcon from "@/components/ProjectIcon";
import { PawIcon } from "@/components/Icons";
import { ui, type WorkProject } from "@/data";
import { useLang } from "@/components/LangProvider";

const badge =
  "font-jetbrains absolute top-3 left-3 rounded-full border border-edge bg-background px-2.5 py-1 text-[11px] tracking-[0.08em] text-muted";

// Details open on click (not hover): nothing moves under the cursor while browsing.
export default function ProjectCard({
  p,
  company,
}: {
  p: WorkProject;
  company: string;
}) {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const t = ui[lang].projects;
  const href = p.link ?? p.github;
  return (
    <div
      data-cat={
        p.dev
          ? t.catDev(p.title)
          : p.confidential
            ? t.catConf(p.title)
            : t.catOk(p.title)
      }
      data-cat-e={p.dev ? "🚧" : p.confidential ? "🤫" : "👉"}
      className="flex min-w-0 flex-col gap-3.5"
    >
      <div className="group/pin relative perspective-[900px]">
        <div
          className={cn(
            "relative origin-bottom rounded-2xl transform-3d transition duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transform-none",
            // flat while the description is open so the text stays readable
            !open &&
              "group-hover/pin:shadow-[0_0_28px_#d28fff30] group-hover/pin:transform-[rotateX(28deg)_scale(0.92)]",
          )}
        >
          <div
            className={`relative flex aspect-4/3 items-center justify-center overflow-hidden rounded-2xl border bg-surface1 transition-colors duration-200 ${
              open ? "border-accent" : "border-line"
            }`}
          >
            {p.cover && (
              <>
                <Image
                  src={p.cover}
                  alt=""
                  fill
                  sizes="(min-width: 1120px) 340px, (min-width: 640px) 45vw, 100vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-black/40" />
              </>
            )}
            <div
              aria-hidden
              className="font-jetbrains pointer-events-none absolute inset-0 p-2.5 text-[10px] tracking-wider text-accent/70 uppercase"
            >
              <span className="absolute top-2.5 right-2.5 size-3 border-t border-r border-accent/50" />
              <span className="absolute bottom-2.5 left-2.5 size-3 border-b border-l border-accent/50" />
              <span className="absolute top-2.5 right-7 opacity-0 transition-opacity duration-300 group-hover/pin:opacity-100">
                Santiago · CL
              </span>
              <span className="absolute bottom-2.5 left-7 opacity-0 transition-opacity duration-300 group-hover/pin:opacity-100">
                {"// "}
                {p.id}
              </span>
            </div>
            <div
              aria-hidden={!open}
              className={`pointer-events-none absolute inset-0 flex flex-col justify-between gap-3 bg-background p-5 transition duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:translate-y-0 ${
                open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <p className="line-clamp-5 text-sm leading-normal text-pretty">
                {p.description}
              </p>
              <span className="font-jetbrains text-[11px] text-muted">
                {p.stack.join(" · ")}
              </span>
            </div>
            {p.dev && <span className={badge}>{t.dev}</span>}
            {p.confidential && <span className={badge}>{t.confidential}</span>}
            <span
              aria-hidden
              className="font-jetbrains absolute right-3 bottom-3 flex size-6 items-center justify-center rounded-full border border-edge bg-background text-sm text-muted"
            >
              {open ? "−" : "+"}
            </span>
            <button
              type="button"
              aria-expanded={open}
              aria-label={open ? t.hide(p.title) : t.show(p.title)}
              onClick={() => setOpen((o) => !o)}
              className="absolute inset-0 cursor-pointer"
            />
          </div>
          {/* icon sits at the card centre; on hover it travels up along a pin and pops toward the viewer */}
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 flex items-center justify-center transform-3d transition-opacity duration-200",
              open && "opacity-0",
            )}
          >
            {/* trail of paw prints walking from the card edge up to the pin, one after another */}
            {Array.from({ length: 6 }, (_, i) => (
              <PawIcon
                key={i}
                className="paw-stamp absolute top-1/2 left-1/2 hidden size-5 text-accent group-hover/pin:block"
                style={
                  {
                    translate: `calc(-50% + ${i % 2 ? 6 : -6}px) calc(-50% + ${110 - i * 23}px)`,
                    "--paw-r": `${i % 2 ? 8 : -8}deg`,
                    animationDelay: `${i * 0.2}s`,
                  } as React.CSSProperties
                }
              />
            ))}
            <span className="absolute bottom-1/2 left-1/2 h-0 w-px bg-linear-to-t from-accent to-transparent transition-[height] duration-500 group-hover/pin:h-10" />
            <span className="absolute size-1 rounded-full bg-accent opacity-0 shadow-[0_0_6px_var(--color-accent)] transition-opacity duration-500 group-hover/pin:opacity-100" />
            <ProjectIcon
              title={p.title}
              icon={p.icon}
              className="size-24 rounded-full text-3xl shadow-lg transition duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/pin:transform-[translateY(-84px)_translateZ(70px)] group-hover/pin:shadow-[0_18px_30px_-6px_rgb(0_0_0/0.7)] motion-reduce:transform-none"
            />
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-[17px] font-medium">{p.title}</span>
          <span className="text-sm text-muted">
            {company} · {p.kind}
          </span>
        </div>
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={t.open(p.title)}
            className="-m-2 p-2 text-lg leading-none text-accent transition-transform duration-200 hover:-translate-y-px hover:translate-x-px"
          >
            <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </div>
  );
}
