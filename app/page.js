"use client";

import { useEffect, useMemo, useState } from "react";
import { getSupabase, isSupabaseConfigured } from "../lib/supabase";

const countries = [
  { iso: "ET", name: "Ethiopia", flag: "🇪🇹", dial: "+251", placeholder: "9XXXXXXXX" },
  { iso: "ER", name: "Eritrea", flag: "🇪🇷", dial: "+291", placeholder: "7XXXXXX" },
  { iso: "KE", name: "Kenya", flag: "🇰🇪", dial: "+254", placeholder: "7XXXXXXXX" },
  { iso: "DJ", name: "Djibouti", flag: "🇩🇯", dial: "+253", placeholder: "77XXXXXX" },
  { iso: "SO", name: "Somalia", flag: "🇸🇴", dial: "+252", placeholder: "6XXXXXXX" },
  { iso: "SD", name: "Sudan", flag: "🇸🇩", dial: "+249", placeholder: "9XXXXXXXX" },
  { iso: "AE", name: "United Arab Emirates", flag: "🇦🇪", dial: "+971", placeholder: "5XXXXXXXX" },
  { iso: "SA", name: "Saudi Arabia", flag: "🇸🇦", dial: "+966", placeholder: "5XXXXXXXX" },
  { iso: "GB", name: "United Kingdom", flag: "🇬🇧", dial: "+44", placeholder: "7XXXXXXXXX" },
  { iso: "US", name: "United States", flag: "🇺🇸", dial: "+1", placeholder: "XXXXXXXXXX" },
  { iso: "CN", name: "China", flag: "🇨🇳", dial: "+86", placeholder: "1XXXXXXXXXX" },
];

const phrases = [
  { zh: "你好", py: "nǐ hǎo", en: "Hello", am: "ሰላም", group: "Essentials", progress: 92 },
  { zh: "谢谢", py: "xiè xie", en: "Thank you", am: "አመሰግናለሁ", group: "Essentials", progress: 84 },
  { zh: "很高兴认识你", py: "hěn gāo xìng rèn shi nǐ", en: "Nice to meet you", am: "ከእርስዎ ጋር በመተዋወቄ ደስ ብሎኛል", group: "Conversation", progress: 78 },
  { zh: "请再说一遍", py: "qǐng zài shuō yí biàn", en: "Please say it again", am: "እባክዎ እንደገና ይናገሩ", group: "Conversation", progress: 63 },
  { zh: "我想要这个", py: "wǒ xiǎng yào zhè ge", en: "I would like this", am: "ይህንን እፈልጋለሁ", group: "Daily life", progress: 58 },
  { zh: "多少钱？", py: "duō shao qián", en: "How much is it?", am: "ስንት ነው?", group: "Shopping", progress: 49 },
  { zh: "洗手间在哪里？", py: "xǐ shǒu jiān zài nǎ lǐ", en: "Where is the bathroom?", am: "መጸዳጃ ቤቱ የት ነው?", group: "Travel", progress: 44 },
  { zh: "我不太明白", py: "wǒ bú tài míng bai", en: "I do not quite understand", am: "በደንብ አልገባኝም", group: "Conversation", progress: 39 },
];

const lessons = [
  { title: "First conversations", subtitle: "Greetings, names and polite responses", icon: "会", progress: 76, tone: "cyan" },
  { title: "Daily essentials", subtitle: "The phrases you will use every day", icon: "日", progress: 61, tone: "violet" },
  { title: "Travel confidently", subtitle: "Directions, transport and hotels", icon: "行", progress: 42, tone: "amber" },
  { title: "Business basics", subtitle: "Prices, meetings and introductions", icon: "商", progress: 28, tone: "blue" },
];

