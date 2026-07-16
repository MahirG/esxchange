const markup = `


    <div class="app-shell">

        <!-- Screen-reader live region for status announcements -->
        <div id="liveRegion" class="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>

        <!-- Pronunciation feedback toast (visible + announced) -->
        <div id="pronToast" class="pron-toast" role="status">
            <span class="pron-toast-score">0%</span>
            <span class="pron-toast-label">—</span>
        </div>

        <!-- HAMBURGER MENU TRIGGER (shown on every screen) -->
        <button class="hamburger-btn as-control" id="hamburgerBtn" onclick="toggleMenu()" aria-label="Open menu" aria-expanded="false" aria-controls="sideMenu">
            <span></span><span></span><span></span>
        </button>

        <!-- SIDE MENU -->
        <div class="menu-overlay" id="menuOverlay" onclick="closeMenu()" aria-hidden="true"></div>
        <nav class="side-menu" id="sideMenu" role="dialog" aria-modal="true" aria-label="Main menu">
            <div class="side-menu-profile">
                <div class="side-menu-avatar"><i class="fas fa-user"></i></div>
                <div>
                    <div class="side-menu-name">Selam! ሰላም!</div>
                    <div class="side-menu-sub" id="sideMenuWordCount">120 / 1000 words</div>
                    <div class="side-menu-plan-badge" id="sideMenuPlan">Free Plan</div>
                </div>
            </div>

            <button type="button" class="side-menu-item as-control" data-screen="home" onclick="switchScreen('home')">
                <i class="fas fa-house" aria-hidden="true"></i> Home
            </button>
            <button type="button" class="side-menu-item as-control" data-screen="vocab" onclick="switchScreen('vocab')">
                <i class="fas fa-book" aria-hidden="true"></i> Vocabulary
            </button>
            <button type="button" class="side-menu-item as-control" data-screen="lesson" onclick="switchScreen('lesson')">
                <i class="fas fa-graduation-cap" aria-hidden="true"></i> Lessons
            </button>
            <button type="button" class="side-menu-item as-control" data-screen="grammar" onclick="switchScreen('grammar')">
                <i class="fas fa-language" aria-hidden="true"></i> Grammar
            </button>
            <button type="button" class="side-menu-item as-control" data-screen="journey" onclick="switchScreen('journey')">
                <i class="fas fa-route" aria-hidden="true"></i> Journey
            </button>

            <div class="side-menu-divider"></div>

            <button type="button" class="side-menu-item side-menu-upgrade as-control" onclick="openUpgradeModal()">
                <i class="fas fa-crown" aria-hidden="true"></i> <span id="upgradeNavLabel">Upgrade</span>
            </button>
            <button type="button" class="side-menu-item as-control"><i class="fas fa-gear" aria-hidden="true"></i> Settings</button>
            <button type="button" class="side-menu-item as-control"><i class="fas fa-circle-question" aria-hidden="true"></i> Help &amp; Support</button>

            <div class="side-menu-footer">Mandarin Master &middot; v1.0</div>
        </nav>

        <!-- UPGRADE / PRICING MODAL -->
        <div class="upgrade-modal-overlay" id="upgradeModalOverlay" onclick="if(event.target===this) closeUpgradeModal()">
            <div class="upgrade-modal" role="dialog" aria-modal="true" aria-labelledby="upgradeModalTitle">
                <button type="button" class="upgrade-close-btn as-control" onclick="closeUpgradeModal()" aria-label="Close pricing"><i class="fas fa-xmark" aria-hidden="true"></i></button>
                <div class="upgrade-modal-handle"></div>
                <div class="upgrade-modal-header">
                    <div class="upgrade-modal-title" id="upgradeModalTitle">Unlock Full Access</div>
                    <div class="upgrade-modal-sub">Choose the plan that matches how deep you want to go</div>
                </div>

                <!-- FREE -->
                <div class="plan-card" id="planCardFree">
                    <div class="plan-card-head">
                        <span class="plan-name">Free</span>
                        <span class="plan-price">Br 0</span>
                    </div>
                    <div class="plan-access-pill" id="planAccessFree">Access: Beginner words</div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check"></i> Greetings, Family &amp; Numbers categories</li>
                        <li><i class="fas fa-check"></i> Daily lesson deck &amp; pronunciation practice</li>
                        <li><i class="fas fa-check"></i> Streak &amp; gems tracking</li>
                    </ul>
                    <button class="plan-cta-btn current" id="planBtnFree" onclick="setPlan('free')">Select Free</button>
                </div>

                <!-- PLUS -->
                <div class="plan-card" id="planCardPlus">
                    <div class="plan-card-head">
                        <span class="plan-name">Plus</span>
                        <span class="plan-price">Br 199<span>/mo</span></span>
                    </div>
                    <div class="plan-access-pill" id="planAccessPlus">Access: Beginner + Intermediate words</div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check"></i> Everything in Free</li>
                        <li><i class="fas fa-check"></i> Food &amp; Drink and Travel categories</li>
                        <li><i class="fas fa-check"></i> Offline word packs</li>
                    </ul>
                    <button class="plan-cta-btn primary" id="planBtnPlus" onclick="setPlan('plus')">Select Plus</button>
                </div>

                <!-- PREMIUM -->
                <div class="plan-card featured" id="planCardPremium">
                    <div class="plan-card-badge">Best Value</div>
                    <div class="plan-card-head">
                        <span class="plan-name">Premium</span>
                        <span class="plan-price">Br 399<span>/mo</span></span>
                    </div>
                    <div class="plan-access-pill" id="planAccessPremium">Access: Full 1000-word library</div>
                    <ul class="plan-features">
                        <li><i class="fas fa-check"></i> Everything in Plus</li>
                        <li><i class="fas fa-check"></i> All categories, incl. Time &amp; future drops</li>
                        <li><i class="fas fa-check"></i> AI Coach unlimited sessions</li>
                        <li><i class="fas fa-check"></i> Priority pronunciation scoring</li>
                    </ul>
                    <button class="plan-cta-btn featured" id="planBtnPremium" onclick="setPlan('premium')">Select Premium</button>
                </div>
            </div>
        </div>

        <div class="phone-container">

        <!-- HOME SCREEN -->
        <div class="screen" id="home" role="tabpanel" aria-label="Home">
            <div class="home-header">
                <div class="user-info" style="margin-left: 48px;">
                    <div class="avatar"><i class="fas fa-user"></i></div>
                    <div>
                        <div class="greeting-text">Welcome back,</div>
                        <div class="greeting-name">Selam! ሰላም!</div>
                    </div>
                </div>
                <div class="stats-row">
                    <div class="stat-chip" style="color: var(--red);"><i class="fas fa-fire"></i> <span id="streakChip">12</span></div>
                    <div class="stat-chip" style="color: var(--gold);"><i class="fas fa-gem"></i> <span id="gemsChip">450</span></div>
                </div>
            </div>

            <div class="hero-card" role="button" tabindex="0" aria-label="Continue learning: Beijing Greetings" onclick="switchScreen('lesson')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();switchScreen('lesson');}">
                <div class="hero-glow"></div>
                <div class="hero-label">Continue Learning</div>
                <div class="hero-title">Beijing: Greetings</div>
                <div class="hero-subtitle">ሰላምታዎች (Greetings)</div>
                <div class="hero-footer">
                    <span class="progress-text">Progress: 40%</span>
                    <button type="button" class="start-btn" onclick="event.stopPropagation(); switchScreen('lesson')">Start</button>
                </div>
            </div>

            <div class="section-title">
                Vocabulary Progress
                <span class="view-all" onclick="switchScreen('vocab')">View All</span>
            </div>

            <div class="vocab-progress-card" style="margin-bottom: 24px;">
                <div class="vpc-header">
                    <span class="vpc-title">Target: 1000 Words</span>
                    <span class="vpc-count" id="homeVpcCount">120 / 1000</span>
                </div>
                <div class="vpc-bar"><div class="vpc-fill" id="homeVpcFill"></div></div>
            </div>

            <div class="section-title">Your Stats</div>
            <div class="stats-grid">
                <div class="glass-card">
                    <i class="fas fa-microphone gc-icon" style="color: var(--red); font-size: 24px;"></i>
                    <div>
                        <div class="gc-value" id="statPronunciation">—</div>
                        <div class="gc-title">Pronunciation</div>
                    </div>
                </div>
                <div class="glass-card">
                    <i class="fas fa-book gc-icon" style="color: var(--emerald); font-size: 24px;"></i>
                    <div>
                        <div class="gc-value" id="statVocab">120</div>
                        <div class="gc-title">Vocabulary</div>
                    </div>
                </div>
            </div>

            <div class="ai-coach">
                <div class="coach-icon"><i class="fas fa-wave-square"></i></div>
                <div class="coach-text">
                    <div class="coach-title">AI Coach Tip</div>
                    <div class="coach-am">ዛሬ የቃላት ልምምድ አድርግ።</div>
                </div>
                <button type="button" class="as-control" aria-label="Play coach tip" style="color: var(--gold); font-size: 32px; cursor: pointer;"><i class="fas fa-play-circle" aria-hidden="true"></i></button>
            </div>
        </div>

        <!-- VOCAB SCREEN -->
        <div class="screen hidden" id="vocab" role="tabpanel" aria-label="Vocabulary" hidden>
            <!-- Category View -->
            <div id="category-view">
                <div class="vocab-progress-card" style="margin-left: 0;">
                    <div class="vpc-header">
                        <span class="vpc-title" style="font-size: 20px; font-weight: 800; margin-left: 48px;">Vocabulary Hub</span>
                        <span class="vpc-count" id="vocabVpcCount">120 / 1000</span>
                    </div>
                    <div class="vpc-bar"><div class="vpc-fill" id="vocabVpcFill"></div></div>
                    <div style="font-size: 12px; color: #666; margin-top: 8px;">Master 1000 essential Chinese words</div>
                </div>

                <div class="section-title">Categories</div>
                <div class="category-grid" id="category-grid">
                    <!-- Categories injected via JS -->
                </div>
            </div>

            <!-- Word List View -->
            <div class="word-list-view" id="word-list-view">
                <button type="button" class="back-btn as-control" onclick="showCategoryView()">
                    <i class="fas fa-arrow-left" aria-hidden="true"></i> Back to Categories
                </button>
                <div id="word-list-container">
                    <!-- Words injected via JS -->
                </div>
            </div>
        </div>

        <!-- GRAMMAR SCREEN -->
        <div class="screen hidden" id="grammar" role="tabpanel" aria-label="Grammar" hidden>
            <div class="page-eyebrow">LANGUAGE LAB</div>
            <div class="grammar-heading">
                <div><h1>Grammar, made clear.</h1><p>Build natural Chinese sentences with simple English and Amharic guidance.</p></div>
                <div class="grammar-mark">语</div>
            </div>
            <div class="grammar-feature">
                <span class="lesson-pill">START HERE · HSK 1</span>
                <h2>Chinese word order</h2>
                <p class="formula">Subject <b>+</b> Time <b>+</b> Place <b>+</b> Verb <b>+</b> Object</p>
                <div class="example-line"><strong>我今天在家学习中文。</strong><span>Wǒ jīntiān zài jiā xuéxí Zhōngwén.</span></div>
                <div class="example-trans"><span>I study Chinese at home today.</span><span>ዛሬ ቤት ውስጥ ቻይንኛ አጠናለሁ።</span></div>
                <button class="grammar-cta" onclick="switchScreen('lesson')">Start 5-min lesson <i class="fas fa-arrow-right"></i></button>
            </div>
            <div class="section-title grammar-section-title">Core grammar <span class="level-chip">12 lessons</span></div>
            <div class="grammar-list">
                <button class="grammar-row"><span class="grammar-icon blue">是</span><span><b>“To be” with 是</b><small>Identity &amp; descriptions · 6 min</small></span><i class="fas fa-chevron-right"></i></button>
                <button class="grammar-row"><span class="grammar-icon coral">吗</span><span><b>Questions with 吗</b><small>Turn statements into questions · 5 min</small></span><i class="fas fa-chevron-right"></i></button>
                <button class="grammar-row"><span class="grammar-icon violet">不</span><span><b>Negatives: 不 vs 没</b><small>Say “not” and “didn't” · 8 min</small></span><i class="fas fa-chevron-right"></i></button>
                <button class="grammar-row"><span class="grammar-icon mint">的</span><span><b>Possession with 的</b><small>My, your and their things · 7 min</small></span><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>

        <!-- LESSON SCREEN -->
        <div class="screen hidden" id="lesson" role="tabpanel" aria-label="Lesson" hidden>
            <div class="lesson-header">
                <button type="button" class="as-control" aria-label="Close lesson" style="font-size: 20px; color: var(--ink-2); cursor: pointer; margin-left: 48px;" onclick="switchScreen('home')"><i class="fas fa-times" aria-hidden="true"></i></button>
                <div class="progress-bar"><div class="progress-fill"></div></div>
                <div class="hearts"><i class="fas fa-heart"></i> 5</div>
            </div>

            <div class="char-display" id="lessonChar">你好</div>
            <div class="pinyin-display" id="lessonPinyin">nǐ hǎo</div>

            <div class="translation-card">
                <div class="lang-block">
                    <div class="lang-label" style="color: var(--emerald);">ENGLISH</div>
                    <div class="lang-text" id="lessonEn">Hello</div>
                </div>
                <div class="divider"></div>
                <div class="lang-block">
                    <div class="lang-label" style="color: var(--gold-text);">አማርኛ</div>
                    <div class="lang-text" id="lessonAm" style="font-family: var(--font-am);">ሰላም</div>
                </div>
            </div>

            <div class="audio-btns">
                <button type="button" class="audio-btn as-control" onclick="playCurrentWordAudio('zh')" aria-label="Play Chinese pronunciation">
                    <div class="ab-circle zh" id="lessonZhCircle"><i class="fas fa-volume-up" aria-hidden="true"></i></div>
                    <div class="ab-label" style="color: var(--red);">Chinese</div>
                </button>
                <button type="button" class="audio-btn as-control" onclick="playCurrentWordAudio('am')" aria-label="Play Amharic translation, male voice">
                    <div class="ab-circle am" id="lessonAmCircle"><i class="fas fa-volume-up" aria-hidden="true"></i></div>
                    <div class="ab-label" style="color: var(--emerald);">Amharic</div>
                </button>
            </div>

            <div class="lesson-nav">
                <button class="nav-arrow-btn" id="prevWordBtn" onclick="prevWord()" aria-label="Previous word"><i class="fas fa-chevron-left"></i></button>
                <span class="lesson-counter" id="lessonCounter">1 / 1</span>
                <button class="nav-arrow-btn" id="nextWordBtn" onclick="nextWord()" aria-label="Next word"><i class="fas fa-chevron-right"></i></button>
            </div>

            <button type="button" class="record-btn as-control" id="recordBtn" onclick="startPronunciationCheck()" aria-label="Record and check your pronunciation"><i class="fas fa-microphone" aria-hidden="true"></i></button>
        </div>

        <!-- JOURNEY SCREEN -->
        <div class="screen hidden" id="journey" role="tabpanel" aria-label="Journey" hidden>
            <div class="journey-header">
                <div class="journey-title" style="margin-left: 48px;">Chinese Journey</div>
                <div class="passport-badge"><i class="fas fa-passport"></i> 2 Stamps</div>
            </div>

            <div class="timeline-item">
                <div class="timeline-path"><div class="node unlocked"></div><div class="line unlocked"></div></div>
                <div class="city-card unlocked">
                    <div><div class="city-name">1. Beijing</div><div class="city-am unlocked">ቤይጂንግ</div></div>
                    <i class="fas fa-lock-open" style="color: var(--gold);"></i>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-path"><div class="node unlocked"></div><div class="line"></div></div>
                <div class="city-card unlocked">
                    <div><div class="city-name">2. Shanghai</div><div class="city-am unlocked">ሻንጋይ</div></div>
                    <i class="fas fa-lock-open" style="color: var(--gold);"></i>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-path"><div class="node locked"></div></div>
                <div class="city-card">
                    <div><div class="city-name locked">3. Guangzhou</div><div class="city-am locked">ጓንግዡ</div></div>
                    <i class="fas fa-lock" style="color: #555;"></i>
                </div>
            </div>
        </div>

        <!-- NAV BAR -->
        <div class="nav-bar" role="tablist" aria-label="Primary">
            <button type="button" class="nav-item active as-control" role="tab" aria-selected="true" data-screen="home" onclick="switchScreen('home')"><i class="fas fa-house" aria-hidden="true"></i>Home</button>
            <button type="button" class="nav-item as-control" role="tab" aria-selected="false" data-screen="vocab" onclick="switchScreen('vocab')"><i class="fas fa-book" aria-hidden="true"></i>Vocab</button>
            <button type="button" class="nav-item as-control" role="tab" aria-selected="false" data-screen="grammar" onclick="switchScreen('grammar')"><i class="fas fa-language" aria-hidden="true"></i>Grammar</button>
            <button type="button" class="nav-item as-control" role="tab" aria-selected="false" data-screen="lesson" onclick="switchScreen('lesson')"><i class="fas fa-graduation-cap" aria-hidden="true"></i>Lesson</button>
            <button type="button" class="nav-item as-control" role="tab" aria-selected="false" data-screen="journey" onclick="switchScreen('journey')"><i class="fas fa-route" aria-hidden="true"></i>Journey</button>
        </div>
        </div> <!-- /.phone-container -->
    </div> <!-- /.app-shell -->

    
`;

export default markup;
