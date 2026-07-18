import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Flame,
  Headphones,
  Home,
  Languages,
  LogOut,
  MessageCircleMore,
  Mic2,
  Play,
  Search,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react";

export const metadata = {
  title: "Dashboard | LingoBridge",
  description: "Your Mandarin learning dashboard.",
};

const navigation = [
  { label: "Overview", icon: Home, active: true },
  { label: "Translate", icon: Languages },
  { label: "Learn", icon: BookOpen },
  { label: "Conversation", icon: MessageCircleMore },
  { label: "Saved phrases", icon: Bookmark },
  { label: "Profile", icon: UserRound },
];

const lessons = [
  {
    character: "会",
    title: "First conversations",
    subtitle: "Greetings, names and polite responses",
    progress: 76,
  },
  {
    character: "日",
    title: "Daily essentials",
    subtitle: "Useful phrases for everyday life",
    progress: 61,
  },
  {
    character: "行",
    title: "Travel confidently",
    subtitle: "Directions, transport and hotels",
    progress: 42,
  },
];

const phrases = [
  { chinese: "你好", pinyin: "nǐ hǎo", english: "Hello", amharic: "ሰላም" },
  { chinese: "谢谢", pinyin: "xiè xie", english: "Thank you", amharic: "አመሰግናለሁ" },
  { chinese: "很高兴认识你", pinyin: "hěn gāo xìng rèn shi nǐ", english: "Nice to meet you", amharic: "በመተዋወቃችን ደስ ብሎኛል" },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#080b14] text-white">
      <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-white/10 bg-black/20 p-5 lg:flex lg:flex-col">
          <div className="flex items-center gap-3 px-2 py-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 via-indigo-500 to-fuchsia-500 text-xl font-black shadow-glow">
              译
            </span>
            <div>
              <strong className="block text-base tracking-[-0.02em]">LingoBridge</strong>
              <span className="text-xs text-white/40">Mandarin made natural</span>
            </div>
          </div>

          <nav className="mt-8 space-y-1.5" aria-label="Dashboard navigation">
            {navigation.map(({ label, icon: Icon, active }) => (
              <button
                key={label}
                type="button"
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "border border-violet-400/20 bg-violet-400/10 text-violet-100"
                    : "border border-transparent text-white/50 hover:bg-white/[0.04] hover:text-white/85"
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                {label}
              </button>
            ))}
          </nav>

          <section className="mt-auto rounded-2xl border border-white/10 bg-white/[0.035] p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white/50">Daily goal</span>
              <Flame className="h-4 w-4 text-amber-300" />
            </div>
            <strong className="mt-3 block text-2xl">8 / 10 min</strong>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" />
            </div>
          </section>

          <Link
            href="/"
            className="mt-4 flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium text-white/45 transition hover:bg-white/[0.04] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
        </aside>

        <section className="min-w-0 px-4 py-5 sm:px-6 lg:px-9 lg:py-7">
          <header className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-300/75">Mandarin learning workspace</span>
              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl">Welcome back.</h1>
            </div>
            <div className="flex items-center gap-2.5">
              <button type="button" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.035] text-white/55 transition hover:text-white" aria-label="Search">
                <Search className="h-4.5 w-4.5" />
              </button>
              <button type="button" className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-400 to-indigo-500 text-sm font-bold shadow-glow" aria-label="Open profile">
                MA
              </button>
            </div>
          </header>

          <section className="mt-7 grid gap-4 xl:grid-cols-[1.55fr_.85fr]">
            <article className="noise-overlay relative overflow-hidden rounded-[1.75rem] border border-violet-400/15 bg-gradient-to-br from-violet-500/20 via-indigo-500/10 to-fuchsia-500/10 p-6 sm:p-8">
              <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
              <div className="relative max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-200">
                  <Sparkles className="h-3.5 w-3.5" /> Today&apos;s learning path
                </span>
                <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-[-0.045em] sm:text-4xl">Turn everyday moments into confident Chinese.</h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-white/55">Continue your personalized lesson, practice pronunciation, and review phrases selected for your current level.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button type="button" className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-bold text-[#101321] transition hover:-translate-y-0.5">
                    <Play className="h-4 w-4 fill-current" /> Continue lesson
                  </button>
                  <button type="button" className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-4 text-sm font-semibold text-white/80 transition hover:bg-white/[0.08]">
                    <Mic2 className="h-4 w-4" /> Voice practice
                  </button>
                </div>
              </div>
            </article>

            <article className="glass-panel rounded-[1.75rem] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">Weekly progress</span>
                  <h2 className="mt-1 text-xl font-semibold">Strong momentum</h2>
                </div>
                <Trophy className="h-6 w-6 text-amber-300" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/[0.04] p-3"><strong className="block text-xl">5</strong><span className="text-[10px] text-white/40">day streak</span></div>
                <div className="rounded-xl bg-white/[0.04] p-3"><strong className="block text-xl">42</strong><span className="text-[10px] text-white/40">phrases</span></div>
                <div className="rounded-xl bg-white/[0.04] p-3"><strong className="block text-xl">86%</strong><span className="text-[10px] text-white/40">accuracy</span></div>
              </div>
              <div className="mt-6 flex h-24 items-end gap-2">
                {[54, 72, 45, 88, 68, 34, 20].map((height, index) => (
                  <div key={index} className="flex flex-1 flex-col items-center gap-2">
                    <span className="w-full rounded-t-md bg-gradient-to-t from-violet-500/45 to-fuchsia-400/80" style={{ height: `${height}%` }} />
                    <small className="text-[9px] text-white/30">{["M", "T", "W", "T", "F", "S", "S"][index]}</small>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Words learned", value: "1,248", detail: "+36 this week", icon: BookOpen },
              { label: "Listening time", value: "4.2h", detail: "+18% this week", icon: Headphones },
              { label: "Saved phrases", value: "86", detail: "12 ready to review", icon: Bookmark },
              { label: "Conversation score", value: "B1", detail: "Intermediate", icon: MessageCircleMore },
            ].map(({ label, value, detail, icon: Icon }) => (
              <article key={label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                <div className="flex items-center justify-between text-white/40"><span className="text-xs font-medium">{label}</span><Icon className="h-4 w-4" /></div>
                <strong className="mt-4 block text-2xl tracking-[-0.04em]">{value}</strong>
                <span className="mt-1 block text-[10px] text-emerald-300/70">{detail}</span>
              </article>
            ))}
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
            <div>
              <div className="flex items-end justify-between gap-4">
                <div><span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">Curriculum</span><h2 className="mt-1 text-xl font-semibold">Continue your path</h2></div>
                <button type="button" className="flex items-center gap-1 text-xs font-semibold text-violet-300">View all <ArrowRight className="h-3.5 w-3.5" /></button>
              </div>
              <div className="mt-4 space-y-3">
                {lessons.map((lesson) => (
                  <article key={lesson.title} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-violet-400/25 hover:bg-violet-400/[0.035]">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-400/10 text-xl font-bold text-violet-200">{lesson.character}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3"><div><strong className="block text-sm">{lesson.title}</strong><span className="mt-1 block text-xs text-white/40">{lesson.subtitle}</span></div><span className="text-xs font-semibold text-white/45">{lesson.progress}%</span></div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400" style={{ width: `${lesson.progress}%` }} /></div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-white/65" />
                  </article>
                ))}
              </div>
            </div>

            <div>
              <div><span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/35">Smart review</span><h2 className="mt-1 text-xl font-semibold">Practice today</h2></div>
              <div className="mt-4 space-y-3">
                {phrases.map((phrase) => (
                  <article key={phrase.chinese} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                    <div className="flex items-center gap-4">
                      <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-300/10 text-emerald-200" aria-label={`Play ${phrase.chinese}`}><Headphones className="h-4 w-4" /></button>
                      <div className="min-w-0 flex-1"><strong className="block text-xl">{phrase.chinese}</strong><span className="text-xs text-violet-200/75">{phrase.pinyin}</span></div>
                      <button type="button" className="text-white/30 hover:text-amber-200" aria-label="Save phrase"><Bookmark className="h-4 w-4" /></button>
                    </div>
                    <div className="mt-3 border-t border-white/8 pt-3"><span className="block text-sm font-semibold text-white/80">{phrase.english}</span><small className="mt-1 block text-white/40">{phrase.amharic}</small></div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <nav className="fixed inset-x-4 bottom-4 z-20 flex items-center justify-around rounded-2xl border border-white/10 bg-[#101522]/95 p-2 shadow-glass backdrop-blur-xl lg:hidden" aria-label="Mobile navigation">
            {navigation.slice(0, 5).map(({ label, icon: Icon, active }) => (
              <button key={label} type="button" className={`grid min-w-14 place-items-center gap-1 rounded-xl px-2 py-2 text-[9px] font-medium ${active ? "bg-violet-400/10 text-violet-200" : "text-white/35"}`}>
                <Icon className="h-4 w-4" />
                {label.split(" ")[0]}
              </button>
            ))}
          </nav>
        </section>
      </div>
    </main>
  );
}
