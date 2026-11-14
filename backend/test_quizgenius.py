import unittest
import json
from app import create_app
from database import db
from models import User, Quiz, Question, AnswerOption, ExamAttempt
from config import Config

class TestConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    GEMINI_API_KEY = '' # Explicitly test demo fallback

class QuizGeniusTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app(TestConfig)
        self.client = self.app.test_client()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_user_registration_and_password_hashing(self):
        """Test that user registration hashes passwords and denies raw storage"""
        res = self.client.post('/api/auth/register', json={
            'name': 'Test Student',
            'email': 'test@student.edu',
            'password': 'secretpassword123',
            'role': 'student'
        })
        self.assertEqual(res.status_code, 201)
        data = res.get_json()
        self.assertIn('user', data)
        self.assertEqual(data['user']['email'], 'test@student.edu')

        # Verify password is not stored plaintext
        user = User.query.filter_by(email='test@student.edu').first()
        self.assertNotEqual(user.password_hash, 'secretpassword123')
        self.assertTrue(user.check_password('secretpassword123'))
        self.assertFalse(user.check_password('wrongpassword'))

    def test_user_login(self):
        """Test login authentication with valid and invalid passwords"""
        user = User(name='Test User', email='login@test.com', role='student')
        user.set_password('correctpass')
        db.session.add(user)
        db.session.commit()

        # Success
        res_ok = self.client.post('/api/auth/login', json={
            'email': 'login@test.com',
            'password': 'correctpass'
        })
        self.assertEqual(res_ok.status_code, 200)

        # Failure
        res_fail = self.client.post('/api/auth/login', json={
            'email': 'login@test.com',
            'password': 'badpassword'
        })
        self.assertEqual(res_fail.status_code, 401)

    def test_quiz_creation_and_retrieval(self):
        """Test admin quiz creation with 4 options and correct answer"""
        quiz_payload = {
            'title': 'Test AI & ML Exam',
            'subject': 'Computer Science',
            'topic': 'Machine Learning',
            'difficulty': 'Intermediate',
            'duration': 30,
            'maxMarks': 100,
            'description': 'Test exam description',
            'isPublished': True,
            'questions': [
                {
                    'questionText': 'What is supervised learning?',
                    'options': [
                        'Learning with labeled data',
                        'Learning without labels',
                        'Hardware acceleration',
                        'Compiler optimization'
                    ],
                    'correctAnswer': 'Learning with labeled data',
                    'explanation': 'Supervised learning pairs input features with ground-truth target labels.',
                    'difficulty': 'Beginner'
                }
            ]
        }
        res = self.client.post('/api/admin/quizzes', json=quiz_payload)
        self.assertEqual(res.status_code, 201)

        # Verify stored quiz in DB
        quiz = Quiz.query.first()
        self.assertIsNotNone(quiz)
        self.assertEqual(quiz.title, 'Test AI & ML Exam')
        self.assertEqual(len(quiz.questions), 1)
        self.assertEqual(len(quiz.questions[0].options), 4)

    def test_exam_submission_and_automatic_scoring(self):
        """Test student answer submission and auto score evaluation"""
        quiz = Quiz(
            title='Scoring Quiz',
            subject='Algorithms',
            topic='Sorting',
            duration=15,
            max_marks=10,
            is_published=True
        )
        db.session.add(quiz)
        db.session.flush()

        q1 = Question(
            quiz_id=quiz.id,
            question_text='Worst-case Merge Sort complexity?',
            correct_answer='O(n log n)',
            explanation='Merge sort divides evenly.'
        )
        db.session.add(q1)
        db.session.commit()

        # Submit answer
        submission = {
            'quizId': quiz.id,
            'userId': 1,
            'timeTakenSecs': 120,
            'userAnswers': {str(q1.id): 'O(n log n)'}
        }
        res = self.client.post('/api/exams/submit', json=submission)
        self.assertEqual(res.status_code, 201)
        data = res.get_json()
        self.assertEqual(data['score'], 10)
        self.assertEqual(data['percentage'], 100.0)
        self.assertEqual(data['correctCount'], 1)
        self.assertEqual(data['incorrectCount'], 0)

    def test_ai_demo_mode_fallback(self):
        """Test that AI quiz generator produces curated demo questions when no API key is set"""
        res = self.client.post('/api/ai/generate-quiz', json={
            'subject': 'Data Structures',
            'topic': 'Hash Tables',
            'difficulty': 'Intermediate',
            'count': 3
        })
        self.assertEqual(res.status_code, 200)
        data = res.get_json()
        self.assertFalse(data['isLive'])
        self.assertEqual(data['mode'], 'demo_fallback')
        self.assertIn('questions', data)
        self.assertEqual(len(data['questions']), 3)

if __name__ == '__main__':
    unittest.main()
