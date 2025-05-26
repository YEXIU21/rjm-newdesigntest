import React, { useState } from 'react';
import '../styles/FAQ.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button in the top right corner of the website. Fill in the required information and follow the instructions to complete your registration.'
    },
    {
      question: 'How do I make a deposit?',
      answer: 'To make a deposit, log in to your account and navigate to the Wallet section. Choose your preferred payment method and follow the instructions to complete your deposit.'
    },
    {
      question: 'How do I withdraw my winnings?',
      answer: 'To withdraw your winnings, go to the Wallet section and select "Withdraw". Choose your preferred withdrawal method, enter the amount you wish to withdraw, and follow the instructions.'
    },
    {
      question: 'What games are available?',
      answer: 'We offer a wide variety of games including slots, table games, live casino games, bingo, poker, and sports betting. Browse our game categories to find your favorite games.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Yes, we take the security of your personal information very seriously. We use industry-standard encryption and security measures to protect your data.'
    },
    {
      question: 'What are the responsible gaming tools available?',
      answer: 'We offer various responsible gaming tools including deposit limits, session time limits, self-exclusion options, and reality checks. You can access these tools in your account settings.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can contact our customer support team through live chat, email, or phone. Our support team is available 24/7 to assist you with any questions or concerns.'
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-title">Frequently Asked Questions</h1>
      <p className="faq-description">Find answers to common questions about our casino services.</p>
      
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div key={index} className="faq-item">
            <div 
              className={`faq-question ${expandedIndex === index ? 'expanded' : ''}`}
              onClick={() => toggleExpand(index)}
            >
              <h3>{item.question}</h3>
              {expandedIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            
            {expandedIndex === index && (
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="faq-contact">
        <h2>Still have questions?</h2>
        <p>Contact our support team for further assistance.</p>
        <button className="btn btn-primary">Contact Support</button>
      </div>
    </div>
  );
};

export default FAQ; 