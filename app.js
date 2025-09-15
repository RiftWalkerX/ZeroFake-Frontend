function setDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.getElementById('themeToggle').checked = true;
        setDarkMode(true);
    } else {
        document.getElementById('themeToggle').checked = false;
        setDarkMode(false);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', (e) => {
            setDarkMode(e.target.checked);
        });
    }
});

let currentLessonIndex = 0;
let currentSlideIndex = 0;
let currentQuizQuestionIndex = 0;

let userProgress = JSON.parse(localStorage.getItem('userProgress')) || {
    completedLessons: [],
    lessonsCompletedCount: 0,
    lessonScores: {},
    quizzesPassed: 0,
    totalQuizzes: 0
};

const themeToggle = document.getElementById('themeToggle');

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
        'next_question': 'Next Question',
        'quiz_result': 'Quiz Result',
        'try_again': 'Try Again',
        'quiz_passed': 'Level Completed! You passed with ',
        'quiz_failed': 'Level Failed. You scored ',
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
    },
    'ar': {
        'home': 'الرئيسية',
        'training': 'التدريب',
        'leaderboard': 'لوحة الصدارة',
        'profile': 'الملف الشخصي',
        'login_signup': 'تسجيل الدخول / إنشاء حساب',
        'logout': 'تسجيل الخروج',
        'main_title_training': '🛡️ تدريب كشف الاحتيال الإلكتروني (تدريب زيرو فيك)',
        'intro_text_training': 'في هذه الصفحة، ستتعلم كيفية التمييز بين الرسائل الحقيقية ورسائل التصيد الاحتيالي بخطوات بسيطة. ستشارك في تمارين عملية بمستويات تتراوح من السهل إلى الصعب.',
        'start_quiz': 'بدء الاختبار',
        'locked': 'مغلق',
        'next': 'التالي',
        'submit_answer': 'إرسال الإجابة',
        'correct': 'إجابتك صحيحة ✔️',
        'incorrect': 'إجابتك خاطئة ❌',
        'continue': 'متابعة',
        'quiz_select_answer': 'الرجاء اختيار إجابة.',
        'quiz_correct_feedback': 'إجابتك صحيحة! هذه الرسالة هي في الواقع:',
        'quiz_incorrect_feedback': 'إجابتك خاطئة. كان يجب أن تلاحظ:',
        'level_easy': 'مستوى سهل',
        'level_medium': 'مستوى متوسط',
        'level_advanced': 'مستوى متقدم',
        'login_title': 'تسجيل الدخول',
        'signup_title': 'إنشاء حساب',
        'email_placeholder': 'البريد الإلكتروني',
        'password_placeholder': 'كلمة المرور',
        'username_placeholder': 'اسم المستخدم',
        'confirm_password_placeholder': 'تأكيد كلمة المرور',
        'login_btn': 'تسجيل الدخول',
        'signup_btn': 'إنشاء حساب',
        'no_account_text': 'ليس لديك حساب؟',
        'have_account_text': 'هل لديك حساب بالفعل؟',
        'guest_btn': 'المتابعة كضيف',
        'login_success': 'تم تسجيل الدخول بنجاح!',
        'enter_email_password': 'الرجاء إدخال البريد الإلكتروني وكلمة المرور.',
        'passwords_not_match': 'كلمات المرور غير متطابقة.',
        'password_short': 'يجب أن تكون كلمة المرور 6 أحرف على الأقل.',
        'fill_all_fields': 'الرجاء ملء جميع الحقول.',
        'signup_success': 'تم إنشاء الحساب بنجاح!',
        'guest_continue': 'المتابعة كضيف!',
        'logged_out': 'تم تسجيل الخروج!',
        'welcome_user': 'مرحباً، يا مستخدم!',
        'your_progress': 'تقدمك',
        'quizzes_played': 'الاختبارات التي لعبتها:',
        'times_correct': 'عدد المرات الصحيحة:',
        'profile_page_title': 'صفحة الملف الشخصي',
        'profile_username': 'اسم المستخدم:',
        'profile_total_quizzes': 'إجمالي الاختبارات:',
        'profile_correct_answers': 'الإجابات الصحيحة:',
        'profile_lessons_completed': 'الدروس المكتملة:',
        'achievements_badges': 'الإنجازات / الشارات',
        'lesson_starter_badge': 'مبتدئ الدروس',
        'lesson_starter_desc': 'أكمل درسًا واحدًا.',
        'lesson_enthusiast_badge': 'متحمس الدروس',
        'lesson_enthusiast_desc': 'أكمل 3 دروس.',
        'lesson_master_badge': 'خبير الدروس',
        'lesson_master_desc': 'أكمل 5 دروس.',
        'quiz_conqueror_badge': 'قاهر الاختبارات',
        'quiz_conqueror_desc_1': 'اجتاز اختبارًا واحدًا.',
        'quiz_conqueror_desc_5': 'اجتاز 5 اختبارات.',
        'no_badges': 'أكمل الدروس والاختبارات لكسب الشارات!',
        'leaderboard_title': 'لوحة الصدارة',
        'rank': 'الترتيب',
        'player': 'اللاعب',
        'score': 'النقاط',
        'correct_answers': 'الإجابات الصحيحة',
        'bot_welcome': 'مرحباً! أنا بوت زيرو فيك. كيف يمكنني مساعدتك اليوم؟',
        'bot_hello': 'أهلاً بك! كيف يمكنني مساعدتك في الأمن السيبراني اليوم؟',
        'bot_scam_phishing': 'الاحتيال والتصيد الاحتيالي هما محاولات لخداعك للتخلي عن معلومات شخصية. كن حذرًا دائمًا من الروابط المشبوهة، أو العروض غير المرغوب فيها، أو الطلبات العاجلة للبيانات.',
        'bot_navigation': 'يمكنك التنقل باستخدام الروابط في الرأس: الرئيسية، التدريب، تسجيل الدخول/إنشاء حساب، لوحة الصدارة، والملف الشخصي. قسم التدريب يحتوي على دروس واختبارات تفاعلية!',
        'bot_dark_light_mode': 'يمكنك التبديل بين الوضع الفاتح والداكن باستخدام المفتاح في الزاوية العلوية اليمنى من الصفحة.',
        'bot_training_lessons': 'صفحة التدريب تقدم دروسًا مصنفة حسب الصعوبة: مبتدئ، متوسط، ومتقدم. أكمل الاختبارات لفتح مستويات جديدة!',
        'bot_thank_you': 'على الرحب والسعة! ابق آمنًا عبر الإنترنت!',
        'bot_who_are_you': 'أنا بوت زيرو فيك، مساعدك الشخصي لتعليم الأمن السيبراني. هدفي هو مساعدتك على فهم واكتشاف التهديدات عبر الإنترنت.',
        'bot_fraud_prevention': 'يتضمن منع الاحتيال اليقظة بشأن الاتصالات المشبوهة، والتحقق من المصادر، واستخدام كلمات مرور قوية، وتحديث برامجك.',
        'bot_login_signup': 'لتسجيل الدخول أو إنشاء حساب، انقر على رابط \'تسجيل الدخول/إنشاء حساب\' في شريط التنقل. يمكنك أيضًا المتابعة كضيف.',
        'bot_leaderboard': 'لوحة الصدارة تظهر كيف تقارن درجاتك مع المستخدمين الآخرين. استمر في التعلم لتصعد في الترتيب!',
        'bot_profile': 'صفحة ملفك الشخصي تعرض تقدمك، الاختبارات المكتملة، والشارات التي حصلت عليها. كلما تعلمت أكثر، ستحصل على المزيد من الشارات!',
        'bot_unknown': 'لست متأكدًا من كيفية الإجابة على ذلك، ولكن يمكنني مساعدتك في الأسئلة المتعلقة بالاحتيال عبر الإنترنت، والتصيد الاحتيالي، والتنقل في الموقع، وتقدمك في زيرو فيك.',
        'app_name': 'زيرو فيك',
        'home_title': 'زيرو فيك - الرئيسية',
        'auth_title': 'تسجيل الدخول / التسجيل - زيرو فيك',
        'dashboard_title': 'لوحة التحكم',
        'leaderboard_title': 'لوحة الصدارة',
        'profile_title': 'الملف الشخصي',
        'training_title': 'تدريب كشف الاحتيال الإلكتروني',
        'intro_text_home': 'يساعدك زيرو فيك على اكتشاف عمليات الاحتيال والخداع عبر الإنترنت من خلال التعلم التفاعلي والاختبارات.',
        'start_learning': 'ابدأ التعلم',
        'bot_name': 'بوت زيرو فيك',
        'bot_input_placeholder': 'اسألني أي شيء...',
        'bot_send': 'إرسال',
        'guest_placeholder': 'ضيف',
        'level_singular': 'المستوى',
        'previous': 'السابق',
        'safe_option': 'آمن ✅',
        'phishing_option': 'تصيد احتيالي 🚨',
        'next_question': 'السؤال التالي',
        'quiz_result': 'نتيجة الاختبار',
        'try_again': 'حاول مرة أخرى',
        'quiz_passed': 'اكتمل المستوى! لقد اجتزت بنسبة ',
        'quiz_failed': 'فشل المستوى. لقد أحرزت ',
        'quiz_tactic_1': 'استخدام شعارات الشركات الرسمية',
        'quiz_tactic_2': 'تقديم خصومات مشروعة',
        'quiz_tactic_3': 'خلق شعور بالإلحاح أو الخوف',
        'quiz_tactic_4': 'تقديم معلومات اتصال مفصلة',
        'quiz_red_flag_1': 'تحية شخصية',
        'quiz_red_flag_2': 'توقيع رسمي للشركة',
        'quiz_red_flag_3': 'أخطاء إملائية ونحوية',
        'quiz_red_flag_4': 'البريد الإلكتروني للمرسل يطابق نطاق الشركة',
        'quiz_fake_website_1': 'يحتوي على تصميم احترافي',
        'quiz_fake_website_2': 'عنوان URL به أخطاء إملائية طفيفة أو نطاق غير عادي',
        'quiz_fake_website_3': 'يستخدم HTTPS (اتصال آمن)',
        'quiz_fake_website_4': 'يتم تحميله بسرعة',
        'quiz_attachment_1': 'افتحها على الفور',
        'quiz_attachment_2': 'امسحها ببرنامج مكافحة الفيروسات',
        'quiz_attachment_3': 'أعد توجيهها إلى الأصدقاء',
        'quiz_attachment_4': 'احذفها دون التحقق',
        'quiz_sender_identity_1': 'للتحقق مما إذا كانوا صديقك',
        'quiz_sender_identity_2': 'لتأكيد وجودهم على وسائل التواصل الاجتماعي',
        'quiz_sender_identity_3': 'للتأكد من أنهم مصدر شرعي',
        'quiz_sender_identity_4': 'لمعرفة ما إذا كانوا متصلين بالإنترنت',
        'quiz_urgent_language_1': 'لإعلامك بسرعة',
        'quiz_urgent_language_2': 'لتجعلك تشعر بالأهمية',
        'quiz_urgent_language_3': 'لتسريع اتخاذ قرارك',
        'quiz_urgent_language_4': 'لتوفير تحديثات في الوقت المناسب',
        'quiz_payment_method_1': 'بطاقة الائتمان',
        'quiz_payment_method_2': 'تحويل بنكي',
        'quiz_payment_method_3': 'بطاقات الهدايا',
        'quiz_payment_method_4': 'منصات الدفع عبر الإنترنت',
        'quiz_unrealistic_offer_1': 'اقبلها على الفور',
        'quiz_unrealistic_offer_2': 'شاركها مع الجميع',
        'quiz_unrealistic_offer_3': 'تحقق من شرعيتها',
        'quiz_unrealistic_offer_4': 'تجاهلها تمامًا',
        'quiz_tech_support_1': 'عبر رسائل البريد الإلكتروني الرسمية للشركة',
        'quiz_tech_support_2': 'عن طريق إرسال رسالة بريدية لك',
        'quiz_tech_support_3': 'عبر مكالمات هاتفية غير مرغوب فيها أو رسائل منبثقة',
        'quiz_tech_support_4': 'فقط عندما تطلب الدعم',
        'quiz_smishing_1': 'التصيد الاحتيالي عبر البريد الإلكتروني',
        'quiz_smishing_2': 'التصيد الاحتيالي عبر المكالمات الهاتفية',
        'quiz_smishing_3': 'التصيد الاحتيالي عبر الرسائل النصية',
        'quiz_smishing_4': 'التصيد الاحتيالي عبر وسائل التواصل الاجتماعي',
        'quiz_fake_invoice_1': 'ادفعها على الفور لتجنب العقوبات',
        'quiz_fake_invoice_2': 'اتصل بالشركة مباشرة باستخدام معلومات الاتصال التي تجدها بنفسك',
        'quiz_fake_invoice_3': 'تجاهلها وتمنى أن تختفي',
        'quiz_fake_invoice_4': 'انقر على رابط الدفع في الفاتورة',
        'quiz_charity_scams_1': 'خلال مواسم العطلات',
        'quiz_charity_scams_2': 'بعد الكوارث أو الأزمات الكبرى',
        'quiz_charity_scams_3': 'خلال فترات الانتخابات',
        'quiz_charity_scams_4': 'في نهاية السنة المالية',
        'quiz_spear_phishing_1': 'يستخدم تقنية أكثر تقدمًا',
        'quiz_spear_phishing_2': 'يستهدف جمهورًا أوسع',
        'quiz_spear_phishing_3': 'شخصي للغاية ويستهدف أفرادًا محددين',
        'quiz_spear_phishing_4': 'يحدث فقط على مواقع ويب محددة',
        'quiz_fake_domain_1': 'يتم تحميل الموقع ببطء',
        'quiz_fake_domain_2': 'التصميم يبدو قديم الطراز',
        'quiz_fake_domain_3': 'هناك أخطاء إملائية طفيفة أو امتدادات نطاق غير عادية في عنوان URL',
        'quiz_fake_domain_4': 'يطلب الكثير من المعلومات',
        'quiz_whaling_1': 'الموظفون الصغار',
        'quiz_whaling_2': 'العملاء',
        'quiz_whaling_3': 'المديرون التنفيذيون رفيعو المستوى أو كبار الشخصيات',
        'quiz_whaling_4': 'موظفو دعم تكنولوجيا المعلومات',
        'quiz_ransomware_1': 'يحذف ملفاتك نهائيًا',
        'quiz_ransomware_2': 'يشفر ملفاتك ويطلب فدية',
        'quiz_ransomware_3': 'يسرق بيانات اعتماد تسجيل الدخول الخاصة بك',
        'quiz_ransomware_4': 'يسرع جهاز الكمبيوتر الخاص بك',
        'quiz_social_media_1': 'إعلانات الشركة الرسمية',
        'quiz_social_media_2': 'تمنيات عيد ميلاد شخصية من الأصدقاء',
        'quiz_social_media_3': 'مسابقات وهمية أو طلبات عاجلة من ملفات تعريف غير معروفة',
        'quiz_social_media_4': 'دعوات لأحداث مشروعة',
        'quiz_public_wifi_1': 'إنه بطيء جدًا للخدمات المصرفية',
        'quiz_public_wifi_2': 'قد ينقطع اتصال جهازك بشكل متكرر',
        'quiz_public_wifi_3': 'غالبًا ما تكون شبكات Wi-Fi العامة غير آمنة وقد تعرض بياناتك للخطر',
        'quiz_public_wifi_4': 'يكلف المال للاستخدام',
        'quiz_deepfake_1': 'الواقع الافتراضي',
        'quiz_deepfake_2': 'الواقع المعزز',
        'quiz_deepfake_3': 'الذكاء الاصطناعي',
        'quiz_deepfake_4': 'البلوك تشين (سلسلة الكتل)',
        'quiz_apt_1': 'هجوم سريع لمرة واحدة',
        'quiz_apt_2': 'هجوم عالي الوضوح وصاخب',
        'quiz_apt_3': 'هجوم خفي طويل الأمد يظل غير مكتشف لفترات طويلة',
        'quiz_apt_4': 'هجوم يستهدف أجهزة الكمبيوتر الشخصية فقط',
        'cyber_challenge_title': 'تحدي الأمن السيبراني',
        'start_challenge': 'ابدأ التحدي',
        'beginner': 'مبتدئ',
        'intermediate': 'متوسط',
        'advanced': 'متقدم',
        'correct_answers': 'إجابات صحيحة',
        'incorrect_answers': 'إجابات خاطئة',
        'total_points': 'النقاط الكلية',
        'winner': 'الفائز',
        'challenge_again': 'تحدي مرة أخرى',
        'share_results': 'مشاركة النتائج',
        'select_level': 'الرجاء اختيار مستوى صعوبة لبدء التحدي.',
        'time_left': 'الوقت المتبقي:',
        'challenge_result_title': 'نتائج الجولة',
        'question_placeholder': 'السؤال هنا...',
        'option_placeholder': 'الخيار',
        'level_easy': 'مستوى سهل',
        'level_medium': 'مستوى متوسط',
        'level_advanced': 'مستوى متقدم',
        'arabic_level_names': {
            1: 'الأول',
            2: 'الثاني',
            3: 'الثالث',
            4: 'الرابع',
            5: 'الخامس',
            6: 'السادس',
            7: 'السابع',
            8: 'الثامن',
            9: 'التاسع',
            10: 'العاشر',
            11: 'الحادي عشر',
            12: 'الثاني عشر',
            13: 'الثالث عشر',
            14: 'الرابع عشر',
            15: 'الخامس عشر',
            16: 'السادس عشر',
            17: 'السابع عشر',
            18: 'الثامن عشر',
            19: 'التاسع عشر',
            20: 'العشرون'
        }
    }
};

