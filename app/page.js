"use client";

import { useEffect, useMemo, useState } from "react";

const categories = [
  { id: "essentials", name: "Essentials", am: "መሰረታዊ", icon: "fa-sparkles", color: "mint", progress: 72 },
  { id: "conversation", name: "Conversation", am: "ውይይት", icon: "fa-comments", color: "blue", progress: 48 },
  { id: "travel", name: "Travel", am: "ጉዞ", icon: "fa-plane", color: "violet", progress: 31 },
  { id: "food", name: "Food & drink", am: "ምግብ እና መጠጥ", icon: "fa-bowl-food", color: "orange", progress: 24 },
  { id: "business", name: "Business", am: "ንግድ", icon: "fa-briefcase", color: "navy", progress: 12 },
  { id: "daily", name: "Daily life", am: "ዕለታዊ ኑሮ", icon: "fa-sun", color: "rose", progress: 18 },
];

const words = [
  { zh: "你好", py: "nǐ hǎo", en: "Hello", am: "ሰላም", category: "essentials", example: "你好，很高兴认识你。", exampleEn: "Hello, nice to meet you." },
  { zh: "谢谢", py: "xiè xie", en: "Thank you", am: "አመሰግናለሁ", category: "essentials", example: "谢谢你的帮助。", exampleEn: "Thank you for your help." },
  { zh: "很高兴认识你", py: "hěn gāoxìng rènshi nǐ", en: "Nice to meet you", am: "ከእርስዎ ጋር በመተዋወቄ ደስ ብሎኛል", category: "conversation", example: "你好，很高兴认识你。", exampleEn: "Hello, nice to meet you." },
  { zh: "请再说一遍", py: "qǐng zài shuō yí biàn", en: "Please say it again", am: "እባክዎ እንደገና ይናገሩ", category: "conversation", example: "对不起，请再说一遍。", exampleEn: "Sorry, please say it again." },
  { zh: "机场", py: "jī chǎng", en: "Airport", am: "አውሮፕላን ማረፊያ", category: "travel", example: "去机场要多长时间？", exampleEn: "How long does it take to the airport?" },
  { zh: "我想要这个", py: "wǒ xiǎng yào zhè ge", en: "I would like this", am: "ይህንን እፈልጋለሁ", category: "food", example: "你好，我想要这个。", exampleEn: "Hello, I would like this." },
  { zh: "多少钱？", py: "duō shao qián?", en: "How much is it?", am: "ስንት ነው?", category: "business", example: "这个多少钱？", exampleEn: "How much is this?" },
  { zh: "明天见", py: "míng tiān jiàn", en: "See you tomorrow", am: "ነገ እንገናኝ", category: "daily", example: "好的，明天见！", exampleEn: "Okay, see you tomorrow!" },
];

const grammar = [
  { mark: "是", title: "Identity with 是", am: "ማንነትን በ 是 መግለጽ", desc: "Connect a person or thing to a noun.", formula: "Subject + 是 + Noun", example: "我是学生。", py: "Wǒ shì xuésheng.", en: "I am a student.", level: "Beginner", minutes: 5, color: "mint" },
  { mark: "吗", title: "Questions with 吗", am: "ጥያቄዎች በ 吗", desc: "Turn a statement into a yes/no question.", formula: "Statement + 吗？", example: "你是老师吗？", py: "Nǐ shì lǎoshī ma?", en: "Are you a teacher?", level: "Beginner", minutes: 6, color: "blue" },
  { mark: "不", title: "Negatives with 不", am: "አሉታዊ አረፍተ ነገር", desc: "Negate habits, facts and future actions.", formula: "Subject + 不 + Verb", example: "我不喝咖啡。", py: "Wǒ bù hē kāfēi.", en: "I do not drink coffee.", level: "Beginner", minutes: 7, color: "rose" },
  { mark: "的", title: "Possession with 的", am: "ባለቤትነት በ 的", desc: "Show that something belongs to someone.", formula: "Owner + 的 + Object", example: "这是我的书。", py: "Zhè shì wǒ de shū.", en: "This is my book.", level: "Beginner", minutes: 5, color: "violet" },
];

const nav = [
  ["home", "fa-house", "Home"],
  ["discover", "fa-compass", "Explore"],
  ["learn", "fa-bolt", "Learn"],
  ["grammar", "fa-language", "Grammar"],
  ["profile", "fa-user", "Profile"],
];

