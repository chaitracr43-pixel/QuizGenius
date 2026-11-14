import os
import json
import requests
from config import Config

class AIService:
    @staticmethod
    def get_api_key():
        return Config.GEMINI_API_KEY

    @classmethod
    def generate_quiz(cls, subject, topic, difficulty="Intermediate", count=5):
        """
        Generates structured MCQs using Gemini API if API key is present;
        Otherwise returns high quality pedagogical sample questions clearly labeled as Demo Mode.
        """
        api_key = cls.get_api_key()

        if api_key:
            try:
                prompt = f"""
                You are an expert exam author. Create an educational quiz in JSON format.
                Subject: {subject}
                Topic: {topic}
                Difficulty: {difficulty} (Beginner, Intermediate, or Advanced)
                Number of questions: {count}

                Return ONLY a valid JSON array of objects with the exact structure:
                [
                  {{
                    "questionText": "Question text here?",
                    "options": ["Option A", "Option B", "Option C", "Option D"],
                    "correctAnswer": "Option A",
                    "explanation": "Clear educational explanation of why Option A is correct.",
                    "difficulty": "{difficulty}"
                  }}
                ]
                Do not include markdown ticks, just raw json.
                """
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
                headers = {"Content-Type": "application/json"}
                payload = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {"temperature": 0.4}
                }
                response = requests.post(url, headers=headers, json=payload, timeout=15)
                if response.status_code == 200:
                    data = response.json()
                    text = data['candidates'][0]['content']['parts'][0]['text'].strip()
                    # Clean markdown if returned
                    if text.startswith('```json'): text = text[7:]
                    if text.startswith('```'): text = text[3:]
                    if text.endswith('```'): text = text[:-3]
                    questions = json.loads(text.strip())
                    return {
                        "isLive": True,
                        "mode": "live_ai",
                        "questions": questions
                    }
            except Exception as e:
                print(f"Error calling live AI API: {e}. Falling back to curated demo mode.")

        # Clearly labeled Demo Mode fallback
        return {
            "isLive": False,
            "mode": "demo_fallback",
            "message": "Demo mode active: Curated high-quality questions loaded because no external AI API key is configured.",
            "questions": cls._get_demo_questions(subject, topic, difficulty, count)
        }

    @classmethod
    def analyze_performance(cls, result_data):
        """
        Analyzes student score, identifying strong concepts and areas needing remediation.
        """
        api_key = cls.get_api_key()
        percentage = result_data.get('percentage', 75)
        topic = result_data.get('topic', 'General Science')
        correct = result_data.get('correctCount', 0)
        total = result_data.get('totalQuestions', 5)

        if api_key:
            try:
                prompt = f"""
                Analyze student exam result for topic '{topic}':
                Score: {correct}/{total} ({percentage}%).
                Return ONLY valid JSON with keys:
                {{
                  "summary": "2 sentences describing performance and understanding level.",
                  "strongTopics": ["Topic 1", "Topic 2"],
                  "topicsToImprove": ["Topic A", "Topic B"],
                  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"]
                }}
                """
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
                headers = {"Content-Type": "application/json"}
                payload = {"contents": [{"parts": [{"text": prompt}]}]}
                response = requests.post(url, headers=headers, json=payload, timeout=12)
                if response.status_code == 200:
                    text = response.json()['candidates'][0]['content']['parts'][0]['text'].strip()
                    if text.startswith('```json'): text = text[7:]
                    if text.startswith('```'): text = text[3:]
                    if text.endswith('```'): text = text[:-3]
                    feedback = json.loads(text.strip())
                    feedback["isLive"] = True
                    return feedback
            except Exception as e:
                print(f"AI performance analysis fallback: {e}")

        # Deterministic cognitive diagnostic engine
        isHigh = percentage >= 80
        isMed = 60 <= percentage < 80

        return {
            "isLive": False,
            "summary": (
                f"Outstanding proficiency demonstrated in {topic} with {correct} of {total} correct ({percentage}%)."
                if isHigh else
                f"Good foundational understanding in {topic} ({percentage}%). Targeted review of intermediate edge cases is advised."
                if isMed else
                f"Foundational review recommended in {topic} ({percentage}%). Focus on definitions and algorithmic constraints."
            ),
            "strongTopics": [
                f"{topic} - Foundational Concepts",
                "Conceptual Syntax & Principles"
            ] if not isHigh else [
                f"{topic} - Architectural Principles",
                "Complexity Bounds & Analysis",
                "Implementation Best Practices"
            ],
            "topicsToImprove": [
                "Edge-case Handling",
                "Performance Optimization Under Constraints"
            ] if isHigh else [
                f"{topic} - Theoretical Underpinnings",
                "Comparative Trade-offs",
                "Time & Space Complexity Limits"
            ],
            "recommendations": [
                f"Review explanations for questions you answered incorrectly in {topic}.",
                "Ask the AI Study Assistant to break down why alternative choices were suboptimal.",
                "Attempt a 5-question targeted practice quiz to reinforce key concepts."
            ]
        }

    @classmethod
    def chat_study_assistant(cls, message, context=""):
        """
        Interactive 24/7 AI Study Assistant for clarifying concepts, summarizing topics, and answering student doubts.
        """
        api_key = cls.get_api_key()

        if api_key:
            try:
                system_instruction = (
                    "You are QuizGenius AI Study Assistant, an encouraging and academically rigorous computer science "
                    "and engineering tutor. Explain concepts simply with clear bullet points, brief code snippets where helpful, "
                    "and always invite the student to test their knowledge."
                )
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={api_key}"
                headers = {"Content-Type": "application/json"}
                prompt = f"{system_instruction}\nStudent Question: {message}\nContext: {context}"
                payload = {"contents": [{"parts": [{"text": prompt}]}]}
                response = requests.post(url, headers=headers, json=payload, timeout=15)
                if response.status_code == 200:
                    reply = response.json()['candidates'][0]['content']['parts'][0]['text']
                    return {
                        "isLive": True,
                        "reply": reply
                    }
            except Exception as e:
                print(f"Chat API error: {e}")

        # Curated intelligent response library for Demo Mode
        query = message.lower()
        if "binary search" in query or "bst" in query:
            reply = (
                "**Binary Search Trees (BST): Key Takeaways** 🌲\n\n"
                "- **Property:** For every node $N$, values in the left subtree are $< N$, and values in the right subtree are $> N$.\n"
                "- **In-Order Traversal:** Always yields keys in strictly ascending sorted order.\n"
                "- **Time Complexity:**\n"
                "  - Average case: $O(\\log n)$ for search, insertion, and deletion.\n"
                "  - Worst case (skewed tree): $O(n)$ when elements are inserted in already sorted order.\n"
                "- **Balancing Solutions:** AVL Trees or Red-Black Trees prevent degeneration into $O(n)$ linked lists."
            )
        elif "dijkstra" in query or "shortest path" in query:
            reply = (
                "**Dijkstra's Algorithm Breakdown** 🛣️\n\n"
                "- **Paradigm:** Greedy Algorithm.\n"
                "- **Purpose:** Finds the single-source shortest path in a weighted graph with **non-negative** edge weights.\n"
                "- **Data Structure:** Implemented using a Min-Priority Queue (Binary Heap or Fibonacci Heap).\n"
                "- **Complexity:** $O((V + E) \\log V)$ with adjacency list and min-heap.\n"
                "- *Crucial Note:* Dijkstra fails if negative edge weights exist; in that scenario, use Bellman-Ford algorithm!"
            )
        elif "react" in query or "virtual dom" in query or "hook" in query:
            reply = (
                "**React Core Architecture Guide** ⚛️\n\n"
                "- **Virtual DOM:** A lightweight in-memory representation of the real DOM. When state changes, React diffs the new Virtual DOM with the previous snapshot (Reconciliation) and performs minimal batched real DOM mutations.\n"
                "- **Essential Hooks:**\n"
                "  - `useState`: Declares reactive state variable.\n"
                "  - `useEffect`: Manages side-effects (data fetching, subscriptions).\n"
                "  - `useMemo`: Caches expensive computation results between renders.\n"
                "  - `useCallback`: Memoizes function definitions to avoid child re-renders."
            )
        elif "explain question" in query or "incorrect" in query:
            reply = (
                "**Understanding Multiple-Choice Logic** 💡\n\n"
                "When analyzing options, follow the elimination methodology:\n"
                "1. **Isolate constraints:** Check for terms like *worst-case*, *auxiliary space*, or *average*.\n"
                "2. **Eliminate distractors:** Usually 2 options are clearly invalid or represent different paradigms.\n"
                "3. **Inspect the rationale:** Review the complete explanation in your score report to understand edge cases!"
            )
        else:
            reply = (
                f"**Study Assistant Insights on '{message}'** 📚\n\n"
                f"Here is a structured academic summary regarding your inquiry:\n"
                f"1. **Core Definition:** Break down the fundamental axioms and mathematical definitions first.\n"
                f"2. **Practical Application:** Connect the theoretical rule with real-world system architecture.\n"
                f"3. **Exam Focus:** Be prepared for multiple-choice edge cases, specifically worst-case constraints and trade-offs.\n\n"
                f"*Tip: You can ask me to generate 3 quick practice questions on this topic anytime!*"
            )

        return {
            "isLive": False,
            "mode": "demo_response",
            "reply": reply
        }

    @staticmethod
    def _get_demo_questions(subject, topic, difficulty, count):
        demo_bank = [
            {
                "questionText": f"In {subject} ({topic}), what is the primary consideration when evaluating algorithmic efficiency?",
                "options": [
                    "Asymptotic time and space complexity growth rates",
                    "The clock speed of the testing machine hardware",
                    "The number of comments in the source code file",
                    "The brand of operating system compiling the code"
                ],
                "correctAnswer": "Asymptotic time and space complexity growth rates",
                "explanation": "Algorithmic analysis evaluates performance independent of specific hardware or compilers using asymptotic Big-O notations.",
                "difficulty": difficulty
            },
            {
                "questionText": f"Which fundamental principle distinguishes robust implementations in {topic}?",
                "options": [
                    "High cohesion and low coupling across modules",
                    "Storing all application state inside global variables",
                    "Avoiding unit test suites to maximize speed",
                    "Hard-coding configuration tokens into the source tree"
                ],
                "correctAnswer": "High cohesion and low coupling across modules",
                "explanation": "High cohesion ensures components have focused responsibilities, while low coupling minimizes dependencies between components.",
                "difficulty": difficulty
            },
            {
                "questionText": f"What is the typical worst-case upper bound of standard comparison-based sorting algorithms?",
                "options": ["O(n log n)", "O(n)", "O(log n)", "O(1)"],
                "correctAnswer": "O(n log n)",
                "explanation": "The information-theoretic lower bound for comparison sorts is Omega(n log n), achieved by algorithms such as Merge Sort and Heap Sort.",
                "difficulty": difficulty
            },
            {
                "questionText": f"Which strategy is most effective to safeguard against race conditions in multi-threaded environments?",
                "options": [
                    "Employing mutual exclusion locks (mutexes) or atomic primitives",
                    "Increasing the processor clock frequency",
                    "Converting all data types to floating point numbers",
                    "Disabling firewall access on the host"
                ],
                "correctAnswer": "Employing mutual exclusion locks (mutexes) or atomic primitives",
                "explanation": "Synchronization primitives ensure that critical sections are accessed by only one thread at a time, eliminating data races.",
                "difficulty": difficulty
            },
            {
                "questionText": f"What is the primary benefit of idempotency in API and database transactions?",
                "options": [
                    "Making repeated identical requests yield the same outcome without unintended side-effects",
                    "Compressing network payloads automatically by 50%",
                    "Bypassing authentication credentials on internal subnets",
                    "Enforcing synchronous blocking calls on all clients"
                ],
                "correctAnswer": "Making repeated identical requests yield the same outcome without unintended side-effects",
                "explanation": "An idempotent operation can be applied multiple times without altering the result beyond the initial application, crucial for retry safety in distributed systems.",
                "difficulty": difficulty
            }
        ]
        return demo_bank[:count]