function updateContent() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations.ar[key]) { // Changed to 'ar'
            element.textContent = translations.ar[key]; // Changed to 'ar'
        }
    });

    const inputs = document.querySelectorAll('[data-placeholder-key]');
    inputs.forEach(input => {
        const key = input.getAttribute('data-placeholder-key');
        if (translations.ar[key]) { // Changed to 'ar'
            input.placeholder = translations.ar[key]; // Changed to 'ar'
        }
    });

    document.documentElement.setAttribute('lang', 'ar'); // Changed to 'ar'
}

async function loadLessons() {
    console.log('loadLessons function called.'); // Added log
    try {
        const response = await fetch('lessons.json');
        console.log('Fetch response:', response); // Added log
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const processedLessons = data.lessons.map(lesson => {
            const groupedContent = [];
            let currentBlock = '';

            lesson.محتوى_الدرس.forEach(line => {
                if (line.match(/^\d+\./)) {
                    if (currentBlock !== '') {
                        groupedContent.push(currentBlock);
                    }
                    currentBlock = line;
                } else {
                    currentBlock += '\n' + line;
                }
            });
            if (currentBlock !== '') {
                groupedContent.push(currentBlock);
            }
            return { ...lesson, محتوى_الدرس: groupedContent };
        });

        translations.en.lessons = processedLessons;
        translations.ar.lessons = processedLessons; // Store Arabic lessons
        console.log('Lessons loaded successfully:', translations.en.lessons);

        if (window.location.pathname.includes('training.html')) {
            console.log('Current page is training.html, calling displayAllLevels and updateProgressBar.'); // Added log
            displayAllLevels();
            updateProgressBar();
        }
    } catch (error) {
        console.error('Error loading lessons:', error);
    }
}

