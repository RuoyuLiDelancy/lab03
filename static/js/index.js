import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

let username = null;

window.addEventListener("load", (event) => {
  console.log("Page loaded");
  document
    .querySelector("#login-button")
    .addEventListener("click", set_username);

  username = getCookie("username");
  if (username) {
    connect_session(username);
  } else {
    ask_username();
  }
});

let ask_username = () => {
  console.log("ask user name");
  document.querySelector("#login").style.display = "block";
};

let set_username = () => {
  username = document.querySelector("#login-input").value;
  if (username && username != "") {
    setCookie("username", username, 7);
    connect_session(username);
  }
};

let connect_session = (user_name) => {
  document.querySelector("#username").innerHTML = user_name;
  console.log("Connecting session");
  let socket = io.connect("http://" + document.domain + ":" + location.port, {
    query: { username: user_name },
  });
  socket.on("connect", function () {
    console.log("connected!");
    document.querySelector("#login").style.display = "none";
    socket.emit("get_users", {
      data: "Get users upon user connect",
    });
    let form = $("#message-form").on("submit", function (e) {
      e.preventDefault();
      let user_input = $("#message-input-comments").val();
      socket.emit("post_comments", {
        user_name: user_name,
        message: user_input,
      });
      $("#message-input-comments").val("").focus();
    });
  });

  // New user list delivered from server
  socket.on("update_users", function (msg) {
    console.log("Updated user list: ", msg);
    if (typeof msg.message !== "undefined") {
      $("div.comments-panel").append(
        `
        <div class="comment">
        <div class="comment-user-name">System</div>
        <div class="comment-user-content">${msg.message}</div>
        </div>
        `
      );
      var comments = document.querySelector(".comments-panel");
      comments.scrollTop = comments.scrollHeight;
      let contacts_panel = document.querySelector(".contacts-panel");
      contacts_panel.innerHTML = "";
      console.log(msg.users);
      for (let user of Object.keys(msg.users)) {
        $("div.contacts-panel").append(
          `
            <div class="contact">
            <img
              class="contact-avatar"
              src="http://${document.domain}:${location.port}/static/img/avatar.png"
              alt="avatar"
            />
            <div class="contact-name">${user}</div>
          </div>
            `
        );
      }
    }
  });

  // Get user list upon initial connect
  socket.on("get_users", function (msg) {
    console.log("Received user list: ", msg);
    if (typeof msg.users !== "undefined") {
      let contacts_panel = document.querySelector(".contacts-panel");
      contacts_panel.innerHTML = "";
      console.log(msg.users);
      for (let user of Object.keys(msg.users)) {
        $("div.contacts-panel").append(
          `
                <div class="contact">
                <img
                  class="contact-avatar"
                  src="http://${document.domain}:${location.port}/static/img/avatar.png"
                  alt="avatar"
                />
                <div class="contact-name">${user}</div>
              </div>
                `
        );
      }
    }
  });

  // New comments delivered from server
  socket.on("new_comments", function (msg) {
    console.log("New Comments from others: ", msg);
    if (typeof msg.message !== "undefined") {
      $("div.comments-panel").append(
        `
        <div class="comment">
        <div class="comment-user-name">${msg["user_name"]}</div>
        <div class="comment-user-content">${msg.message}</div>
        </div>
        `
      );
      var comments = document.querySelector(".comments-panel");
      comments.scrollTop = comments.scrollHeight;
    }
  });
};

//-------------
// From https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
let setCookie = (name, value, days) => {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};
let getCookie = (name) => {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
// -----------
