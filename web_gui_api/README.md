# Django Web API for GUI

Models:

- Product: id, title, description, price, image_url, category
- Category: id, title

Quick start

1. Create a virtualenv and install requirements

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Run migrations and start server

```bash
python manage.py migrate
python manage.py runserver
```

