// src/data/questions.js

// ==================== Category: Games ====================
const gamesQuestions = {
  category: "Games",
  questions: [
    // 100 points questions
    {
      id: 1,
      question: "ما أول لعبة فيديو تم إنتاجها على الإطلاق؟",
      answer: "Pong",
      points: 100
    },
    {
      id: 2,
      question: "من هو مطور لعبة Minecraft الأصلي؟",
      answer: "نوتش (Notch)",
      points: 100
    },
    {
      id: 3,
      question: "ما اسم السلاح الشهير في سلسلة Counter-Strike؟",
      answer: "AK-47",
      points: 100
    },
    {
      id: 4,
      question: "ما اسم العملة المستخدمة في Fortnite؟",
      answer: "V-Bucks",
      points: 100
    },
    {
      id: 5,
      question: "في أي لعبة يقول البطل: It's-a me, Mario!؟",
      answer: "Super Mario Bros",
      points: 100
    },
    {
      id: 6,
      question: "ما اسم لعبة القتال التي تحتوي على شخصيات من عدة سلاسل نينتندو؟",
      answer: "Super Smash Bros",
      points: 100
    },
    {
      id: 7,
      question: "ما اسم الشركة التي تطور لعبة FIFA؟",
      answer: "EA Sports",
      points: 100
    },
    {
      id: 8,
      question: "في أي لعبة يمكنك الزواج وتكوين عائلة في مزرعة؟",
      answer: "Stardew Valley",
      points: 100
    },
    {
      id: 9,
      question: "ما اسم اللعبة التي تعتمد على بناء مكعبات واكتشاف العوالم؟",
      answer: "Minecraft",
      points: 100
    },
    {
      id: 10,
      question: "في أي لعبة تقاتل كصياد وحوش ضخمة مع أصدقائك؟",
      answer: "Monster Hunter",
      points: 100
    },
    {
      id: 11,
      question: "ما اسم اللعبة التي تشتهر بـ Finish Him!؟",
      answer: "Mortal Kombat",
      points: 100
    },
    {
      id: 12,
      question: "ما اسم الشخصية ذات الشعر الفضي في Final Fantasy VII؟",
      answer: "Sephiroth",
      points: 100
    },
    {
      id: 13,
      question: "ما اسم بطل لعبة The Witcher؟",
      answer: "Geralt of Rivia",
      points: 100
    },
    {
      id: 14,
      question: "من هي بطلة سلسلة Tomb Raider؟",
      answer: "Lara Croft",
      points: 100
    },
    {
      id: 15,
      question: "أي لعبة يتم فيها سرقة السيارات وتعيش حياة الجريمة؟",
      answer: "Grand Theft Auto",
      points: 100
    },
    {
      id: 16,
      question: "ما اسم اللعبة التي تقاتل فيها الزومبي وتحمي النباتات؟",
      answer: "Plants vs. Zombies",
      points: 100
    },
    {
      id: 17,
      question: "ما اسم المنصة التي تصدر عليها ألعاب Halo؟",
      answer: "Xbox",
      points: 100
    },
    {
      id: 18,
      question: "ما اسم الشخصية التي ترتدي قبعة خضراء وتحمل سيفاً في Zelda؟",
      answer: "Link",
      points: 100
    },
    {
      id: 19,
      question: "ما اسم لعبة محاكاة الطيران من Microsoft؟",
      answer: "Microsoft Flight Simulator",
      points: 100
    },
    {
      id: 20,
      question: "ما اسم المخلوق الكهربائي الأصفر من سلسلة Pokémon؟",
      answer: "Pikachu",
      points: 100
    },
    // ... Add more 100 point questions

    // 300 points questions
    {
      id: 2,
      question: "Sample Games Question 2?",
      answer: "Sample Answer 2",
      points: 300
    },
    // ... Add more 300 point questions

    // 500 points questions
    {
      id: 3,
      question: "Sample Games Question 3?",
      answer: "Sample Answer 3",
      points: 500
    },
    // ... Add more 500 point questions
  ]
};

// ==================== Category: History ====================
const historyQuestions = {
  category: "History",
  questions: [
    // 100 points questions
    {
      id: 1,
      question: "Sample History Question 1?",
      answer: "Sample Answer 1",
      points: 100
    },
    // ... Add more 100 point questions

    // 300 points questions
    {
      id: 2,
      question: "Sample History Question 2?",
      answer: "Sample Answer 2",
      points: 300
    },
    // ... Add more 300 point questions

    // 500 points questions
    {
      id: 3,
      question: "Sample History Question 3?",
      answer: "Sample Answer 3",
      points: 500
    },
    // ... Add more 500 point questions
  ]
};

// ==================== Category: Math ====================
const mathQuestions = {
  category: "Math",
  questions: [
    // 100 points questions
    {
      id: 1,
      question: "Sample Math Question 1?",
      answer: "Sample Answer 1",
      points: 100
    },
    // ... Add more 100 point questions

    // 300 points questions
    {
      id: 2,
      question: "Sample Math Question 2?",
      answer: "Sample Answer 2",
      points: 300
    },
    // ... Add more 300 point questions

    // 500 points questions
    {
      id: 3,
      question: "Sample Math Question 3?",
      answer: "Sample Answer 3",
      points: 500
    },
    // ... Add more 500 point questions
  ]
};

// ==================== Export All Categories ====================
const questions = [
  gamesQuestions,
  historyQuestions,
  mathQuestions,
  // ... Add more categories here
];

export default questions;

// Utility: Flatten all questions from all categories into a single array
export const allQuestions = questions.flatMap(cat => 
  cat.questions.map(q => ({
    ...q,
    category: cat.category
  }))
);

// Get a random question, optionally filtered by selected categories and/or points
export function getRandomQuestion(selectedCategories = [], points = null) {
  let filtered = allQuestions;
  if (selectedCategories.length > 0) {
    filtered = filtered.filter(q => selectedCategories.includes(q.category));
  }
  if (points !== null) {
    filtered = filtered.filter(q => q.points === points);
  }
  if (filtered.length === 0) return null;
  return filtered[Math.floor(Math.random() * filtered.length)];
} 