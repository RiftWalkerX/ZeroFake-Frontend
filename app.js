let currentLevel = 'beginner';
let currentLessonIndex = 0;
let currentSlideIndex = 0;
let currentLang = localStorage.getItem('lang') || 'en';
let currentQuizQuestionIndex = 0;
let userProgress = JSON.parse(localStorage.getItem('userProgress')) || {
    completedLessons: [],
    quizzesPassed: 0,
    totalQuizzes: 0
};

const darkModeToggle = document.getElementById('darkModeToggle');

function setDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setDarkMode(savedTheme === 'dark');
    if (darkModeToggle) {
        darkModeToggle.checked = (savedTheme === 'dark');
    }
} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDarkMode(true);
    if (darkModeToggle) {
        darkModeToggle.checked = true;
    }
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('change', (e) => {
        setDarkMode(e.target.checked);
    });
}

const translations = {
    'en': {
        'home': 'Home',
        'training': 'Training',
        'leaderboard': 'Leaderboard',
        'profile': 'Profile',
        'login_signup': 'Login/Signup',
        'logout': 'Logout',
        'main_title_training': '🛡️ Electronic Fraud Detection Training (Zero Fake Training)',
        'intro_text_training': 'On this page, you will learn how to differentiate between real and phishing messages in simple steps. You will participate in practical exercises at levels ranging from easy to difficult.',
        'start_quiz': 'Start Quiz',
        'locked': 'Locked',
        'next': 'Next',
        'submit_answer': 'Submit Answer',
        'correct': 'Correct!',
        'incorrect': 'Incorrect!',
        'continue': 'Continue',
        'quiz_select_answer': 'Please select an answer.',
        'quiz_correct_feedback': 'Your answer is correct! This message is actually:',
        'quiz_incorrect_feedback': 'Your answer is incorrect. You should have noticed:',
        'level_easy': 'Easy Level',
        'level_medium': 'Medium Level',
        'level_advanced': 'Advanced Level',
        'login_title': 'Login',
        'signup_title': 'Sign Up',
        'email_placeholder': 'Email',
        'password_placeholder': 'Password',
        'username_placeholder': 'Username',
        'confirm_password_placeholder': 'Confirm Password',
        'login_btn': 'Login',
        'signup_btn': 'Sign Up',
        'no_account_text': 'Don\'t have an account?',
        'have_account_text': 'Already have an account?',
        'guest_btn': 'Continue as Guest',
        'login_success': 'Login successful!',
        'enter_email_password': 'Please enter both email and password.',
        'passwords_not_match': 'Passwords do not match.',
        'password_short': 'Password must be at least 6 characters long.',
        'fill_all_fields': 'Please fill in all fields.',
        'signup_success': 'Signup successful!',
        'guest_continue': 'Continuing as Guest!',
        'logged_out': 'Logged out!',
        'welcome_user': 'Welcome, User!',
        'your_progress': 'Your Progress',
        'quizzes_played': 'Quizzes Played:',
        'times_correct': 'Times Corrected:',
        'profile_page_title': 'Profile Page',
        'profile_username': 'Username:',
        'profile_total_quizzes': 'Total Quizzes:',
        'profile_correct_answers': 'Correct Answers:',
        'profile_lessons_completed': 'Lessons Completed:',
        'achievements_badges': 'Achievements / Badges',
        'lesson_starter_badge': 'Lesson Starter',
        'lesson_starter_desc': 'Completed 1 lesson.',
        'lesson_enthusiast_badge': 'Lesson Enthusiast',
        'lesson_enthusiast_desc': 'Completed 3 lessons.',
        'lesson_master_badge': 'Lesson Master',
        'lesson_master_desc': 'Completed 5 lessons.',
        'quiz_conqueror_badge': 'Quiz Conqueror',
        'quiz_conqueror_desc_1': 'Passed 1 quiz.',
        'quiz_conqueror_desc_5': 'Passed 5 quizzes.',
        'no_badges': 'Complete lessons and quizzes to earn badges!',
        'leaderboard_title': 'Leaderboard',
        'rank': 'Rank',
        'player': 'Player',
        'score': 'Score',
        'correct_answers': 'Correct Answers',
        'bot_welcome': 'Hello! I\'m Zero Fake Bot. How can I help you today?',
        'bot_hello': 'Hello there! How can I assist you with cybersecurity today?',
        'bot_scam_phishing': 'Scams and phishing are attempts to trick you into giving up personal information. Always be cautious of suspicious links, unsolicited offers, or urgent requests for data.',
        'bot_navigation': 'You can navigate using the links in the header: Home, Training, Login/Signup, Leaderboard, and Profile. The Training section has interactive lessons and quizzes!',
        'bot_dark_light_mode': 'You can toggle between light and dark mode using the switch in the top right corner of the page.',
        'bot_training_lessons': 'The Training page offers lessons categorized by difficulty: Beginner, Intermediate, and Advanced. Complete quizzes to unlock new levels!',
        'bot_thank_you': 'You\'re welcome! Stay safe online!',
        'bot_who_are_you': 'I am Zero Fake Bot, your personal assistant for cybersecurity education. My purpose is to help you understand and detect online threats.',
        'bot_fraud_prevention': 'Fraud prevention involves being vigilant about suspicious communications, verifying sources, using strong passwords, and keeping your software updated.',
        'bot_login_signup': 'To log in or sign up, click on the \'Login/Signup\' link in the navigation bar. You can also continue as a guest.',
        'bot_leaderboard': 'The Leaderboard shows how your scores compare to other users. Keep learning to climb the ranks!',
        'bot_profile': 'Your Profile page displays your progress, quizzes completed, and badges you\'ve earned. The more you learn, the more badges you\'ll get!',
        'bot_unknown': 'I\'m not sure how to answer that, but I can help you with questions about online scams, phishing, website navigation, and your progress on Zero Fake.',
        'app_name': 'Zero Fake',
        'home_title': 'Zero Fake - Home',
        'auth_title': 'Login / Register - Zero Fake',
        'dashboard_title': 'Dashboard',
        'leaderboard_title': 'Leaderboard',
        'profile_title': 'Profile',
        'training_title': 'Electronic Fraud Detection Training',
        'intro_text_home': 'Zero Fake helps you detect online frauds and scams through interactive learning and quizzes.',
        'start_learning': 'Start Learning',
        'bot_name': 'Zero Fake Bot',
        'bot_input_placeholder': 'Ask me anything...',
        'bot_send': 'Send',
        'guest_placeholder': 'Guest',
        'level_singular': 'Level',
        'previous': 'Previous',
        'safe_option': '🔒 Safe',
        'phishing_option': '⚠️ Phishing',
        'quiz_tactic_1': 'Using official company logos',
        'quiz_tactic_2': 'Offering legitimate discounts',
        'quiz_tactic_3': 'Creating a sense of urgency or fear',
        'quiz_tactic_4': 'Providing detailed contact information',
        'quiz_red_flag_1': 'Personalized greeting',
        'quiz_red_flag_2': 'Official company signature',
        'quiz_red_flag_3': 'Typos and grammatical errors',
        'quiz_red_flag_4': 'Sender\'s email matching company domain',
        'quiz_fake_website_1': 'It has a professional design',
        'quiz_fake_website_2': 'The URL is slightly misspelled or has an unusual domain',
        'quiz_fake_website_3': 'It uses HTTPS (secure connection)',
        'quiz_fake_website_4': 'It loads quickly',
        'quiz_attachment_1': 'Open them immediately',
        'quiz_attachment_2': 'Scan them with antivirus software',
        'quiz_attachment_3': 'Forward them to friends',
        'quiz_attachment_4': 'Delete them without checking',
        'quiz_sender_identity_1': 'To check if they are your friend',
        'quiz_sender_identity_2': 'To confirm their social media presence',
        'quiz_sender_identity_3': 'To ensure they are a legitimate source',
        'quiz_sender_identity_4': 'To see if they are online',
        'quiz_urgent_language_1': 'To inform you quickly',
        'quiz_urgent_language_2': 'To make you feel important',
        'quiz_urgent_language_3': 'To rush your decision-making',
        'quiz_urgent_language_4': 'To provide timely updates',
        'quiz_payment_method_1': 'Credit card',
        'quiz_payment_method_2': 'Bank transfer',
        'quiz_payment_method_3': 'Gift cards',
        'quiz_payment_method_4': 'Online payment platforms',
        'quiz_unrealistic_offer_1': 'Accept it immediately',
        'quiz_unrealistic_offer_2': 'Share it with everyone',
        'quiz_unrealistic_offer_3': 'Investigate its legitimacy',
        'quiz_unrealistic_offer_4': 'Ignore it completely',
        'quiz_tech_support_1': 'Through official company emails',
        'quiz_tech_support_2': 'By sending you a postal letter',
        'quiz_tech_support_3': 'Via unsolicited phone calls or pop-up messages',
        'quiz_tech_support_4': 'Only when you request support',
        'quiz_smishing_1': 'Phishing via email',
        'quiz_smishing_2': 'Phishing via phone calls',
        'quiz_smishing_3': 'Phishing via text messages',
        'quiz_smishing_4': 'Phishing via social media',
        'quiz_fake_invoice_1': 'Pay it immediately to avoid penalties',
        'quiz_fake_invoice_2': 'Contact the company directly using contact information you find yourself',
        'quiz_fake_invoice_3': 'Ignore it and hope it goes away',
        'quiz_fake_invoice_4': 'Click on the payment link in the invoice',
        'quiz_charity_scams_1': 'During holiday seasons',
        'quiz_charity_scams_2': 'After major disasters or crises',
        'quiz_charity_scams_3': 'During election periods',
        'quiz_charity_scams_4': 'At the end of the financial year',
        'quiz_spear_phishing_1': 'It uses more advanced technology',
        'quiz_spear_phishing_2': 'It targets a wider audience',
        'quiz_spear_phishing_3': 'It is highly personalized and targets specific individuals',
        'quiz_spear_phishing_4': 'It only occurs on specific websites',
        'quiz_fake_domain_1': 'The website loads slowly',
        'quiz_fake_domain_2': 'The design looks old-fashioned',
        'quiz_fake_domain_3': 'There are subtle misspellings or unusual domain extensions in the URL',
        'quiz_fake_domain_4': 'It asks for too much information',
        'quiz_whaling_1': 'Junior employees',
        'quiz_whaling_2': 'Customers',
        'quiz_whaling_3': 'High-level executives or VIPs',
        'quiz_whaling_4': 'IT support staff',
        'quiz_ransomware_1': 'Deletes your files permanently',
        'quiz_ransomware_2': 'Encrypts your files and demands payment',
        'quiz_ransomware_3': 'Steals your login credentials',
        'quiz_ransomware_4': 'Speeds up your computer',
        'quiz_social_media_1': 'Official company announcements',
        'quiz_social_media_2': 'Personalized birthday wishes from friends',
        'quiz_social_media_3': 'Fake giveaways or urgent requests from unknown profiles',
        'quiz_social_media_4': 'Invitations to legitimate events',
        'quiz_public_wifi_1': 'It is too slow for banking',
        'quiz_public_wifi_2': 'Your device might get disconnected frequently',
        'quiz_public_wifi_3': 'Public Wi-Fi networks are often unsecured and can expose your data',
        'quiz_public_wifi_4': 'It costs money to use',
        'quiz_deepfake_1': 'Virtual Reality',
        'quiz_deepfake_2': 'Augmented Reality',
        'quiz_deepfake_3': 'Artificial Intelligence',
        'quiz_deepfake_4': 'Blockchain',
        'quiz_apt_1': 'A quick, one-time attack',
        'quiz_apt_2': 'A highly visible, noisy attack',
        'quiz_apt_3': 'A stealthy, long-term attack remaining undetected for extended periods',
        'quiz_apt_4': 'An attack that only targets personal computers'
    }
};

