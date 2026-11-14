// Comprehensive realistic dataset for QuizGenius

export const MOCK_QUIZZES = [
  {
    id: 1,
    title: 'Data Structures & Algorithms Mastery',
    subject: 'Computer Science',
    topic: 'Trees, Graphs & Dynamic Programming',
    difficulty: 'Intermediate',
    duration: 25, // minutes
    totalQuestions: 5,
    maxMarks: 50,
    isPublished: true,
    attemptsCount: 142,
    avgScore: 78.4,
    description: 'Test your understanding of algorithmic complexity, tree traversals, and dynamic programming optimization.',
    author: 'Prof. Alan Vance',
    createdAt: '2026-11-01',
    questions: [
      {
        id: 101,
        questionText: 'What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree (BST)?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 'O(n)',
        explanation: 'In the worst case, a binary search tree can degenerate into a linked list (skewed tree), resulting in O(n) search time.',
        difficulty: 'Intermediate'
      },
      {
        id: 102,
        questionText: 'Which traversal of a Binary Search Tree (BST) visits nodes in ascending sorted order?',
        options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
        correctAnswer: 'In-order',
        explanation: 'In-order traversal visits Left Subtree -> Root -> Right Subtree, which yields elements in sorted ascending order for a BST.',
        difficulty: 'Beginner'
      },
      {
        id: 103,
        questionText: 'Which algorithmic paradigm does Dijkstra’s shortest path algorithm strictly follow?',
        options: ['Dynamic Programming', 'Greedy Approach', 'Divide and Conquer', 'Backtracking'],
        correctAnswer: 'Greedy Approach',
        explanation: 'Dijkstra algorithm repeatedly selects the unvisited vertex with the minimum known distance, making locally optimal choices at each step.',
        difficulty: 'Intermediate'
      },
      {
        id: 104,
        questionText: 'What is the auxiliary space complexity of the optimal recursive implementation of Merge Sort for an array of size n?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correctAnswer: 'O(n)',
        explanation: 'Merge sort requires O(n) auxiliary array space for merging subarrays plus O(log n) call stack space, dominating to O(n).',
        difficulty: 'Advanced'
      },
      {
        id: 105,
        questionText: 'Which data structure is fundamentally used to implement Breadth-First Search (BFS) in a graph?',
        options: ['Stack', 'Priority Queue', 'FIFO Queue', 'Disjoint Set Union'],
        correctAnswer: 'FIFO Queue',
        explanation: 'BFS explores neighbor nodes level by level, maintaining first-in-first-out order using a standard FIFO Queue.',
        difficulty: 'Beginner'
      }
    ]
  },
  {
    id: 2,
    title: 'Artificial Intelligence & Neural Networks',
    subject: 'Artificial Intelligence',
    topic: 'Machine Learning & Deep Learning Fundamentals',
    difficulty: 'Advanced',
    duration: 30,
    totalQuestions: 5,
    maxMarks: 50,
    isPublished: true,
    attemptsCount: 98,
    avgScore: 72.1,
    description: 'Comprehensive exam covering gradient descent, activation functions, loss formulation, and backpropagation.',
    author: 'Dr. Sarah Connor',
    createdAt: '2026-11-04',
    questions: [
      {
        id: 201,
        questionText: 'Which activation function is most susceptible to the "Dying ReLU" problem during backpropagation?',
        options: ['Sigmoid', 'Leaky ReLU', 'Standard ReLU (max(0, x))', 'GELU'],
        correctAnswer: 'Standard ReLU (max(0, x))',
        explanation: 'If a neuron’s output falls below zero in standard ReLU, its gradient becomes permanently 0, preventing future weight updates.',
        difficulty: 'Advanced'
      },
      {
        id: 202,
        questionText: 'What is the primary function of the Softmax layer in multi-class classification networks?',
        options: [
          'Normalize logits into a probability distribution summing to 1',
          'Eliminate negative values by squaring all activations',
          'Perform dimensionality reduction using principal components',
          'Prevent vanishing gradients across residual blocks'
        ],
        correctAnswer: 'Normalize logits into a probability distribution summing to 1',
        explanation: 'Softmax exponentiates and normalizes raw logits so they can be interpreted as categorical probabilities.',
        difficulty: 'Intermediate'
      },
      {
        id: 203,
        questionText: 'Which optimization algorithm adapts individual learning rates for each parameter based on first and second moments of gradients?',
        options: ['Stochastic Gradient Descent (SGD)', 'Momentum', 'Adam (Adaptive Moment Estimation)', 'Adagrad only'],
        correctAnswer: 'Adam (Adaptive Moment Estimation)',
        explanation: 'Adam combines the advantages of AdaGrad (tracking squared gradients) and RMSProp/Momentum (exponential moving average of gradients).',
        difficulty: 'Intermediate'
      },
      {
        id: 204,
        questionText: 'In a transformer architecture, which mechanism allows tokens to attend to different representation subspaces at different positions?',
        options: ['Convolutional Pooling', 'Multi-Head Attention', 'Layer Normalization', 'Positional Feed Forward'],
        correctAnswer: 'Multi-Head Attention',
        explanation: 'Multi-head attention projects Queries, Keys, and Values h times with different learnable linear projections, capturing distinct contextual aspects.',
        difficulty: 'Advanced'
      },
      {
        id: 205,
        questionText: 'What term describes a model that performs exceptionally well on training data but fails to generalize to unseen test data?',
        options: ['Underfitting', 'Overfitting', 'High Bias', 'Zero-shot Generalization'],
        correctAnswer: 'Overfitting',
        explanation: 'Overfitting occurs when high model capacity leads to memorization of training data noise rather than true underlying distribution patterns.',
        difficulty: 'Beginner'
      }
    ]
  },
  {
    id: 3,
    title: 'Modern Web Architectures & React.js',
    subject: 'Web Technologies',
    topic: 'React Hooks, Virtual DOM & State Management',
    difficulty: 'Beginner',
    duration: 20,
    totalQuestions: 5,
    maxMarks: 50,
    isPublished: true,
    attemptsCount: 215,
    avgScore: 84.6,
    description: 'Assess foundational frontend engineering principles, component lifecycle, virtual DOM reconciliation, and modern hooks.',
    author: 'Prof. Alan Vance',
    createdAt: '2026-11-06',
    questions: [
      {
        id: 301,
        questionText: 'Which React Hook is primarily used to perform side effects such as data fetching or manual DOM mutations?',
        options: ['useState', 'useEffect', 'useMemo', 'useRef'],
        correctAnswer: 'useEffect',
        explanation: 'useEffect serves the purpose of handling side effects after render cycles have completed.',
        difficulty: 'Beginner'
      },
      {
        id: 302,
        questionText: 'Why should keys in React list items be stable, unique, and predictable?',
        options: [
          'To format CSS selectors automatically',
          'To help React identify which items have changed, been added, or removed in the Virtual DOM',
          'To trigger garbage collection on unused state variables',
          'To allow backend SQL database sync'
        ],
        correctAnswer: 'To help React identify which items have changed, been added, or removed in the Virtual DOM',
        explanation: 'Keys allow the reconciliation algorithm to efficiently match existing DOM nodes across renders.',
        difficulty: 'Beginner'
      },
      {
        id: 303,
        questionText: 'What is the purpose of React.useMemo()?',
        options: [
          'Memoize expensive calculation results between re-renders',
          'Cache API responses permanently in localStorage',
          'Render children components outside of the main root hierarchy',
          'Trigger synchronous re-renders on scroll events'
        ],
        correctAnswer: 'Memoize expensive calculation results between re-renders',
        explanation: 'useMemo caches the result of a function calculation until one of its declared dependencies changes.',
        difficulty: 'Intermediate'
      },
      {
        id: 304,
        questionText: 'What does unidirectional data flow in React mean?',
        options: [
          'Data flows from child components to parents via pointers',
          'Data flows down from parent components to child components via props',
          'State is stored exclusively in cookies',
          'Only one component can exist per web page'
        ],
        correctAnswer: 'Data flows down from parent components to child components via props',
        explanation: 'React embraces one-way data binding: parent components pass state down to children via immutable props.',
        difficulty: 'Beginner'
      },
      {
        id: 305,
        questionText: 'In React 18, what new concept groups multiple state updates into a single re-render for better performance?',
        options: ['Single Threading', 'Automatic Batching', 'Context Injection', 'Server Hydration Fallback'],
        correctAnswer: 'Automatic Batching',
        explanation: 'React 18 introduces automatic batching for promises, setTimeout, and native event handlers to minimize redundant renders.',
        difficulty: 'Intermediate'
      }
    ]
  },
  {
    id: 4,
    title: 'Relational Databases & SQL Optimization',
    subject: 'Database Systems',
    topic: 'Indexing, Normalization & ACID Transactions',
    difficulty: 'Intermediate',
    duration: 25,
    totalQuestions: 4,
    maxMarks: 40,
    isPublished: true,
    attemptsCount: 88,
    avgScore: 76.2,
    description: 'Evaluate index types, query execution plans, transaction isolation levels, and B+ tree mechanics.',
    author: 'Prof. Alan Vance',
    createdAt: '2026-11-08',
    questions: [
      {
        id: 401,
        questionText: 'Which normal form requires the removal of transitive dependencies?',
        options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
        correctAnswer: 'Third Normal Form (3NF)',
        explanation: '3NF requires that the table is in 2NF and that no non-prime attribute is transitively dependent on any candidate key.',
        difficulty: 'Beginner'
      },
      {
        id: 402,
        questionText: 'What type of index stores the actual physical table data rows in the index order?',
        options: ['Non-Clustered Index', 'Clustered Index', 'Bitmap Index', 'Hash Index'],
        correctAnswer: 'Clustered Index',
        explanation: 'A clustered index determines the physical order of data in the table, meaning each table can have at most one clustered index.',
        difficulty: 'Intermediate'
      },
      {
        id: 403,
        questionText: 'In ACID transaction guarantees, what does the "I" stand for?',
        options: ['Integrity', 'Isolation', 'Idempotency', 'Indexing'],
        correctAnswer: 'Isolation',
        explanation: 'Isolation ensures concurrent execution of transactions leaves the database in the same state as if they were executed sequentially.',
        difficulty: 'Beginner'
      },
      {
        id: 404,
        questionText: 'Which transaction isolation level prevents Dirty Reads and Non-Repeatable Reads, but may still allow Phantom Reads?',
        options: ['Read Uncommitted', 'Read Committed', 'Repeatable Read', 'Serializable'],
        correctAnswer: 'Repeatable Read',
        explanation: 'Repeatable Read ensures that any data read cannot change during the transaction, preventing non-repeatable reads, but range locks may still allow phantoms in some DBMSs.',
        difficulty: 'Advanced'
      }
    ]
  }
];

