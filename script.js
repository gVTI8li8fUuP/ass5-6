document.addEventListener("DOMContentLoaded", function () {
    const authModal = document.getElementById("authModal");
    const loginModal = document.getElementById("loginModal");
    const adminPanel = document.getElementById("adminPanel");
    const mainContent = document.getElementById("mainContent");
    const registrationForm = document.getElementById("registrationForm");
    const loginForm = document.getElementById("loginForm");
    const logoutButton = document.getElementById("logoutButton");
    const loginButton = document.getElementById("authButton");
    const signUpButton = document.querySelector("button[type='submit']");
    const loginSubmitButton = document.querySelector("#loginForm button[type='submit']");


    const users = [];
    function applyModalStyles(modal) {
        Object.assign(modal.style, {
            display: "none",
            position: "fixed",
            zIndex: "1000",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
        });
    }

    function applyModalContentStyles(modalContent) {
        Object.assign(modalContent.style, {
            backgroundColor: "#f9f9f9",
            margin: "10% auto",
            padding: "40px",
            borderRadius: "10px",
            width: "40%",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        });
    }
    function applyButtonStyles(button, bgColor, textColor, hoverColor) {
        Object.assign(button.style, {
            backgroundColor: bgColor,
            color: textColor,
            fontSize: "1rem",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
        });

        button.addEventListener("mouseover", () => {
            button.style.backgroundColor = hoverColor;
        });

        button.addEventListener("mouseout", () => {
            button.style.backgroundColor = bgColor;
        });
    }




    applyModalStyles(authModal);
    applyModalStyles(loginModal);
    applyModalStyles(adminPanel);
    applyModalContentStyles(authModal.querySelector(".modal-content"));
    applyModalContentStyles(loginModal.querySelector(".modal-content"));
    applyModalContentStyles(adminPanel.querySelector(".modal-content"));


    applyButtonStyles(logoutButton, "lavenderblush", "#ff4757", "white");
    applyButtonStyles(signUpButton, "#6b2c24", "white", "#8b3b30"); // Кнопка Sign Up
    applyButtonStyles(loginSubmitButton, "#6b2c24", "white", "#8b3b30"); // Кнопка Log In
    applyButtonStyles(loginButton,"#6b2c24", "white", "#8b3b30")

    if (localStorage.getItem("isLoggedIn") === "true") {
        showMainContent();
    } else {
        authModal.style.display = "block";
    }


    loginButton.addEventListener("click", function () {
        authModal.style.display = "none";
        loginModal.style.display = "block";

    });


    document.querySelectorAll(".close-button").forEach(button => {
        button.addEventListener("click", function () {
            authModal.style.display = "none";
            loginModal.style.display = "none";
            adminPanel.style.display = "none";
        });
    });


    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;


        users.push({ username, firstName, lastName, email, password });

        alert("Registration successful!");
        authModal.style.display = "none";
        showMainContent();
    });


    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const loginEmail = document.getElementById("loginEmail").value;
        const loginPassword = document.getElementById("loginPassword").value;


        if (loginEmail === "araily.mukazhanova2904@gmail.com" && loginPassword === "araily.m111!") {
            localStorage.setItem("isLoggedIn", "true");
            alert("Admin login successful!");
            loginModal.style.display = "none";
            showAdminPanel();
        } else {
            const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
            if (user) {
                localStorage.setItem("isLoggedIn", "true");
                alert("Login successful!");
                loginModal.style.display = "none";
                showMainContent();
            } else {
                alert("Invalid email or password.");
            }
        }
    });

    function showMainContent() {
        mainContent.style.display = "block";
        authModal.style.display = "none";
        loginModal.style.display = "none";
        adminPanel.style.display = "none";



    }

    function showAdminPanel() {
        adminPanel.style.display = "block";
        loadUsers();
    }


    function loadUsers() {
        const userList = document.getElementById("user-list");
        userList.innerHTML = ''; // Очистить список
        users.forEach((user) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>
                    <button onclick="editUser('${user.email}')">Edit</button>
                    <button onclick="deleteUser('${user.email}')">Delete</button>
                </td>
            `;
            userList.appendChild(row);
        });
    }


    window.editUser = function(email) {
        const user = users.find(u => u.email === email);
        const newUsername = prompt("Edit Username:", user.username);
        const newFirstName = prompt("Edit First Name:", user.firstName);
        const newLastName = prompt("Edit Last Name:", user.lastName);
        const newEmail = prompt("Edit Email:", user.email);

        if (newUsername && newFirstName && newLastName && newEmail) {
            user.username = newUsername;
            user.firstName = newFirstName;
            user.lastName = newLastName;
            user.email = newEmail;
            loadUsers();
            alert("User updated successfully.");
        }
    }


    window.deleteUser = function(email) {
        if (confirm("Are you sure you want to delete this user?")) {
            const index = users.findIndex(u => u.email === email);
            if (index !== -1) {
                users.splice(index, 1);
                loadUsers();
                alert("User deleted successfully.");
            }
        }
    }

    logoutButton.addEventListener("click", function () {
        localStorage.setItem("isLoggedIn", "false");
        mainContent.style.display = "none";
        authModal.style.display = "block";
        adminPanel.style.display = "none";
    });


});