"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";

export function FeedbackSection() {
  const { language } = useLanguage();
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      return;
    }

    setIsSubmitting(true);
    setShowError(false);

    try {
      const response = await fetch('https://formspree.io/f/mldwyzry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedback.trim(),
          language: language,
          source: 'homepage_feedback'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFeedback("");
        // Reset success message after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full">
      <div className="bg-black p-6 md:p-8 h-full flex flex-col">



        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
          <div className="mb-4 flex-1">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your thoughts, suggestions, or feedback..
              分享您的想法、建议或反馈..."
              className="w-full h-full min-h-[200px] md:min-h-[120px] p-6 border border-white bg-black text-white placeholder-gray focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent resize-none"
              disabled={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting || !feedback.trim()}
              className="bg-white text-black font-medium py-3 px-6 md:px-8 rounded-full hover:bg-gray-200 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg"
            >
              {isSubmitting 
                ? (language === "en" ? "Sending..." : "发送中...")
                : (language === "en" ? "Send Feedback" : "发送反馈")
              }
            </button>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="mt-4 p-3 bg-green-800 text-green-100 rounded-lg text-center">
              {language === "en" 
                ? "Thank you for your feedback!"
                : "感谢您的反馈！"
              }
            </div>
          )}

          {/* Error Message */}
          {showError && (
            <div className="mt-4 p-3 bg-red-800 text-red-100 rounded-lg text-center">
              {language === "en" 
                ? "Something went wrong. Please try again."
                : "出现错误，请重试。"
              }
            </div>
          )}
        </form>
      </div>
    </div>
  );
} 