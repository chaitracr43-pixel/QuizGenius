from flask import Blueprint, request, jsonify
from services.ai_service import AIService

ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')

@ai_bp.route('/generate-quiz', methods=['POST'])
def generate_quiz():
    data = request.get_json() or {}
    subject = data.get('subject', 'Computer Science')
    topic = data.get('topic', 'Data Structures')
    difficulty = data.get('difficulty', 'Intermediate')
    count = int(data.get('count', 5))

    result = AIService.generate_quiz(
        subject=subject,
        topic=topic,
        difficulty=difficulty,
        count=count
    )
    return jsonify(result), 200


@ai_bp.route('/analyze-performance', methods=['POST'])
def analyze_performance():
    data = request.get_json() or {}
    feedback = AIService.analyze_performance(data)
    return jsonify(feedback), 200


@ai_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json() or {}
    message = data.get('message', '').strip()
    context = data.get('context', '')

    if not message:
        return jsonify({'error': 'Message content cannot be empty.'}), 400

    reply_payload = AIService.chat_study_assistant(message, context)
    return jsonify(reply_payload), 200