export const MOCK_STUDENT_STATS = {
  totalQuizzesAttempted: 14,
  averageScore: 82.5,
  highestScore: 96.0,
  totalMarksEarned: 640,
  totalMarksPossible: 750,
  recentResults: [
    {
      id: 501,
      quizId: 1,
      quizTitle: 'Data Structures & Algorithms Mastery',
      subject: 'Computer Science',
      date: '2026-11-12',
      score: 40,
      totalMarks: 50,
      percentage: 80.0,
      status: 'Passed',
      timeSpent: '18m 42s'
    },
    {
      id: 502,
      quizId: 3,
      quizTitle: 'Modern Web Architectures & React.js',
      subject: 'Web Technologies',
      date: '2026-11-09',
      score: 48,
      totalMarks: 50,
      percentage: 96.0,
      status: 'Distinction',
      timeSpent: '12m 15s'
    },
    {
      id: 503,
      quizId: 2,
      quizTitle: 'Artificial Intelligence & Neural Networks',
      subject: 'Artificial Intelligence',
      date: '2026-11-06',
      score: 36,
      totalMarks: 50,
      percentage: 72.0,
      status: 'Passed',
      timeSpent: '26m 10s'
    },
    {
      id: 504,
      quizId: 4,
      quizTitle: 'Relational Databases & SQL Optimization',
      subject: 'Database Systems',
      date: '2026-11-02',
      score: 32,
      totalMarks: 40,
      percentage: 80.0,
      status: 'Passed',
      timeSpent: '19m 30s'
    }
  ],
  subjectPerformance: [
    { subject: 'Web Technologies', score: 94, totalTests: 4, strength: 'High Mastery' },
    { subject: 'Database Systems', score: 82, totalTests: 3, strength: 'Solid Competence' },
    { subject: 'Data Structures', score: 78, totalTests: 4, strength: 'Good Proficiency' },
    { subject: 'Artificial Intelligence', score: 71, totalTests: 3, strength: 'Needs Focus' },
  ],
  progressHistory: [
    { month: 'Jul', score: 68 },
    { month: 'Aug', score: 72 },
    { month: 'Sep', score: 75 },
    { month: 'Oct', score: 80 },
    { month: 'Nov', score: 85 },
  ],
  aiRecommendations: [
    {
      id: 1,
      title: 'Deepen Knowledge in Dynamic Programming',
      subject: 'Data Structures',
      urgency: 'Medium',
      reason: 'In your recent test, you took longer on tree recursion and optimal substructure questions.',
      suggestedAction: 'Practice 5 Dynamic Programming MCQs on memoization techniques.'
    },
    {
      id: 2,
      title: 'Review Backpropagation & Gradient Vanishing',
      subject: 'Artificial Intelligence',
      urgency: 'High',
      reason: 'Score on activation functions (ReLU & GELU) was 60%. Recommended for upcoming comprehensive exams.',
      suggestedAction: 'Review ReLU mathematical limits and test yourself with our AI Study Assistant.'
    },
    {
      id: 3,
      title: 'Ready for Advanced Database Concurrency',
      subject: 'Database Systems',
      urgency: 'Low',
      reason: 'Consistent scores above 80% indicate readiness for Distributed Transactions & 2PC.',
      suggestedAction: 'Attempt the Advanced SQL Optimization quiz.'
    }
  ],
  recentActivities: [
    { id: 1, action: 'Completed Exam', target: 'Data Structures & Algorithms Mastery', score: '80%', time: '2 hours ago' },
    { id: 2, action: 'Asked AI Assistant', target: 'Dijkstra vs A* Algorithm explanation', score: null, time: '5 hours ago' },
    { id: 3, action: 'Earned Badge', target: 'Algorithm Master (Tier 2)', score: null, time: '1 day ago' },
    { id: 4, action: 'Completed Exam', target: 'Modern Web Architectures & React.js', score: '96%', time: '3 days ago' },
  ]
};

