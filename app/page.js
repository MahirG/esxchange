"use client";

import { useEffect, useMemo, useState } from "react";

const categories = [
  { id: "basics", name: "Basics", am: "መጀመሪያ", icon: "fa-seedling", color: "mint", progress: 76 },
  { id: "essentials", name: "Essentials", am: "መሰረታዊ", icon: "fa-sparkles", color: "blue", progress: 72 },
  { id: "daily", name: "Daily life", am: "ዕለታዊ ኑሮ", icon: "fa-sun", color: "rose", progress: 54 },
  { id: "conversation", name: "Conversation", am: "ውይይት", icon: "fa-comments", color: "violet", progress: 48 },
  { id: "food", name: "Food & drink", am: "ምግብ እና መጠጥ", icon: "fa-bowl-food", color: "orange", progress: 39 },
  { id: "shopping", name: "Shopping", am: "ግብይት", icon: "fa-bag-shopping", color: "mint", progress: 34 },
  { id: "travel", name: "Travel", am: "ጉዞ", icon: "fa-plane", color: "blue", progress: 31 },
  { id: "time", name: "Time & numbers", am: "ጊዜ እና ቁጥር", icon: "fa-clock", color: "violet", progress: 29 },
  { id: "family", name: "Family", am: "ቤተሰብ", icon: "fa-people-roof", color: "rose", progress: 26 },
  { id: "health", name: "Health", am: "ጤና", icon: "fa-heart-pulse", color: "orange", progress: 21 },
  { id: "business", name: "Business", am: "ንግድ", icon: "fa-briefcase", color: "navy", progress: 18 },
];

