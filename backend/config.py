import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'quizgenius-super-secret-key-2026-production')
    
    # SQLite default, seamlessly switches to PostgreSQL when DATABASE_URL is set
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL') or \
        'sqlite:///' + os.path.join(BASE_DIR, 'database', 'quizgenius.db')
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # AI API Configuration
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY') or os.getenv('AI_API_KEY') or ''
    AI_DEMO_MODE = not bool(GEMINI_API_KEY)

    # Exam parameters
    MAX_EXAM_DURATION_MINS = 180
    DEFAULT_EXAM_DURATION_MINS = 25
