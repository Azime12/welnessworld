import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const WellnessFAQPage = () => {
  const [faqSearch, setFaqSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const searchBoxRef = useRef(null);

  // Wellness FAQ data
  const faqData = [
    { id: 1, question: "What is wellness and why is it important?", answer: "Wellness is the active process of making choices toward a healthy and fulfilling life. It includes physical, mental, and emotional health.", icon: "💖" },
    { id: 2, question: "How can I improve my mental wellbeing?", answer: "Practices such as meditation, mindfulness, regular exercise, and adequate sleep can significantly improve mental health.", icon: "🧠" },
    { id: 3, question: "What are some effective stress management techniques?", answer: "Deep breathing, yoga, journaling, and setting boundaries can help manage stress levels effectively.", icon: "🌿" },
    { id: 4, question: "How important is nutrition for wellness?", answer: "A balanced diet rich in fruits, vegetables, lean protein, and whole grains fuels your body and supports overall health.", icon: "🥗" },
    { id: 5, question: "How much physical activity should I get?", answer: "Adults should aim for at least 150 minutes of moderate exercise per week, including strength training twice a week.", icon: "🏃‍♂️" },
    { id: 6, question: "What are the benefits of staying hydrated?", answer: "Drinking enough water improves digestion, skin health, energy levels, and cognitive function.", icon: "💧" },
    { id: 7, question: "How can I improve sleep quality?", answer: "Maintain a consistent sleep schedule, reduce screen time before bed, and create a relaxing bedtime routine.", icon: "🛌" },
    { id: 8, question: "How do I know if I need a wellness check-up?", answer: "Regular check-ups are recommended if you have ongoing symptoms, chronic conditions, or want to maintain preventative health.", icon: "🩺" },
    { id: 9, question: "Can wellness apps help?", answer: "Yes, apps can track habits, provide guided meditation, monitor physical activity, and help you stay accountable.", icon: "📱" },
    { id: 10, question: "What is holistic wellness?", answer: "Holistic wellness looks at the whole person—mind, body, and spirit—to create balance and prevent illness.", icon: "🌸" }
  ];

  // Filter FAQs based on search input
  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(faqSearch.toLowerCase())
  );

  // Mock autocomplete suggestions
  const fetchSuggestions = (query) => {
    if (query.length > 2) {
      const mockSuggestions = ['Mental Health', 'Nutrition', 'Exercise Tips', 'Stress Relief', 'Sleep Improvement'];
      setSuggestions(mockSuggestions.filter(item => item.toLowerCase().includes(query.toLowerCase())));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle input changes with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => fetchSuggestions(faqSearch), 300);
    return () => clearTimeout(delayDebounce);
  }, [faqSearch]);

  // Close suggestions when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) setShowSuggestions(false);
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Toggle FAQ accordion
  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-grow">
        <div className="container max-w-4xl px-4 py-8 mx-auto md:py-12">

          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
              <HelpCircle className="w-8 h-8 text-green-600"/>
            </div>
            <h1 className="mb-4 text-4xl font-bold text-green-600 md:text-5xl">Wellness FAQs</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">Find answers to common questions about health and wellbeing</p>
            <div className="w-32 h-1 mx-auto mt-4 rounded-full bg-gradient-to-r from-green-400 to-teal-400"></div>
          </div>

          {/* Search Box */}
          <div className="relative p-6 mb-8 bg-white shadow-lg rounded-xl" ref={searchBoxRef}>
            <div className="flex items-center mb-4">
              <Search className="w-5 h-5 mr-2 text-gray-400"/>
              <h3 className="text-lg font-semibold text-gray-800">Search Wellness Topics</h3>
            </div>
            <input
              type="text"
              placeholder="Type your question or topic..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {showSuggestions && (
              <ul className="absolute left-0 right-0 z-50 p-2 mt-1 overflow-y-auto bg-white border rounded-lg shadow max-h-60">
                {suggestions.map((s, idx) => (
                  <li
                    key={idx}
                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => { setFaqSearch(s); setShowSuggestions(false); }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div key={faq.id} className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'ring-2 ring-green-500' : ''}`}>
                <button
                  className="flex items-center justify-between w-full px-6 py-5 text-left transition-colors hover:bg-gray-50"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex items-center">
                    <span className="mr-4 text-2xl">{faq.icon}</span>
                    <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                  </div>
                  {openFaqIndex === index ? <ChevronUp className="w-5 h-5 text-gray-500"/> : <ChevronDown className="w-5 h-5 text-gray-500"/>}
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pt-2 pb-5 border-t border-gray-100">
                    <p className="pl-10 leading-relaxed text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default WellnessFAQPage;