const words = [
  { zh: "我", py: "wǒ", en: "I / me", am: "እኔ", category: "basics", example: "我是学生。", exampleEn: "I am a student." },
  { zh: "你", py: "nǐ", en: "You", am: "አንተ / አንቺ", category: "basics", example: "你好吗？", exampleEn: "How are you?" },
  { zh: "他", py: "tā", en: "He / him", am: "እሱ", category: "basics", example: "他是老师。", exampleEn: "He is a teacher." },
  { zh: "她", py: "tā", en: "She / her", am: "እሷ", category: "basics", example: "她很忙。", exampleEn: "She is busy." },
  { zh: "我们", py: "wǒ men", en: "We / us", am: "እኛ", category: "basics", example: "我们一起学习。", exampleEn: "We study together." },
  { zh: "你好", py: "nǐ hǎo", en: "Hello", am: "ሰላም", category: "essentials", example: "你好，很高兴认识你。", exampleEn: "Hello, nice to meet you." },
  { zh: "早上好", py: "zǎo shang hǎo", en: "Good morning", am: "እንደምን አደርክ / አደርሽ", category: "essentials", example: "早上好，今天好吗？", exampleEn: "Good morning, how are you today?" },
  { zh: "晚上好", py: "wǎn shang hǎo", en: "Good evening", am: "እንደምን አመሸህ / አመሸሽ", category: "essentials", example: "晚上好，欢迎你。", exampleEn: "Good evening, welcome." },
  { zh: "谢谢", py: "xiè xie", en: "Thank you", am: "አመሰግናለሁ", category: "essentials", example: "谢谢你的帮助。", exampleEn: "Thank you for your help." },
  { zh: "不客气", py: "bú kè qi", en: "You are welcome", am: "ምንም አይደለም", category: "essentials", example: "谢谢！不客气。", exampleEn: "Thank you! You are welcome." },
  { zh: "对不起", py: "duì bu qǐ", en: "Sorry", am: "ይቅርታ", category: "essentials", example: "对不起，我迟到了。", exampleEn: "Sorry, I am late." },
  { zh: "没关系", py: "méi guān xi", en: "It is okay", am: "ችግር የለም", category: "essentials", example: "没关系，请进。", exampleEn: "It is okay, please come in." },
  { zh: "很高兴认识你", py: "hěn gāoxìng rènshi nǐ", en: "Nice to meet you", am: "ከእርስዎ ጋር በመተዋወቄ ደስ ብሎኛል", category: "conversation", example: "你好，很高兴认识你。", exampleEn: "Hello, nice to meet you." },
  { zh: "请再说一遍", py: "qǐng zài shuō yí biàn", en: "Please say it again", am: "እባክዎ እንደገና ይናገሩ", category: "conversation", example: "对不起，请再说一遍。", exampleEn: "Sorry, please say it again." },
  { zh: "你叫什么名字？", py: "nǐ jiào shén me míng zi?", en: "What is your name?", am: "ስምህ / ስምሽ ማን ነው?", category: "conversation", example: "你好，你叫什么名字？", exampleEn: "Hello, what is your name?" },
  { zh: "我叫马希尔", py: "wǒ jiào Mǎ xī ěr", en: "My name is Mahir", am: "ስሜ ማሂር ነው", category: "conversation", example: "你好，我叫马希尔。", exampleEn: "Hello, my name is Mahir." },
  { zh: "你会说英语吗？", py: "nǐ huì shuō Yīng yǔ ma?", en: "Do you speak English?", am: "እንግሊዝኛ መናገር ትችላለህ / ትችያለሽ?", category: "conversation", example: "请问，你会说英语吗？", exampleEn: "Excuse me, do you speak English?" },
  { zh: "我不太明白", py: "wǒ bú tài míng bai", en: "I do not quite understand", am: "በደንብ አልገባኝም", category: "conversation", example: "对不起，我不太明白。", exampleEn: "Sorry, I do not quite understand." },
  { zh: "机场", py: "jī chǎng", en: "Airport", am: "አውሮፕላን ማረፊያ", category: "travel", example: "去机场要多长时间？", exampleEn: "How long does it take to the airport?" },
  { zh: "酒店", py: "jiǔ diàn", en: "Hotel", am: "ሆቴል", category: "travel", example: "酒店在哪里？", exampleEn: "Where is the hotel?" },
  { zh: "出租车", py: "chū zū chē", en: "Taxi", am: "ታክሲ", category: "travel", example: "我想叫出租车。", exampleEn: "I want to call a taxi." },
  { zh: "火车站", py: "huǒ chē zhàn", en: "Train station", am: "የባቡር ጣቢያ", category: "travel", example: "火车站远吗？", exampleEn: "Is the train station far?" },
  { zh: "洗手间", py: "xǐ shǒu jiān", en: "Bathroom", am: "መጸዳጃ ቤት", category: "daily", example: "洗手间在哪里？", exampleEn: "Where is the bathroom?" },
  { zh: "家", py: "jiā", en: "Home", am: "ቤት", category: "daily", example: "我回家了。", exampleEn: "I am going home." },
  { zh: "工作", py: "gōng zuò", en: "Work", am: "ሥራ", category: "daily", example: "我今天工作很忙。", exampleEn: "I am busy at work today." },
  { zh: "学习", py: "xué xí", en: "Study / learn", am: "መማር", category: "daily", example: "我每天学习中文。", exampleEn: "I study Chinese every day." },
  { zh: "手机", py: "shǒu jī", en: "Phone", am: "ስልክ", category: "daily", example: "我的手机没电了。", exampleEn: "My phone has no battery." },
  { zh: "水", py: "shuǐ", en: "Water", am: "ውሃ", category: "food", example: "请给我一杯水。", exampleEn: "Please give me a cup of water." },
  { zh: "咖啡", py: "kā fēi", en: "Coffee", am: "ቡና", category: "food", example: "我想喝咖啡。", exampleEn: "I want to drink coffee." },
  { zh: "米饭", py: "mǐ fàn", en: "Rice", am: "ሩዝ", category: "food", example: "我想吃米饭。", exampleEn: "I want to eat rice." },
  { zh: "菜单", py: "cài dān", en: "Menu", am: "የምግብ ዝርዝር", category: "food", example: "请给我菜单。", exampleEn: "Please give me the menu." },
  { zh: "我想要这个", py: "wǒ xiǎng yào zhè ge", en: "I would like this", am: "ይህንን እፈልጋለሁ", category: "food", example: "你好，我想要这个。", exampleEn: "Hello, I would like this." },
  { zh: "多少钱？", py: "duō shao qián?", en: "How much is it?", am: "ስንት ነው?", category: "business", example: "这个多少钱？", exampleEn: "How much is this?" },
  { zh: "太贵了", py: "tài guì le", en: "Too expensive", am: "በጣም ውድ ነው", category: "shopping", example: "这个太贵了。", exampleEn: "This is too expensive." },
  { zh: "便宜一点", py: "pián yi yì diǎn", en: "A little cheaper", am: "ትንሽ ይቀንሱ", category: "shopping", example: "可以便宜一点吗？", exampleEn: "Can it be a little cheaper?" },
  { zh: "我要买这个", py: "wǒ yào mǎi zhè ge", en: "I want to buy this", am: "ይህንን መግዛት እፈልጋለሁ", category: "shopping", example: "我要买这个。", exampleEn: "I want to buy this." },
  { zh: "现金", py: "xiàn jīn", en: "Cash", am: "ጥሬ ገንዘብ", category: "shopping", example: "可以用现金吗？", exampleEn: "Can I use cash?" },
  { zh: "今天", py: "jīn tiān", en: "Today", am: "ዛሬ", category: "time", example: "今天我很忙。", exampleEn: "Today I am busy." },
  { zh: "明天", py: "míng tiān", en: "Tomorrow", am: "ነገ", category: "time", example: "明天我们见面。", exampleEn: "Tomorrow we will meet." },
  { zh: "现在", py: "xiàn zài", en: "Now", am: "አሁን", category: "time", example: "我现在有时间。", exampleEn: "I have time now." },
  { zh: "几点？", py: "jǐ diǎn?", en: "What time?", am: "ስንት ሰዓት?", category: "time", example: "现在几点？", exampleEn: "What time is it now?" },
  { zh: "爸爸", py: "bà ba", en: "Father", am: "አባት", category: "family", example: "我爸爸在家。", exampleEn: "My father is at home." },
  { zh: "妈妈", py: "mā ma", en: "Mother", am: "እናት", category: "family", example: "我妈妈很好。", exampleEn: "My mother is well." },
  { zh: "朋友", py: "péng yǒu", en: "Friend", am: "ጓደኛ", category: "family", example: "他是我的朋友。", exampleEn: "He is my friend." },
  { zh: "孩子", py: "hái zi", en: "Child", am: "ልጅ", category: "family", example: "孩子在学校。", exampleEn: "The child is at school." },
  { zh: "我不舒服", py: "wǒ bù shū fu", en: "I do not feel well", am: "አልተመቸኝም", category: "health", example: "今天我不舒服。", exampleEn: "I do not feel well today." },
  { zh: "医院", py: "yī yuàn", en: "Hospital", am: "ሆስፒታል", category: "health", example: "医院在哪里？", exampleEn: "Where is the hospital?" },
  { zh: "药", py: "yào", en: "Medicine", am: "መድኃኒት", category: "health", example: "我需要药。", exampleEn: "I need medicine." },
  { zh: "帮助", py: "bāng zhù", en: "Help", am: "እርዳታ", category: "health", example: "请帮助我。", exampleEn: "Please help me." },
  { zh: "会议", py: "huì yì", en: "Meeting", am: "ስብሰባ", category: "business", example: "会议几点开始？", exampleEn: "What time does the meeting start?" },
  { zh: "合同", py: "hé tong", en: "Contract", am: "ውል", category: "business", example: "这是合同。", exampleEn: "This is the contract." },
  { zh: "付款", py: "fù kuǎn", en: "Payment", am: "ክፍያ", category: "business", example: "付款已经完成。", exampleEn: "The payment is complete." },
  { zh: "明天见", py: "míng tiān jiàn", en: "See you tomorrow", am: "ነገ እንገናኝ", category: "daily", example: "好的，明天见！", exampleEn: "Okay, see you tomorrow!" },
];

