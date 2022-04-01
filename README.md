# Rapid Chat Room

## Overview

The purpose of this project is to provide a fast and efficient dynamic news discussion platform where users have a limited amount of time to exchange their thoughts on current topics. The project aims to encourage efficient exchange of information in a limited amount of time, as opposed to allowing users to select their own news within an unlimited time and scope. In a live chat room, the topic of the chat will automatically switch over time. The topic title, image, and source will be displayed on the chat page.

## Function

- Multi-user live chat
- Customizable user nicknames
- Real-time broadcasting of user list and user access status

## Technical details
- Using Flask for backend development
- Using Flask-SocketIO for bi-directional communications
- Using dictionary to record and manage user status and information
- Checking user login status by checking browser cookies



## Function Detail

### Live multi-user chat



### User login states

Checks user login states by verifying cookie value

### Broadcasting user login/logout status

