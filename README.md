# Rapid Chat Room

https://rapid-chat-room.herokuapp.com/

<img width="940" alt="overview" src="https://user-images.githubusercontent.com/98135779/161279223-dbcc6078-6345-498e-af82-c85582a3598f.png">


## Overview

[Live Heroku Demo Site](https://rapid-chat-room.herokuapp.com/)

The purpose of this project is to provide a fast and efficient dynamic news discussion platform where users have a limited amount of time to exchange their thoughts on current topics. The project aims to encourage efficient exchange of information in a limited amount of time, as opposed to allowing users to select their own news within an unlimited time and scope. In a live chat room, the topic of the chat will automatically switch over time. The topic title, image, and source will be displayed on the chat page.

## Function

- Multi-user live chat
- Customizable user nicknames
- Real-time broadcasting of user list and user access status

## Technical details
- Using Flask for backend development
- Using Flask-SocketIO for bi-directional communications
- Using dictionary to record and manage user status and information (username, sesssion IDs)
- Checking user login status by checking browser cookies



## Function Detail

### Live multi-user chat
<img width="940" alt="overview" src="https://user-images.githubusercontent.com/98135779/161279324-44a9a00c-06f7-4d2a-bcf8-bac6a8708f93.png">

### User login states

Checks user login states by verifying cookie value

<img width="976" alt="username" src="https://user-images.githubusercontent.com/98135779/161279346-d8a5936b-9ad9-4b6f-85e4-4720c3b977d0.png">

### Broadcasting user login/logout status

<img width="632" alt="broadcast" src="https://user-images.githubusercontent.com/98135779/161279357-88558b19-1a63-46c2-80d2-1dd4061a63e9.png">