const grammar = [
  { mark: "是", title: "Identity with 是", am: "ማንነትን በ 是 መግለጽ", desc: "Connect a person or thing to a noun.", formula: "Subject + 是 + Noun", example: "我是学生。", py: "Wǒ shì xuésheng.", en: "I am a student.", level: "Beginner", minutes: 5, color: "mint" },
  { mark: "吗", title: "Questions with 吗", am: "ጥያቄዎች በ 吗", desc: "Turn a statement into a yes/no question.", formula: "Statement + 吗？", example: "你是老师吗？", py: "Nǐ shì lǎoshī ma?", en: "Are you a teacher?", level: "Beginner", minutes: 6, color: "blue" },
  { mark: "不", title: "Negatives with 不", am: "አሉታዊ አረፍተ ነገር", desc: "Negate habits, facts and future actions.", formula: "Subject + 不 + Verb", example: "我不喝咖啡。", py: "Wǒ bù hē kāfēi.", en: "I do not drink coffee.", level: "Beginner", minutes: 7, color: "rose" },
  { mark: "的", title: "Possession with 的", am: "ባለቤትነት በ 的", desc: "Show that something belongs to someone.", formula: "Owner + 的 + Object", example: "这是我的书。", py: "Zhè shì wǒ de shū.", en: "This is my book.", level: "Beginner", minutes: 5, color: "violet" },
  { mark: "在", title: "Location with 在", am: "ቦታን በ 在 መግለጽ", desc: "Say where a person or thing is located.", formula: "Subject + 在 + Place", example: "我在家。", py: "Wǒ zài jiā.", en: "I am at home.", level: "Beginner", minutes: 6, color: "mint" },
  { mark: "有", title: "Have with 有", am: "ያለውን በ 有 መግለጽ", desc: "Talk about possession or existence.", formula: "Subject + 有 + Object", example: "我有手机。", py: "Wǒ yǒu shǒujī.", en: "I have a phone.", level: "Beginner", minutes: 6, color: "blue" },
  { mark: "想", title: "Want to with 想", am: "ፍላጎትን በ 想 መግለጽ", desc: "Express what you want to do.", formula: "Subject + 想 + Verb", example: "我想喝水。", py: "Wǒ xiǎng hē shuǐ.", en: "I want to drink water.", level: "Beginner", minutes: 7, color: "rose" },
  { mark: "要", title: "Need / will with 要", am: "ፍላጎት ወይም ዕቅድ በ 要", desc: "Ask for something or talk about a near plan.", formula: "Subject + 要 + Object / Verb", example: "我要买这个。", py: "Wǒ yào mǎi zhège.", en: "I want to buy this.", level: "Beginner", minutes: 8, color: "violet" },
];