function Icon({ name, size = 20 }) {
  const paths = {
    home: <><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9 20v-6h6v6"/></>,
    translate: <><path d="M4 5h10M9 3v2M6 9c1.4 3 3.7 5.3 7 7"/><path d="M13 9c-1.1 3.1-3.3 5.6-6.5 7.4M14 20l3.5-8 3.5 8M15.5 17h4"/></>,
    learn: <><path d="M3 5.5 12 2l9 3.5-9 3.5-9-3.5Z"/><path d="M6 8v6.5c3.4 2.1 8.6 2.1 12 0V8M21 6v8"/></>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4V3Z"/>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4.2 3.5-6.5 8-6.5s7.2 2.3 8 6.5"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6"/></>,
    sound: <><path d="M4 10h4l5-4v12l-5-4H4v-4Z"/><path d="M17 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    logout: <><path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    spark: <path d="M12 2c.8 5.3 4.7 9.2 10 10-5.3.8-9.2 4.7-10 10-.8-5.3-4.7-9.2-10-10 5.3-.8 9.2-4.7 10-10Z"/>,
  };
  return <svg className="lb-icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">{paths[name] || paths.spark}</svg>;
}

function GoogleIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="lb-social-icon"><path fill="#4285F4" d="M21.6 12.23c0-.72-.06-1.42-.19-2.09H12v3.96h5.38a4.6 4.6 0 0 1-2 3.02v2.57h3.24c1.9-1.75 2.98-4.33 2.98-7.46Z"/><path fill="#34A853" d="M12 22c2.7 0 4.97-.9 6.62-2.43l-3.24-2.57c-.9.6-2.05.96-3.38.96-2.61 0-4.82-1.76-5.61-4.13H3.04v2.65A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.39 13.83A6 6 0 0 1 6.08 12c0-.64.11-1.26.31-1.83V7.52H3.04A10 10 0 0 0 2 12c0 1.61.38 3.13 1.04 4.48l3.35-2.65Z"/><path fill="#EA4335" d="M12 6.04c1.47 0 2.79.51 3.83 1.5l2.87-2.88A9.64 9.64 0 0 0 12 2a10 10 0 0 0-8.96 5.52l3.35 2.65C7.18 7.8 9.39 6.04 12 6.04Z"/></svg>;
}

function AppleIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" className="lb-social-icon"><path fill="currentColor" d="M17.05 12.54c-.02-2.27 1.85-3.37 1.94-3.43a4.16 4.16 0 0 0-3.27-1.77c-1.38-.15-2.72.83-3.42.83-.72 0-1.8-.81-2.97-.78a4.34 4.34 0 0 0-3.65 2.23c-1.58 2.73-.4 6.75 1.11 8.96.76 1.08 1.65 2.29 2.82 2.25 1.14-.05 1.57-.72 2.94-.72 1.36 0 1.76.72 2.95.69 1.23-.02 2-1.08 2.73-2.17a8.94 8.94 0 0 0 1.25-2.55 3.91 3.91 0 0 1-2.43-3.54ZM14.82 5.88a3.98 3.98 0 0 0 .91-2.86 4.07 4.07 0 0 0-2.64 1.36 3.8 3.8 0 0 0-.94 2.75 3.36 3.36 0 0 0 2.67-1.25Z"/></svg>;
}

function Brand({ compact = false }) {
  return <div className={`lb-brand ${compact ? "compact" : ""}`}><span className="lb-brand-mark">译</span><div><strong>Lingo<span>Bridge</span></strong>{!compact && <small>Chinese, made natural.</small>}</div></div>;
}

function normalizePhone(country, value) {
  let digits = value.replace(/\D/g, "");
  if (country.iso === "ET") {
    if (digits.startsWith("0")) digits = digits.slice(1);
    if (!/^9\d{8}$/.test(digits)) throw new Error("Enter an Ethiopian mobile number as 9XXXXXXXX or 09XXXXXXXX.");
  } else if (!/^\d{6,14}$/.test(digits)) {
    throw new Error("Enter a valid mobile number without spaces.");
  }
  return `${country.dial}${digits}`;
}

function LoadingScreen() {
  return <main className="lb-loading"><div className="lb-loader-mark">译</div><p>Securing your learning workspace…</p></main>;
}