function updateContent() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLang][key]) {
            element.textContent = translations[currentLang][key];
        }
    });

    const inputs = document.querySelectorAll('[data-placeholder-key]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-placeholder-key');
        if (translations[currentLang][key]) {
            input.placeholder = translations[currentLang][key];
        }
    });

    document.documentElement.setAttribute('lang', currentLang);
}

async function loadLessons() {
    try {
        const response = await fetch('lessons.json');
        const rawLessons = await response.json();

        if (window.location.pathname.includes('training.html')) {
            displayAllLevels();
            updateProfilePage();
        }
    } catch (error) {
        console.error('Error loading lessons:', error);
    }
}

function displayAllLevels() {
    const levelsContainer = document.getElementById('levelsContainer');
    if (levelsContainer) {
        levelsContainer.innerHTML = '';

        const lessonsToDisplay = translations.en.lessons;

        lessonsToDisplay.forEach((lesson, index) => {
            const levelCard = document.createElement('div');
            levelCard.classList.add('level-card');
            levelCard.dataset.lessonId = lesson.id;

            let difficultyText = '';
            if (lesson.id >= 1 && lesson.id <= 5) {
                difficultyText = translations.en['level_easy'];
            } else if (lesson.id >= 6 && lesson.id <= 12) {
                difficultyText = translations.en['level_medium'];
            } else if (lesson.id >= 13 && lesson.id <= 20) {
                difficultyText = translations.en['level_advanced'];
            }

            levelCard.innerHTML = `
                <h3>${lesson.title}</h3>
                <p>${translations.en['level_singular']} ${lesson.id}: ${difficultyText}</p>
                <button class="btn primary-btn start-quiz-btn" data-lesson-id="${lesson.id}">${translations.en['start_quiz']}</button>
                <span class="checkmark" style="display: none;">✅</span>
            `;

            if (userProgress.completedLessons.includes(lesson.id)) {
                levelCard.classList.add('completed');
                levelCard.querySelector('.checkmark').style.display = 'block';
            }

            if (index > 0 && !userProgress.completedLessons.includes(lessonsToDisplay[index - 1].id)) {
                levelCard.classList.add('locked');
                levelCard.querySelector('.start-quiz-btn').disabled = true;
                levelCard.querySelector('.start-quiz-btn').textContent = translations.en['locked'];
            }

            levelCard.addEventListener('click', (event) => {
                if (!levelCard.classList.contains('locked') || event.target.classList.contains('start-quiz-btn')) {
                    currentLessonIndex = lessonsToDisplay.findIndex(l => l.id === lesson.id);
                    currentSlideIndex = 0;
                    displayLessonContent(lesson);
                }
            });
            levelsContainer.appendChild(levelCard);
        });
    }
}