const basics = [
  { title: "Pronouns", am: "ተውላጠ ስሞች", items: ["我", "你", "他", "她", "我们"] },
  { title: "Polite words", am: "የአክብሮት ቃላት", items: ["请", "谢谢", "对不起", "没关系"] },
  { title: "Daily actions", am: "ዕለታዊ ተግባራት", items: ["吃", "喝", "去", "买", "学习"] },
];

const quizzes = [
  { title: "Daily Life Sprint", am: "ዕለታዊ ቃላት ፈተና", questions: 12, time: "4 min", focus: "Home, work, phone, bathroom" },
  { title: "Shopping Survival", am: "የግብይት ተግባር", questions: 10, time: "3 min", focus: "Prices, bargaining, payment" },
  { title: "Food Order Drill", am: "የምግብ ትዕዛዝ", questions: 9, time: "3 min", focus: "Menu, water, coffee, rice" },
];

const challenges = [
  { day: "Day 1", title: "Greet 5 people", am: "5 ሰዎችን ሰላም በል", reward: "+80 XP" },
  { day: "Day 2", title: "Order food in Chinese", am: "ምግብ በቻይንኛ አዝዝ", reward: "+120 XP" },
  { day: "Day 3", title: "Ask directions politely", am: "አቅጣጫ በአክብሮት ጠይቅ", reward: "+150 XP" },
  { day: "Day 4", title: "Complete a voice quiz", am: "የድምፅ ፈተና ጨርስ", reward: "+180 XP" },
];

const nav = [
  ["home", "fa-house", "Home"],
  ["discover", "fa-compass", "Explore"],
  ["learn", "fa-bolt", "Learn"],
  ["grammar", "fa-language", "Grammar"],
  ["profile", "fa-user", "Profile"],
];