function updateProgressBar() {
    const progressBarFill = document.getElementById('progressBarFill');
    if (progressBarFill && translations.en.lessons) {
        const totalLevels = translations.en.lessons.length;
        const completedLevels = Object.values(userProgress.lessonScores).filter(score => score >= 70).length;
        const progressPercentage = totalLevels > 0 ? (completedLevels / totalLevels) * 100 : 0;
        progressBarFill.style.width = `${progressPercentage}%`;
        progressBarFill.textContent = `${Math.round(progressPercentage)}%`;
    }
}

function displayAllLevels() {
    console.log('displayAllLevels function called.'); // Added log
    const levelsContainer = document.getElementById('levelsContainer');
    if (levelsContainer) {
        console.log('levelsContainer found:', levelsContainer); // Modified log
        levelsContainer.innerHTML = '';

        const lessonsToDisplay = translations.en.lessons;
        console.log('Lessons to display:', lessonsToDisplay); // Added log

        if (!lessonsToDisplay || lessonsToDisplay.length === 0) {
            console.warn('No lessons to display.');
            return;
        }

        lessonsToDisplay.forEach((lesson, index) => {
            console.log('Creating card for lesson:', lesson.level, lesson.اسم_الدرس); // Added log
            const levelCard = document.createElement('div');
            levelCard.classList.add('level-card');
            levelCard.dataset.level = lesson.level;

            const isLocked = index > 0 && !(userProgress.completedLessons.includes(lessonsToDisplay[index - 1].level) || userProgress.lessonScores[lessonsToDisplay[index - 1].level] >= 70);
            const isCompleted = userProgress.completedLessons.includes(lesson.level) || userProgress.lessonScores[lesson.level] >= 70;
            const isInProgress = userProgress.lessonScores[lesson.level] > 0 && !isCompleted;

            if (isLocked) {
                levelCard.classList.add('locked');
            }
            if (isCompleted) {
                levelCard.classList.add('completed');
            }
            if (isInProgress) {
                levelCard.classList.add('in-progress');
            }

            let statusIconHtml = '';
            if (isCompleted) {
                statusIconHtml = '<span class="status-icon">✅</span>';
            } else if (isLocked) {
                statusIconHtml = '<span class="status-icon">🔒</span>';
            } else if (isInProgress) {
                statusIconHtml = '<span class="status-icon">⏳</span>';
            }

            const arabicLevelName = translations.ar.arabic_level_names[lesson.level] || lesson.level;

            levelCard.innerHTML = `
                <h3>${translations.ar['level_singular']} ${arabicLevelName}</h3>
                <p>${lesson.اسم_الدرس}</p>
                ${statusIconHtml}
            `;

            if (!isLocked) {
                levelCard.addEventListener('click', () => {
                    currentLessonIndex = lesson.level - 1; // Adjust to 0-based index
                    currentSlideIndex = 0;
                    displayLessonContent(lesson);
                });
            }
            levelsContainer.appendChild(levelCard);
        });
    } else {
        console.error('levelsContainer not found.'); // Added log
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
        lessonTitle.textContent = lesson.اسم_الدرس;

        quizContent.style.display = 'none';

        const contentBlock = lesson.محتوى_الدرس[currentSlideIndex];

        slideContent.innerHTML = '';

        if (contentBlock) {
            const paragraphs = contentBlock.split('\n').map(line => {
                const p = document.createElement('p');
                p.textContent = line;
                return p;
            });
            paragraphs.forEach(p => slideContent.appendChild(p));
        }

        prevSlideBtn.style.display = currentSlideIndex > 0 ? 'inline-block' : 'none';
        prevSlideBtn.textContent = translations.ar['previous']; // Set 'Previous' button text
        nextSlideBtn.textContent = currentSlideIndex < lesson.محتوى_الدرس.length - 1 ? translations.ar['next'] : translations.ar['start_quiz'];

        if (currentSlideIndex === 0) {
            nextSlideBtn.classList.add('align-left-rtl');
        } else {
            nextSlideBtn.classList.remove('align-left-rtl');
        }

        prevSlideBtn.onclick = () => {
            currentSlideIndex--;
            displayLessonContent(lesson);
        };
        nextSlideBtn.onclick = () => {
            if (currentSlideIndex < lesson.محتوى_الدرس.length - 1) {
                currentSlideIndex++;
                displayLessonContent(lesson);
            } else {
                currentQuizQuestionIndex = 0;
                displayQuiz(lesson.الكويز, lesson.level);
            }
        };
    }
}

