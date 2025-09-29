// Application State
let progress = {
    resume: 0,
    interview: 0,
    workplace: 0,
    achievements: []
};

// Interview Questions Database
const interviewQuestions = [
    {
        question: "Tell me about yourself.",
        tips: [
            "Keep it brief and professional (2-3 minutes)",
            "Focus on your strengths and relevant experiences",
            "Mention your career goals and interests",
            "Practice this question - it's almost always asked first!"
        ]
    },
    {
        question: "Why do you want to work here?",
        tips: [
            "Research the company beforehand",
            "Mention specific things you like about the company",
            "Connect your goals with the company's mission",
            "Show enthusiasm and genuine interest"
        ]
    },
    {
        question: "What are your greatest strengths?",
        tips: [
            "Choose strengths relevant to the job",
            "Give specific examples to back up your claims",
            "Be confident but not arrogant",
            "Consider: communication, problem-solving, teamwork, reliability"
        ]
    },
    {
        question: "What is your biggest weakness?",
        tips: [
            "Choose a real weakness, but not a deal-breaker",
            "Explain how you're working to improve it",
            "Show self-awareness and willingness to grow",
            "Don't say 'I work too hard' - be genuine"
        ]
    },
    {
        question: "Where do you see yourself in 5 years?",
        tips: [
            "Show ambition but be realistic",
            "Align your goals with potential career paths at the company",
            "Focus on skill development and contribution",
            "Avoid mentioning other companies or unrelated goals"
        ]
    },
    {
        question: "Why should we hire you?",
        tips: [
            "Summarize your best qualifications",
            "Highlight what makes you unique",
            "Connect your skills to their needs",
            "End with enthusiasm about contributing to their team"
        ]
    },
    {
        question: "Describe a challenge you've overcome.",
        tips: [
            "Use the STAR method (Situation, Task, Action, Result)",
            "Choose a challenge that shows positive qualities",
            "Focus on your problem-solving process",
            "End with what you learned from the experience"
        ]
    },
    {
        question: "Do you have any questions for us?",
        tips: [
            "Always have questions prepared",
            "Ask about the role, team, or company culture",
            "Avoid asking about salary/benefits in first interview",
            "Show genuine interest in the position and company"
        ]
    }
];

// Workplace Scenarios Database
const workplaceScenarios = {
    email: {
        title: "📧 Professional Email Writing",
        description: "Practice writing clear, professional emails for different workplace situations.",
        scenarios: [
            {
                situation: "You need to request time off for a family event",
                prompt: "Write a professional email to your supervisor requesting two days off next month for a family wedding.",
                tips: [
                    "Be clear about the dates you need off",
                    "Give advance notice when possible",
                    "Offer to handle urgent matters before leaving",
                    "Use a professional but friendly tone"
                ]
            },
            {
                situation: "Following up on a project with your team",
                prompt: "Write an email to your team updating them on a project's progress and next steps.",
                tips: [
                    "Start with a clear subject line",
                    "Summarize current status briefly",
                    "Clearly state next steps and deadlines",
                    "End with an invitation for questions"
                ]
            }
        ]
    },
    meeting: {
        title: "🗣️ Meeting Participation",
        description: "Learn how to contribute effectively in meetings and make your voice heard.",
        scenarios: [
            {
                situation: "Contributing ideas in a team meeting",
                prompt: "You have a great idea to improve a process, but you're nervous to speak up in the meeting. How would you contribute?",
                tips: [
                    "Wait for an appropriate pause to jump in",
                    "Start with 'I have an idea that might help...'",
                    "Be concise and specific about your suggestion",
                    "Be open to feedback and discussion"
                ]
            },
            {
                situation: "Asking clarifying questions",
                prompt: "Your manager explained a new task, but you're not sure about some details. How do you ask for clarification?",
                tips: [
                    "It's better to ask than to guess incorrectly",
                    "Be specific about what you need clarified",
                    "Repeat back what you understood to confirm",
                    "Thank them for the clarification"
                ]
            }
        ]
    },
    conflict: {
        title: "🤝 Handling Workplace Disagreements",
        description: "Learn to navigate disagreements professionally and constructively.",
        scenarios: [
            {
                situation: "Disagreeing with a coworker's approach",
                prompt: "A coworker suggests an approach to a project that you think might not work well. How do you express your concerns?",
                tips: [
                    "Focus on the idea, not the person",
                    "Use 'I think' or 'In my experience' language",
                    "Offer alternative solutions",
                    "Be open to finding a compromise"
                ]
            },
            {
                situation: "Receiving constructive criticism",
                prompt: "Your supervisor gives you feedback that your reports need more detail. How do you respond?",
                tips: [
                    "Listen actively without getting defensive",
                    "Ask specific questions for improvement",
                    "Thank them for the feedback",
                    "Follow up to show you've implemented changes"
                ]
            }
        ]
    },
    time: {
        title: "⏰ Time Management & Organization",
        description: "Develop skills to manage your time effectively and stay organized at work.",
        scenarios: [
            {
                situation: "Managing multiple priorities",
                prompt: "You have three important tasks due this week, but you also got assigned an urgent project. How do you manage your time?",
                tips: [
                    "List all tasks and their deadlines",
                    "Prioritize by urgency and importance",
                    "Communicate with your supervisor about timelines",
                    "Break large tasks into smaller, manageable steps"
                ]
            },
            {
                situation: "Dealing with interruptions",
                prompt: "You're working on a focused task when coworkers keep asking you questions. How do you handle this professionally?",
                tips: [
                    "Acknowledge them politely",
                    "Set specific times when you're available",
                    "Offer to help at a scheduled time",
                    "Find a quiet space for focused work when possible"
                ]
            }
        ]
    }
};

