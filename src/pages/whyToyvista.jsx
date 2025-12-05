import React from 'react';

const WhyWellness = () => {
  return (
    <section id="why-wellness" className="px-4 py-12 mx-auto sm:px-6 lg:px-8 max-w-7xl animate-fadeIn">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Why <span className="text-green-600">Wellness Matters</span>?
        </h1>
        <div className="w-24 h-1 mx-auto mb-6 bg-green-500 rounded"></div>
      </div>

      {/* Introduction */}
      <div className="p-6 mb-10 space-y-6 bg-white shadow-xl rounded-2xl md:p-8 lg:p-10">
        <p className="text-lg text-gray-700">
          Welcome to <strong className="text-green-600">Wellness Matters</strong> – your go-to resource for living a healthier, happier, and more balanced life. But what makes our wellness approach stand out?
        </p>

        <p className="text-lg text-gray-700">
          We believe health and wellness should be <strong className="text-green-600">accessible, actionable, and inspiring</strong>. From nutrition and fitness to mental wellbeing and stress management, we provide guidance and tips for <strong className="text-green-600">every aspect of a balanced lifestyle</strong>.
        </p>

        <p className="text-lg text-gray-700">
          Our platform is designed with <strong className="text-green-600">easy navigation and clear resources</strong> so you can find advice, plans, and tools that fit your unique wellness journey. Start improving your health today, step by step.
        </p>
      </div>

      {/* Features */}
      <div className="mb-10 space-y-6">
        <h3 className="pb-2 mb-6 text-2xl font-bold text-gray-900 border-b border-gray-200">
          Why choose our wellness approach:
        </h3>
        <ul className="space-y-5">
          {[
            { icon: '🌱', title: 'Holistic Approach', desc: 'Focus on body, mind, and spirit for overall balance and vitality.' },
            { icon: '🥗', title: 'Nutrition Guidance', desc: 'Practical advice on eating well, maintaining energy, and supporting your health.' },
            { icon: '🏃‍♀️', title: 'Fitness & Movement', desc: 'Safe and effective routines for strength, flexibility, and endurance.' },
            { icon: '🧘‍♂️', title: 'Mindfulness & Stress Relief', desc: 'Techniques to reduce stress, improve focus, and enhance mental wellbeing.' },
            { icon: '💡', title: 'Actionable Tips', desc: 'Clear, evidence-based advice you can implement in your daily life.' },
          ].map((item, idx) => (
            <li key={idx} className="flex items-start animate-fadeIn">
              <span className="flex-shrink-0 mt-1 mr-4 text-2xl transition-transform hover:scale-125">{item.icon}</span>
              <div>
                <strong className="text-lg font-semibold text-gray-900">{item.title}</strong>
                <p className="mt-1 text-gray-700">{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Callout */}
      <div className="p-6 border-l-4 border-green-500 rounded-r-lg bg-green-50 animate-fadeIn">
        <p className="text-lg text-gray-800">
          Our mission is simple – <strong className="text-green-600">empower you to live healthier, happier, and more balanced</strong>. With practical advice, actionable tips, and holistic guidance, wellness is no longer a goal – it’s a lifestyle.
        </p>
      </div>

      {/* FAQ Section */}
      <div className="p-6 mt-12 space-y-6 bg-white shadow-xl rounded-2xl md:p-8 lg:p-10 animate-fadeIn">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          {[
            { q: 'What does wellness really mean?', a: 'Wellness is a holistic approach to health that includes physical, mental, and emotional wellbeing. It is about making positive lifestyle choices every day.' },
            { q: 'How can I start improving my wellness?', a: 'Start with small, consistent changes: improve nutrition, move more, practice mindfulness, and get adequate sleep. Set realistic goals and track your progress.' },
            { q: 'Is nutrition more important than exercise?', a: 'Both are essential. Nutrition fuels your body while exercise strengthens it. A balanced combination of both is key to overall wellness.' },
            { q: 'How can I manage stress effectively?', a: 'Practice mindfulness, meditation, deep breathing, and time management. Regular physical activity and sufficient rest also help reduce stress.' },
            { q: 'Can wellness improve mental health?', a: 'Yes, taking care of your body, mind, and habits can boost mood, reduce anxiety, and enhance cognitive function over time.' },
          ].map((faq, idx) => (
            <div key={idx} className="p-5 transition-colors duration-200 border border-gray-200 rounded-xl hover:border-green-300">
              <h3 className="mb-2 text-xl font-semibold text-gray-900">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
      `}</style>
    </section>
  );
};

export default WhyWellness;
