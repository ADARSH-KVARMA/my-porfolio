from flask import Flask, render_template
from getInfo import get_experience_data

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html', title="Home")

@app.route('/contact')
def contact():
    return render_template('contact.html', title="contact")

@app.route('/about')
def about():
    return render_template('about.html', title="About")

#rout for project
@app.route('/projects')
def project():
    return render_template('projects.html', title="Project")

@app.route('/experience')
def experience():

    experiences_data = get_experience_data()

    return render_template('experience.html', experiences=experiences_data)



if __name__ == '__main__':
    app.run(debug=True)