function AuthPortal({ onSession }) {
  const [mode, setMode] = useState("signin");
  const [stage, setStage] = useState("credentials");
  const [countryIso, setCountryIso] = useState("ET");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [pendingPhone, setPendingPhone] = useState("");

  const country = countries.find((item) => item.iso === countryIso) || countries[0];
  const configured = isSupabaseConfigured();

  const submitCredentials = async (event) => {
    event.preventDefault();
    setError("");
    const client = getSupabase();
    if (!client) {
      setError("Supabase is not configured. Add the public Supabase URL and publishable key in Vercel.");
      return;
    }

    try {
      const normalizedPhone = normalizePhone(country, phone);
      if (mode === "signup" && password.length < 10) throw new Error("Use a password with at least 10 characters.");
      if (mode === "signup" && password !== confirmPassword) throw new Error("Passwords must match.");
      if (mode === "signin" && password.length < 8) throw new Error("Enter your password.");

      setBusy(true);
      if (mode === "signin") {
        const { data, error: authError } = await client.auth.signInWithPassword({ phone: normalizedPhone, password });
        if (authError) throw authError;
        if (data.session) onSession(data.session);
      } else {
        if (!fullName.trim()) throw new Error("Enter your full name.");
        const { data, error: authError } = await client.auth.signUp({
          phone: normalizedPhone,
          password,
          options: { channel: "sms", data: { full_name: fullName.trim() } },
        });
        if (authError) throw authError;
        if (data.session) onSession(data.session);
        else {
          setPendingPhone(normalizedPhone);
          setStage("otp");
        }
      }
    } catch (authError) {
      setError(authError?.message || "Authentication could not be completed.");
    } finally {
      setBusy(false);
    }
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    setError("");
    const client = getSupabase();
    if (!client) return setError("Supabase is not configured.");
    if (!/^\d{6}$/.test(otp)) return setError("Enter the six-digit verification code.");

    setBusy(true);
    const { data, error: otpError } = await client.auth.verifyOtp({ phone: pendingPhone, token: otp, type: "sms" });
    setBusy(false);
    if (otpError) return setError(otpError.message);
    if (data.session) onSession(data.session);
  };

  const socialAuth = async (provider) => {
    setError("");
    const client = getSupabase();
    if (!client) return setError("Supabase is not configured.");
    setBusy(true);
    const { error: socialError } = await client.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (socialError) {
      setError(socialError.message);
      setBusy(false);
    }
  };

  if (stage === "otp") {
    return <main className="lb-auth-page">
      <div className="lb-auth-orb one"/><div className="lb-auth-orb two"/>
      <section className="lb-auth-shell otp-shell">
        <aside className="lb-auth-story">
          <Brand/>
          <div className="lb-story-copy"><span className="lb-badge"><i/> Phone verification</span><h1>One secure step before your learning begins.</h1><p>We sent a six-digit code to <strong>{pendingPhone}</strong>. Enter it to activate your protected learning profile.</p></div>
          <div className="lb-story-footer">ENGLISH · 中文 · አማርኛ</div>
        </aside>
        <section className="lb-auth-card">
          <button className="lb-back-button" onClick={() => { setStage("credentials"); setOtp(""); setError(""); }}>← Change number</button>
          <span className="lb-kicker">VERIFY PHONE</span>
          <h2>Enter your code</h2>
          <p className="lb-auth-intro">The code expires shortly. Never share it with anyone.</p>
          {error && <div className="lb-auth-error">{error}</div>}
          <form onSubmit={verifyOtp} className="lb-auth-form">
            <label><span>Verification code</span><input className="lb-otp-input" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" placeholder="000000" required/></label>
            <button className="lb-primary-button" disabled={busy}>{busy ? "Verifying…" : "Verify and continue"}<Icon name="arrow"/></button>
          </form>
        </section>
      </section>
    </main>;
  }

  const isSignup = mode === "signup";
  return <main className="lb-auth-page">
    <div className="lb-auth-orb one"/><div className="lb-auth-orb two"/>
    <section className="lb-auth-shell">
      <aside className="lb-auth-story">
        <Brand/>
        <div className="lb-story-copy">
          <span className="lb-badge"><i/> Built for confident global communication</span>
          <h1>Speak beyond borders. Learn without limits.</h1>
          <p>A premium AI-ready language workspace for Chinese, English and Amharic—designed around real conversations.</p>
          <div className="lb-story-features"><div><span>01</span><strong>Live voice practice</strong><small>Listen, repeat and improve</small></div><div><span>02</span><strong>Daily progress</strong><small>Build lasting learning habits</small></div></div>
        </div>
        <div className="lb-story-footer">PRIVATE · SECURE · MULTILINGUAL</div>
      </aside>

      <section className="lb-auth-card">
        <div className="lb-mobile-brand"><Brand compact/></div>
        <span className="lb-kicker">SECURE ACCESS</span>
        <h2>{isSignup ? "Create your learning account" : "Welcome back"}</h2>
        <p className="lb-auth-intro">{isSignup ? "Start your personalized language journey in less than a minute." : "Sign in with your registered mobile number to continue."}</p>

        <div className="lb-auth-tabs"><button className={!isSignup ? "active" : ""} onClick={() => { setMode("signin"); setError(""); }}>Sign in</button><button className={isSignup ? "active" : ""} onClick={() => { setMode("signup"); setError(""); }}>Sign up</button></div>

        <div className="lb-social-grid">
          <button type="button" onClick={() => socialAuth("google")} disabled={busy || !configured}><GoogleIcon/><span>Continue with Google</span></button>
          <button type="button" className="apple" onClick={() => socialAuth("apple")} disabled={busy || !configured}><AppleIcon/><span>Continue with Apple</span></button>
        </div>
        <div className="lb-divider"><span>or continue with phone</span></div>

        {error && <div className="lb-auth-error">{error}</div>}
        {!configured && <div className="lb-auth-warning">Authentication variables are missing in Vercel. The learning app remains locked.</div>}

        <form onSubmit={submitCredentials} className="lb-auth-form">
          {isSignup && <label><span>Full name</span><div className="lb-field"><input value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" placeholder="Your full name" required/></div></label>}

          <div className="lb-phone-grid">
            <label><span>Country code</span><div className="lb-field lb-country-field"><b>{country.flag}</b><select value={countryIso} onChange={(event) => { setCountryIso(event.target.value); setPhone(""); }} aria-label="Country calling code">{countries.map((item) => <option key={item.iso} value={item.iso}>{item.flag} {item.name} ({item.dial})</option>)}</select></div></label>
            <label><span>Mobile number</span><div className="lb-field lb-phone-field"><b>{country.dial}</b><input value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, country.iso === "ET" ? 10 : 14))} inputMode="numeric" autoComplete="tel-national" placeholder={country.placeholder} required/></div></label>
          </div>
          <small className="lb-phone-help">{country.iso === "ET" ? "Ethiopia: enter 9XXXXXXXX or the local form 09XXXXXXXX." : "Enter the national mobile number without the international + sign."}</small>

          <label><span>Password</span><div className="lb-field"><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} minLength={isSignup ? 10 : 8} autoComplete={isSignup ? "new-password" : "current-password"} placeholder={isSignup ? "At least 10 characters" : "Your password"} required/><button type="button" className="lb-password-toggle" onClick={() => setShowPassword((current) => !current)}>{showPassword ? "Hide" : "Show"}</button></div></label>
          {isSignup && <label><span>Confirm password</span><div className={`lb-field ${confirmPassword && confirmPassword === password ? "valid" : ""}`}><input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} minLength="10" autoComplete="new-password" placeholder="Repeat your password" required/>{confirmPassword && confirmPassword === password && <i className="lb-valid"><Icon name="check" size={14}/></i>}</div></label>}

          <button className="lb-primary-button" disabled={busy || !configured}>{busy ? "Please wait…" : isSignup ? "Create secure account" : "Sign in"}<Icon name="arrow"/></button>
        </form>
        <p className="lb-legal">By continuing, you agree to protect your account and use LingoBridge responsibly.</p>
      </section>
    </section>
  </main>;
}

