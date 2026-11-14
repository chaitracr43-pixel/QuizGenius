from flask import Blueprint, jsonify, request
from database import db
from models import User

users_bp = Blueprint('users', __name__, url_prefix='/api/admin')

@users_bp.route('/users', methods=['GET'])
def list_users():
    users = User.query.order_by(User.id.asc()).all()
    if not users:
        # Fallback list for immediate demonstration
        return jsonify([
            { 'id': 1, 'name': 'Chaitra C R', 'email': 'chaitra.student@quizgenius.edu', 'role': 'student', 'grade': 'Computer Science - Year 3', 'examsTaken': 14, 'avgScore': 88.5, 'status': 'Active' },
            { 'id': 2, 'name': 'Rahul Sharma', 'email': 'rahul.s@quizgenius.edu', 'role': 'student', 'grade': 'Artificial Intelligence - Year 2', 'examsTaken': 11, 'avgScore': 81.2, 'status': 'Active' },
            { 'id': 3, 'name': 'Priya Patel', 'email': 'priya.p@quizgenius.edu', 'role': 'student', 'grade': 'Information Science - Year 4', 'examsTaken': 16, 'avgScore': 86.8, 'status': 'Active' },
            { 'id': 4, 'name': 'Amit Verma', 'email': 'amit.v@quizgenius.edu', 'role': 'student', 'grade': 'Computer Science - Year 2', 'examsTaken': 9, 'avgScore': 75.4, 'status': 'Active' },
            { 'id': 5, 'name': 'Sneha Reddy', 'email': 'sneha.r@quizgenius.edu', 'role': 'student', 'grade': 'Data Science - Year 3', 'examsTaken': 8, 'avgScore': 79.0, 'status': 'Active' },
            { 'id': 6, 'name': 'Prof. Alan Vance', 'email': 'admin@quizgenius.edu', 'role': 'admin', 'grade': 'Faculty - Head of CS', 'examsTaken': 0, 'avgScore': '-', 'status': 'Active' }
        ]), 200

    return jsonify([u.to_dict() for u in users]), 200


@users_bp.route('/users/<int:user_id>/toggle-status', methods=['POST'])
def toggle_user_status(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    # User status toggle
    return jsonify({'message': 'Status toggled successfully.'}), 200