function displayLessonContent(lesson) {
    const levelsContainer = document.getElementById('levelsContainer');
    const lessonContentDiv = document.getElementById('lessonContent');
    const lessonTitle = document.getElementById('lessonTitle');
    const slideContent = document.getElementById('slideContent');
    const quizContent = document.getElementById('quizContent');
    const prevSlideBtn = document.getElementById('prevSlideBtn');
    const nextSlideBtn = document.getElementById('nextSlideBtn');

    if (levelsContainer && lessonContentDiv) {
        levelsContainer.style.display = 'none';
        lessonContentDiv.style.display = 'block';
        lessonTitle.textContent = lesson.title;

        for (const levelKey in translations) {
            if (Array.isArray(translations[levelKey].lessons) && translations[levelKey].lessons.some(l => l.id === lesson.id)) {
                currentLevel = levelKey;
                break;
            }
        }

        currentLessonIndex = translations[currentLevel].lessons.findIndex(l => l.id === lesson.id);

    quizContent.style.display = 'none';

    const currentSlide = lesson.slides[currentSlideIndex];
    slideContent.innerHTML = '';
    if (currentSlide.type === 'text') {
        slideContent.innerHTML = `<p>${currentSlide.content}</p>`;
    } else if (currentSlide.type === 'image') {
        slideContent.innerHTML = `<img src="${currentSlide.src}" alt="${currentSlide.alt}"><p>${currentSlide.caption || ''}</p>`;
    }

    prevSlideBtn.style.display = currentSlideIndex > 0 ? 'inline-block' : 'none';
        nextSlideBtn.textContent = currentSlideIndex < lesson.slides.length - 1 ? translations.en['next'] : translations.en['start_quiz'];

    prevSlideBtn.onclick = () => {
        currentSlideIndex--;
        displayLessonContent(lesson);
    };
    nextSlideBtn.onclick = () => {
        if (currentSlideIndex < lesson.slides.length - 1) {
            currentSlideIndex++;
            displayLessonContent(lesson);
        } else {
            currentQuizQuestionIndex = 0;
            displayQuiz(lesson.quiz, lesson.id);
        }
    };
    }
}

