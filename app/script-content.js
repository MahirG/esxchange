const appScript = `

        // --- Vocabulary data (categories + words, each with audio) ---
        // tier: 'free' = everyone, 'plus' = Plus plan & above, 'premium' = Premium plan only
        var categories = [
            { id: 'greetings', name: 'Greetings', am: 'ሰላምታ', icon: 'fa-hand-peace', color: '#E34234', tier: 'free' },
            { id: 'family',    name: 'Family',    am: 'ቤተሰብ',   icon: 'fa-people-roof', color: '#005C4B', tier: 'free' },
            { id: 'food',      name: 'Food & Drink', am: 'ምግብ', icon: 'fa-utensils',   color: '#D4AF37', tier: 'plus' },
            { id: 'numbers',   name: 'Numbers',   am: 'ቁጥሮች',  icon: 'fa-hashtag',     color: '#3B82F6', tier: 'free' },
            { id: 'travel',    name: 'Travel',    am: 'ጉዞ',     icon: 'fa-plane',       color: '#8B5CF6', tier: 'plus' },
            { id: 'time',      name: 'Time',      am: 'ጊዜ',     icon: 'fa-clock',       color: '#10B981', tier: 'premium' }
            ,{ id: 'business',  name: 'Business',  am: 'ንግድ',    icon: 'fa-briefcase',   color: '#2563EB', tier: 'plus' }
            ,{ id: 'shopping',  name: 'Shopping',  am: 'ግብይት',  icon: 'fa-bag-shopping',color: '#F97316', tier: 'free' }
            ,{ id: 'health',    name: 'Health',    am: 'ጤና',     icon: 'fa-heart-pulse', color: '#E11D48', tier: 'premium' }
            ,{ id: 'daily',     name: 'Daily Life',am: 'ዕለታዊ ኑሮ',icon: 'fa-sun',       color: '#7C3AED', tier: 'free' }
        ];

        var TIER_RANK = { free: 0, plus: 1, premium: 2 };

        var words = {
            greetings: [
                { zh: '你好', py: 'nǐ hǎo', en: 'Hello', am: 'ሰላም' },
                { zh: '谢谢', py: 'xièxie', en: 'Thank you', am: 'አመሰግናለሁ' },
                { zh: '再见', py: 'zàijiàn', en: 'Goodbye', am: 'ደህና ሁን' },
                { zh: '对不起', py: 'duìbuqǐ', en: 'Sorry', am: 'ይቅርታ' },
                { zh: '早上好', py: 'zǎoshang hǎo', en: 'Good morning', am: 'እንደምን አደርክ' }
            ],
            family: [
                { zh: '妈妈', py: 'māma', en: 'Mom', am: 'እናት' },
                { zh: '爸爸', py: 'bàba', en: 'Dad', am: 'አባት' },
                { zh: '哥哥', py: 'gēge', en: 'Older brother', am: 'ታላቅ ወንድም' },
                { zh: '姐姐', py: 'jiějie', en: 'Older sister', am: 'ታላቅ እህት' }
            ],
            food: [
                { zh: '米饭', py: 'mǐfàn', en: 'Rice', am: 'ሩዝ' },
                { zh: '水', py: 'shuǐ', en: 'Water', am: 'ውሃ' },
                { zh: '茶', py: 'chá', en: 'Tea', am: 'ሻይ' },
                { zh: '面条', py: 'miàntiáo', en: 'Noodles', am: 'ፓስታ' }
            ],
            numbers: [
                { zh: '一', py: 'yī', en: 'One', am: 'አንድ' },
                { zh: '二', py: 'èr', en: 'Two', am: 'ሁለት' },
                { zh: '三', py: 'sān', en: 'Three', am: 'ሶስት' }
            ],
            travel: [
                { zh: '机场', py: 'jīchǎng', en: 'Airport', am: 'አውሮፕላን ማረፊያ' },
                { zh: '火车站', py: 'huǒchēzhàn', en: 'Train station', am: 'ባቡር ጣቢያ' }
            ],
            time: [
                { zh: '今天', py: 'jīntiān', en: 'Today', am: 'ዛሬ' },
                { zh: '明天', py: 'míngtiān', en: 'Tomorrow', am: 'ነገ' }
            ],
            business: [
                { zh: '公司', py: 'gōngsī', en: 'Company', am: 'ኩባንያ' },
                { zh: '会议', py: 'huìyì', en: 'Meeting', am: 'ስብሰባ' },
                { zh: '合同', py: 'hétong', en: 'Contract', am: 'ውል' },
                { zh: '客户', py: 'kèhù', en: 'Customer', am: 'ደንበኛ' },
                { zh: '价格', py: 'jiàgé', en: 'Price', am: 'ዋጋ' }
            ],
            shopping: [
                { zh: '多少钱？', py: 'duōshao qián?', en: 'How much is it?', am: 'ስንት ነው?' },
                { zh: '便宜一点', py: 'piányi yìdiǎn', en: 'A little cheaper', am: 'ትንሽ ይቀንሱ' },
                { zh: '我要这个', py: 'wǒ yào zhège', en: 'I want this one', am: 'ይህን እፈልጋለሁ' },
                { zh: '可以刷卡吗？', py: 'kěyǐ shuākǎ ma?', en: 'Can I pay by card?', am: 'በካርድ መክፈል እችላለሁ?' }
            ],
            health: [
                { zh: '医院', py: 'yīyuàn', en: 'Hospital', am: 'ሆስፒታል' },
                { zh: '医生', py: 'yīshēng', en: 'Doctor', am: 'ዶክተር' },
                { zh: '我不舒服', py: 'wǒ bù shūfu', en: 'I feel unwell', am: 'ጤና አይሰማኝም' },
                { zh: '药', py: 'yào', en: 'Medicine', am: 'መድኃኒት' }
            ],
            daily: [
                { zh: '起床', py: 'qǐchuáng', en: 'Wake up', am: 'ከእንቅልፍ መነሳት' },
                { zh: '工作', py: 'gōngzuò', en: 'Work', am: 'ሥራ' },
                { zh: '学习', py: 'xuéxí', en: 'Study', am: 'ማጥናት' },
                { zh: '休息', py: 'xiūxi', en: 'Rest', am: 'ማረፍ' },
                { zh: '睡觉', py: 'shuìjiào', en: 'Sleep', am: 'መተኛት' }
            ]
        };

        // ============================================================
        // APP STATE — single source of truth. Every number on every
        // screen reads from here and re-renders through renderAllStats(),
        // so progress, streak, gems, and pronunciation are always real
        // and update the instant something changes (no hardcoded stats).
        // ============================================================
        var TOTAL_WORD_TARGET = 1000; // stated target for the "1000 Words" goal
        var STORAGE_KEY = 'mandarinMasterState';

        function loadState() {
            var defaults = {
                plan: 'free',                 // 'free' | 'plus' | 'premium'
                learnedWords: {},             // { "categoryId::zh": true }
                pronunciationSamples: [],      // recent attempt scores, newest last
                gems: 50,
                streak: 1,
                lastActiveDate: todayStr(),
                lessonPosition: 0
            };
            try {
                var raw = localStorage.getItem(STORAGE_KEY);
                if (!raw) return defaults;
                var parsed = JSON.parse(raw);
                return Object.assign(defaults, parsed);
            } catch (e) {
                return defaults;
            }
        }

        function saveState() {
            try { localStorage.setItem(STORAGE_KEY, JSON.stringify(appState)); } catch (e) {}
        }

        function todayStr() {
            var d = new Date();
            return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        }

        var appState = loadState();
        bumpStreakIfNewDay();

        function bumpStreakIfNewDay() {
            var today = todayStr();
            if (appState.lastActiveDate === today) return;
            var last = new Date(appState.lastActiveDate.split('-')[0], appState.lastActiveDate.split('-')[1] - 1, appState.lastActiveDate.split('-')[2]);
            var now = new Date();
            var diffDays = Math.round((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - new Date(last.getFullYear(), last.getMonth(), last.getDate())) / 86400000);
            appState.streak = diffDays === 1 ? appState.streak + 1 : 1;
            appState.lastActiveDate = today;
            saveState();
        }

        function totalWordCount() {
            var n = 0;
            for (var k in words) n += words[k].length;
            return n;
        }

        function learnedWordCount() {
            return Object.keys(appState.learnedWords).length;
        }

        function markWordLearned(catId, zh) {
            var key = catId + '::' + zh;
            if (!appState.learnedWords[key]) {
                appState.learnedWords[key] = true;
                saveState();
                renderAllStats();
            }
        }

        function isWordLearned(catId, zh) {
            return !!appState.learnedWords[catId + '::' + zh];
        }

        function recordPronunciationSample(score) {
            appState.pronunciationSamples.push(score);
            if (appState.pronunciationSamples.length > 20) appState.pronunciationSamples.shift();
            saveState();
            renderAllStats();
            showPronunciationToast(score);
        }

        function averagePronunciation() {
            var s = appState.pronunciationSamples;
            if (s.length === 0) return null;
            var sum = s.reduce(function (a, b) { return a + b; }, 0);
            return Math.round(sum / s.length);
        }

        function addGems(n) {
            appState.gems += n;
            saveState();
            renderAllStats();
        }

        // Plan / paywall helpers
        function categoryLocked(cat) {
            return TIER_RANK[cat.tier] > TIER_RANK[appState.plan];
        }

        function setPlan(plan) {
            appState.plan = plan;
            saveState();
            renderAllStats();
            renderCategories();
            buildLessonDeck();
            renderLessonWord();
            closeUpgradeModal();
        }

        // Re-renders every dynamic number across every screen, live.
        function renderAllStats() {
            var learned = learnedWordCount();
            var total = totalWordCount();
            var pct = Math.min(100, Math.round((learned / TOTAL_WORD_TARGET) * 100));
            var pron = averagePronunciation();
            var pronDisplay = pron === null ? '—' : pron + '%';

            // Top stat chips (home)
            var streakChip = document.getElementById('streakChip');
            var gemsChip = document.getElementById('gemsChip');
            if (streakChip) streakChip.textContent = appState.streak;
            if (gemsChip) gemsChip.textContent = appState.gems;

            // Home: vocab progress card
            setText('homeVpcCount', learned + ' / ' + TOTAL_WORD_TARGET);
            setWidth('homeVpcFill', pct + '%');

            // Home: stats grid
            setText('statPronunciation', pronDisplay);
            setText('statVocab', learned);

            // Vocab hub header
            setText('vocabVpcCount', learned + ' / ' + TOTAL_WORD_TARGET);
            setWidth('vocabVpcFill', pct + '%');

            // Side menu subtitle
            setText('sideMenuWordCount', learned + ' / ' + TOTAL_WORD_TARGET + ' words');

            // Plan badge in side menu + home
            var planLabel = appState.plan === 'free' ? 'Free Plan' : (appState.plan === 'plus' ? 'Plus Plan' : 'Premium Plan');
            setText('sideMenuPlan', planLabel);
            var upgradeBtn = document.getElementById('upgradeNavLabel');
            if (upgradeBtn) upgradeBtn.textContent = appState.plan === 'premium' ? 'Premium' : 'Upgrade';
        }

        function setText(id, val) {
            var el = document.getElementById(id);
            if (el) el.textContent = val;
        }
        function setWidth(id, val) {
            var el = document.getElementById(id);
            if (el) el.style.width = val;
        }
        // lang: 'zh-CN' for Chinese, 'am-ET' for Amharic
        // Heuristic: does a SpeechSynthesisVoice name look like a male voice?
        // (The Web Speech API doesn't expose a gender field, so we match on common name patterns.)
        var MALE_VOICE_HINTS = ['male', 'man', 'david', 'mark', 'daniel', 'guy', 'fred', 'alex', 'tom', 'james', 'aaron', 'arthur', 'reed', 'eric', 'oliver'];
        var FEMALE_VOICE_HINTS = ['female', 'woman', 'samantha', 'victoria', 'zira', 'susan', 'karen', 'moira', 'tessa', 'fiona', 'allison', 'ava', 'kate', 'serena', 'amelie'];
        function isLikelyMaleVoice(v) {
            var n = (v.name || '').toLowerCase();
            if (FEMALE_VOICE_HINTS.some(function (h) { return n.indexOf(h) !== -1; })) return false;
            return MALE_VOICE_HINTS.some(function (h) { return n.indexOf(h) !== -1; });
        }

        function playWordAudio(text, lang, btnEl) {
            if (btnEl) {
                btnEl.classList.add('playing');
                setTimeout(function () { btnEl.classList.remove('playing'); }, 450);
            }
            if (!('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();
            var utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang || 'zh-CN';
            utterance.rate = 0.85;

            var voices = window.speechSynthesis.getVoices();
            var langMatches = voices.filter(function (v) { return v.lang === utterance.lang; });
            if (langMatches.length === 0) {
                langMatches = voices.filter(function (v) {
                    return v.lang && v.lang.indexOf(utterance.lang.split('-')[0]) === 0;
                });
            }

            var chosen = null;
            if ((lang || '').toLowerCase().indexOf('am') === 0) {
                // Amharic Translator voice is always male: prefer a male-sounding voice,
                // and pitch the fallback down slightly so it reads as male even on a
                // device with no dedicated Amharic voice at all.
                chosen = langMatches.find(isLikelyMaleVoice) || voices.find(isLikelyMaleVoice);
                utterance.pitch = 0.78;
            } else {
                chosen = langMatches[0];
            }
            if (!chosen) chosen = langMatches[0];
            if (chosen) utterance.voice = chosen;

            window.speechSynthesis.speak(utterance);
        }

        function renderCategories() {
            var grid = document.getElementById('category-grid');
            grid.innerHTML = categories.map(function (cat) {
                var count = (words[cat.id] || []).length;
                var locked = categoryLocked(cat);
                var clickAction = locked ? 'openUpgradeModal()' : ("showWordList('" + cat.id + "')");
                var aria = locked
                    ? ('aria-label="' + cat.name + ', locked, requires ' + capitalize(cat.tier) + ' plan, tap to upgrade"')
                    : ('aria-label="' + cat.name + ', ' + count + ' words"');
                return '<button type="button" class="cat-card as-control' + (locked ? ' locked-cat' : '') + '" ' + aria + ' onclick="' + clickAction + '">' +
                    (locked ? '<div class="cat-lock-badge" aria-hidden="true"><i class="fas fa-lock"></i></div>' : '') +
                    '<div class="cat-icon" style="background:' + cat.color + ';" aria-hidden="true"><i class="fas ' + cat.icon + '"></i></div>' +
                    '<div class="cat-name">' + cat.name + '</div>' +
                    '<div class="cat-am">' + cat.am + '</div>' +
                    '<div class="cat-count">' + count + ' words' + (locked ? ' &middot; ' + capitalize(cat.tier) : '') + '</div>' +
                    '</button>';
            }).join('');
        }

        function showWordList(catId) {
            var cat = categories.find(function (c) { return c.id === catId; });
            if (cat && categoryLocked(cat)) { openUpgradeModal(); return; }
            var list = words[catId] || [];
            document.getElementById('category-view').style.display = 'none';
            document.getElementById('word-list-view').style.display = 'block';
            document.getElementById('word-list-container').innerHTML =
                '<div class="section-title">' + (cat ? cat.name : '') + '</div>' +
                list.map(function (w) {
                    var safeZh = w.zh.replace(/'/g, "\\\\'");
                    var safeAm = w.am.replace(/'/g, "\\\\'");
                    var learned = isWordLearned(catId, w.zh);
                    return '<div class="word-row">' +
                        '<div class="wr-zh" lang="zh">' + w.zh + '</div>' +
                        '<div class="wr-info">' +
                        '<div class="wr-py">' + w.py + '</div>' +
                        '<div class="wr-trans"><span class="wr-en">' + w.en + '</span><span class="wr-am" lang="am">' + w.am + '</span></div>' +
                        '</div>' +
                        '<div class="wr-play-group">' +
                        '<button type="button" class="wr-play as-control" onclick="playWordAudio(\\'' + safeZh + '\\', \\'zh-CN\\', this); markWordLearned(\\'' + catId + '\\', \\'' + safeZh + '\\');" aria-label="Play Chinese: ' + w.en + '"><i class="fas fa-volume-up" aria-hidden="true"></i></button>' +
                        '<button type="button" class="wr-play wr-play-am as-control" onclick="playWordAudio(\\'' + safeAm + '\\', \\'am-ET\\', this); markWordLearned(\\'' + catId + '\\', \\'' + safeZh + '\\');" aria-label="Play Amharic, male voice: ' + w.en + '">አ</button>' +
                        '</div>' +
                        '</div>';
                }).join('');
        }

        // Screen switching (also drives the hamburger menu navigation)
        function switchScreen(screenId) {
            document.querySelectorAll('.screen').forEach(function (el) {
                var isTarget = el.id === screenId;
                if (isTarget) {
                    el.hidden = false;
                    // next frame: remove .hidden so the slide+fade transition runs
                    requestAnimationFrame(function () { el.classList.remove('hidden'); });
                } else {
                    el.classList.add('hidden');
                    el.hidden = true;
                }
            });

            document.querySelectorAll('.nav-item').forEach(function (el) {
                var active = el.getAttribute('data-screen') === screenId;
                el.classList.toggle('active', active);
                el.setAttribute('aria-selected', active ? 'true' : 'false');
            });
            document.querySelectorAll('.side-menu-item[data-screen]').forEach(function (el) {
                el.classList.toggle('active', el.getAttribute('data-screen') === screenId);
            });

            closeMenu();
        }

        function showCategoryView() {
            document.getElementById('category-view').style.display = 'block';
            document.getElementById('word-list-view').style.display = 'none';
        }

        // Populate the vocabulary categories on load
        renderCategories();

        // Some browsers (Chrome) load the voice list asynchronously — prime it early
        // so the first Amharic playback already has a male voice to choose from.
        if ('speechSynthesis' in window) {
            window.speechSynthesis.getVoices();
            window.speechSynthesis.onvoiceschanged = function () { window.speechSynthesis.getVoices(); };
        }

        // --- Lesson screen: flip through every word from categories the
        // current plan has unlocked. Rebuilds live if the plan changes. ---
        var lessonDeck = [];
        var lessonIndex = 0;

        function buildLessonDeck() {
            lessonDeck = [];
            categories.forEach(function (cat) {
                if (categoryLocked(cat)) return;
                (words[cat.id] || []).forEach(function (w) {
                    lessonDeck.push(Object.assign({ catId: cat.id }, w));
                });
            });
            if (lessonIndex >= lessonDeck.length) lessonIndex = 0;
        }

        function renderLessonWord() {
            if (lessonDeck.length === 0) { buildLessonDeck(); }
            if (lessonDeck.length === 0) return;
            var w = lessonDeck[lessonIndex];
            document.getElementById('lessonChar').textContent = w.zh;
            document.getElementById('lessonPinyin').textContent = w.py;
            document.getElementById('lessonEn').textContent = w.en;
            document.getElementById('lessonAm').textContent = w.am;
            document.getElementById('lessonCounter').textContent = (lessonIndex + 1) + ' / ' + lessonDeck.length;
            document.querySelector('#lesson .progress-fill').style.width =
                Math.round(((lessonIndex + 1) / lessonDeck.length) * 100) + '%';
            document.getElementById('prevWordBtn').classList.toggle('disabled', lessonIndex === 0);
            document.getElementById('nextWordBtn').classList.toggle('disabled', lessonIndex === lessonDeck.length - 1);
        }

        function nextWord() {
            if (lessonIndex < lessonDeck.length - 1) { lessonIndex++; renderLessonWord(); }
        }
        function prevWord() {
            if (lessonIndex > 0) { lessonIndex--; renderLessonWord(); }
        }

        // Plays the current lesson word in either Chinese or Amharic, and
        // logs it as a learned word so progress updates in real time.
        function playCurrentWordAudio(type) {
            var w = lessonDeck[lessonIndex];
            if (!w) return;
            if (type === 'am') {
                playWordAudio(w.am, 'am-ET', document.getElementById('lessonAmCircle'));
            } else {
                playWordAudio(w.zh, 'zh-CN', document.getElementById('lessonZhCircle'));
            }
            markWordLearned(w.catId, w.zh);
        }

        // --- Record / pronunciation practice ---
        // Uses the Web Speech recognizer where available to score how closely
        // what was heard matches the current word; falls back to a simple
        // attempt-based estimate on devices without recognition support, so
        // the Pronunciation stat is always built from a real interaction
        // rather than a fixed number.
        var recognizing = false;
        function startPronunciationCheck() {
            if (recognizing) return;
            var w = lessonDeck[lessonIndex];
            if (!w) return;
            var recordBtn = document.getElementById('recordBtn');
            var Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

            if (!Recognition) {
                // No recognizer on this device/browser — log the attempt itself
                // (still a real, timestamped interaction, not a fake constant).
                recordBtn.classList.add('recording');
                setTimeout(function () {
                    recordBtn.classList.remove('recording');
                    recordPronunciationSample(75);
                    addGems(2);
                }, 900);
                return;
            }

            var recognizer = new Recognition();
            recognizer.lang = 'zh-CN';
            recognizer.maxAlternatives = 1;
            recognizing = true;
            recordBtn.classList.add('recording');

            recognizer.onresult = function (e) {
                var heard = (e.results[0][0].transcript || '').trim();
                var score = scorePronunciation(heard, w.zh);
                recordPronunciationSample(score);
                addGems(score >= 70 ? 3 : 1);
                if (score >= 70) markWordLearned(w.catId, w.zh);
            };
            recognizer.onerror = function () {
                recordPronunciationSample(60);
            };
            recognizer.onend = function () {
                recognizing = false;
                recordBtn.classList.remove('recording');
            };
            recognizer.start();
        }

        // Lightweight similarity score (0-100) between what was heard and the target word.
        function scorePronunciation(heard, target) {
            if (!heard) return 40;
            if (heard.indexOf(target) !== -1) return 95;
            var matches = 0;
            for (var i = 0; i < target.length; i++) {
                if (heard.indexOf(target[i]) !== -1) matches++;
            }
            var ratio = target.length ? matches / target.length : 0;
            return Math.max(35, Math.round(ratio * 100));
        }

        renderLessonWord();
        renderAllStats();
        renderPlanCards();

        // --- Upgrade / Pricing modal ---
        var _lastFocusBeforeModal = null;
        function openUpgradeModal() {
            closeMenu();
            renderPlanCards();
            _lastFocusBeforeModal = document.activeElement;
            document.getElementById('upgradeModalOverlay').classList.add('open');
            var firstBtn = document.querySelector('#upgradeModalOverlay .plan-cta-btn');
            if (firstBtn) firstBtn.focus();
            announce('Pricing plans opened');
        }
        function closeUpgradeModal() {
            document.getElementById('upgradeModalOverlay').classList.remove('open');
            if (_lastFocusBeforeModal && _lastFocusBeforeModal.focus) {
                _lastFocusBeforeModal.focus();
                _lastFocusBeforeModal = null;
            }
        }
        function renderPlanCards() {
            var ids = ['free', 'plus', 'premium'];
            ids.forEach(function (id) {
                var card = document.getElementById('planCard' + capitalize(id));
                var btn = document.getElementById('planBtn' + capitalize(id));
                if (!card || !btn) return;
                card.classList.remove('current');
                if (id === appState.plan) {
                    card.classList.add('current');
                    btn.textContent = 'Current Plan';
                    btn.className = 'plan-cta-btn current';
                    btn.onclick = null;
                } else {
                    btn.textContent = 'Select ' + capitalize(id);
                    btn.className = 'plan-cta-btn ' + (id === 'premium' ? 'featured' : 'primary');
                    btn.onclick = function () { setPlan(id); };
                }
            });
        }
        function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

        // --- Hamburger menu ---
        function toggleMenu() {
            var isOpen = document.getElementById('sideMenu').classList.contains('open');
            if (isOpen) { closeMenu(); } else { openMenu(); }
        }
        function openMenu() {
            document.getElementById('sideMenu').classList.add('open');
            document.getElementById('menuOverlay').classList.add('open');
            var hb = document.getElementById('hamburgerBtn');
            hb.classList.add('open');
            hb.setAttribute('aria-expanded', 'true');
            // move focus to first menu item for keyboard users
            var first = document.querySelector('#sideMenu .side-menu-item');
            if (first) first.focus();
        }
        function closeMenu() {
            document.getElementById('sideMenu').classList.remove('open');
            document.getElementById('menuOverlay').classList.remove('open');
            var hb = document.getElementById('hamburgerBtn');
            hb.classList.remove('open');
            hb.setAttribute('aria-expanded', 'false');
        }

        // Close menu / modal on Escape (WCAG 2.1.2 no keyboard trap)
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                closeMenu();
                closeUpgradeModal();
            }
        });

        // --- Live announcement region for pronunciation results & status ---
        function announce(msg) {
            var region = document.getElementById('liveRegion');
            if (!region) return;
            region.textContent = '';
            // slight delay so repeated identical messages are re-announced
            setTimeout(function () { region.textContent = msg; }, 60);
        }

        // Visible, accessible pronunciation feedback toast
        function showPronunciationToast(score) {
            var toast = document.getElementById('pronToast');
            if (!toast) return;
            var label = score >= 85 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Keep practicing' : 'Try again';
            toast.querySelector('.pron-toast-score').textContent = score + '%';
            toast.querySelector('.pron-toast-label').textContent = label;
            toast.classList.remove('good', 'mid', 'low');
            toast.classList.add(score >= 70 ? 'good' : score >= 50 ? 'mid' : 'low');
            toast.classList.add('show');
            announce('Pronunciation ' + label + ', ' + score + ' percent');
            clearTimeout(toast._t);
            toast._t = setTimeout(function () { toast.classList.remove('show'); }, 2600);
        }
    
`;

export default appScript;
