import os
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from database import init_db

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Enable CORS for frontend Vite development server & production
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Ensure database directory exists
    db_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'database')
    os.makedirs(db_dir, exist_ok=True)

    # Initialize SQLAlchemy database
    init_db(app)

    # Register Blueprints
    from routes.auth import auth_bp
    from routes.quizzes import quizzes_bp
    from routes.exams import exams_bp
    from routes.ai import ai_bp
    from routes.analytics import analytics_bp
    from routes.leaderboard import leaderboard_bp
    from routes.users import users_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(quizzes_bp)
    app.register_blueprint(exams_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(leaderboard_bp)
    app.register_blueprint(users_bp)

    @app.route('/')
    def root():
        return jsonify({
            'name': 'QuizGenius REST API',
            'version': '1.0.0',
            'author': 'Chaitra C R',
            'status': 'healthy',
            'database': 'SQLite/PostgreSQL Ready',
            'ai_configured': bool(Config.GEMINI_API_KEY)
        })

    @app.route('/api/health')
    def health_check():
        return jsonify({'status': 'ok', 'timestamp': os.getenv('CURRENT_TIME', '2026-11-14')}), 200

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    print(f"Starting QuizGenius Backend Server on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