const menuItems = [
  ["home", "fa-house", "Home", "Start live translation"],
  ["discover", "fa-book-open", "Dictionary", "Search words and phrases"],
  ["learn", "fa-graduation-cap", "Lessons", "Practice daily Chinese"],
  ["learn", "fa-circle-question", "Quizzes", "Test your memory"],
  ["learn", "fa-trophy", "Challenges", "Build your streak"],
  ["grammar", "fa-language", "Grammar", "Learn sentence patterns"],
  ["profile", "fa-user-gear", "Profile", "Progress and saved words"],
  ["profile", "fa-sliders", "Settings", "Theme and preferences"],
  ["profile", "fa-headset", "Help", "Support and feedback"],
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
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState("signin");

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 2200);
    return () => clearTimeout(timer);
  }, [notice]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

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
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuth = () => {
    setIsAuthenticated(true);
    setNotice(authMode === "signup" ? "Account created" : "Signed in");
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setMenuOpen(false);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isAuthenticated) {
    return <main className={`app auth-app theme-${theme}`}>
      <header className="auth-header">
        <Brand />
        <ThemeSwitch theme={theme} setTheme={setTheme} />
      </header>
      <AuthScreen mode={authMode} setMode={setAuthMode} submit={handleAuth} />
    </main>;
  }

  return (
    <main className={`app theme-${theme}`}>
      <aside className="desktop-sidebar">
        <Brand />
        <ThemeSwitch theme={theme} setTheme={setTheme} />
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
          <button className="hamburger-button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}><span /><span /><span /></button>
          <Brand compact />
          <div className="header-actions">
            <ThemeSwitch theme={theme} setTheme={setTheme} compact />
            <button className="icon-button" aria-label="Search" onClick={() => go("discover")}><Icon name="fa-magnifying-glass" /></button>
            <button className="avatar-button" aria-label="Profile" onClick={() => go("profile")}>MA</button>
          </div>
        </header>

        <div className="screen-wrap" key={screen}>
          {screen === "home" && <HomeScreen go={go} speak={speak} setSelectedWord={setSelectedWord} />}
          {screen === "discover" && <DiscoverScreen query={query} setQuery={setQuery} activeCategory={activeCategory} setActiveCategory={setActiveCategory} filteredWords={filteredWords} saved={saved} toggleSaved={toggleSaved} speak={speak} setSelectedWord={setSelectedWord} />}
          {screen === "learn" && <LearnScreen speak={speak} setSelectedWord={setSelectedWord} />}
          {screen === "grammar" && <GrammarScreen setSelectedGrammar={setSelectedGrammar} />}
          {screen === "profile" && <ProfileScreen saved={saved.length} signOut={signOut} />}
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
      <MenuDrawer open={menuOpen} close={() => setMenuOpen(false)} go={go} screen={screen} theme={theme} setTheme={setTheme} />
      <div className={`toast ${notice ? "show" : ""}`} role="status"><Icon name="fa-volume-high" /> {notice}</div>
    </main>
  );
}

function Brand({ compact = false }) {
  return <div className={`brand ${compact ? "compact" : ""}`}><span className="brand-mark">译</span><div><b>Lingo<span>Bridge</span></b>{!compact && <small>Mandarin, made natural.</small>}</div></div>;
}

function ThemeSwitch({ theme, setTheme, compact = false }) {
  const isLight = theme === "light";
  return <button className={`theme-switch ${isLight ? "light" : ""} ${compact ? "compact" : ""}`} onClick={() => setTheme(isLight ? "dark" : "light")} aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}>
    <span><Icon name={isLight ? "fa-sun" : "fa-moon"} /></span>
    {!compact && <b>{isLight ? "Light" : "Dark"} mode</b>}
  </button>;
}

function MenuDrawer({ open, close, go, screen, theme, setTheme }) {
  return <div className={`menu-backdrop ${open ? "open" : ""}`} onMouseDown={(event) => event.target === event.currentTarget && close()}>
    <aside className="menu-drawer" aria-hidden={!open}>
      <div className="menu-head">
        <Brand />
        <button className="menu-close" onClick={close} aria-label="Close menu"><Icon name="fa-xmark" /></button>
      </div>
      <div className="menu-profile">
        <div className="menu-avatar">MA</div>
        <div><b>Mahir</b><span>Mandarin Explorer · Level 4</span></div>
      </div>
      <ThemeSwitch theme={theme} setTheme={setTheme} />
      <nav className="menu-list" aria-label="Menu">
        {menuItems.map(([target, icon, label, desc], index) => (
          <button key={`${label}-${index}`} className={screen === target ? "active" : ""} onClick={() => go(target)}>
            <span><Icon name={icon} /></span>
            <div><b>{label}</b><small>{desc}</small></div>
            <Icon name="fa-chevron-right" />
          </button>
        ))}
      </nav>
      <div className="menu-footer"><Icon name="fa-shield-heart" /> Offline ready · AI assisted · EN / 中文 / አማርኛ</div>
    </aside>
  </div>;
}