export const MOCK_ADMIN_STATS = {
  totalRegisteredStudents: 348,
  totalExaminations: 26,
  totalQuizzes: 42,
  averageExaminationScore: 77.8,
  recentActivities: [
    { id: 1, studentName: 'Chaitra C R', examTitle: 'Data Structures & Algorithms Mastery', score: '80%', date: 'Just now' },
    { id: 2, studentName: 'Rahul Sharma', examTitle: 'Artificial Intelligence & Neural Networks', score: '88%', date: '15 mins ago' },
    { id: 3, studentName: 'Priya Patel', examTitle: 'Modern Web Architectures & React.js', score: '92%', date: '1 hour ago' },
    { id: 4, studentName: 'Amit Verma', examTitle: 'Relational Databases & SQL Optimization', score: '75%', date: '3 hours ago' },
    { id: 5, studentName: 'Sneha Reddy', examTitle: 'Data Structures & Algorithms Mastery', score: '64%', date: '4 hours ago' }
  ],
  scoreDistribution: [
    { range: '0-50%', count: 18, color: '#f43f5e' },
    { range: '51-70%', count: 64, color: '#f59e0b' },
    { range: '71-85%', count: 182, color: '#6366f1' },
    { range: '86-100%', count: 84, color: '#10b981' }
  ],
  subjectEnrollments: [
    { subject: 'Computer Science', students: 165, passRate: '86%' },
    { subject: 'Artificial Intelligence', students: 120, passRate: '79%' },
    { subject: 'Web Technologies', students: 210, passRate: '92%' },
    { subject: 'Database Systems', students: 95, passRate: '83%' },
  ]
};