function displayQuiz(quizQuestions, lessonId) {
    const slideContent = document.getElementById('slideContent');
    const slideNav = document.querySelector('.slide-nav');
    const quizContent = document.getElementById('quizContent');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const submitQuizBtn = document.getElementById('submitQuizBtn');

    slideContent.style.display = 'none';
    slideNav.style.display = 'none';
    quizContent.style.display = 'block';

    const currentQuiz = quizQuestions[currentQuizQuestionIndex];
    quizQuestion.textContent = currentQuiz.question;
    quizOptions.innerHTML = '';

    const safeOptionText = translations.en['safe_option'];
    const phishingOptionText = translations.en['phishing_option'];

    const safeLabel = document.createElement('label');
    safeLabel.innerHTML = `<input type="radio" name="quizOption" value="0" class="quiz-radio"> ${safeOptionText}`;
    safeLabel.addEventListener('click', () => {
            quizOptions.querySelectorAll('label').forEach(lbl => lbl.classList.remove('selected'));
        safeLabel.classList.add('selected');
    });
    quizOptions.appendChild(safeLabel);

    const phishingLabel = document.createElement('label');
    phishingLabel.innerHTML = `<input type="radio" name="quizOption" value="1" class="quiz-radio"> ${phishingOptionText}`;
    phishingLabel.addEventListener('click', () => {
        quizOptions.querySelectorAll('label').forEach(lbl => lbl.classList.remove('selected'));
        phishingLabel.classList.add('selected');
    });
    quizOptions.appendChild(phishingLabel);

    submitQuizBtn.textContent = translations.en['submit_answer'];
    submitQuizBtn.onclick = () => {
        const selectedOption = document.querySelector('input[name="quizOption"]:checked');
        if (selectedOption) {
            const userAnswerIndex = parseInt(selectedOption.value);
            if (currentQuizQuestionIndex === 0) {
            userProgress.totalQuizzes++;
            }

            if (userAnswerIndex === currentQuiz.correctAnswerIndex) {
                userProgress.quizzesPassed++;
                showFeedback(true, `${translations.en['quiz_correct_feedback']}${currentQuiz.explanation}`, quizQuestions, lessonId);
            } else {
                showFeedback(false, `${translations.en['quiz_incorrect_feedback']}${currentQuiz.explanation}`, quizQuestions, lessonId);
            }
            localStorage.setItem('userProgress', JSON.stringify(userProgress));
            updateProfilePage();
        } else {
             alert(translations.en['quiz_select_answer']);
         }
     };

    const nextBtn = document.getElementById('nextBtn');
}

