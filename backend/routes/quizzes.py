from flask import Blueprint, request, jsonify
from database import db
from models import Quiz, Question, AnswerOption, User

quizzes_bp = Blueprint('quizzes', __name__, url_prefix='/api')

@quizzes_bp.route('/quizzes', methods=['GET'])
def list_quizzes():
    # Return published quizzes for students
    quizzes = Quiz.query.filter_by(is_published=True).order_by(Quiz.id.desc()).all()
    return jsonify([q.to_dict(include_questions=True) for q in quizzes]), 200


@quizzes_bp.route('/quizzes/<int:quiz_id>', methods=['GET'])
def get_quiz(quiz_id):
    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({'error': 'Quiz not found'}), 404
    return jsonify(quiz.to_dict(include_questions=True)), 200


# Admin Quiz Management Routes
@quizzes_bp.route('/admin/quizzes', methods=['GET'])
def admin_list_quizzes():
    # Returns all quizzes (including drafts)
    quizzes = Quiz.query.order_by(Quiz.id.desc()).all()
    return jsonify([q.to_dict(include_questions=True) for q in quizzes]), 200


@quizzes_bp.route('/admin/quizzes', methods=['POST'])
def create_quiz():
    data = request.get_json() or {}
    title = data.get('title')
    subject = data.get('subject')
    topic = data.get('topic')

    if not title or not subject or not topic:
        return jsonify({'error': 'Title, subject, and topic are required fields.'}), 400

    new_quiz = Quiz(
        title=title,
        subject=subject,
        topic=topic,
        difficulty=data.get('difficulty', 'Intermediate'),
        duration=int(data.get('duration', 25)),
        max_marks=int(data.get('maxMarks', 50)),
        description=data.get('description', ''),
        is_published=data.get('isPublished', True),
    )
    db.session.add(new_quiz)
    db.session.flush() # Populate new_quiz.id

    # Add questions & options
    raw_questions = data.get('questions', [])
    for q_data in raw_questions:
        q_text = q_data.get('questionText', '').strip()
        correct_ans = q_data.get('correctAnswer', '').strip()
        if not q_text or not correct_ans:
            continue

        question = Question(
            quiz_id=new_quiz.id,
            question_text=q_text,
            correct_answer=correct_ans,
            explanation=q_data.get('explanation', ''),
            difficulty=q_data.get('difficulty', new_quiz.difficulty)
        )
        db.session.add(question)
        db.session.flush()

        options = q_data.get('options', [])
        for order, opt_text in enumerate(options):
            if opt_text:
                option_record = AnswerOption(
                    question_id=question.id,
                    option_text=opt_text.strip(),
                    option_order=order
                )
                db.session.add(option_record)

    db.session.commit()
    return jsonify({
        'message': 'Quiz created successfully.',
        'quiz': new_quiz.to_dict()
    }), 201


@quizzes_bp.route('/admin/quizzes/<int:quiz_id>', methods=['PUT'])
def update_quiz(quiz_id):
    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({'error': 'Quiz not found'}), 404

    data = request.get_json() or {}
    quiz.title = data.get('title', quiz.title)
    quiz.subject = data.get('subject', quiz.subject)
    quiz.topic = data.get('topic', quiz.topic)
    quiz.difficulty = data.get('difficulty', quiz.difficulty)
    quiz.duration = int(data.get('duration', quiz.duration))
    quiz.max_marks = int(data.get('maxMarks', quiz.max_marks))
    quiz.description = data.get('description', quiz.description)
    quiz.is_published = data.get('isPublished', quiz.is_published)

    # If questions list passed, update questions
    raw_questions = data.get('questions')
    if raw_questions is not None:
        # Delete existing questions and re-insert
        Question.query.filter_by(quiz_id=quiz.id).delete()
        for q_data in raw_questions:
            q_text = q_data.get('questionText', '').strip()
            correct_ans = q_data.get('correctAnswer', '').strip()
            if not q_text or not correct_ans:
                continue

            question = Question(
                quiz_id=quiz.id,
                question_text=q_text,
                correct_answer=correct_ans,
                explanation=q_data.get('explanation', ''),
                difficulty=q_data.get('difficulty', quiz.difficulty)
            )
            db.session.add(question)
            db.session.flush()

            for order, opt_text in enumerate(q_data.get('options', [])):
                if opt_text:
                    db.session.add(AnswerOption(
                        question_id=question.id,
                        option_text=opt_text.strip(),
                        option_order=order
                    ))

    db.session.commit()
    return jsonify({'message': 'Quiz updated successfully.', 'quiz': quiz.to_dict()}), 200


@quizzes_bp.route('/admin/quizzes/<int:quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id):
    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({'error': 'Quiz not found'}), 404

    db.session.delete(quiz)
    db.session.commit()
    return jsonify({'message': 'Quiz deleted successfully.'}), 200


@quizzes_bp.route('/admin/quizzes/<int:quiz_id>/toggle-publish', methods=['POST'])
def toggle_publish(quiz_id):
    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({'error': 'Quiz not found'}), 404

    quiz.is_published = not quiz.is_published
    db.session.commit()
    return jsonify({'message': 'Publish state updated.', 'isPublished': quiz.is_published}), 200