function AuthScreen({ mode, setMode, submit }) {
  const isSignup = mode === "signup";
  return <section className="auth-screen">
    <div className="auth-visual" aria-hidden="true">
      <div className="auth-orbit one" /><div className="auth-orbit two" /><div className="auth-phone">
        <span>译</span><b>你好</b><em lang="am">ሰላም</em><small>AI translation locked</small>
      </div>
    </div>
    <form className="auth-card" onSubmit={(event) => { event.preventDefault(); submit(); }}>
      <span className="eyebrow">SECURE ACCESS</span>
      <h1>{isSignup ? "Create your LingoBridge account." : "Sign in to continue learning."}</h1>
      <p>Access live translation, saved phrases, quizzes, grammar lessons, and your daily Chinese progress.</p>
      <div className="auth-tabs" role="tablist" aria-label="Authentication mode">
        <button type="button" className={!isSignup ? "active" : ""} onClick={() => setMode("signin")}>Sign in</button>
        <button type="button" className={isSignup ? "active" : ""} onClick={() => setMode("signup")}>Sign up</button>
      </div>
      {isSignup && <label><span>Full name</span><input placeholder="Mahir Aman" autoComplete="name" /></label>}
      <label><span>Email address</span><input type="email" placeholder="mahir@example.com" autoComplete="email" required /></label>
      <label><span>Password</span><input type="password" placeholder="••••••••" autoComplete={isSignup ? "new-password" : "current-password"} required /></label>
      {isSignup && <label><span>Learning language</span><select defaultValue="am-en"><option value="am-en">English + አማርኛ</option><option value="en">English only</option><option value="am">አማርኛ only</option></select></label>}
      <button className="auth-submit" type="submit">{isSignup ? "Create account" : "Sign in"} <Icon name="fa-arrow-right" /></button>
      <div className="auth-divider"><span>or continue with</span></div>
      <div className="social-auth"><button type="button" onClick={submit}><Icon name="fa-g" /> Google</button><button type="button" onClick={submit}><Icon name="fa-mobile-screen" /> Phone</button></div>
      <small className="auth-note">{isSignup ? "By creating an account, you agree to save your learning progress securely." : "New here? Create an account to save words and continue across devices."}</small>
    </form>
  </section>;
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
      <div className="translation-bubble bubble-one"><small>DETECTED · 中文</small><b>前门大街</b><span>Qianmen Street</span><em lang="am">ቺያንሜን ጎዳና</em></div>
      <div className="translation-bubble bubble-two"><small>LIVE · 98%</small><b>出口</b><span>Exit · <strong lang="am">መውጫ</strong></span></div>
      <div className="focus-corners"><i /><i /><i /><i /></div>
      <div className="copilot"><span className="copilot-core"><i /></span><div><small>NOVA · AI COPILOT</small><b>I found 2 translations</b></div></div>
      <div className="gesture-hint"><i /><span>Swipe to scan</span></div>
    </section>
    <section className={`voice-console ${listening ? "listening" : ""}`}>
      <div className="language-orbit"><button className="orb en">EN</button><button className="orb zh">中</button><button className="orb am">አ</button><div className="orbit-line" /></div>
      <div className="voice-title"><span>{listening ? "NEURAL LISTENING" : "VOICE TRANSLATOR"}</span><small>{listening ? "Speak naturally…" : "Tap the core and start speaking"}</small></div>
      <button className="voice-core" onClick={pulseVoice} aria-label="Start voice translation"><span><Icon name={listening ? "fa-wave-square" : "fa-microphone"} /></span></button>
      <div className="waveform" aria-hidden="true">{[16,28,44,25,54,34,63,30,48,22,39,18].map((height, i) => <i key={i} style={{ "--wave": `${height}px`, "--delay": `${i * .06}s` }} />)}</div>
      <div className="voice-result"><span>你好，很高兴认识你</span><b>Hello, nice to meet you</b><em lang="am">ሰላም፣ ከእርስዎ ጋር በመተዋወቄ ደስ ብሎኛል</em></div>
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
  return <article className="word-row-new" onClick={open}><button className="word-audio" onClick={(e) => { e.stopPropagation(); speak(word.zh); }}><Icon name="fa-volume-high" /></button><div className="word-copy"><div><strong>{word.zh}</strong><span>{word.py}</span></div><p><span className="word-en">{word.en}</span><span className="word-am" lang="am">{word.am}</span></p></div><button className={`save-button ${isSaved ? "saved" : ""}`} onClick={(e) => { e.stopPropagation(); toggleSaved(word.zh); }} aria-label="Save word"><Icon name={isSaved ? "fa-bookmark" : "fa-regular fa-bookmark"} /></button></article>;
}