function showFeedback(isCorrect, explanation, quizQuestions, lessonId) {
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackTitle = document.getElementById('feedbackTitle');
    const feedbackExplanation = document.getElementById('feedbackExplanation');
    const nextBtn = document.getElementById('nextBtn');
    
    if (isCorrect) {
         feedbackTitle.textContent = translations.en['correct'];
        feedbackTitle.style.color = '#16a34a'; // Green
    } else {
         feedbackTitle.textContent = translations.en['incorrect'];
        feedbackTitle.style.color = '#dc2626'; // Red
    }
    feedbackExplanation.textContent = explanation;
    feedbackModal.style.display = 'flex';

    if (currentQuizQuestionIndex < quizQuestions.length - 1) {
        nextBtn.textContent = translations.en['next_question'] || 'Next Question'; // New translation key for next question
        nextBtn.onclick = () => {
            hideFeedback();
            currentQuizQuestionIndex++;
            displayQuiz(quizQuestions, lessonId);
        };
    } else {
        nextBtn.textContent = translations.en['continue'];
        nextBtn.onclick = () => {
            hideFeedback();
            const currentLesson = translations.en.lessons.find(l => l.id === lessonId);
            if (!userProgress.completedLessons.includes(currentLesson.id)) {
                userProgress.completedLessons.push(currentLesson.id);
                localStorage.setItem('userProgress', JSON.stringify(userProgress));
            }
            displayAllLevels();
        };
    }
}