function Icon({ name }) { return <i className={`fa-solid ${name}`} aria-hidden="true" />; }

export default function Home() {
  const [screen, setScreen] = useState("home");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedGrammar, setSelectedGrammar] = useState(null);
  const [saved, setSaved] = useState(["你好", "谢谢"]);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2200);
    return () => clearTimeout(timer);
  }, [notice]);

  const filteredWords = useMemo(() => words.filter((word) => {
    const matchesCategory = activeCategory === "all" || word.category === activeCategory;
    const text = `${word.zh} ${word.py} ${word.en} ${word.am}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase());
  }), [activeCategory, query]);

  const speak = (text, lang = "zh-CN") => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.82;
    window.speechSynthesis.speak(utterance);
    setNotice("Playing pronunciation");
  };

  const toggleSaved = (zh) => {
    setSaved((current) => current.includes(zh) ? current.filter((item) => item !== zh) : [...current, zh]);
  };

  const go = (next) => {
    setScreen(next);
    setSelectedWord(null);
    setSelectedGrammar(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="app">
      <aside className="desktop-sidebar">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          {nav.map(([id, icon, label]) => (
            <button key={id} className={screen === id ? "active" : ""} onClick={() => go(id)}>
              <Icon name={icon} /><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-card">
          <div className="sidebar-orbit"><Icon name="fa-wand-magic-sparkles" /></div>
          <strong>Daily goal</strong><span>8 of 10 minutes</span>
          <div className="tiny-progress"><i style={{ width: "80%" }} /></div>
        </div>
        <button className="profile-mini" onClick={() => go("profile")}><span>MA</span><div><b>Mahir</b><small>Level 4 · Explorer</small></div><Icon name="fa-chevron-right" /></button>
      </aside>

      <section className="app-content">
        <header className="mobile-header">
          <Brand compact />
          <div className="header-actions">
            <button className="icon-button" aria-label="Search" onClick={() => go("discover")}><Icon name="fa-magnifying-glass" /></button>
            <button className="avatar-button" aria-label="Profile" onClick={() => go("profile")}>MA</button>
          </div>
        </header>

        <div className="screen-wrap" key={screen}>
          {screen === "home" && <HomeScreen go={go} speak={speak} setSelectedWord={setSelectedWord} />}
          {screen === "discover" && <DiscoverScreen query={query} setQuery={setQuery} activeCategory={activeCategory} setActiveCategory={setActiveCategory} filteredWords={filteredWords} saved={saved} toggleSaved={toggleSaved} speak={speak} setSelectedWord={setSelectedWord} />}
          {screen === "learn" && <LearnScreen speak={speak} setSelectedWord={setSelectedWord} />}
          {screen === "grammar" && <GrammarScreen setSelectedGrammar={setSelectedGrammar} />}
          {screen === "profile" && <ProfileScreen saved={saved.length} />}
        </div>
      </section>

      <nav className="bottom-nav" aria-label="Mobile navigation">
        {nav.map(([id, icon, label]) => (
          <button key={id} className={screen === id ? "active" : ""} onClick={() => go(id)}>
            <span className="nav-icon"><Icon name={icon} /></span><small>{label}</small>
          </button>
        ))}
      </nav>

      {selectedWord && <WordSheet word={selectedWord} saved={saved.includes(selectedWord.zh)} close={() => setSelectedWord(null)} speak={speak} toggleSaved={toggleSaved} />}
      {selectedGrammar && <GrammarSheet item={selectedGrammar} close={() => setSelectedGrammar(null)} speak={speak} />}
      <div className={`toast ${notice ? "show" : ""}`} role="status"><Icon name="fa-volume-high" /> {notice}</div>
    </main>
  );
}

function Brand({ compact = false }) {
  return <div className={`brand ${compact ? "compact" : ""}`}><span className="brand-mark">译</span><div><b>Lingo<span>Bridge</span></b>{!compact && <small>Mandarin, made natural.</small>}</div></div>;
}

function HomeScreen({ go, speak }) {
  const [listening, setListening] = useState(false);
  const [camera, setCamera] = useState(true);
  const pulseVoice = () => { setListening(true); speak("你好，很高兴认识你"); setTimeout(() => setListening(false), 2400); };
  return <div className="cyber-home">
    <div className="cyber-topline"><div><span className="system-dot" />LINGOBRIDGE NEURAL</div><div className="offline-pill"><Icon name="fa-cloud-arrow-down" /> Offline ready</div></div>
    <section className={`ar-stage ${camera ? "camera-on" : ""}`}>
      <div className="neural-grid" /><div className="particle p1" /><div className="particle p2" /><div className="particle p3" />
      <div className="ar-toolbar"><button onClick={() => setCamera(!camera)}><Icon name={camera ? "fa-video" : "fa-video-slash"} /></button><span>LIVE AR TRANSLATION</span><button><Icon name="fa-bolt" /></button></div>
      <div className="scan-line" />
      <div className="street-scene"><div className="building b1" /><div className="building b2" /><div className="road" /><div className="street-sign">前门大街</div></div>
      <div className="translation-bubble bubble-one"><small>DETECTED · 中文</small><b>前门大街</b><span>Qianmen Street</span><em>ቺያንሜን ጎዳና</em></div>
      <div className="translation-bubble bubble-two"><small>LIVE · 98%</small><b>出口</b><span>Exit · መውጫ</span></div>
      <div className="focus-corners"><i /><i /><i /><i /></div>
      <div className="copilot"><span className="copilot-core"><i /></span><div><small>NOVA · AI COPILOT</small><b>I found 2 translations</b></div></div>
      <div className="gesture-hint"><i /><span>Swipe to scan</span></div>
    </section>
    <section className={`voice-console ${listening ? "listening" : ""}`}>
      <div className="language-orbit"><button className="orb en">EN</button><button className="orb zh">中</button><button className="orb am">አ</button><div className="orbit-line" /></div>
      <div className="voice-title"><span>{listening ? "NEURAL LISTENING" : "VOICE TRANSLATOR"}</span><small>{listening ? "Speak naturally…" : "Tap the core and start speaking"}</small></div>
      <button className="voice-core" onClick={pulseVoice} aria-label="Start voice translation"><span><Icon name={listening ? "fa-wave-square" : "fa-microphone"} /></span></button>
      <div className="waveform" aria-hidden="true">{[16,28,44,25,54,34,63,30,48,22,39,18].map((height, i) => <i key={i} style={{ "--wave": `${height}px`, "--delay": `${i * .06}s` }} />)}</div>
      <div className="voice-result"><span>你好，很高兴认识你</span><b>Hello, nice to meet you</b><em>ሰላም፣ ከእርስዎ ጋር በመተዋወቄ ደስ ብሎኛል</em></div>
    </section>
    <div className="mode-heading"><div><span>NEURAL MODES</span><h2>Translate beyond words</h2></div><button onClick={() => go("discover")}>View all <Icon name="fa-arrow-right" /></button></div>
    <div className="cyber-modes">
      <button onClick={() => go("discover")}><span className="mode-icon cyan"><Icon name="fa-camera" /></span><div><b>AR Lens</b><small>Translate the world live</small></div><Icon name="fa-chevron-right" /></button>
      <button onClick={() => go("learn")}><span className="mode-icon magenta"><Icon name="fa-user-group" /></span><div><b>Conversation</b><small>Real-time two-way mode</small></div><Icon name="fa-chevron-right" /></button>
      <button onClick={() => go("grammar")}><span className="mode-icon blue"><Icon name="fa-brain" /></span><div><b>AI Grammar</b><small>Understand every pattern</small></div><Icon name="fa-chevron-right" /></button>
    </div>
    <section className="conversation-preview">
      <div className="conversation-head"><span>LIVE CONVERSATION</span><div><i />SECURE</div></div>
      <div className="speaker speaker-left"><div className="holo-avatar">M</div><span><b>How are you today?</b><small>English · Mahir</small></span></div>
      <div className="conversation-wave"><i /><i /><i /><i /><i /><span><Icon name="fa-arrows-rotate" /></span><i /><i /><i /><i /><i /></div>
      <div className="speaker speaker-right"><span><b>你今天好吗？</b><small>中文 · Nova voice</small></span><div className="holo-avatar chinese">林</div></div>
    </section>
  </div>;
}

function DiscoverScreen({ query, setQuery, activeCategory, setActiveCategory, filteredWords, saved, toggleSaved, speak, setSelectedWord }) {
  return <>
    <PageTitle eyebrow="TRANSLATE & DISCOVER" title="Find the words you need." text="Chinese, Pinyin, English and Amharic—all in one place." />
    <div className="search-box"><Icon name="fa-magnifying-glass" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search 你好, nǐ hǎo, hello, or ሰላም" /><button onClick={() => setQuery("")} className={query ? "visible" : ""}><Icon name="fa-xmark" /></button></div>
    <div className="category-scroll">
      <button className={activeCategory === "all" ? "active" : ""} onClick={() => setActiveCategory("all")}>All words</button>
      {categories.map((category) => <button key={category.id} className={activeCategory === category.id ? "active" : ""} onClick={() => setActiveCategory(category.id)}>{category.name}</button>)}
    </div>
    {!query && activeCategory === "all" && <div className="category-cards">{categories.map((category) => <button key={category.id} className={`category-card ${category.color}`} onClick={() => setActiveCategory(category.id)}><span><Icon name={category.icon} /></span><b>{category.name}</b><small>{category.am}</small><div><i style={{ width: `${category.progress}%` }} /></div><em>{category.progress}%</em></button>)}</div>}
    <div className="section-head inline result-head"><h2>{query ? "Search results" : activeCategory === "all" ? "Popular now" : categories.find((c) => c.id === activeCategory)?.name}</h2><span>{filteredWords.length} phrases</span></div>
    <div className="word-list">{filteredWords.map((word) => <WordRow key={word.zh} word={word} isSaved={saved.includes(word.zh)} toggleSaved={toggleSaved} speak={speak} open={() => setSelectedWord(word)} />)}</div>
    {!filteredWords.length && <div className="empty-state"><span>找</span><h3>No phrase found</h3><p>Try another spelling or browse a category.</p></div>}
  </>;
}

function WordRow({ word, isSaved, toggleSaved, speak, open }) {
  return <article className="word-row-new" onClick={open}><button className="word-audio" onClick={(e) => { e.stopPropagation(); speak(word.zh); }}><Icon name="fa-volume-high" /></button><div className="word-copy"><div><strong>{word.zh}</strong><span>{word.py}</span></div><p>{word.en}<span />{word.am}</p></div><button className={`save-button ${isSaved ? "saved" : ""}`} onClick={(e) => { e.stopPropagation(); toggleSaved(word.zh); }} aria-label="Save word"><Icon name={isSaved ? "fa-bookmark" : "fa-regular fa-bookmark"} /></button></article>;
}

function LearnScreen({ speak, setSelectedWord }) {
  const [index, setIndex] = useState(0); const word = words[index];
  return <>
    <PageTitle eyebrow="PERSONAL LESSON" title="Speak with confidence." text="Listen, repeat, and make each phrase yours." />
    <div className="lesson-top"><button disabled={!index} onClick={() => setIndex(index - 1)}><Icon name="fa-arrow-left" /></button><div><span>LESSON {index + 1} OF {words.length}</span><i><b style={{ width: `${((index + 1) / words.length) * 100}%` }} /></i></div><button onClick={() => setSelectedWord(word)}><Icon name="fa-ellipsis" /></button></div>
    <section className="practice-card">
      <span className="practice-label">LISTEN & REPEAT</span><strong>{word.zh}</strong><em>{word.py}</em><button className="big-sound" onClick={() => speak(word.zh)}><span><Icon name="fa-volume-high" /></span>Play slowly</button>
      <div className="meaning-grid"><div><small>ENGLISH</small><b>{word.en}</b></div><div><small>አማርኛ</small><b>{word.am}</b></div></div>
    </section>
    <div className="example-card"><span><Icon name="fa-message" /></span><div><small>IN A SENTENCE</small><b>{word.example}</b><em>{word.exampleEn}</em></div><button onClick={() => speak(word.example)}><Icon name="fa-volume-high" /></button></div>
    <button className="record-action" onClick={() => speak(word.zh)}><span><Icon name="fa-microphone" /></span><div><b>Hold to practice</b><small>Tap to hear the model pronunciation</small></div></button>
    <button className="primary-action" onClick={() => setIndex(index === words.length - 1 ? 0 : index + 1)}>Continue <Icon name="fa-arrow-right" /></button>
  </>;
}

function GrammarScreen({ setSelectedGrammar }) {
  return <>
    <PageTitle eyebrow="GRAMMAR STUDIO" title="Understand the pattern." text="Clear explanations with English and Amharic support." />
    <section className="grammar-hero-new"><span>语</span><div><small>RECOMMENDED FOR YOU</small><h2>Chinese word order</h2><p>Subject + Time + Place + Verb + Object</p><button onClick={() => setSelectedGrammar(grammar[0])}>Start lesson <Icon name="fa-arrow-right" /></button></div></section>
    <div className="section-head inline"><h2>Core foundations</h2><span>4 lessons</span></div>
    <div className="grammar-grid-new">{grammar.map((item, index) => <button key={item.mark} onClick={() => setSelectedGrammar(item)}><span className={item.color}>{item.mark}</span><div><small>{item.level.toUpperCase()} · {item.minutes} MIN</small><b>{item.title}</b><em>{item.am}</em><p>{item.desc}</p></div><i><Icon name="fa-chevron-right" /></i></button>)}</div>
  </>;
}

function ProfileScreen({ saved }) {
  return <>
    <PageTitle eyebrow="YOUR PROGRESS" title="You are building momentum." text="Every phrase learned brings you closer to a real conversation." />
    <div className="profile-hero"><div className="profile-avatar">MA<span>4</span></div><h2>Mahir Aman</h2><p>Mandarin Explorer · Addis Ababa</p><div className="profile-stats"><div><b>12</b><small>Day streak</small></div><div><b>148</b><small>Words learned</small></div><div><b>{saved}</b><small>Saved phrases</small></div></div></div>
    <div className="weekly-card"><div><span><Icon name="fa-chart-line" /></span><div><b>Weekly activity</b><small>42 minutes this week</small></div><em>+18%</em></div><div className="week-bars">{[38,72,52,88,64,28,10].map((height, i) => <span key={i}><i style={{ height: `${height}%` }} /><small>{["M","T","W","T","F","S","S"][i]}</small></span>)}</div></div>
    <div className="settings-list"><button><span><Icon name="fa-sliders" /></span><div><b>Learning preferences</b><small>Goals, reminders and level</small></div><Icon name="fa-chevron-right" /></button><button><span><Icon name="fa-language" /></span><div><b>Translation language</b><small>English + አማርኛ</small></div><Icon name="fa-chevron-right" /></button><button><span><Icon name="fa-circle-question" /></span><div><b>Help & feedback</b><small>We would love to hear from you</small></div><Icon name="fa-chevron-right" /></button></div>
  </>;
}

function PageTitle({ eyebrow, title, text }) { return <div className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>; }

function WordSheet({ word, saved, close, speak, toggleSaved }) {
  return <div className="sheet-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}><section className="detail-sheet"><div className="sheet-handle" /><button className="sheet-close" onClick={close}><Icon name="fa-xmark" /></button><div className="sheet-word"><button onClick={() => speak(word.zh)}><Icon name="fa-volume-high" /></button><strong>{word.zh}</strong><span>{word.py}</span></div><div className="sheet-translations"><div><small>ENGLISH</small><b>{word.en}</b></div><div><small>አማርኛ</small><b>{word.am}</b></div></div><div className="sheet-example"><small>EXAMPLE</small><strong>{word.example}</strong><span>{word.exampleEn}</span><button onClick={() => speak(word.example)}><Icon name="fa-volume-high" /></button></div><button className={`primary-action ${saved ? "secondary" : ""}`} onClick={() => toggleSaved(word.zh)}><Icon name="fa-bookmark" /> {saved ? "Saved to your phrases" : "Save this phrase"}</button></section></div>;
}

function GrammarSheet({ item, close, speak }) {
  return <div className="sheet-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}><section className="detail-sheet grammar-detail"><div className="sheet-handle" /><button className="sheet-close" onClick={close}><Icon name="fa-xmark" /></button><span className={`grammar-symbol ${item.color}`}>{item.mark}</span><small>{item.level.toUpperCase()} · {item.minutes} MIN</small><h2>{item.title}</h2><p>{item.desc}</p><div className="formula-box"><small>PATTERN</small><b>{item.formula}</b></div><div className="grammar-example"><small>EXAMPLE</small><strong>{item.example}</strong><span>{item.py}</span><b>{item.en}</b><button onClick={() => speak(item.example)}><Icon name="fa-volume-high" /></button></div><button className="primary-action" onClick={close}>Got it <Icon name="fa-check" /></button></section></div>;
}