function displayQuiz(quizQuestions, lessonId) {
    const lessonContentDiv = document.getElementById('lessonContent');
    const quizContent = document.getElementById('quizContent');
    const quizQuestionElement = document.getElementById('quizQuestion');
    const quizOptionsDiv = document.getElementById('quizOptions');

    lessonContentDiv.style.display = 'none';
    quizContent.style.display = 'block';

    const currentQuiz = quizQuestions[currentQuizQuestionIndex];
    if (!currentQuiz) {
        console.error("Quiz question not found at index:", currentQuizQuestionIndex);
        return;
    }

    quizQuestionElement.textContent = currentQuiz.السؤال;
    quizOptionsDiv.innerHTML = '';

    const options = [
        { text: translations.ar['safe_option'], value: 'Safe', className: 'safe-option' }, // Added className
        { text: translations.ar['phishing_option'], value: 'Phishing', className: 'phishing-option' } // Added className
    ];

    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('btn', 'quiz-option-btn', option.className); // Add quiz-option-btn and specific class
        button.textContent = option.text;
        button.dataset.value = option.value; // Store the original value
        button.addEventListener('click', () => {
            quizOptionsDiv.querySelectorAll('.quiz-option-btn').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            submitQuizAnswer(lessonId, quizQuestions, index, option.value);
        });
        quizOptionsDiv.appendChild(button);
    });

    const submitQuizBtn = document.getElementById('submitQuizBtn');
    if (submitQuizBtn) {
        submitQuizBtn.style.display = 'none';
    }
}