// Current interview question index
let currentQuestionIndex = 0;
let currentScenario = null;
let currentScenarioIndex = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadProgress();
    updateProgressDisplay();
    setupNavigation();
});

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            showSection(section);
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update nav
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Resume functionality
function generateResumePreview() {
    const name = document.getElementById('resume-name').value;
    const email = document.getElementById('resume-email').value;
    const summary = document.getElementById('resume-summary').value;
    const skills = document.getElementById('resume-skills').value;
    
    if (!name || !email || !summary || !skills) {
        alert('Please fill in all fields to generate your resume preview.');
        return;
    }
    
    const previewContent = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #333;">${name}</h2>
            <p style="margin: 5px 0; color: #666;">${email}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h3 style="color: #444; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Professional Summary</h3>
            <p style="margin: 10px 0; line-height: 1.5;">${summary}</p>
        </div>
        
        <div>
            <h3 style="color: #444; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Key Skills</h3>
            <p style="margin: 10px 0; line-height: 1.5;">${skills}</p>
        </div>
    `;
    
    document.getElementById('preview-content').innerHTML = previewContent;
    document.getElementById('resume-preview').style.display = 'block';
}

function completeResumeTask() {
    progress.resume = 1;
    addAchievement('Resume Builder', 'Completed resume practice');
    saveProgress();
    updateProgressDisplay();
    
    // Show success message
    alert('Great job! You\'ve completed the resume building exercise. Your skills are growing! 🎉');
}

// Interview functionality
function startInterviewPractice() {
    currentQuestionIndex = 0;
    document.getElementById('start-interview').style.display = 'none';
    document.getElementById('interview-answer').style.display = 'block';
    document.getElementById('interview-tips').style.display = 'block';
    document.getElementById('next-question').style.display = 'inline-block';
    
    showCurrentQuestion();
}

function showCurrentQuestion() {
    const question = interviewQuestions[currentQuestionIndex];
    document.getElementById('current-question').textContent = question.question;
    document.getElementById('question-counter').textContent = `Question ${currentQuestionIndex + 1} of ${interviewQuestions.length}`;
    
    // Show tips
    const tipsList = document.getElementById('tips-list');
    tipsList.innerHTML = '';
    question.tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });
    
    // Clear previous answer
    document.getElementById('interview-answer').value = '';
    
    // Show finish button if it's the last question
    if (currentQuestionIndex === interviewQuestions.length - 1) {
        document.getElementById('next-question').style.display = 'none';
        document.getElementById('finish-interview').style.display = 'inline-block';
    }
}

function nextQuestion() {
    const answer = document.getElementById('interview-answer').value.trim();
    if (!answer) {
        alert('Please write an answer before moving to the next question.');
        return;
    }
    
    currentQuestionIndex++;
    showCurrentQuestion();
}

function finishInterview() {
    const answer = document.getElementById('interview-answer').value.trim();
    if (!answer) {
        alert('Please write an answer to complete the practice session.');
        return;
    }
    
    progress.interview = interviewQuestions.length;
    addAchievement('Interview Pro', 'Completed all interview questions');
    saveProgress();
    updateProgressDisplay();
    
    // Reset interview UI
    document.getElementById('start-interview').style.display = 'inline-block';
    document.getElementById('interview-answer').style.display = 'none';
    document.getElementById('interview-tips').style.display = 'none';
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('finish-interview').style.display = 'none';
    document.getElementById('current-question').textContent = 'Click "Start Practice" to begin!';
    document.getElementById('question-counter').textContent = '';
    
    alert('Excellent work! You\'ve practiced all the common interview questions. You\'re building real confidence! 🌟');
}

// Workplace scenarios functionality
function loadScenario(scenarioType) {
    currentScenario = workplaceScenarios[scenarioType];
    currentScenarioIndex = 0;
    
    const scenarioContent = document.getElementById('scenario-content');
    scenarioContent.style.display = 'block';
    
    showCurrentScenario();
}

function showCurrentScenario() {
    const scenario = currentScenario.scenarios[currentScenarioIndex];
    const scenarioDescription = document.getElementById('scenario-description');
    const scenarioPractice = document.getElementById('scenario-practice');
    
    scenarioDescription.innerHTML = `
        <h4>${currentScenario.title}</h4>
        <p>${currentScenario.description}</p>
        <div class="scenario-situation">
            <h5>Scenario ${currentScenarioIndex + 1}:</h5>
            <p><strong>${scenario.situation}</strong></p>
            <p>${scenario.prompt}</p>
        </div>
    `;
    
    scenarioPractice.innerHTML = `
        <div class="scenario-response">
            <label for="scenario-answer">Your Response:</label>
            <textarea id="scenario-answer" rows="4" placeholder="Write how you would handle this situation..."></textarea>
        </div>
        <div class="scenario-tips">
            <h5>Tips for Success:</h5>
            <ul>
                ${scenario.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
        </div>
        <div class="scenario-controls">
            ${currentScenarioIndex < currentScenario.scenarios.length - 1 ? 
                '<button class="practice-button" onclick="nextScenario()">Next Scenario</button>' : 
                '<button class="success-button" onclick="completeScenario()">Complete Practice</button>'
            }
        </div>
    `;
}

function nextScenario() {
    const answer = document.getElementById('scenario-answer').value.trim();
    if (!answer) {
        alert('Please write your response before continuing.');
        return;
    }
    
    currentScenarioIndex++;
    showCurrentScenario();
}

function completeScenario() {
    const answer = document.getElementById('scenario-answer').value.trim();
    if (!answer) {
        alert('Please write your response to complete this practice.');
        return;
    }
    
    progress.workplace++;
    addAchievement('Workplace Pro', `Completed ${currentScenario.title} practice`);
    saveProgress();
    updateProgressDisplay();
    
    alert('Great job! You\'ve completed this workplace scenario practice. Your professional skills are improving! 💼');
    
    // Hide scenario content
    document.getElementById('scenario-content').style.display = 'none';
}

// Progress and achievements
function addAchievement(title, description) {
    const achievement = { title, description, date: new Date().toLocaleDateString() };
    progress.achievements.push(achievement);
}

function updateProgressDisplay() {
    document.getElementById('resume-progress').textContent = progress.resume;
    document.getElementById('interview-progress').textContent = progress.interview;
    document.getElementById('workplace-progress').textContent = progress.workplace;
    
    // Update achievements
    const badgesContainer = document.getElementById('achievement-badges');
    if (progress.achievements.length === 0) {
        badgesContainer.innerHTML = '<p>Complete activities to earn achievement badges!</p>';
    } else {
        badgesContainer.innerHTML = progress.achievements.map(achievement => 
            `<div class="badge">${achievement.title}</div>`
        ).join('');
    }
    
    // Update recommendations
    const recommendations = document.getElementById('recommendations');
    const nextSteps = [];
    
    if (progress.resume === 0) {
        nextSteps.push('Complete your resume practice to build confidence');
    }
    if (progress.interview === 0) {
        nextSteps.push('Practice interview questions to prepare for job interviews');
    }
    if (progress.workplace === 0) {
        nextSteps.push('Learn workplace etiquette and professional communication');
    }
    
    if (nextSteps.length === 0) {
        nextSteps.push('Amazing! You\'ve completed all practice modules. Keep reviewing and applying these skills!');
        nextSteps.push('Consider creating a real resume and start applying for jobs');
        nextSteps.push('Practice your interview skills with friends or family');
    }
    
    recommendations.innerHTML = nextSteps.map(step => `<li>${step}</li>`).join('');
}

// Local storage functions
function saveProgress() {
    localStorage.setItem('workPrepProgress', JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem('workPrepProgress');
    if (saved) {
        progress = JSON.parse(saved);
    }
}