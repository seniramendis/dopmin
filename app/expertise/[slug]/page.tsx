import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { EXPERTISE, getExpertiseBySlug } from "../data";

export function generateStaticParams() {
  return EXPERTISE.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getExpertiseBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.name} | Dopmin`,
    description: service.tagline,
  };
}

export default async function ExpertiseServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getExpertiseBySlug(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const otherServices = EXPERTISE.filter((item) => item.slug !== slug);

  return (
    <main className="bg-white min-h-screen antialiased">
      <Header active="expertise" />

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-16 px-6 overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 50% 0%, ${service.accentBg} 0%, transparent 70%)` }}
        />
        <div className="max-w-5xl mx-auto relative">
          <Link
            href="/expertise"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-400 hover:text-[#0D0D0D] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All expertise
          </Link>

          <div className="grid md:grid-cols-[1fr_auto] gap-8 items-end mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: service.accentColor }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p
                  className="text-xs font-bold uppercase tracking-[0.14em]"
                  style={{ color: service.accentColor }}
                >
                  {service.role}
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-[#0D0D0D] tracking-tight mb-4">
                {service.name}
              </h1>
              <p className="text-lg text-stone-500 max-w-xl leading-relaxed">{service.tagline}</p>
            </div>
          </div>

          <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden">
            <Image
              src={service.img}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ── DESCRIPTION + CAPABILITIES ── */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#0D0D0D] mb-4 tracking-tight">
              What we do
            </h2>
            <p className="text-stone-500 text-[15px] leading-relaxed mb-6">{service.description}</p>
            <p className="text-sm text-stone-400 italic border-l-2 pl-4" style={{ borderColor: service.accentColor }}>
              &ldquo;{service.funFact}&rdquo;
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0D0D0D] mb-4 tracking-tight">
              What&apos;s included
            </h2>
            <ul className="flex flex-col gap-3 mb-8">
              {service.capabilities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-stone-600">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: service.accentBg }}
                  >
                    <Check className="w-3 h-3" style={{ color: service.accentColor }} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-5">
              {service.skills.map((skill) => {
                const SkillIcon = skill.icon;
                return (
                  <div key={skill.name} className="flex flex-col items-center gap-2 w-[64px]">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-stone-50">
                      <SkillIcon className="w-5 h-5" style={{ color: service.accentColor }} />
                    </div>
                    <span className="text-[11px] font-medium text-stone-500 text-center leading-tight">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 pb-20">
        <div
          className="max-w-5xl mx-auto rounded-3xl p-10 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ backgroundColor: service.accentBg }}
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0D0D0D] tracking-tight mb-2">
              Ready to talk {service.name.toLowerCase()}?
            </h2>
            <p className="text-stone-500 text-[15px]">
              Book a free audit and we&apos;ll walk through how this applies to your project.
            </p>
          </div>
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity shrink-0"
            style={{ backgroundColor: service.accentColor }}
          >
            Book a Free Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── OTHER SERVICES ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-[#0D0D0D] mb-6 tracking-tight">
            Other expertise
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {otherServices.map((item) => (
              <Link
                key={item.slug}
                href={`/expertise/${item.slug}`}
                className="group p-4 rounded-2xl border border-stone-100 hover:border-stone-200 hover:shadow-[0_10px_30px_-16px_rgba(13,13,13,0.15)] transition-all"
              >
                <p className="text-sm font-semibold text-[#0D0D0D] mb-1 group-hover:text-[#F26A10] transition-colors">
                  {item.name}
                </p>
                <p className="text-xs text-stone-400 leading-snug line-clamp-2">{item.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