function submitQuizAnswer(lessonId, quizQuestions, userAnswerIndex, userAnswerValue) {
    const currentQuiz = quizQuestions[currentQuizQuestionIndex];
    const correctAnswerValue = currentQuiz.الإجابة;

    if (userProgress.lessonScores[lessonId] === undefined) {
        userProgress.lessonScores[lessonId] = 0;
    }
    if (userProgress.lessonAttempts === undefined) {
        userProgress.lessonAttempts = {};
    }
    if (userProgress.lessonAttempts[lessonId] === undefined) {
        userProgress.lessonAttempts[lessonId] = { correct: 0, total: 0 };
    }

    userProgress.lessonAttempts[lessonId].total++;

    if (userAnswerValue === correctAnswerValue) {
        userProgress.lessonAttempts[lessonId].correct++;
        showFeedback(true, currentQuiz.explanation, quizQuestions, lessonId);
    } else {
        showFeedback(false, currentQuiz.explanation, quizQuestions, lessonId);
    }
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    updateProfilePage();
}

function showFeedback(isCorrect, explanation, quizQuestions, lessonId) {
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackTitle = document.getElementById('feedbackTitle');
    const feedbackExplanation = document.getElementById('feedbackExplanation');
    const nextBtn = document.getElementById('nextBtn');
    
    if (isCorrect) {
         feedbackTitle.textContent = translations.ar['correct'];
        feedbackTitle.style.color = '#16a34a'; // Green
    } else {
         feedbackTitle.textContent = translations.ar['incorrect'];
        feedbackTitle.style.color = '#dc2626'; // Red
    }
    feedbackExplanation.textContent = explanation;
    feedbackModal.style.display = 'flex';

    if (currentQuizQuestionIndex < quizQuestions.length - 1) {
        nextBtn.textContent = translations.ar['next_question'] || 'السؤال التالي'; // New translation key for next question
        nextBtn.onclick = () => {
            hideFeedback();
            currentQuizQuestionIndex++;
            displayQuiz(quizQuestions, lessonId);
        };
    } else { // End of quiz
        const totalQuestions = userProgress.lessonAttempts[lessonId].total;
        const correctAnswers = userProgress.lessonAttempts[lessonId].correct;
        const scorePercentage = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;

        userProgress.lessonScores[lessonId] = scorePercentage;

        const passed = scorePercentage >= 70;
        if (passed) {
            feedbackTitle.textContent = translations.ar['quiz_result'];
            feedbackTitle.style.color = '#16a34a';
            feedbackExplanation.innerHTML = `${translations.ar['quiz_passed']}${Math.round(scorePercentage)}%<br>(${correctAnswers}/${totalQuestions})`;
            nextBtn.textContent = translations.ar['continue'];

            if (!userProgress.completedLessons.includes(lessonId)) {
                userProgress.completedLessons.push(lessonId);
                userProgress.lessonsCompletedCount++;
            }
            nextBtn.onclick = () => {
                console.log('DEBUG: Continue button clicked. Hiding feedback...');
                hideFeedback();
                console.log('DEBUG: Feedback hidden. Calling displayAllLevels...');
                displayAllLevels();
                console.log('DEBUG: displayAllLevels called. Calling updateProgressBar...');
                updateProgressBar();
                console.log('DEBUG: updateProgressBar called. Navigation complete.');
            };
        } else {
            feedbackTitle.textContent = translations.ar['quiz_result'];
            feedbackTitle.style.color = '#dc2626';
            feedbackExplanation.innerHTML = `${translations.ar['quiz_failed']}${Math.round(scorePercentage)}%<br>(${correctAnswers}/${totalQuestions}). ${translations.ar['try_again']}`;
            nextBtn.textContent = translations.ar['try_again'];
            nextBtn.onclick = () => {
                hideFeedback();
                currentQuizQuestionIndex = 0; // Reset quiz for current lesson
                userProgress.lessonAttempts[lessonId] = { correct: 0, total: 0 }; // Reset attempts
                // Find the current lesson to restart its quiz
                const currentLesson = translations.ar.lessons.find(l => l.level === lessonId);
                if (currentLesson) {
                    displayQuiz(currentLesson.الكويز, currentLesson.level);
                }
                updateProgressBar();
            };
        }
        localStorage.setItem('userProgress', JSON.stringify(userProgress));
        updateProfilePage();
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
        const totalLevels = translations.en.lessons ? translations.en.lessons.length : 0;
        const completedLevels = Object.values(userProgress.lessonScores).filter(score => score >= 70).length;
        const progressPercentage = totalLevels > 0 ? (completedLevels / totalLevels) * 100 : 0;

        document.getElementById('dashboardProgressBarFill').style.width = `${progressPercentage}%`;
        document.getElementById('dashboardProgressBarFill').textContent = `${Math.round(progressPercentage)}%`;
        document.getElementById('dashboardLessonsCompleted').textContent = userProgress.lessonsCompletedCount;
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
            const userTotalScore = Object.values(storedUserProgress.lessonScores).reduce((acc, score) => acc + score, 0);
            const userCorrectAnswers = Object.values(storedUserProgress.lessonAttempts || {}).reduce((acc, attempt) => acc + attempt.correct, 0);

            const userExistsInLeaderboard = currentLeaderboardData.some(entry => entry.player === storedUsername);
            if (!userExistsInLeaderboard) {
                currentLeaderboardData.push({
                    rank: 0,
                    player: storedUsername,
                    score: userTotalScore,
                    correctAnswers: userCorrectAnswers
                });
            } else {
                const existingUser = currentLeaderboardData.find(entry => entry.player === storedUsername);
                if (existingUser) {
                    existingUser.score = userTotalScore;
                    existingUser.correctAnswers = userCorrectAnswers;
                }
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
        const totalQuizzesPlayed = Object.values(userProgress.lessonAttempts || {}).reduce((acc, attempt) => acc + attempt.total, 0);
        const totalCorrectAnswers = Object.values(userProgress.lessonAttempts || {}).reduce((acc, attempt) => acc + attempt.correct, 0);

        document.getElementById('profileTotalQuizzes').textContent = totalQuizzesPlayed;
        document.getElementById('profileCorrectAnswers').textContent = totalCorrectAnswers;
        document.getElementById('profileLessonsCompleted').textContent = userProgress.lessonsCompletedCount;

        const badgesContainer = document.getElementById('badgesContainer');
        badgesContainer.innerHTML = '';

        if (userProgress.lessonsCompletedCount >= 1) {
            badgesContainer.innerHTML += `
                <div class="badge">
                    <h3>${translations.en['lesson_starter_badge']}</h3>
                    <p>${translations.en['lesson_starter_desc']}</p>
                </div>
            `;
        }
        if (userProgress.lessonsCompletedCount >= 3) {
            badgesContainer.innerHTML += `
                <div class="badge">
                    <h3>${translations.en['lesson_enthusiast_badge']}</h3>
                    <p>${translations.en['lesson_enthusiast_desc']}</p>
                </div>
            `;
        }
        if (userProgress.lessonsCompletedCount >= 5) {
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
            badgesContainer.innerHTML += `                <div class="badge">
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

let cyberChallengeQuestions = [];
let currentChallengeLevel = '';
let currentChallengeQuestions = [];
let currentChallengeQuestionIndex = 0;
let challengeScore = 0;
let correctChallengeAnswers = 0;
let incorrectChallengeAnswers = 0;
let challengeTimer; // To hold the setInterval for the timer
let timeLeft = 0;
let isChallengeActive = false;

async function loadCyberChallengeQuestions() {
    try {
        const response = await fetch('cyber_challenge_questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        cyberChallengeQuestions = await response.json();
        console.log('Cyber Challenge Questions loaded:', cyberChallengeQuestions);
    } catch (error) {
        console.error('Error loading cyber challenge questions:', error);
    }
}

function startCyberChallenge() {
    if (!currentChallengeLevel) {
        alert(translations.ar['select_level']);
        return;
    }

    const levelData = cyberChallengeQuestions.find(l => l.level === currentChallengeLevel);
    if (!levelData) {
        console.error('Level data not found for:', currentChallengeLevel);
        return;
    }

    currentChallengeQuestions = [...levelData.questions];
    currentChallengeQuestionIndex = 0;
    challengeScore = 0;
    correctChallengeAnswers = 0;
    incorrectChallengeAnswers = 0;
    isChallengeActive = true;

    document.querySelector('.challenge-setup').style.display = 'none';
    document.querySelector('.result-panel').style.display = 'none';
    document.querySelector('.question-panel').style.display = 'block';

    displayCyberChallengeQuestion();
}

function displayCyberChallengeQuestion() {
    if (currentChallengeQuestionIndex >= currentChallengeQuestions.length) {
        endCyberChallenge();
        return;
    }

    const question = currentChallengeQuestions[currentChallengeQuestionIndex];
    document.getElementById('questionText').textContent = question.question;
    const optionsDiv = document.getElementById('questionOptions');
    optionsDiv.innerHTML = '';

    question.options.forEach(optionText => {
        const button = document.createElement('button');
        button.classList.add('btn', 'option-btn');
        button.textContent = optionText;
        button.onclick = () => checkCyberChallengeAnswer(optionText, question.answer, question.points, question.time);
        optionsDiv.appendChild(button);
    });

    timeLeft = question.time;
    document.getElementById('questionTimer').textContent = `${translations.ar['time_left']} ${timeLeft}s`;

    if (challengeTimer) {
        clearInterval(challengeTimer);
    }

    challengeTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('questionTimer').textContent = `${translations.ar['time_left']} ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(challengeTimer);
            checkCyberChallengeAnswer(null, question.answer, question.points, question.time); // No answer submitted
        }
    }, 1000);
}