function LearnScreen({ speak, setSelectedWord }) {
  const [index, setIndex] = useState(0); const word = words[index];
  return <>
    <PageTitle eyebrow="PERSONAL LESSON" title="Speak with confidence." text="Daily words, core basics, quizzes, and challenges designed for real conversations." />
    <div className="lesson-top"><button disabled={!index} onClick={() => setIndex(index - 1)}><Icon name="fa-arrow-left" /></button><div><span>LESSON {index + 1} OF {words.length}</span><i><b style={{ width: `${((index + 1) / words.length) * 100}%` }} /></i></div><button onClick={() => setSelectedWord(word)}><Icon name="fa-ellipsis" /></button></div>
    <section className="practice-card">
      <span className="practice-label">LISTEN & REPEAT</span><strong>{word.zh}</strong><em>{word.py}</em><button className="big-sound" onClick={() => speak(word.zh)}><span><Icon name="fa-volume-high" /></span>Play slowly</button>
      <div className="meaning-grid"><div><small>ENGLISH</small><b>{word.en}</b></div><div><small lang="am">አማርኛ</small><b lang="am">{word.am}</b></div></div>
    </section>
    <div className="example-card"><span><Icon name="fa-message" /></span><div><small>IN A SENTENCE</small><b>{word.example}</b><em>{word.exampleEn}</em></div><button onClick={() => speak(word.example)}><Icon name="fa-volume-high" /></button></div>
    <button className="record-action" onClick={() => speak(word.zh)}><span><Icon name="fa-microphone" /></span><div><b>Hold to practice</b><small>Tap to hear the model pronunciation</small></div></button>
    <button className="primary-action" onClick={() => setIndex(index === words.length - 1 ? 0 : index + 1)}>Continue <Icon name="fa-arrow-right" /></button>
    <section className="learning-section">
      <div className="section-head inline"><h2>Basics bootcamp</h2><span>{basics.reduce((total, group) => total + group.items.length, 0)} items</span></div>
      <div className="basic-grid">{basics.map((group) => <article key={group.title} className="basic-card"><div><b>{group.title}</b><em lang="am">{group.am}</em></div><p>{group.items.map((item) => <span key={item}>{item}</span>)}</p></article>)}</div>
    </section>
    <section className="learning-section">
      <div className="section-head inline"><h2>Quick quizzes</h2><span>{quizzes.length} sets</span></div>
      <div className="quiz-grid">{quizzes.map((quiz, quizIndex) => <button key={quiz.title} className="quiz-card" onClick={() => speak(words[(index + quizIndex) % words.length].zh)}><span><Icon name="fa-circle-question" /></span><div><small>{quiz.questions} QUESTIONS · {quiz.time}</small><b>{quiz.title}</b><em lang="am">{quiz.am}</em><p>{quiz.focus}</p></div><i><Icon name="fa-play" /></i></button>)}</div>
    </section>
    <section className="learning-section">
      <div className="section-head inline"><h2>Daily challenges</h2><span>4-day streak path</span></div>
      <div className="challenge-list">{challenges.map((challenge, challengeIndex) => <article key={challenge.day} className={challengeIndex === 0 ? "active" : ""}><span>{challenge.day}</span><div><b>{challenge.title}</b><em lang="am">{challenge.am}</em></div><strong>{challenge.reward}</strong></article>)}</div>
    </section>
  </>;
}

function GrammarScreen({ setSelectedGrammar }) {
  return <>
    <PageTitle eyebrow="GRAMMAR STUDIO" title="Understand the pattern." text="Clear explanations with English and Amharic support." />
    <section className="grammar-hero-new"><span>语</span><div><small>RECOMMENDED FOR YOU</small><h2>Chinese word order</h2><p>Subject + Time + Place + Verb + Object</p><button onClick={() => setSelectedGrammar(grammar[0])}>Start lesson <Icon name="fa-arrow-right" /></button></div></section>
    <div className="section-head inline"><h2>Core foundations</h2><span>{grammar.length} lessons</span></div>
    <div className="grammar-grid-new">{grammar.map((item, index) => <button key={item.mark} onClick={() => setSelectedGrammar(item)}><span className={item.color}>{item.mark}</span><div><small>{item.level.toUpperCase()} · {item.minutes} MIN</small><b>{item.title}</b><em lang="am">{item.am}</em><p>{item.desc}</p></div><i><Icon name="fa-chevron-right" /></i></button>)}</div>
  </>;
}

