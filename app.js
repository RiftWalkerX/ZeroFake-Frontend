let lessons = {};
let currentLevel = 'beginner';
let currentLessonIndex = 0;
let currentSlideIndex = 0;
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

async function loadLessons() {
    try {
        const response = await fetch('lessons.json');
        lessons = await response.json();
        if (window.location.pathname.includes('training.html')) {
            displayLevels();
            displayLessons(currentLevel);
            updateProfilePage();
        }
    } catch (error) {
        console.error('Error loading lessons:', error);
    }
}

function displayLevels() {
    const levelSelect = document.querySelector('.level-select');
    if (levelSelect) {
        levelSelect.querySelectorAll('.level-btn').forEach(button => {
            button.addEventListener('click', () => {
                currentLevel = button.dataset.level;
                displayLessons(currentLevel);
            });
        });
    }
}

function displayLessons(level) {
    const lessonList = document.getElementById('lessonsList');
    const lessonContent = document.getElementById('lessonContent');
    const levelLessons = lessons[level];

    if (lessonList && levelLessons) {
        lessonList.innerHTML = '';
        lessonContent.style.display = 'none';
        lessonList.style.display = 'grid';

        levelLessons.forEach((lesson, index) => {
            const lessonCard = document.createElement('div');
            lessonCard.classList.add('lesson-card');
            lessonCard.dataset.lessonId = lesson.id;
            lessonCard.innerHTML = `
                <h3>${lesson.title}</h3>
                <p>Lesson ${lesson.id}</p>
                <span class="checkmark">✅</span>
            `;

            if (userProgress.completedLessons.includes(lesson.id)) {
                lessonCard.classList.add('completed');
            }

            if (index > 0 && !userProgress.completedLessons.includes(levelLessons[index - 1].id)) {
                lessonCard.classList.add('locked');
            } else {
                lessonCard.addEventListener('click', () => {
                    currentLessonIndex = index;
                    currentSlideIndex = 0;
                    displayLessonContent(lesson);
                });
            }

            lessonList.appendChild(lessonCard);
        });
    }
}

function displayLessonContent(lesson) {
    const lessonList = document.getElementById('lessonsList');
    const lessonContentDiv = document.getElementById('lessonContent');
    const lessonTitle = document.getElementById('lessonTitle');
    const slideContent = document.getElementById('slideContent');
    const quizContent = document.getElementById('quizContent');
    const prevSlideBtn = document.getElementById('prevSlideBtn');
    const nextSlideBtn = document.getElementById('nextSlideBtn');

    lessonList.style.display = 'none';
    lessonContentDiv.style.display = 'block';
    lessonTitle.textContent = lesson.title;
    quizContent.style.display = 'none';

    const currentSlide = lesson.slides[currentSlideIndex];
    slideContent.innerHTML = '';
    if (currentSlide.type === 'text') {
        slideContent.innerHTML = `<p>${currentSlide.content}</p>`;
    } else if (currentSlide.type === 'image') {
        slideContent.innerHTML = `<img src="${currentSlide.src}" alt="${currentSlide.alt}"><p>${currentSlide.caption || ''}</p>`;
    }

    prevSlideBtn.style.display = currentSlideIndex > 0 ? 'inline-block' : 'none';
    nextSlideBtn.textContent = currentSlideIndex < lesson.slides.length - 1 ? 'Next' : 'Start Quiz';

    prevSlideBtn.onclick = () => {
        currentSlideIndex--;
        displayLessonContent(lesson);
    };
    nextSlideBtn.onclick = () => {
        if (currentSlideIndex < lesson.slides.length - 1) {
            currentSlideIndex++;
            displayLessonContent(lesson);
        } else {
            displayQuiz(lesson.quiz);
        }
    };
}

