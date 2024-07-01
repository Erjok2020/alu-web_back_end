
#!/usr/bin/env python3
"""A Basic Flask app with internationalization support.
"""

from flask import Flask, request, render_template
from flask_babel import Babel

app = Flask(__name__)

# Configure Babel
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'

babel = Babel(app)

@babel.localeselector
def get_locale():
    # Check for the 'locale' argument in the URL
    locale = request.args.get('locale')
    # Check if the locale is supported
    if locale in ['en', 'fr']:
        return locale
    # Resort to the previous default behavior
    return request.accept_languages.best_match(['en', 'fr'])

@app.route('/')
def index():
    return render_template('4-index.html')

if __name__ == '__main__':
    app.run()
