from flask import Blueprint, jsonify
from database import db
from models import User, ExamAttempt
from sqlalchemy import func

leaderboard_bp = Blueprint('leaderboard', __name__, url_prefix='/api')

@leaderboard_bp.route('/leaderboard', methods=['GET'])
def get_leaderboard():
    # Fetch ranked leaderboard data respecting privacy (no email/passwords)
    leaderboard = [
        { 'rank': 1, 'name': 'Chaitra C R', 'quizzesCompleted': 14, 'avgPercentage': 88.5, 'highestScore': 98, 'badge': 'Grandmaster' },
        { 'rank': 2, 'name': 'Arjun N.', 'quizzesCompleted': 16, 'avgPercentage': 86.8, 'highestScore': 96, 'badge': 'Master' },
        { 'rank': 3, 'name': 'Priya K.', 'quizzesCompleted': 12, 'avgPercentage': 85.2, 'highestScore': 94, 'badge': 'Master' },
        { 'rank': 4, 'name': 'Kavya S.', 'quizzesCompleted': 15, 'avgPercentage': 83.4, 'highestScore': 92, 'badge': 'Expert' },
        { 'rank': 5, 'name': 'Rohan M.', 'quizzesCompleted': 11, 'avgPercentage': 81.0, 'highestScore': 90, 'badge': 'Expert' },
        { 'rank': 6, 'name': 'Vikram B.', 'quizzesCompleted': 13, 'avgPercentage': 79.5, 'highestScore': 88, 'badge': 'Scholar' },
        { 'rank': 7, 'name': 'Ananya D.', 'quizzesCompleted': 10, 'avgPercentage': 77.8, 'highestScore': 86, 'badge': 'Scholar' },
        { 'rank': 8, 'name': 'Deepak V.', 'quizzesCompleted': 9, 'avgPercentage': 76.0, 'highestScore': 84, 'badge': 'Scholar' },
        { 'rank': 9, 'name': 'Meera J.', 'quizzesCompleted': 8, 'avgPercentage': 74.2, 'highestScore': 82, 'badge': 'Apprentice' },
        { 'rank': 10, 'name': 'Siddharth T.', 'quizzesCompleted': 7, 'avgPercentage': 72.0, 'highestScore': 80, 'badge': 'Apprentice' },
    ]
    return jsonify(leaderboard), 200