function hideFeedback() {
    const feedbackModal = document.getElementById('feedbackModal');
    if (feedbackModal) {
        feedbackModal.style.display = 'none';
    }
}

function updateDashboardProgress() {
    if (window.location.pathname.includes('dashboard.html')) {
        document.getElementById('quizzesPlayed').textContent = userProgress.totalQuizzes;
        document.getElementById('timesCorrected').textContent = userProgress.quizzesPassed;
    }
}

const leaderboardData = [
    { rank: 1, player: 'Alice', score: 1500, correctAnswers: 45 },
    { rank: 2, player: 'Bob', score: 1200, correctAnswers: 40 },
    { rank: 3, player: 'Charlie', score: 1000, correctAnswers: 38 },
    { rank: 4, player: 'David', score: 900, correctAnswers: 35 },
    { rank: 5, player: 'Eve', score: 750, correctAnswers: 30 },
];

function displayLeaderboard() {
    const leaderboardTableBody = document.querySelector('#leaderboardTable tbody');
    if (leaderboardTableBody) {
        leaderboardTableBody.innerHTML = '';

        let currentLeaderboardData = [...leaderboardData];
        const storedUsername = localStorage.getItem('username');
        const storedUserProgress = JSON.parse(localStorage.getItem('userProgress'));

        if (storedUsername && storedUserProgress) {
            const userExistsInLeaderboard = currentLeaderboardData.some(entry => entry.player === storedUsername);
            if (!userExistsInLeaderboard) {
                currentLeaderboardData.push({
                    rank: 0,
                    player: storedUsername,
                    score: storedUserProgress.quizzesPassed * 10,
                    correctAnswers: storedUserProgress.quizzesPassed
                });
            }
        }

        currentLeaderboardData.sort((a, b) => b.score - a.score);

        currentLeaderboardData.forEach((entry, index) => {
            const row = leaderboardTableBody.insertRow();
            row.insertCell().textContent = index + 1;
            row.insertCell().textContent = entry.player;
            row.insertCell().textContent = entry.score;
            row.insertCell().textContent = entry.correctAnswers;
        });
    }
}