function checkCyberChallengeAnswer(selectedOption, correctAnswer, points, timeLimit) {
    clearInterval(challengeTimer);

    const optionsButtons = document.querySelectorAll('#questionOptions .option-btn');
    optionsButtons.forEach(button => {
        button.disabled = true; // Disable buttons after answer
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedOption) {
            button.classList.add('incorrect');
        }
    });

    if (selectedOption === correctAnswer) {
        correctChallengeAnswers++;
        const timeBonus = timeLeft > 0 ? (timeLeft / timeLimit) * points * 0.5 : 0; // 50% bonus for speed
        challengeScore += points + timeBonus;
    } else {
        incorrectChallengeAnswers++;
    }

    setTimeout(() => {
        currentChallengeQuestionIndex++;
        displayCyberChallengeQuestion();
    }, 1500); // Short delay before next question
}

function endCyberChallenge() {
    isChallengeActive = false;
    document.querySelector('.question-panel').style.display = 'none';
    document.querySelector('.result-panel').style.display = 'block';

    document.getElementById('correctAnswers').textContent = correctChallengeAnswers;
    document.getElementById('incorrectAnswers').textContent = incorrectChallengeAnswers;
    document.getElementById('totalPoints').textContent = Math.round(challengeScore);
    document.getElementById('winner').textContent = localStorage.getItem('username') || translations.ar['guest_placeholder']; // Placeholder for single player

    updateLeaderboardForChallenge(Math.round(challengeScore), correctChallengeAnswers);
}

