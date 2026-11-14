from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from database import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20), default='student', nullable=False) # 'student' or 'admin' / 'teacher'
    grade = db.Column(db.String(100), default='General Studies')
    avatar = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    attempts = db.relationship('ExamAttempt', backref='student', lazy=True, cascade="all, delete-orphan")
    recommendations = db.relationship('AIRecommendation', backref='user', lazy=True, cascade="all, delete-orphan")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'role': self.role,
            'grade': self.grade,
            'avatar': self.avatar or f"https://api.dicebear.com/7.x/initials/svg?seed={self.name}",
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


class Quiz(db.Model):
    __tablename__ = 'quizzes'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    subject = db.Column(db.String(100), nullable=False, index=True)
    topic = db.Column(db.String(150), nullable=False)
    difficulty = db.Column(db.String(30), default='Intermediate') # Beginner, Intermediate, Advanced
    duration = db.Column(db.Integer, default=25) # in minutes
    max_marks = db.Column(db.Integer, default=50)
    description = db.Column(db.Text, nullable=True)
    is_published = db.Column(db.Boolean, default=True)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationships
    questions = db.relationship('Question', backref='quiz', lazy=True, cascade="all, delete-orphan")
    attempts = db.relationship('ExamAttempt', backref='quiz', lazy=True, cascade="all, delete-orphan")

    def to_dict(self, include_questions=True):
        data = {
            'id': self.id,
            'title': self.title,
            'subject': self.subject,
            'topic': self.topic,
            'difficulty': self.difficulty,
            'duration': self.duration,
            'maxMarks': self.max_marks,
            'description': self.description,
            'isPublished': self.is_published,
            'totalQuestions': len(self.questions) if self.questions else 0,
            'attemptsCount': len(self.attempts) if self.attempts else 0,
            'createdAt': self.created_at.strftime('%Y-%m-%d') if self.created_at else None,
        }
        if include_questions:
            data['questions'] = [q.to_dict() for q in self.questions]
        return data


class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    correct_answer = db.Column(db.String(255), nullable=False)
    explanation = db.Column(db.Text, nullable=True)
    difficulty = db.Column(db.String(30), default='Intermediate')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Relationship to options
    options = db.relationship('AnswerOption', backref='question', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        sorted_options = sorted(self.options, key=lambda x: x.option_order)
        return {
            'id': self.id,
            'quizId': self.quiz_id,
            'questionText': self.question_text,
            'options': [opt.option_text for opt in sorted_options],
            'correctAnswer': self.correct_answer,
            'explanation': self.explanation,
            'difficulty': self.difficulty,
        }


class AnswerOption(db.Model):
    __tablename__ = 'answer_options'

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    option_text = db.Column(db.String(255), nullable=False)
    option_order = db.Column(db.Integer, default=0)


class ExamAttempt(db.Model):
    __tablename__ = 'exam_attempts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quizzes.id'), nullable=False)
    score = db.Column(db.Integer, nullable=False)
    max_marks = db.Column(db.Integer, nullable=False)
    percentage = db.Column(db.Float, nullable=False)
    correct_count = db.Column(db.Integer, nullable=False)
    incorrect_count = db.Column(db.Integer, nullable=False)
    time_spent_secs = db.Column(db.Integer, default=0)
    submitted_at = db.Column(db.DateTime, default=datetime.utcnow)

    student_answers = db.relationship('StudentAnswer', backref='attempt', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'studentName': self.student.name if self.student else 'Anonymous',
            'quizId': self.quiz_id,
            'quizTitle': self.quiz.title if self.quiz else 'Assessment',
            'subject': self.quiz.subject if self.quiz else 'General',
            'score': self.score,
            'maxMarks': self.max_marks,
            'percentage': self.percentage,
            'correctCount': self.correct_count,
            'incorrectCount': self.incorrect_count,
            'timeSpent': f"{self.time_spent_secs // 60}m {self.time_spent_secs % 60}s",
            'submittedAt': self.submitted_at.isoformat() if self.submitted_at else None,
            'answers': [a.to_dict() for a in self.student_answers]
        }


class StudentAnswer(db.Model):
    __tablename__ = 'student_answers'

    id = db.Column(db.Integer, primary_key=True)
    attempt_id = db.Column(db.Integer, db.ForeignKey('exam_attempts.id'), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    selected_answer = db.Column(db.String(255), nullable=True)
    is_correct = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'questionId': self.question_id,
            'selectedAnswer': self.selected_answer,
            'isCorrect': self.is_correct
        }


class AIRecommendation(db.Model):
    __tablename__ = 'ai_recommendations'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    subject = db.Column(db.String(100), nullable=False)
    title = db.Column(db.String(200), nullable=False)
    reason = db.Column(db.Text, nullable=False)
    suggested_action = db.Column(db.Text, nullable=False)
    urgency = db.Column(db.String(20), default='Medium') # Low, Medium, High
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'subject': self.subject,
            'title': self.title,
            'reason': self.reason,
            'suggestedAction': self.suggested_action,
            'urgency': self.urgency,
            'createdAt': self.created_at.strftime('%Y-%m-%d') if self.created_at else None
        }