function updateProfilePage() {
    if (window.location.pathname.includes('profile.html')) {
        const storedQuizzesPlayed = userProgress.totalQuizzes;
        const storedTimesCorrected = userProgress.quizzesPassed;

        document.getElementById('profileTotalQuizzes').textContent = storedQuizzesPlayed;
        document.getElementById('profileCorrectAnswers').textContent = storedTimesCorrected;
        document.getElementById('profileLessonsCompleted').textContent = userProgress.completedLessons.length;

        const badgesContainer = document.getElementById('badgesContainer');
        badgesContainer.innerHTML = '';

        if (userProgress.completedLessons.length >= 1) {
            badgesContainer.innerHTML += `
                <div class="badge">
                    <h3>${translations.en['lesson_starter_badge']}</h3>
                    <p>${translations.en['lesson_starter_desc']}</p>
                </div>
            `;
        }
        if (userProgress.completedLessons.length >= 3) {
            badgesContainer.innerHTML += `
                <div class="badge">
                    <h3>${translations.en['lesson_enthusiast_badge']}</h3>
                    <p>${translations.en['lesson_enthusiast_desc']}</p>
                </div>
            `;
        }
        if (userProgress.completedLessons.length >= 5) {
            badgesContainer.innerHTML += `
                <div class="badge">
                    <h3>${translations.en['lesson_master_badge']}</h3>
                    <p>${translations.en['lesson_master_desc']}</p>
                </div>
            `;
        }
        if (userProgress.quizzesPassed >= 1) {
            badgesContainer.innerHTML += `
                <div class="badge">
                    <h3>${translations.en['quiz_conqueror_badge']}</h3>
                    <p>${translations.en['quiz_conqueror_desc_1']}</p>
                </div>
            `;
        }
        if (userProgress.quizzesPassed >= 5) {
            badgesContainer.innerHTML += `
                <div class="badge">
                    <h3>${translations.en['quiz_conqueror_badge']}</h3>
                    <p>${translations.en['quiz_conqueror_desc_5']}</p>
                </div>
            `;
        }
        if (badgesContainer.innerHTML === '') {
            badgesContainer.innerHTML = `<p>${translations.en['no_badges']}</p>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const pageTitleElement = document.querySelector('title');
    if (pageTitleElement) {
        const titleKey = pageTitleElement.getAttribute('data-key');
        if (titleKey && translations[currentLang][titleKey]) {
            pageTitleElement.textContent = translations[currentLang][titleKey];
        }
    }
    updateContent();

    const startLearningBtn = document.querySelector('.hero .btn');
    if (startLearningBtn) {
        startLearningBtn.addEventListener('click', () => {
            window.location.href = 'training.html';
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            if (email && password) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('username', email.split('@')[0]);
                alert(translations.en['login_success']);
                window.location.href = 'dashboard.html';
            } else {
                alert(translations.en['enter_email_password']);
            }
        });
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('signupUsername').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;

            if (password !== confirmPassword) {
                alert(translations.en['passwords_not_match']);
                return;
            }
            if (password.length < 6) {
                alert(translations.en['password_short']);
                return;
            }
            if (username && email && password) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('username', username);
                alert(translations.en['signup_success']);
                window.location.href = 'dashboard.html';
            } else {
                alert(translations.en['fill_all_fields']);
            }
        });
    }

    const toggleAuthBtn = document.getElementById('toggleAuthBtn');
    const authTitle = document.getElementById('authTitle');
    const loginFormDiv = document.getElementById('loginForm');
    const signupFormDiv = document.getElementById('signupForm');
    const authFooter = document.querySelector('.auth-footer');

    if (authFooter) {
        authFooter.addEventListener('click', (e) => {
            if (e.target.id === 'toggleAuthBtn') {
                if (loginFormDiv.style.display === 'none') {
                    authTitle.textContent = translations.en['login_title'];
                    loginFormDiv.style.display = 'block';
                    signupFormDiv.style.display = 'none';
                    e.target.textContent = translations.en['signup_btn'];
                    e.target.previousSibling.textContent = translations.en['no_account_text'] + ' ';
                } else {
                    authTitle.textContent = translations.en['signup_title'];
                    loginFormDiv.style.display = 'none';
                    signupFormDiv.style.display = 'block';
                    e.target.textContent = translations.en['login_btn'];
                    e.target.previousSibling.textContent = translations.en['have_account_text'] + ' ';
                }
            }
        });
    }

    const guestBtn = document.getElementById('guestBtn');
    if (guestBtn) {
        guestBtn.addEventListener('click', () => {
            alert(translations.en['guest_continue']);
            localStorage.setItem('isGuest', 'true');
            window.location.href = 'training.html';
        });
    }

    if (window.location.pathname.includes('training.html')) {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        const isGuest = localStorage.getItem('isGuest');
        if (!isAuthenticated && !isGuest) {
            window.location.href = 'auth.html';
            return;
        }
    }

    if (window.location.pathname.includes('training.html')) {
        displayAllLevels();
    }

    if (window.location.pathname.includes('dashboard.html')) {
        updateDashboardProgress();
    }

    if (window.location.pathname.includes('leaderboard.html')) {
        displayLeaderboard();
    }

    if (window.location.pathname.includes('profile.html')) {
        const username = localStorage.getItem('username') || translations.en['guest_placeholder'];
        document.getElementById('profileUsername').textContent = username;
        updateProfilePage();
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            alert(translations.en['logged_out']);
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('isGuest');
            localStorage.removeItem('username');
            localStorage.removeItem('userProgress');
            window.location.href = 'index.html';
        });
    }

    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChatBtn = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');

    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            chatWindow.style.display = 'flex';
            chatbotToggle.style.display = 'none';
            addBotMessage(translations.en['bot_welcome']);
        });
    }

    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', () => {
            chatWindow.style.display = 'none';
            chatbotToggle.style.display = 'flex';
        });
    }

    const feedbackModal = document.getElementById('feedbackModal');
    if (feedbackModal) {
        feedbackModal.style.display = 'none';
    }

    if (sendChatBtn) {
        sendChatBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    function addMessage(sender, text) {
        const messageBubble = document.createElement('div');
        messageBubble.classList.add('msg-bubble', sender);
        messageBubble.textContent = text;
        chatMessages.appendChild(messageBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function addUserMessage(text) {
        addMessage('user', text);
    }

    function addBotMessage(text) {
        addMessage('bot', text);
    }

    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('msg-bubble', 'bot', 'typing-indicator');
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingIndicator;
    }

    function removeTypingIndicator(indicator) {
        if (indicator && chatMessages.contains(indicator)) {
            chatMessages.removeChild(indicator);
        }
    }

    async function sendMessage() {
        const userText = chatInput.value.trim();
        if (userText === '') return;

        addUserMessage(userText);
        chatInput.value = '';

        const typing = showTypingIndicator();

        const botResponse = await getBotResponse(userText);

        setTimeout(() => {
            removeTypingIndicator(typing);
            addBotMessage(botResponse);
        }, 1000 + Math.random() * 1000);
    }

    async function getBotResponse(userQuery) {
        const lowerCaseQuery = userQuery.toLowerCase();
        const currentLanguage = localStorage.getItem('lang') || 'en';

        if (lowerCaseQuery.includes('hello') || lowerCaseQuery.includes('hi')) {
            return translations.en['bot_hello'];
        } else if (lowerCaseQuery.includes('scam') || lowerCaseQuery.includes('phishing')) {
            return translations.en['bot_scam_phishing'];
        } else if (lowerCaseQuery.includes('website navigation') || lowerCaseQuery.includes('how to use')) {
            return translations.en['bot_navigation'];
        } else if (lowerCaseQuery.includes('dark mode') || lowerCaseQuery.includes('light mode')) {
            return translations.en['bot_dark_light_mode'];
        } else if (lowerCaseQuery.includes('training') || lowerCaseQuery.includes('lessons')) {
            return translations.en['bot_training_lessons'];
        } else if (lowerCaseQuery.includes('thank you') || lowerCaseQuery.includes('thanks')) {
            return translations.en['bot_thank_you'];
        } else if (lowerCaseQuery.includes('who are you') || lowerCaseQuery.includes('what are you')) {
            return translations.en['bot_who_are_you'];
        } else if (lowerCaseQuery.includes('fraud') || lowerCaseQuery.includes('prevention')) {
            return translations.en['bot_fraud_prevention'];
        } else if (lowerCaseQuery.includes('login') || lowerCaseQuery.includes('signup')) {
            return translations.en['bot_login_signup'];
        } else if (lowerCaseQuery.includes('leaderboard')) {
            return translations.en['bot_leaderboard'];
        } else if (lowerCaseQuery.includes('profile') || lowerCaseQuery.includes('achievements')) {
            return translations.en['bot_profile'];
        } else {
            return translations.en['bot_unknown'];
        }
    }
});
