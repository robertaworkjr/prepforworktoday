export interface InterviewCard {
  id: string;
  category: string;
  question: string;
  answer: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const interviewCards: InterviewCard[] = [
  {
    id: '1',
    category: 'Basic Questions',
    question: 'Tell me about yourself.',
    answer: 'Start with a brief overview of your background, focusing on relevant experiences, skills, and your current situation. Mention what you\'re looking for and why you\'re interested in this role. Keep it concise and professional, around 2-3 minutes.',
    difficulty: 'beginner'
  },
  {
    id: '2',
    category: 'Basic Questions',
    question: 'Why do you want to work here?',
    answer: 'Research the company beforehand. Mention specific things you like about their values, products, or mission. Explain how your goals align with theirs and what you can contribute. Show genuine interest rather than just focusing on what you\'ll gain.',
    difficulty: 'beginner'
  },
  {
    id: '3',
    category: 'Basic Questions',
    question: 'What are your strengths?',
    answer: 'Choose 2-3 strengths that are relevant to the job. Provide specific examples of how you\'ve used these strengths. For example: "I\'m reliable - in my last role, I never missed a deadline" or "I\'m a good team player - I helped train new employees."',
    difficulty: 'beginner'
  },
  {
    id: '4',
    category: 'Basic Questions',
    question: 'What are your weaknesses?',
    answer: 'Choose a real weakness but show how you\'re working to improve it. For example: "I sometimes focus too much on details, but I\'ve learned to set time limits for tasks" or "I was shy about speaking up, but I\'ve been practicing in group settings."',
    difficulty: 'beginner'
  },
  {
    id: '5',
    category: 'Behavioral Questions',
    question: 'Tell me about a time you had to work with a difficult person.',
    answer: 'Use the STAR method: Situation - describe the context, Task - what needed to be done, Action - what you did specifically, Result - what happened. Focus on how you stayed professional, found common ground, or resolved the issue constructively.',
    difficulty: 'intermediate'
  },
  {
    id: '6',
    category: 'Behavioral Questions',
    question: 'Describe a time when you had to learn something quickly.',
    answer: 'Choose an example where you successfully picked up a new skill or knowledge. Explain your learning approach: asking questions, practicing, using resources. Show that you\'re adaptable and eager to learn new things.',
    difficulty: 'intermediate'
  },
  {
    id: '7',
    category: 'Workplace Scenarios',
    question: 'How would you handle a customer complaint?',
    answer: 'Listen carefully to understand their concern, acknowledge their feelings, apologize if appropriate, ask questions to clarify, offer solutions within your authority, and follow up to ensure they\'re satisfied. Always stay calm and professional.',
    difficulty: 'beginner'
  },
  {
    id: '8',
    category: 'Workplace Scenarios',
    question: 'What would you do if you made a mistake at work?',
    answer: 'Take responsibility immediately, inform your supervisor or team, assess the impact, work on a solution, and learn from it to prevent similar mistakes. Show that you handle mistakes professionally and use them as learning opportunities.',
    difficulty: 'beginner'
  },
  {
    id: '9',
    category: 'Career Goals',
    question: 'Where do you see yourself in 5 years?',
    answer: 'Show ambition but be realistic. Talk about growing in your role, developing new skills, taking on more responsibilities, or advancing within the company. Align your goals with opportunities the company might offer.',
    difficulty: 'intermediate'
  },
  {
    id: '10',
    category: 'Communication',
    question: 'How do you handle stress and pressure?',
    answer: 'Describe healthy coping strategies: prioritizing tasks, taking breaks, asking for help when needed, staying organized, or using stress-reduction techniques. Give an example of when you successfully managed a stressful situation.',
    difficulty: 'intermediate'
  },
  {
    id: '11',
    category: 'Dress Code & Appearance',
    question: 'What should you wear to a job interview for an office position?',
    answer: 'Business professional attire: a suit or dress pants/skirt with a button-down shirt or blouse. Choose neutral colors like navy, black, or gray. Ensure clothes are clean, pressed, and fit well. Minimal jewelry and cologne/perfume.',
    difficulty: 'beginner'
  },
  {
    id: '12',
    category: 'Dress Code & Appearance',
    question: 'How should you dress for a retail or customer service job interview?',
    answer: 'Business casual: clean dress pants or khakis with a collared shirt or blouse. Avoid jeans, shorts, or overly casual clothing. Dress slightly more formal than the everyday work attire. Show you understand the customer-facing nature of the role.',
    difficulty: 'beginner'
  },
  {
    id: '13',
    category: 'Dress Code & Appearance',
    question: 'What accessories and grooming are appropriate for interviews?',
    answer: 'Keep jewelry minimal and professional. Ensure hair is neat and styled conservatively. Nails should be clean and trimmed. Light makeup if worn. Avoid strong perfumes or colognes. Bring a portfolio or folder to carry your resume.',
    difficulty: 'beginner'
  },
  {
    id: '14',
    category: 'Dress Code & Appearance',
    question: 'How should you dress for a job interview in a creative field?',
    answer: 'Business casual with a touch of personality. You can show some style while remaining professional. Avoid anything too revealing or distracting. Research the company culture - some creative fields are more formal than others.',
    difficulty: 'intermediate'
  },
  {
    id: '15',
    category: 'Dress Code & Appearance',
    question: 'What should you do if you\'re unsure about the dress code for an interview?',
    answer: 'Research the company online, check their social media, or call to ask. When in doubt, dress more formally rather than too casually. It\'s better to be overdressed than underdressed for an interview.',
    difficulty: 'beginner'
  },
  {
    id: '16',
    category: 'Dress Code & Appearance',
    question: 'How important are shoes and other details in interview attire?',
    answer: 'Very important! Wear clean, polished dress shoes. Avoid sneakers, flip-flops, or worn-out shoes. Check that all details are professional: belt matches shoes, clothes fit properly, no wrinkles or stains. Details matter in first impressions.',
    difficulty: 'beginner'
  },
  {
    id: '17',
    category: 'Phone Interview Tips',
    question: 'How should you prepare your environment for a phone interview?',
    answer: 'Choose a quiet space with good reception. Eliminate distractions - turn off TV, radio, and put other devices on silent. Use a landline or ensure strong mobile signal. Have a comfortable chair and good lighting if you need to read notes.',
    difficulty: 'beginner'
  },
  {
    id: '18',
    category: 'Phone Interview Tips',
    question: 'What materials should you have ready for a phone interview?',
    answer: 'Have your resume, the job description, company research notes, and your prepared questions within easy reach. Keep a pen and paper handy for taking notes. Have a glass of water nearby in case your mouth gets dry.',
    difficulty: 'beginner'
  },
  {
    id: '19',
    category: 'Phone Interview Tips',
    question: 'How can you sound confident and engaged during a phone interview?',
    answer: 'Smile while talking - it comes through in your voice. Stand up during the call to project more energy. Speak clearly and at a moderate pace. Use the person\'s name occasionally. Take brief pauses to think before answering.',
    difficulty: 'intermediate'
  },
  {
    id: '20',
    category: 'Body Language',
    question: 'What are the key body language tips for in-person interviews?',
    answer: 'Maintain good posture throughout the interview. Make appropriate eye contact (about 50-70% of the time). Use open gestures - avoid crossing arms or fidgeting. Lean slightly forward to show interest. Match the interviewer\'s energy level.',
    difficulty: 'intermediate'
  },
  {
    id: '21',
    category: 'Body Language',
    question: 'How should you handle nervous habits during an interview?',
    answer: 'Practice beforehand to identify your nervous habits. Keep your hands occupied with a pen or notepad. Take slow, deep breaths. If you catch yourself fidgeting, simply stop and refocus. Remember that some nervousness is normal and shows you care.',
    difficulty: 'intermediate'
  },
  {
    id: '22',
    category: 'Follow-up',
    question: 'When and how should you follow up after an interview?',
    answer: 'Send a thank-you email within 24 hours. If they gave you a timeline, wait until after that period before following up. Keep follow-ups brief, professional, and add value - perhaps mention something you forgot to mention or share a relevant article.',
    difficulty: 'intermediate'
  },
  {
    id: '23',
    category: 'Follow-up',
    question: 'What should you include in a thank-you email?',
    answer: 'Thank them for their time, reiterate your interest in the position, mention something specific from your conversation, and offer to provide any additional information. Keep it concise - 3-4 short paragraphs maximum.',
    difficulty: 'beginner'
  }
];

export interface QuizQuestion {
  id: string;
  skill: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    skill: 'Interview Basics',
    question: 'What should you do when you first meet your interviewer?',
    options: [
      'Wait for them to speak first',
      'Immediately start talking about yourself',
      'Shake hands, make eye contact, and greet them politely',
      'Sit down without saying anything'
    ],
    correctAnswer: 2,
    explanation: 'A firm handshake, eye contact, and polite greeting create a positive first impression and show confidence and professionalism.',
    difficulty: 'beginner'
  },
  {
    id: 'q2',
    skill: 'Communication Skills',
    question: 'If you don\'t understand a question during an interview, what should you do?',
    options: [
      'Guess what they mean and answer anyway',
      'Stay silent and hope they move on',
      'Politely ask them to clarify or repeat the question',
      'Change the topic to something you know'
    ],
    correctAnswer: 2,
    explanation: 'It\'s perfectly acceptable to ask for clarification. This shows you\'re listening carefully and want to give the best possible answer.',
    difficulty: 'beginner'
  },
  {
    id: 'q3',
    skill: 'Workplace Ethics',
    question: 'You notice a coworker taking supplies home without permission. What should you do?',
    options: [
      'Ignore it since it\'s not your business',
      'Confront them directly and demand they stop',
      'Report it to your supervisor',
      'Start taking supplies yourself'
    ],
    correctAnswer: 2,
    explanation: 'Workplace theft should be reported to management. It\'s important to maintain ethical standards and let supervisors handle policy violations.',
    difficulty: 'intermediate'
  },
  {
    id: 'q4',
    skill: 'Time Management',
    question: 'You have multiple urgent tasks due today. What\'s the best approach?',
    options: [
      'Work on whatever you feel like doing first',
      'List all tasks, prioritize by importance and deadline, then work systematically',
      'Try to do everything at once',
      'Ask someone else to do the tasks'
    ],
    correctAnswer: 1,
    explanation: 'Effective time management involves listing tasks, assessing their priority and deadlines, and working through them systematically.',
    difficulty: 'intermediate'
  },
  {
    id: 'q5',
    skill: 'Customer Service',
    question: 'A customer is angry about a product that broke. Your first response should be to:',
    options: [
      'Tell them it\'s not your fault',
      'Listen to their concern and acknowledge their frustration',
      'Immediately offer them money back',
      'Walk away and get someone else'
    ],
    correctAnswer: 1,
    explanation: 'Active listening and acknowledging the customer\'s feelings helps de-escalate the situation and shows empathy before moving to solutions.',
    difficulty: 'beginner'
  },
  {
    id: 'q6',
    skill: 'Professional Appearance',
    question: 'What is the most important factor when choosing interview attire?',
    options: [
      'Wearing the most expensive clothes you own',
      'Matching the company\'s dress code and industry standards',
      'Wearing bright colors to stand out',
      'Choosing the most comfortable clothes'
    ],
    correctAnswer: 1,
    explanation: 'Your attire should match the company culture and industry norms. Research the workplace to dress appropriately - neither too casual nor overly formal.',
    difficulty: 'beginner'
  },
  {
    id: 'q7',
    skill: 'Professional Appearance',
    question: 'Which of these is NOT appropriate for a professional interview?',
    options: [
      'Clean, polished dress shoes',
      'Wrinkled, ill-fitting clothes',
      'Minimal, professional jewelry',
      'Well-groomed hair and nails'
    ],
    correctAnswer: 1,
    explanation: 'Wrinkled, ill-fitting clothes give a poor first impression. All clothing should be clean, pressed, and properly fitted to show attention to detail.',
    difficulty: 'beginner'
  },
  {
    id: 'q8',
    skill: 'Professional Appearance',
    question: 'If you\'re interviewing for a casual workplace, you should:',
    options: [
      'Wear exactly what employees wear daily',
      'Dress slightly more formal than the everyday dress code',
      'Wear your most casual clothes',
      'Ignore the dress code completely'
    ],
    correctAnswer: 1,
    explanation: 'Even in casual workplaces, dress slightly more formal for interviews. This shows respect for the process and professionalism.',
    difficulty: 'intermediate'
  },
  {
    id: 'q9',
    skill: 'Professional Appearance',
    question: 'What should you do about personal grooming before an interview?',
    options: [
      'Only worry about your clothes',
      'Ensure hair, nails, and overall hygiene are professional',
      'Wear strong cologne or perfume to make an impression',
      'Don\'t change your usual routine'
    ],
    correctAnswer: 1,
    explanation: 'Professional grooming includes neat hair, clean nails, good hygiene, and minimal fragrance. These details contribute to a positive first impression.',
    difficulty: 'beginner'
  },
  {
    id: 'q10',
    skill: 'Professional Appearance',
    question: 'When in doubt about interview attire, you should:',
    options: [
      'Ask friends what they think you should wear',
      'Wear whatever feels most comfortable',
      'Research the company and dress slightly more formal',
      'Wear your favorite outfit regardless of appropriateness'
    ],
    correctAnswer: 2,
    explanation: 'Research the company culture through their website, social media, or by calling to ask. When uncertain, it\'s safer to be slightly overdressed.',
    difficulty: 'beginner'
  },
  {
    id: 'q11',
    skill: 'Professional Communication',
    question: 'When writing a professional email, what should your subject line be?',
    options: [
      'Hello!',
      'Clear, specific, and relevant to the email content',
      'As short as possible',
      'Always include your name'
    ],
    correctAnswer: 1,
    explanation: 'A clear, specific subject line helps the recipient understand the email\'s purpose and improves the likelihood of a prompt response.',
    difficulty: 'beginner'
  },
  {
    id: 'q12',
    skill: 'Professional Communication',
    question: 'How should you address someone in a professional email if you don\'t know their name?',
    options: [
      'Hey there!',
      'To whom it may concern',
      'Dear Hiring Manager or Dear [Department] Team',
      'Hi!'
    ],
    correctAnswer: 2,
    explanation: 'Using a specific title like "Dear Hiring Manager" is more personal than "To whom it may concern" while remaining professional.',
    difficulty: 'beginner'
  },
  {
    id: 'q13',
    skill: 'Professional Communication',
    question: 'What is the appropriate response time for most professional emails?',
    options: [
      'Within 24-48 hours',
      'Within one week',
      'Immediately',
      'Whenever convenient'
    ],
    correctAnswer: 0,
    explanation: 'Responding within 24-48 hours shows professionalism and respect for the sender while allowing time for thoughtful responses.',
    difficulty: 'beginner'
  },
  {
    id: 'q14',
    skill: 'Professional Communication',
    question: 'Which closing is most appropriate for a formal business email?',
    options: [
      'Love,',
      'Best regards,',
      'See ya!',
      'Cheers,'
    ],
    correctAnswer: 1,
    explanation: '"Best regards" is professional, formal, and appropriate for business communications with colleagues, clients, or superiors.',
    difficulty: 'beginner'
  },
  {
    id: 'q15',
    skill: 'Professional Communication',
    question: 'When should you use "Reply All" in email communication?',
    options: [
      'Always, to keep everyone informed',
      'Never, to avoid spam',
      'Only when your response is relevant to all recipients',
      'When you want to show you received the message'
    ],
    correctAnswer: 2,
    explanation: 'Use "Reply All" only when all recipients need to see your response. Unnecessary "Reply All" messages can clutter inboxes and reduce productivity.',
    difficulty: 'intermediate'
  }
];