import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  FileQuestion,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { DemoNotice } from '../../components/DemoBadge';

export const StudyAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: `Hello ${user?.name || 'Student'}! 👋 I am your QuizGenius AI Study Assistant.

I can help you:
• Break down tricky computer science concepts into plain English
• Clarify why specific MCQ answers are correct or incorrect
• Summarize textbook topics and revision notes
• Generate on-demand practice questions to test your knowledge

What would you like to explore today?`,
      timestamp: 'Just now'
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Explain Binary Search Tree worst-case complexity",
    "What is the difference between Dijkstra and A* algorithms?",
    "Why does React use a Virtual DOM?",
    "Generate 3 practice questions on Database ACID properties",
    "How does the Softmax activation function work?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg = {
          id: Date.now() + 1,
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isLive: data.isLive
        };
        setMessages(prev => [...prev, aiMsg]);
        setLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Backend unavailable, using local study assistant fallback:', err);
    }

    // Local high-quality pedagogical response fallback
    setTimeout(() => {
      let replyText = '';
      const q = textToSend.toLowerCase();

      if (q.includes('bst') || q.includes('binary search')) {
        replyText = `**Binary Search Trees (BST) Deep Dive** 🌲\n\n• **Search Time:** Average $O(\\log n)$, but degrades to $O(n)$ if keys are inserted in sequential order (skewed degenerated tree).\n• **In-Order Traversal:** Left $\\rightarrow$ Root $\\rightarrow$ Right always gives ascending sorted keys.\n• **Remediation:** Self-balancing trees (AVL or Red-Black Trees) enforce height balance to guarantee strict $O(\\log n)$ operations.`;
      } else if (q.includes('dijkstra') || q.includes('a*') || q.includes('path')) {
        replyText = `**Dijkstra vs A\\* Algorithm Comparison** 🛣️\n\n1. **Dijkstra:** Uniform-cost search that expands in all directions equally until target is reached. Guaranteed optimal for non-negative edges.\n2. **A\\* Search:** Uses a heuristic function $f(n) = g(n) + h(n)$ to steer the search preferentially towards the target, drastically reducing explored states.\n3. **Failure condition:** Dijkstra strictly requires non-negative edge weights; otherwise, use Bellman-Ford.`;
      } else if (q.includes('acid') || q.includes('database')) {
        replyText = `**Database ACID Guarantees** 💾\n\n• **Atomicity:** All-or-nothing execution. If any query fails, the transaction rolls back completely.\n• **Consistency:** Transactions must transition the database from one valid state to another, obeying all constraints.\n• **Isolation:** Concurrent transactions execute without mutual interference (levels: Read Committed $\\rightarrow$ Repeatable Read $\\rightarrow$ Serializable).\n• **Durability:** Committed transactions persist even through hardware power failures.`;
      } else if (q.includes('react') || q.includes('virtual dom')) {
        replyText = `**React Virtual DOM Explained** ⚛️\n\nDirect DOM manipulation in browsers is computationally expensive. React keeps an in-memory lightweight representation (Virtual DOM). When state changes:\n1. A new Virtual DOM tree is rendered.\n2. The diffing algorithm calculates minimal differences (Reconciliation).\n3. Changes are batched and flushed to the real DOM efficiently in a single paint cycle.`;
      } else {
        replyText = `**Academic Breakdown on "${textToSend}"** 💡\n\n1. **Core Concept:** Review the fundamental definition and identify what assumptions it relies upon.\n2. **Algorithmic Complexity:** Pay close attention to worst-case asymptotic bounds ($O(n)$, $O(n \\log n)$).\n3. **Exam Tip:** Watch for edge-case constraints (empty inputs, negative weights, single-element collections).\n\nWould you like me to generate 2 practice multiple-choice questions on this topic?`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isLive: false
        }
      ]);
      setLoading(false);
    }, 700);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[82vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
      {/* Top Assistant Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-850/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl gradient-primary text-white flex items-center justify-center shadow-md shadow-brand-500/20">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-900 dark:text-white">
                AI Study Assistant
              </h1>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Interactive academic tutor powered by QuizGenius AI
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Secure Backend Proxy</span>
          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Zero Client API Key Exposure</p>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                isUser
                  ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
                  : 'gradient-primary text-white'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1">
                <div
                  className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap relative group shadow-xs ${
                    isUser
                      ? 'bg-brand-600 text-white rounded-tr-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-sm border border-slate-200/60 dark:border-slate-700/60'
                  }`}
                >
                  {msg.text}

                  {/* Copy Button */}
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 p-1 rounded-lg bg-white/80 dark:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>

                <div className={`flex items-center gap-2 text-[10px] text-slate-400 px-1 ${isUser ? 'justify-end' : ''}`}>
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.isLive === false && (
                    <span className="text-amber-500 font-medium">• Demo Mode</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 max-w-md mr-auto">
            <div className="w-8 h-8 rounded-xl gradient-primary text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-500" />
              <span>Analyzing knowledge base and drafting explanation...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-4 py-2 bg-slate-50/70 dark:bg-slate-850/50 border-t border-slate-100 dark:border-slate-800 overflow-x-auto flex gap-2">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 whitespace-nowrap transition shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your courses, exam questions or topics..."
            className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:ring-2 focus:ring-brand-500 outline-none transition"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="p-2.5 rounded-2xl gradient-primary text-white shadow hover:opacity-95 transition disabled:opacity-40"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
