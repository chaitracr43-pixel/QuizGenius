from flask import Blueprint, request, jsonify
from datetime import datetime
from database import db
from models import ExamAttempt, StudentAnswer, Quiz, Question, User

exams_bp = Blueprint('exams', __name__, url_prefix='/api/exams')

@exams_bp.route('/submit', methods=['POST'])
def submit_exam():
    data = request.get_json() or {}
    quiz_id = data.get('quizId')
    user_answers = data.get('userAnswers', {})
    time_spent = data.get('timeTakenSecs', 0)
    user_id = data.get('userId', 1) # Default to active student user

    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        # Fallback if submitted against in-memory quiz
        return jsonify({
            'message': 'Exam submitted and processed.',
            'status': 'recorded'
        }), 200

    questions = quiz.questions
    total_q = len(questions) or 1
    correct_count = 0

    attempt = ExamAttempt(
        user_id=user_id,
        quiz_id=quiz.id,
        score=0,
        max_marks=quiz.max_marks,
        percentage=0.0,
        correct_count=0,
        incorrect_count=0,
        time_spent_secs=time_spent,
        submitted_at=datetime.utcnow()
    )
    db.session.add(attempt)
    db.session.flush()

    for q in questions:
        selected = user_answers.get(str(q.id)) or user_answers.get(q.id)
        is_corr = (selected == q.correct_answer)
        if is_corr:
            correct_count += 1

        db.session.add(StudentAnswer(
            attempt_id=attempt.id,
            question_id=q.id,
            selected_answer=selected,
            is_correct=is_corr
        ))

    marks_per_q = quiz.max_marks / total_q
    final_score = round(correct_count * marks_per_q)
    percentage = round((correct_count / total_q) * 100, 1)

    attempt.score = final_score
    attempt.correct_count = correct_count
    attempt.incorrect_count = total_q - correct_count
    attempt.percentage = percentage

    db.session.commit()

    return jsonify({
        'message': 'Examination evaluated successfully.',
        'attemptId': attempt.id,
        'score': final_score,
        'maxMarks': quiz.max_marks,
        'percentage': percentage,
        'correctCount': correct_count,
        'incorrectCount': attempt.incorrect_count,
        'timeSpentSecs': time_spent
    }), 201


@exams_bp.route('/history/<int:user_id>', methods=['GET'])
def get_user_history(user_id):
    attempts = ExamAttempt.query.filter_by(user_id=user_id).order_by(ExamAttempt.submitted_at.desc()).all()
    return jsonify([a.to_dict() for a in attempts]), 200
