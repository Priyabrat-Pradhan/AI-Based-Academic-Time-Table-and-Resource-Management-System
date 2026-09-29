// ==========================================
// AI SMARTTIME - AUTHENTICATION SYSTEM
// ==========================================


// ==========================================
// RUN AFTER PAGE LOAD
// ==========================================

document.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // LOGIN SYSTEM
    // ==========================================

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                // Stop normal form submission
                event.preventDefault();


                // ==========================================
                // GET LOGIN VALUES
                // ==========================================

                const role =
                    document.getElementById("role").value;


                const email =
                    document
                        .getElementById("email")
                        .value
                        .trim()
                        .toLowerCase();


                const password =
                    document
                        .getElementById("password")
                        .value;


                // ==========================================
                // VALIDATION
                // ==========================================

                if (role === "") {

                    alert(
                        "Please select your role."
                    );

                    return;
                }


                if (email === "") {

                    alert(
                        "Please enter your email."
                    );

                    return;
                }


                if (password === "") {

                    alert(
                        "Please enter your password."
                    );

                    return;
                }


                // ==========================================
                // GET REGISTERED USERS
                // ==========================================

                let users = [];

                try {

                    const savedUsers =
                        localStorage.getItem(
                            "smartTimeUsers"
                        );


                    if (savedUsers) {

                        users =
                            JSON.parse(savedUsers);

                    }

                } catch (error) {

                    console.error(
                        "Error reading users:",
                        error
                    );

                    users = [];

                }


                // ==========================================
                // FIND USER
                // ==========================================

                const user =
                    users.find(function (account) {

                        if (!account) {
                            return false;
                        }


                        const accountEmail =
                            account.email
                                ? account.email
                                    .trim()
                                    .toLowerCase()
                                : "";


                        return (
                            accountEmail === email &&
                            account.password === password &&
                            account.role === role
                        );

                    });


                // ==========================================
                // INVALID LOGIN
                // ==========================================

                if (!user) {

                    alert(
                        "Invalid Login Details!\n\n" +
                        "Please check:\n" +
                        "• Email\n" +
                        "• Password\n" +
                        "• Selected Role\n\n" +
                        "If you have not registered yet, please register first."
                    );

                    return;
                }


                // ==========================================
                // LOGIN SUCCESS
                // ==========================================

                localStorage.setItem(
                    "loggedIn",
                    "true"
                );


                localStorage.setItem(
                    "userRole",
                    user.role
                );


                localStorage.setItem(
                    "userEmail",
                    user.email
                );


                localStorage.setItem(
                    "userName",
                    user.name
                );


                // ==========================================
                // FACULTY LOGIN
                // ==========================================

                if (user.role === "faculty") {

                    localStorage.setItem(
                        "facultyName",
                        user.name
                    );


                    // IMPORTANT:
                    // Open Faculty Dashboard

                    window.location.replace(
                        "./faculty-dashboard.html"
                    );


                    return;
                }


                // ==========================================
                // STUDENT LOGIN
                // ==========================================

                if (user.role === "student") {

                    window.location.replace(
                        "./student-dashboard.html"
                    );


                    return;
                }


                // ==========================================
                // ADMIN LOGIN
                // ==========================================

                if (user.role === "admin") {

                    window.location.replace(
                        "./admin-dashboard.html"
                    );


                    return;
                }

            }
        );

    }



    // ==========================================
    // LOGIN PASSWORD SHOW / HIDE
    // ==========================================

    const toggleLoginPassword =
        document.getElementById(
            "togglePassword"
        );


    if (toggleLoginPassword) {

        toggleLoginPassword.addEventListener(
            "click",
            function () {

                const password =
                    document.getElementById(
                        "password"
                    );


                if (!password) {
                    return;
                }


                if (
                    password.type ===
                    "password"
                ) {

                    password.type =
                        "text";

                    this.textContent =
                        "🙈";

                }

                else {

                    password.type =
                        "password";

                    this.textContent =
                        "👁";

                }

            }
        );

    }



    // ==========================================
    // REGISTER SYSTEM
    // ==========================================

    const registerForm =
        document.getElementById(
            "registerForm"
        );


    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                // ==========================================
                // GET REGISTER VALUES
                // ==========================================

                const name =
                    document
                        .getElementById(
                            "registerName"
                        )
                        .value
                        .trim();


                const role =
                    document
                        .getElementById(
                            "registerRole"
                        )
                        .value;


                const email =
                    document
                        .getElementById(
                            "registerEmail"
                        )
                        .value
                        .trim()
                        .toLowerCase();


                const phone =
                    document
                        .getElementById(
                            "registerPhone"
                        )
                        .value
                        .trim();


                const password =
                    document
                        .getElementById(
                            "registerPassword"
                        )
                        .value;


                const confirmPassword =
                    document
                        .getElementById(
                            "confirmPassword"
                        )
                        .value;


                const terms =
                    document
                        .getElementById(
                            "terms"
                        )
                        .checked;


                const message =
                    document.getElementById(
                        "registerMessage"
                    );



                // ==========================================
                // NAME VALIDATION
                // ==========================================

                if (name === "") {

                    showMessage(
                        message,
                        "Please enter your full name.",
                        "error"
                    );

                    return;
                }



                // ==========================================
                // ROLE VALIDATION
                // ==========================================

                if (role === "") {

                    showMessage(
                        message,
                        "Please select your role.",
                        "error"
                    );

                    return;
                }



                // ==========================================
                // EMAIL VALIDATION
                // ==========================================

                if (email === "") {

                    showMessage(
                        message,
                        "Please enter your email.",
                        "error"
                    );

                    return;
                }



                // ==========================================
                // PHONE VALIDATION
                // ==========================================

                if (
                    !/^[0-9]{10}$/.test(phone)
                ) {

                    showMessage(
                        message,
                        "Please enter a valid 10-digit phone number.",
                        "error"
                    );

                    return;
                }



                // ==========================================
                // USER ID
                // ==========================================

                let userId = "";



                // STUDENT ID
                if (role === "student") {

                    const studentId =
                        document.getElementById(
                            "studentId"
                        );


                    if (
                        !studentId ||
                        studentId.value
                            .trim() === ""
                    ) {

                        showMessage(
                            message,
                            "Please enter your Student ID.",
                            "error"
                        );

                        return;
                    }


                    userId =
                        studentId.value.trim();

                }



                // FACULTY ID
                if (role === "faculty") {

                    const facultyId =
                        document.getElementById(
                            "facultyId"
                        );


                    if (
                        !facultyId ||
                        facultyId.value
                            .trim() === ""
                    ) {

                        showMessage(
                            message,
                            "Please enter your Faculty ID.",
                            "error"
                        );

                        return;
                    }


                    userId =
                        facultyId.value.trim();

                }



                // ==========================================
                // PASSWORD VALIDATION
                // ==========================================

                if (password.length < 8) {

                    showMessage(
                        message,
                        "Password must contain at least 8 characters.",
                        "error"
                    );

                    return;
                }



                // ==========================================
                // CONFIRM PASSWORD
                // ==========================================

                if (
                    password !==
                    confirmPassword
                ) {

                    showMessage(
                        message,
                        "Passwords do not match.",
                        "error"
                    );

                    return;
                }



                // ==========================================
                // TERMS
                // ==========================================

                if (!terms) {

                    showMessage(
                        message,
                        "Please agree to the terms and conditions.",
                        "error"
                    );

                    return;
                }



                // ==========================================
                // GET EXISTING USERS
                // ==========================================

                let users = [];

                try {

                    const savedUsers =
                        localStorage.getItem(
                            "smartTimeUsers"
                        );


                    if (savedUsers) {

                        users =
                            JSON.parse(
                                savedUsers
                            );

                    }

                } catch (error) {

                    console.error(
                        "Error reading users:",
                        error
                    );

                    users = [];

                }



                // ==========================================
                // CHECK EXISTING EMAIL
                // ==========================================

                const existingUser =
                    users.find(
                        function (account) {

                            if (
                                !account ||
                                !account.email
                            ) {

                                return false;
                            }


                            return (
                                account.email
                                    .trim()
                                    .toLowerCase() ===
                                email
                            );

                        }
                    );


                if (existingUser) {

                    showMessage(
                        message,
                        "This email is already registered.",
                        "error"
                    );

                    return;
                }



                // ==========================================
                // CREATE NEW USER
                // ==========================================

                const newUser = {

                    name: name,

                    role: role,

                    email: email,

                    phone: phone,

                    userId: userId,

                    password: password

                };



                // ==========================================
                // SAVE USER
                // ==========================================

                users.push(newUser);


                localStorage.setItem(
                    "smartTimeUsers",
                    JSON.stringify(users)
                );



                // ==========================================
                // SAVE FACULTY NAME
                // ==========================================

                if (role === "faculty") {

                    localStorage.setItem(
                        "facultyName",
                        name
                    );

                }



                // ==========================================
                // SUCCESS MESSAGE
                // ==========================================

                showMessage(
                    message,
                    "Account created successfully! Redirecting to login...",
                    "success"
                );



                // ==========================================
                // GO TO LOGIN
                // ==========================================

                setTimeout(
                    function () {

                        window.location.href =
                            "login.html";

                    },
                    1500
                );

            }
        );

    }



    // ==========================================
    // REGISTER ROLE CHANGE
    // ==========================================

    const registerRole =
        document.getElementById(
            "registerRole"
        );


    if (registerRole) {

        registerRole.addEventListener(
            "change",
            function () {

                const studentGroup =
                    document.getElementById(
                        "studentIdGroup"
                    );


                const facultyGroup =
                    document.getElementById(
                        "facultyIdGroup"
                    );


                if (
                    !studentGroup ||
                    !facultyGroup
                ) {

                    return;
                }



                // STUDENT
                if (
                    this.value ===
                    "student"
                ) {

                    studentGroup.style.display =
                        "block";

                    facultyGroup.style.display =
                        "none";

                }



                // FACULTY
                else if (
                    this.value ===
                    "faculty"
                ) {

                    studentGroup.style.display =
                        "none";

                    facultyGroup.style.display =
                        "block";

                }



                // NOTHING SELECTED
                else {

                    studentGroup.style.display =
                        "none";

                    facultyGroup.style.display =
                        "none";

                }

            }
        );

    }

});



// ==========================================
// REGISTER PASSWORD SHOW / HIDE
// ==========================================

function togglePassword(
    inputId,
    button
) {

    const input =
        document.getElementById(
            inputId
        );


    if (!input) {
        return;
    }


    if (
        input.type ===
        "password"
    ) {

        input.type =
            "text";

        button.textContent =
            "🙈";

    }

    else {

        input.type =
            "password";

        button.textContent =
            "👁";

    }

}



// ==========================================
// REGISTER MESSAGE
// ==========================================

function showMessage(
    element,
    message,
    type
) {

    if (!element) {
        return;
    }


    element.textContent =
        message;


    element.className =
        "message " + type;

}