function PhraseCard({ item, saved, onSave, onSpeak }) {
  return <article className="lb-phrase-card"><button className="lb-sound-button" onClick={() => onSpeak(item.zh)} aria-label={`Play ${item.zh}`}><Icon name="sound"/></button><div className="lb-phrase-main"><strong>{item.zh}</strong><span>{item.py}</span></div><div className="lb-phrase-meaning"><b>{item.en}</b><small>{item.am}</small></div><button className={`lb-save-button ${saved ? "saved" : ""}`} onClick={() => onSave(item.zh)} aria-label="Save phrase"><Icon name="bookmark"/></button></article>;
}

function HomeView({ go, speak, saved, toggleSaved, displayName }) {
  return <>
    <section className="lb-hero-panel">
      <div className="lb-hero-copy"><span className="lb-kicker">YOUR DAILY LANGUAGE OS</span><h2>Good to see you, {displayName}.</h2><p>Turn everyday moments into confident Chinese conversations.</p><div className="lb-hero-actions"><button onClick={() => go("learn")}>Continue lesson <Icon name="arrow"/></button><button className="secondary" onClick={() => go("translate")}><Icon name="mic"/> Voice practice</button></div></div>
      <div className="lb-hero-orbit"><div><span>译</span><i/></div><small>AI PRACTICE CORE</small></div>
    </section>

    <section className="lb-command-grid">
      <button onClick={() => go("translate")}><span className="cyan"><Icon name="translate"/></span><div><strong>Instant translation</strong><small>Chinese · English · Amharic</small></div><Icon name="arrow"/></button>
      <button onClick={() => go("learn")}><span className="violet"><Icon name="learn"/></span><div><strong>Guided learning</strong><small>Personalized daily lessons</small></div><Icon name="arrow"/></button>
      <button onClick={() => go("saved")}><span className="amber"><Icon name="bookmark"/></span><div><strong>Saved phrases</strong><small>{saved.length} ready to review</small></div><Icon name="arrow"/></button>
    </section>

    <div className="lb-section-title"><div><span>CURRICULUM</span><h3>Continue your path</h3></div><button onClick={() => go("learn")}>View all <Icon name="arrow" size={16}/></button></div>
    <section className="lb-lesson-grid">{lessons.map((lesson) => <button key={lesson.title} onClick={() => go("learn")}><span className={`lb-lesson-icon ${lesson.tone}`}>{lesson.icon}</span><div><strong>{lesson.title}</strong><small>{lesson.subtitle}</small><i><b style={{ width: `${lesson.progress}%` }}/></i><em>{lesson.progress}% complete</em></div></button>)}</section>

    <div className="lb-section-title"><div><span>SMART REVIEW</span><h3>Practice these today</h3></div></div>
    <section className="lb-phrase-list">{phrases.slice(0, 4).map((item) => <PhraseCard key={item.zh} item={item} saved={saved.includes(item.zh)} onSave={toggleSaved} onSpeak={speak}/>)}</section>
  </>;
}

