import os
from database import db
from models import User, Quiz, Question, AnswerOption, ExamAttempt, AIRecommendation
from app import create_app

def seed_database():
    app = create_app()
    with app.app_context():
        # Clean slate or populate if empty
        if User.query.filter_by(email='admin@quizgenius.edu').first():
            print("Database already contains seed data. Skipping.")
            return

        print("Seeding database...")

        # 1. Users
        admin = User(
            name="Prof. Alan Vance",
            email="admin@quizgenius.edu",
            role="admin",
            grade="Faculty - Head of Computer Science"
        )
        admin.set_password("admin123")

        student = User(
            name="Chaitra C R",
            email="chaitra.student@quizgenius.edu",
            role="student",
            grade="Computer Science - Year 3"
        )
        student.set_password("student123")

        db.session.add_all([admin, student])
        db.session.commit()

        # 2. Quizzes & Questions
        q1 = Quiz(
            title="Data Structures & Algorithms Mastery",
            subject="Computer Science",
            topic="Trees, Graphs & Dynamic Programming",
            difficulty="Intermediate",
            duration=25,
            max_marks=50,
            description="Test your understanding of algorithmic complexity, tree traversals, and dynamic programming.",
            is_published=True,
            author_id=admin.id
        )
        db.session.add(q1)
        db.session.flush()

        questions_data_1 = [
            (
                "What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree (BST)?",
                ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                "O(n)",
                "In the worst case, a binary search tree can degenerate into a linked list, resulting in O(n) search time.",
                "Intermediate"
            ),
            (
                "Which traversal of a Binary Search Tree (BST) visits nodes in ascending sorted order?",
                ["Pre-order", "In-order", "Post-order", "Level-order"],
                "In-order",
                "In-order traversal visits Left Subtree -> Root -> Right Subtree, yielding keys in sorted ascending order for a BST.",
                "Beginner"
            ),
            (
                "Which algorithmic paradigm does Dijkstra's shortest path algorithm strictly follow?",
                ["Dynamic Programming", "Greedy Approach", "Divide and Conquer", "Backtracking"],
                "Greedy Approach",
                "Dijkstra algorithm repeatedly selects the unvisited vertex with the minimum known distance, making locally optimal choices at each step.",
                "Intermediate"
            ),
            (
                "What is the auxiliary space complexity of the optimal recursive implementation of Merge Sort for an array of size n?",
                ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
                "O(n)",
                "Merge sort requires O(n) auxiliary array space for merging subarrays plus O(log n) call stack space, dominating to O(n).",
                "Advanced"
            ),
            (
                "Which data structure is fundamentally used to implement Breadth-First Search (BFS) in a graph?",
                ["Stack", "Priority Queue", "FIFO Queue", "Disjoint Set Union"],
                "FIFO Queue",
                "BFS explores neighbor nodes level by level, maintaining first-in-first-out order using a standard FIFO Queue.",
                "Beginner"
            )
        ]

        for q_text, opts, correct, expl, diff in questions_data_1:
            ques = Question(
                quiz_id=q1.id,
                question_text=q_text,
                correct_answer=correct,
                explanation=expl,
                difficulty=diff
            )
            db.session.add(ques)
            db.session.flush()
            for idx, opt in enumerate(opts):
                db.session.add(AnswerOption(
                    question_id=ques.id,
                    option_text=opt,
                    option_order=idx
                ))

        # 3. AI Quiz 2
        q2 = Quiz(
            title="Artificial Intelligence & Neural Networks",
            subject="Artificial Intelligence",
            topic="Machine Learning & Deep Learning Fundamentals",
            difficulty="Advanced",
            duration=30,
            max_marks=50,
            description="Comprehensive exam covering gradient descent, activation functions, loss formulation, and backpropagation.",
            is_published=True,
            author_id=admin.id
        )
        db.session.add(q2)
        db.session.flush()

        questions_data_2 = [
            (
                "Which activation function is most susceptible to the 'Dying ReLU' problem during backpropagation?",
                ["Sigmoid", "Leaky ReLU", "Standard ReLU (max(0, x))", "GELU"],
                "Standard ReLU (max(0, x))",
                "If a neuron output falls below zero in standard ReLU, its gradient becomes permanently 0, preventing future weight updates.",
                "Advanced"
            ),
            (
                "What is the primary function of the Softmax layer in multi-class classification networks?",
                [
                    "Normalize logits into a probability distribution summing to 1",
                    "Eliminate negative values by squaring all activations",
                    "Perform dimensionality reduction using principal components",
                    "Prevent vanishing gradients across residual blocks"
                ],
                "Normalize logits into a probability distribution summing to 1",
                "Softmax exponentiates and normalizes raw logits so they can be interpreted as categorical probabilities.",
                "Intermediate"
            ),
            (
                "In a transformer architecture, which mechanism allows tokens to attend to different representation subspaces at different positions?",
                ["Convolutional Pooling", "Multi-Head Attention", "Layer Normalization", "Positional Feed Forward"],
                "Multi-Head Attention",
                "Multi-head attention projects Queries, Keys, and Values h times with different learnable linear projections, capturing distinct contextual aspects.",
                "Advanced"
            )
        ]

        for q_text, opts, correct, expl, diff in questions_data_2:
            ques = Question(
                quiz_id=q2.id,
                question_text=q_text,
                correct_answer=correct,
                explanation=expl,
                difficulty=diff
            )
            db.session.add(ques)
            db.session.flush()
            for idx, opt in enumerate(opts):
                db.session.add(AnswerOption(
                    question_id=ques.id,
                    option_text=opt,
                    option_order=idx
                ))

        db.session.commit()
        print("Database seeded successfully with initial users, quizzes, and questions!")

if __name__ == '__main__':
    seed_database()
