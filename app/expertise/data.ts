import {
  Layout, Zap, Smartphone, Server, Monitor,
  Cpu, Building2, Boxes, PenTool, MousePointerClick,
  BrainCircuit, Bot, Workflow, LucideIcon,
} from "lucide-react";
import { SiFigma, SiAndroid, SiKotlin, SiReact, SiNodedotjs, SiPostgresql } from "react-icons/si";
import { FaJava } from "react-icons/fa";

// ─── SHARED EXPERTISE / SERVICE DATA ───────────────────────────────────────────
// Single source of truth for: the /expertise roadmap page, the header's
// "Expertise" dropdown, and each individual /expertise/[slug] detail page.
// Add a new service here and it shows up everywhere automatically.

export interface ExpertiseSkill {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

export interface ExpertiseItem {
  slug: string;
  name: string;
  role: string;
  tagline: string;
  img: string;
  accentColor: string;
  accentBg: string;
  icon: LucideIcon;
  skills: ExpertiseSkill[];
  funFact: string;
  /** Longer-form copy used on the individual service page. */
  description: string;
  capabilities: string[];
}

export const EXPERTISE: ExpertiseItem[] = [
  {
    slug: "custom-software",
    name: "Custom Software",
    role: "Engineering & Architecture",
    tagline: "High-leverage software systems built for enterprise scale.",
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#F26A10",
    accentBg: "rgba(242,106,16,0.1)",
    icon: Monitor,
    skills: [
      { name: "Systems", icon: Cpu },
      { name: "Architecture", icon: Building2 },
      { name: "Microservices", icon: Boxes },
    ],
    funFact: "We build systems that compound in value, not technical debt.",
    description:
      "We design and build bespoke software that fits how your business actually operates, instead of forcing your team into an off-the-shelf tool. From internal platforms to customer-facing products, we architect systems that stay maintainable as you scale.",
    capabilities: [
      "System architecture & technical strategy",
      "Internal tools and admin platforms",
      "API design and third-party integrations",
      "Legacy system modernization",
      "Cloud infrastructure and DevOps setup",
    ],
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
    role: "Digital Interfaces",
    tagline: "Structured wireframes prioritizing intuitive user experiences.",
    img: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#F0E080",
    accentBg: "rgba(240,224,128,0.2)",
    icon: Layout,
    skills: [
      { name: "Figma", icon: SiFigma },
      { name: "Wireframes", icon: PenTool },
      { name: "Prototyping", icon: MousePointerClick },
    ],
    funFact: "Clarity is the ultimate luxury in digital design.",
    description:
      "Good design gets out of the user's way. We start from real user flows and business goals, then move through wireframes, prototypes, and polished UI — so every screen earns its place instead of just looking nice.",
    capabilities: [
      "User research and flow mapping",
      "Wireframing and interactive prototypes",
      "Design systems and component libraries",
      "High-fidelity UI design",
      "Usability testing and iteration",
    ],
  },
  {
    slug: "ai-automation",
    name: "AI & Automation",
    role: "Agentic Workflows",
    tagline: "Eliminate manual tasks with autonomous AI agents.",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#D94030",
    accentBg: "rgba(217,64,48,0.1)",
    icon: Zap,
    skills: [
      { name: "LLM", icon: BrainCircuit },
      { name: "Agents", icon: Bot },
      { name: "Process Automation", icon: Workflow },
    ],
    funFact: "Your operations run leaner, faster, and smarter.",
    description:
      "We build AI agents and automation pipelines that take repetitive, manual work off your team's plate — from lead qualification to data entry to internal reporting — so people spend time on the work that actually needs a human.",
    capabilities: [
      "LLM-powered agents and copilots",
      "Workflow and process automation",
      "Data pipeline and reporting automation",
      "Custom integrations with your existing tools",
      "Ongoing monitoring and agent tuning",
    ],
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    role: "Native Platform",
    tagline: "Expert development for seamless mobile experiences.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#90E060",
    accentBg: "rgba(144,224,96,0.15)",
    icon: Smartphone,
    skills: [
      { name: "Android", icon: SiAndroid },
      { name: "Kotlin", icon: SiKotlin },
      { name: "Java", icon: FaJava },
    ],
    funFact: "Native performance combined with beautiful interfaces.",
    description:
      "We build native mobile apps that feel fast and familiar on the platform they run on, backed by solid architecture so new features don't mean rebuilding from scratch.",
    capabilities: [
      "Native Android development",
      "App architecture and state management",
      "Offline-first and sync-heavy apps",
      "Play Store release and maintenance",
      "Performance profiling and optimization",
    ],
  },
  {
    slug: "full-stack-web",
    name: "Full-Stack Web",
    role: "Scalable Platforms",
    tagline: "Custom web applications driven by modern frameworks.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80&auto=format&fit=crop",
    accentColor: "#007ACC",
    accentBg: "rgba(0,122,204,0.1)",
    icon: Server,
    skills: [
      { name: "React", icon: SiReact },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
    funFact: "Taking concepts smoothly from local development to the cloud.",
    description:
      "From marketing sites to full SaaS platforms, we build web applications end-to-end — frontend, backend, and database — using modern frameworks that are fast to build on now and easy to extend later.",
    capabilities: [
      "React / Next.js frontend development",
      "Node.js backend and API development",
      "Database design (PostgreSQL and beyond)",
      "Authentication, billing, and admin dashboards",
      "Deployment, hosting, and CI/CD setup",
    ],
  },
];

export function getExpertiseBySlug(slug: string) {
  return EXPERTISE.find((item) => item.slug === slug);
}
