from flask import Flask, render_template, request
from flask_socketio import SocketIO

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SECRET_KEY'] = 'chatappaaaaz6666#'
socketio = SocketIO(app, cors_allowed_origins='*')

clients = {}
users = {}

@app.route('/')
def sessions():
    return render_template('index.html')

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    socketio.emit('my response', json, callback=messageReceived)

@socketio.on('comments')
def handle_comments(json, methods=['GET', 'POST']):
    print('New comments: ' + str(json))
    socketio.emit('new_comments', json, callback=messageReceived)

@socketio.on('connect', namespace='/')
def connect():
    username = request.args.get("username")
    print(f"Session connected {request.sid}, username is {username}")
    clients[request.sid] = username
    if username in users:
        users[username] = users[username] + 1 
    else:
        users[username] = 1 
        socketio.emit('user_joinned', users, broadcast=True, include_self=False)

@socketio.on('disconnect', namespace='/')
def disconnect():
    username = clients[request.sid]
    print(f"Session disconnected {request.sid}, user {username}")
    clients.pop(request.sid)
    users[username] = users[username] - 1
    if users[username] == 0:
        users.pop(username)
        socketio.emit('user_left', users, broadcast=True, include_self=False)
    

if __name__ == "__main__":
    socketio.run(app, debug=True)