function displayQuiz(quiz) {
    const slideContent = document.getElementById('slideContent');
    const slideNav = document.querySelector('.slide-nav');
    const quizContent = document.getElementById('quizContent');
    const quizQuestion = document.getElementById('quizQuestion');
    const quizOptions = document.getElementById('quizOptions');
    const submitQuizBtn = document.getElementById('submitQuizBtn');

    slideContent.style.display = 'none';
    slideNav.style.display = 'none';
    quizContent.style.display = 'block';

    quizQuestion.textContent = quiz.question;
    quizOptions.innerHTML = '';

    quiz.options.forEach((option, index) => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="quizOption" value="${index}"> ${option}`;
        label.addEventListener('click', () => {
            quizOptions.querySelectorAll('label').forEach(lbl => lbl.classList.remove('selected'));
            label.classList.add('selected');
        });
        quizOptions.appendChild(label);
    });

    submitQuizBtn.onclick = () => {
        const selectedOption = document.querySelector('input[name="quizOption"]:checked');
        if (selectedOption) {
            const userAnswerIndex = parseInt(selectedOption.value);
            userProgress.totalQuizzes++;

            if (userAnswerIndex === quiz.correctAnswerIndex) {
                userProgress.quizzesPassed++;
                showFeedback(true, quiz.explanation);
                const currentLesson = lessons[currentLevel][currentLessonIndex];
                if (!userProgress.completedLessons.includes(currentLesson.id)) {
                    userProgress.completedLessons.push(currentLesson.id);
                }
            } else {
                showFeedback(false, quiz.explanation);
            }
            localStorage.setItem('userProgress', JSON.stringify(userProgress));
            updateProfilePage();
        } else {
            alert('Please select an answer.');
        }
    };

    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
        nextBtn.onclick = () => {
            hideFeedback();
            displayLessons(currentLevel);
        };
    }
}

function showFeedback(isCorrect, explanation) {
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackTitle = document.getElementById('feedbackTitle');
    const feedbackExplanation = document.getElementById('feedbackExplanation');
    
    if (isCorrect) {
        feedbackTitle.textContent = 'Correct!';
        feedbackTitle.style.color = '#16a34a';
    } else {
        feedbackTitle.textContent = 'Incorrect!';
        feedbackTitle.style.color = '#dc2626';
    }
    feedbackExplanation.textContent = explanation;
    feedbackModal.style.display = 'flex';
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
                    <h3>Lesson Starter</h3>
                    <p>Completed 1 lesson.</p>
                </div>
            `;
        }
        if (userProgress.completedLessons.length >= 3) {
            badgesContainer.innerHTML += `
                <div class="badge">
                    <h3>Lesson Enthusiast</h3>
                    <p>Completed 3 lessons.</p>
                </div>
            `;
        }
        if (userProgress.completedLessons.length >= 5) {
            badgesContainer.innerHTML += `
                <div class="badge">
                    <h3>Lesson Master</h3>
                    <p>Completed 5 lessons.</p>
                </div>
            `;
        }
        if (userProgress.quizzesPassed >= 1) {
            badgesContainer.innerHTML += `
                <div class="badge">
                    <h3>Quiz Conqueror</h3>
                    <p>Passed 1 quiz.</p>
                </div>
            `;
        }
        if (userProgress.quizzesPassed >= 5) {
            badgesContainer.innerHTML += `
                <div class="badge">
                    <h3>Quiz Champion</h3>
                    <p>Passed 5 quizzes.</p>
                </div>
            `;
        }
        if (badgesContainer.innerHTML === '') {
            badgesContainer.innerHTML = '<p>Complete lessons and quizzes to earn badges!</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
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
                alert('Login successful!');
                window.location.href = 'dashboard.html';
            } else {
                alert('Please enter both email and password.');
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
                alert('Passwords do not match.');
                return;
            }
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }
            if (username && email && password) {
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('username', username);
                alert('Signup successful!');
                window.location.href = 'dashboard.html';
            } else {
                alert('Please fill in all fields.');
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
                    authTitle.textContent = 'Login';
                    loginFormDiv.style.display = 'block';
                    signupFormDiv.style.display = 'none';
                    e.target.textContent = 'Sign Up';
                    e.target.previousSibling.textContent = 'Don\'t have an account? ';
                } else {
                    authTitle.textContent = 'Sign Up';
                    loginFormDiv.style.display = 'none';
                    signupFormDiv.style.display = 'block';
                    e.target.textContent = 'Login';
                    e.target.previousSibling.textContent = 'Already have an account? ';
                }
            }
        });
    }

    const guestBtn = document.getElementById('guestBtn');
    if (guestBtn) {
        guestBtn.addEventListener('click', () => {
            alert('Continuing as Guest!');
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
        loadLessons();
    }

    if (window.location.pathname.includes('dashboard.html')) {
        updateDashboardProgress();
    }

    if (window.location.pathname.includes('leaderboard.html')) {
        displayLeaderboard();
    }

    if (window.location.pathname.includes('profile.html')) {
        const username = localStorage.getItem('username') || 'Guest';
        document.getElementById('profileUsername').textContent = username;
        updateProfilePage();
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            alert('Logged out!');
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
            addBotMessage("Hello! I'm Zero Fake Bot. How can I help you today?");
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

        if (lowerCaseQuery.includes('hello') || lowerCaseQuery.includes('hi')) {
            return "Hello there! How can I assist you with cybersecurity today?";
        } else if (lowerCaseQuery.includes('scam') || lowerCaseQuery.includes('phishing')) {
            return "Scams and phishing are attempts to trick you into giving up personal information. Always be cautious of suspicious links, unsolicited offers, or urgent requests for data.";
        } else if (lowerCaseQuery.includes('website navigation') || lowerCaseQuery.includes('how to use')) {
            return "You can navigate using the links in the header: Home, Training, Login/Signup, Leaderboard, and Profile. The Training section has interactive lessons and quizzes!";
        } else if (lowerCaseQuery.includes('dark mode') || lowerCaseQuery.includes('light mode')) {
            return "You can toggle between light and dark mode using the switch in the top right corner of the page.";
        } else if (lowerCaseQuery.includes('training') || lowerCaseQuery.includes('lessons')) {
            return "The Training page offers lessons categorized by difficulty: Beginner, Intermediate, and Advanced. Complete quizzes to unlock new levels!";
        } else if (lowerCaseQuery.includes('thank you') || lowerCaseQuery.includes('thanks')) {
            return "You're welcome! Stay safe online!";
        } else if (lowerCaseQuery.includes('who are you') || lowerCaseQuery.includes('what are you')) {
            return "I am Zero Fake Bot, your personal assistant for cybersecurity education. My purpose is to help you understand and detect online threats.";
        } else if (lowerCaseQuery.includes('fraud') || lowerCaseQuery.includes('prevention')) {
            return "Fraud prevention involves being vigilant about suspicious communications, verifying sources, using strong passwords, and keeping your software updated.";
        } else if (lowerCaseQuery.includes('login') || lowerCaseQuery.includes('signup')) {
            return "To log in or sign up, click on the 'Login/Signup' link in the navigation bar. You can also continue as a guest.";
        } else if (lowerCaseQuery.includes('leaderboard')) {
            return "The Leaderboard shows how your scores compare to other users. Keep learning to climb the ranks!";
        } else if (lowerCaseQuery.includes('profile') || lowerCaseQuery.includes('achievements')) {
            return "Your Profile page displays your progress, quizzes completed, and badges you've earned. The more you learn, the more badges you'll get!";
        } else {
            return "I'm not sure how to answer that, but I can help you with questions about online scams, phishing, website navigation, and your progress on Zero Fake.";
        }
    }
});