function updateLeaderboardForChallenge(score, correctCount) {
    const username = localStorage.getItem('username') || translations.ar['guest_placeholder'];
    let existingLeaderboard = JSON.parse(localStorage.getItem('cyberLeaderboard')) || [];

    const userIndex = existingLeaderboard.findIndex(entry => entry.player === username);

    if (userIndex > -1) {
        if (score > existingLeaderboard[userIndex].score) {
            existingLeaderboard[userIndex].score = score;
            existingLeaderboard[userIndex].correctAnswers = correctCount;
        }
    } else {
        existingLeaderboard.push({ rank: 0, player: username, score: score, correctAnswers: correctCount });
    }

    existingLeaderboard.sort((a, b) => b.score - a.score);

    existingLeaderboard.forEach((entry, index) => {
        entry.rank = index + 1;
    });

    localStorage.setItem('cyberLeaderboard', JSON.stringify(existingLeaderboard));
    displayLeaderboard();
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.getElementById('themeToggle').checked = true;
        setDarkMode(true);
    } else {
        document.getElementById('themeToggle').checked = false;
        setDarkMode(false);
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
        loadLessons();
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

    if (window.location.pathname.includes('cyber_challenge.html')) {
        loadCyberChallengeQuestions();

        const startChallengeBtn = document.getElementById('startChallengeBtn');
        if (startChallengeBtn) {
            startChallengeBtn.addEventListener('click', startCyberChallenge);
        }

        const levelButtons = document.querySelectorAll('.level-btn');
        levelButtons.forEach(button => {
            button.addEventListener('click', () => {
                levelButtons.forEach(btn => btn.classList.remove('selected'));
                button.classList.add('selected');
                currentChallengeLevel = button.dataset.level;
            });
        });

        const challengeAgainBtn = document.getElementById('challengeAgainBtn');
        if (challengeAgainBtn) {
            challengeAgainBtn.addEventListener('click', () => {
                document.querySelector('.result-panel').style.display = 'none';
                document.querySelector('.challenge-setup').style.display = 'flex'; // Show setup again
                levelButtons.forEach(btn => btn.classList.remove('selected'));
                currentChallengeLevel = ''; // Clear selected level
            });
        }

        const shareResultsBtn = document.getElementById('shareResultsBtn');
        if (shareResultsBtn) {
            shareResultsBtn.addEventListener('click', () => {
                const username = localStorage.getItem('username') || translations.ar['guest_placeholder'];
                const message = `${username} scored ${Math.round(challengeScore)} points in the Cyber Challenge with ${correctChallengeAnswers} correct answers! Can you beat that? #CyberChallenge #ZeroFake`;
                navigator.clipboard.writeText(message).then(() => {
                    alert('نتائج التحدي نُسخت إلى الحافظة! يمكنك مشاركتها الآن.');
                }).catch(err => {
                    console.error('Failed to copy results: ', err);
                    alert('فشل نسخ النتائج. الرجاء المحاولة يدويًا.');
                });
            });
        }
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
        const currentLanguage = 'en';

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