function TranslateView({ speak, saved, toggleSaved }) {
  const [query, setQuery] = useState("");
  const matches = useMemo(() => phrases.filter((item) => `${item.zh} ${item.py} ${item.en} ${item.am}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return <>
    <section className="lb-page-heading"><span className="lb-kicker">TRANSLATE & DISCOVER</span><h2>Find the words you need.</h2><p>Search Chinese characters, pinyin, English or Amharic.</p></section>
    <div className="lb-search"><Icon name="search"/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search 你好, nǐ hǎo, hello, or ሰላም"/><button onClick={() => setQuery("")}>Clear</button></div>
    <section className="lb-voice-studio"><div><span className="lb-kicker">VOICE STUDIO</span><h3>Practice naturally</h3><p>Tap any phrase below to hear clear Mandarin pronunciation.</p></div><button onClick={() => speak("你好，很高兴认识你")}><span><Icon name="mic"/></span><strong>Start sample</strong><small>你好，很高兴认识你</small></button></section>
    <div className="lb-result-meta"><strong>{query ? "Search results" : "Essential phrases"}</strong><span>{matches.length} phrases</span></div>
    <section className="lb-phrase-list">{matches.map((item) => <PhraseCard key={item.zh} item={item} saved={saved.includes(item.zh)} onSave={toggleSaved} onSpeak={speak}/>)}</section>
  </>;
}

function LearnView({ speak }) {
  const [active, setActive] = useState(0);
  const lesson = lessons[active];
  const phrase = phrases[active % phrases.length];
  return <>
    <section className="lb-page-heading"><span className="lb-kicker">PERSONALIZED LEARNING</span><h2>Build confidence one lesson at a time.</h2><p>Short sessions designed for real-life communication.</p></section>
    <section className="lb-learning-layout">
      <div className="lb-course-list">{lessons.map((item, index) => <button key={item.title} className={active === index ? "active" : ""} onClick={() => setActive(index)}><span className={`lb-lesson-icon ${item.tone}`}>{item.icon}</span><div><strong>{item.title}</strong><small>{item.subtitle}</small></div><em>{item.progress}%</em></button>)}</div>
      <article className="lb-practice-panel"><div className="lb-practice-top"><span>{lesson.title}</span><b>Lesson {active + 1} of {lessons.length}</b></div><div className="lb-character">{phrase.zh}</div><div className="lb-pinyin">{phrase.py}</div><button className="lb-play-phrase" onClick={() => speak(phrase.zh)}><Icon name="sound"/> Listen and repeat</button><div className="lb-meaning-grid"><div><small>ENGLISH</small><strong>{phrase.en}</strong></div><div><small>አማርኛ</small><strong>{phrase.am}</strong></div></div><button className="lb-primary-button">Mark as practiced <Icon name="check"/></button></article>
    </section>
  </>;
}

function SavedView({ saved, toggleSaved, speak }) {
  const items = phrases.filter((item) => saved.includes(item.zh));
  return <><section className="lb-page-heading"><span className="lb-kicker">YOUR COLLECTION</span><h2>Saved phrases</h2><p>Review the words you want ready for real conversations.</p></section>{items.length ? <section className="lb-phrase-list">{items.map((item) => <PhraseCard key={item.zh} item={item} saved onSave={toggleSaved} onSpeak={speak}/>)}</section> : <section className="lb-empty"><span>译</span><h3>No saved phrases yet</h3><p>Bookmark phrases from Translate to build your personal collection.</p></section>}</>;
}

function ProfileView({ user, onSignOut }) {
  const name = user?.user_metadata?.full_name || "Language Explorer";
  return <><section className="lb-page-heading"><span className="lb-kicker">ACCOUNT & PROGRESS</span><h2>Your learning profile</h2><p>Manage your secure account and see your momentum.</p></section><section className="lb-profile-grid"><article className="lb-profile-card"><div className="lb-profile-avatar">{name.slice(0, 2).toUpperCase()}</div><h3>{name}</h3><p>{user?.phone || user?.email || "Verified learner"}</p><span><i/> Verified account</span><button onClick={onSignOut}><Icon name="logout"/> Sign out securely</button></article><article className="lb-progress-card"><span className="lb-kicker">THIS WEEK</span><h3>Strong momentum</h3><div className="lb-progress-stats"><div><strong>5</strong><small>day streak</small></div><div><strong>42</strong><small>phrases</small></div><div><strong>86%</strong><small>accuracy</small></div></div><div className="lb-week-bars">{[55,78,43,92,70,35,18].map((height, index) => <i key={index} style={{ height: `${height}%` }}><b>{["M","T","W","T","F","S","S"][index]}</b></i>)}</div></article></section></>;
}

function LearningApp({ session }) {
  const [active, setActive] = useState("home");
  const [saved, setSaved] = useState(["你好", "谢谢"]);
  const [menuOpen, setMenuOpen] = useState(false);
  const user = session.user;
  const displayName = (user?.user_metadata?.full_name || "Explorer").split(" ")[0];
  const nav = [
    ["home", "home", "Overview"],
    ["translate", "translate", "Translate"],
    ["learn", "learn", "Learn"],
    ["saved", "bookmark", "Saved"],
    ["profile", "user", "Profile"],
  ];

  const go = (target) => {
    setActive(target);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSaved = (value) => setSaved((current) => current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);

  const speak = (text) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
  };

  const signOut = async () => {
    const client = getSupabase();
    if (client) await client.auth.signOut();
  };

  return <main className="lb-app-shell">
    <aside className={`lb-sidebar ${menuOpen ? "open" : ""}`}>
      <div className="lb-sidebar-head"><Brand/><button onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button></div>
      <nav>{nav.map(([id, icon, label]) => <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}><Icon name={icon}/><span>{label}</span>{active === id && <i/>}</button>)}</nav>
      <section className="lb-daily-card"><span><Icon name="spark"/></span><strong>Daily goal</strong><small>8 of 10 minutes</small><i><b style={{ width: "80%" }}/></i></section>
      <button className="lb-sidebar-profile" onClick={() => go("profile")}><span>{displayName.slice(0, 2).toUpperCase()}</span><div><strong>{displayName}</strong><small>Mandarin Explorer</small></div><Icon name="arrow"/></button>
    </aside>
    {menuOpen && <button className="lb-menu-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close navigation"/>}

    <section className="lb-workspace">
      <header className="lb-topbar">
        <button className="lb-menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><span/><span/><span/></button>
        <div className="lb-topbar-copy"><span className="lb-kicker">LINGOBRIDGE INTELLIGENCE</span><h1>{active === "home" ? `Welcome, ${displayName}` : nav.find(([id]) => id === active)?.[2]}</h1></div>
        <div className="lb-topbar-actions"><span className="lb-live-status"><i/> Secure session</span><button className="lb-search-button" onClick={() => go("translate")}><Icon name="search"/></button><button className="lb-avatar-button" onClick={() => go("profile")}>{displayName.slice(0, 2).toUpperCase()}</button></div>
      </header>

      <div className="lb-content">
        {active === "home" && <HomeView go={go} speak={speak} saved={saved} toggleSaved={toggleSaved} displayName={displayName}/>} 
        {active === "translate" && <TranslateView speak={speak} saved={saved} toggleSaved={toggleSaved}/>} 
        {active === "learn" && <LearnView speak={speak}/>} 
        {active === "saved" && <SavedView saved={saved} toggleSaved={toggleSaved} speak={speak}/>} 
        {active === "profile" && <ProfileView user={user} onSignOut={signOut}/>} 
      </div>
    </section>

    <nav className="lb-bottom-nav">{nav.slice(0, 5).map(([id, icon, label]) => <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}><Icon name={icon}/><span>{label}</span></button>)}</nav>
  </main>;
}

export default function Page() {
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const client = getSupabase();
    if (!client) {
      setReady(true);
      return undefined;
    }

    let mounted = true;
    client.auth.getSession().then(({ data }) => {
      if (mounted) {
        setSession(data.session || null);
        setReady(true);
      }
    });

    const { data: listener } = client.auth.onAuthStateChange((_event, nextSession) => {
      if (mounted) {
        setSession(nextSession || null);
        setReady(true);
      }
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (!ready) return <LoadingScreen/>;
  if (!session) return <AuthPortal onSession={setSession}/>;
  return <LearningApp session={session}/>;
}