export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Chaitra C R', quizzesCompleted: 14, avgPercentage: 88.5, highestScore: 98, badge: 'Grandmaster' },
  { rank: 2, name: 'Arjun N.', quizzesCompleted: 16, avgPercentage: 86.8, highestScore: 96, badge: 'Master' },
  { rank: 3, name: 'Priya K.', quizzesCompleted: 12, avgPercentage: 85.2, highestScore: 94, badge: 'Master' },
  { rank: 4, name: 'Kavya S.', quizzesCompleted: 15, avgPercentage: 83.4, highestScore: 92, badge: 'Expert' },
  { rank: 5, name: 'Rohan M.', quizzesCompleted: 11, avgPercentage: 81.0, highestScore: 90, badge: 'Expert' },
  { rank: 6, name: 'Vikram B.', quizzesCompleted: 13, avgPercentage: 79.5, highestScore: 88, badge: 'Scholar' },
  { rank: 7, name: 'Ananya D.', quizzesCompleted: 10, avgPercentage: 77.8, highestScore: 86, badge: 'Scholar' },
  { rank: 8, name: 'Deepak V.', quizzesCompleted: 9, avgPercentage: 76.0, highestScore: 84, badge: 'Scholar' },
  { rank: 9, name: 'Meera J.', quizzesCompleted: 8, avgPercentage: 74.2, highestScore: 82, badge: 'Apprentice' },
  { rank: 10, name: 'Siddharth T.', quizzesCompleted: 7, avgPercentage: 72.0, highestScore: 80, badge: 'Apprentice' },
];

