from flask import Flask, json, render_template

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
    with open('experience_data.json', 'r') as f:
        experiences_data = json.load(f)
    return render_template('experience.html', experiences=experiences_data)

@app.route('/gallery')
def gallery():
    with open('gallery_data.json', 'r') as f:
        data = json.load(f)

    return render_template('gallery.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)