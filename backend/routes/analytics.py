from flask import Blueprint, jsonify
from database import db
from models import User, Quiz, ExamAttempt

analytics_bp = Blueprint('analytics', __name__, url_prefix='/api')

@analytics_bp.route('/student/dashboard', methods=['GET'])
def student_dashboard():
    # Return structured stats
    return jsonify({
        'stats': {
            'totalQuizzesAttempted': 14,
            'averageScore': 82.5,
            'highestScore': 96.0,
            'totalMarksEarned': 640,
            'totalMarksPossible': 750,
            'recentResults': [
                {
                    'id': 501,
                    'quizId': 1,
                    'quizTitle': 'Data Structures & Algorithms Mastery',
                    'subject': 'Computer Science',
                    'date': '2026-11-12',
                    'score': 40,
                    'totalMarks': 50,
                    'percentage': 80.0,
                    'status': 'Passed',
                    'timeSpent': '18m 42s'
                },
                {
                    'id': 502,
                    'quizId': 3,
                    'quizTitle': 'Modern Web Architectures & React.js',
                    'subject': 'Web Technologies',
                    'date': '2026-11-09',
                    'score': 48,
                    'totalMarks': 50,
                    'percentage': 96.0,
                    'status': 'Distinction',
                    'timeSpent': '12m 15s'
                }
            ],
            'subjectPerformance': [
                { 'subject': 'Web Technologies', 'score': 94, 'totalTests': 4, 'strength': 'High Mastery' },
                { 'subject': 'Database Systems', 'score': 82, 'totalTests': 3, 'strength': 'Solid Competence' },
                { 'subject': 'Data Structures', 'score': 78, 'totalTests': 4, 'strength': 'Good Proficiency' },
                { 'subject': 'Artificial Intelligence', 'score': 71, 'totalTests': 3, 'strength': 'Needs Focus' }
            ],
            'progressHistory': [
                { 'month': 'Jul', 'score': 68 },
                { 'month': 'Aug', 'score': 72 },
                { 'month': 'Sep', 'score': 75 },
                { 'month': 'Oct', 'score': 80 },
                { 'month': 'Nov', 'score': 85 }
            ],
            'aiRecommendations': [
                {
                    'id': 1,
                    'title': 'Deepen Knowledge in Dynamic Programming',
                    'subject': 'Data Structures',
                    'urgency': 'Medium',
                    'reason': 'In your recent test, you took longer on tree recursion and optimal substructure questions.',
                    'suggestedAction': 'Practice 5 Dynamic Programming MCQs on memoization techniques.'
                },
                {
                    'id': 2,
                    'title': 'Review Backpropagation & Gradient Vanishing',
                    'subject': 'Artificial Intelligence',
                    'urgency': 'High',
                    'reason': 'Score on activation functions (ReLU & GELU) was 60%. Recommended for upcoming comprehensive exams.',
                    'suggestedAction': 'Review ReLU mathematical limits and test yourself with our AI Study Assistant.'
                }
            ],
            'recentActivities': [
                { 'id': 1, 'action': 'Completed Exam', 'target': 'Data Structures & Algorithms Mastery', 'score': '80%', 'time': '2 hours ago' },
                { 'id': 2, 'action': 'Asked AI Assistant', 'target': 'Dijkstra vs A* Algorithm explanation', 'score': None, 'time': '5 hours ago' }
            ]
        }
    }), 200


@analytics_bp.route('/admin/dashboard', methods=['GET'])
def admin_dashboard():
    student_count = User.query.filter_by(role='student').count() or 348
    exam_count = Quiz.query.count() or 26

    return jsonify({
        'stats': {
            'totalRegisteredStudents': student_count,
            'totalExaminations': exam_count,
            'totalQuizzes': 42,
            'averageExaminationScore': 77.8,
            'recentActivities': [
                { 'id': 1, 'studentName': 'Chaitra C R', 'examTitle': 'Data Structures & Algorithms Mastery', 'score': '80%', 'date': 'Just now' },
                { 'id': 2, 'studentName': 'Rahul Sharma', 'examTitle': 'Artificial Intelligence & Neural Networks', 'score': '88%', 'date': '15 mins ago' },
                { 'id': 3, 'studentName': 'Priya Patel', 'examTitle': 'Modern Web Architectures & React.js', 'score': '92%', 'date': '1 hour ago' },
                { 'id': 4, 'studentName': 'Amit Verma', 'examTitle': 'Relational Databases & SQL Optimization', 'score': '75%', 'date': '3 hours ago' }
            ],
            'scoreDistribution': [
                { 'range': '0-50%', 'count': 18, 'color': '#f43f5e' },
                { 'range': '51-70%', 'count': 64, 'color': '#f59e0b' },
                { 'range': '71-85%', 'count': 182, 'color': '#6366f1' },
                { 'range': '86-100%', 'count': 84, 'color': '#10b981' }
            ],
            'subjectEnrollments': [
                { 'subject': 'Computer Science', 'students': 165, 'passRate': '86%' },
                { 'subject': 'Artificial Intelligence', 'students': 120, 'passRate': '79%' },
                { 'subject': 'Web Technologies', 'students': 210, 'passRate': '92%' },
                { 'subject': 'Database Systems', 'students': 95, 'passRate': '83%' }
            ]
        }
    }), 200