export const MOCK_STUDENTS_LIST = [
  { id: 1, name: 'Chaitra C R', email: 'chaitra.student@quizgenius.edu', role: 'student', grade: 'Computer Science - Year 3', examsTaken: 14, avgScore: 88.5, status: 'Active' },
  { id: 2, name: 'Rahul Sharma', email: 'rahul.s@quizgenius.edu', role: 'student', grade: 'Artificial Intelligence - Year 2', examsTaken: 11, avgScore: 81.2, status: 'Active' },
  { id: 3, name: 'Priya Patel', email: 'priya.p@quizgenius.edu', role: 'student', grade: 'Information Science - Year 4', examsTaken: 16, avgScore: 86.8, status: 'Active' },
  { id: 4, name: 'Amit Verma', email: 'amit.v@quizgenius.edu', role: 'student', grade: 'Computer Science - Year 2', examsTaken: 9, avgScore: 75.4, status: 'Active' },
  { id: 5, name: 'Sneha Reddy', email: 'sneha.r@quizgenius.edu', role: 'student', grade: 'Data Science - Year 3', examsTaken: 8, avgScore: 79.0, status: 'Active' },
  { id: 6, name: 'Prof. Alan Vance', email: 'admin@quizgenius.edu', role: 'admin', grade: 'Faculty - Head of CS', examsTaken: 0, avgScore: '-', status: 'Active' }
];