function ProfileScreen({ saved, signOut }) {
  return <>
    <PageTitle eyebrow="YOUR PROGRESS" title="You are building momentum." text="Every phrase learned brings you closer to a real conversation." />
    <div className="profile-hero"><div className="profile-avatar">MA<span>4</span></div><h2>Mahir Aman</h2><p>Mandarin Explorer · Addis Ababa</p><div className="profile-stats"><div><b>12</b><small>Day streak</small></div><div><b>{words.length}</b><small>Words ready</small></div><div><b>{saved}</b><small>Saved phrases</small></div></div></div>
    <div className="weekly-card"><div><span><Icon name="fa-chart-line" /></span><div><b>Weekly activity</b><small>42 minutes this week</small></div><em>+18%</em></div><div className="week-bars">{[38,72,52,88,64,28,10].map((height, i) => <span key={i}><i style={{ height: `${height}%` }} /><small>{["M","T","W","T","F","S","S"][i]}</small></span>)}</div></div>
    <div className="settings-list"><button><span><Icon name="fa-sliders" /></span><div><b>Learning preferences</b><small>Goals, reminders and level</small></div><Icon name="fa-chevron-right" /></button><button><span><Icon name="fa-language" /></span><div><b>Translation language</b><small>English + አማርኛ</small></div><Icon name="fa-chevron-right" /></button><button><span><Icon name="fa-circle-question" /></span><div><b>Help & feedback</b><small>We would love to hear from you</small></div><Icon name="fa-chevron-right" /></button><button onClick={signOut}><span><Icon name="fa-right-from-bracket" /></span><div><b>Sign out</b><small>Return to secure access screen</small></div><Icon name="fa-chevron-right" /></button></div>
  </>;
}

function PageTitle({ eyebrow, title, text }) { return <div className="page-title"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>; }

function WordSheet({ word, saved, close, speak, toggleSaved }) {
  return <div className="sheet-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}><section className="detail-sheet"><div className="sheet-handle" /><button className="sheet-close" onClick={close}><Icon name="fa-xmark" /></button><div className="sheet-word"><button onClick={() => speak(word.zh)}><Icon name="fa-volume-high" /></button><strong>{word.zh}</strong><span>{word.py}</span></div><div className="sheet-translations"><div><small>ENGLISH</small><b>{word.en}</b></div><div><small lang="am">አማርኛ</small><b lang="am">{word.am}</b></div></div><div className="sheet-example"><small>EXAMPLE</small><strong>{word.example}</strong><span>{word.exampleEn}</span><button onClick={() => speak(word.example)}><Icon name="fa-volume-high" /></button></div><button className={`primary-action ${saved ? "secondary" : ""}`} onClick={() => toggleSaved(word.zh)}><Icon name="fa-bookmark" /> {saved ? "Saved to your phrases" : "Save this phrase"}</button></section></div>;
}

function GrammarSheet({ item, close, speak }) {
  return <div className="sheet-backdrop" onMouseDown={(e) => e.target === e.currentTarget && close()}><section className="detail-sheet grammar-detail"><div className="sheet-handle" /><button className="sheet-close" onClick={close}><Icon name="fa-xmark" /></button><span className={`grammar-symbol ${item.color}`}>{item.mark}</span><small>{item.level.toUpperCase()} · {item.minutes} MIN</small><h2>{item.title}</h2><p>{item.desc}</p><div className="formula-box"><small>PATTERN</small><b>{item.formula}</b></div><div className="grammar-example"><small>EXAMPLE</small><strong>{item.example}</strong><span>{item.py}</span><b>{item.en}</b><button onClick={() => speak(item.example)}><Icon name="fa-volume-high" /></button></div><button className="primary-action" onClick={close}>Got it <Icon name="fa-check" /></button></section></div>;
}
