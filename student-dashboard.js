/* =========================================================
   AI SMARTTIME - STUDENT DASHBOARD JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ====================================================== */

    const menuItems =
        document.querySelectorAll(
            ".menu-item[data-section]"
        );

    const pageSections =
        document.querySelectorAll(
            ".page-section"
        );

    const pageTitle =
        document.getElementById(
            "pageTitle"
        );

    const pageSubtitle =
        document.getElementById(
            "pageSubtitle"
        );

    const dateBox =
        document.getElementById(
            "currentDate"
        );



    /* =====================================================
       SECTION INFORMATION
    ====================================================== */

    const sectionInfo = {

        dashboard: {
            title: "Student Dashboard",
            subtitle:
                "Manage your academic timetable and notifications"
        },

        timetable: {
            title: "My Timetable",
            subtitle:
                "View your complete academic timetable"
        },

        notifications: {
            title: "Notifications",
            subtitle:
                "View timetable and class updates"
        },

        profile: {
            title: "My Profile",
            subtitle:
                "View and edit your student profile"
        }

    };



    /* =====================================================
       CURRENT DATE
    ====================================================== */

    function showCurrentDate() {

        if (!dateBox) {
            return;
        }

        const today =
            new Date();

        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric"
        };

        dateBox.textContent =
            today.toLocaleDateString(
                "en-GB",
                options
            );
    }


    showCurrentDate();



    /* =====================================================
       OPEN SECTION
    ====================================================== */

    function openSection(sectionName) {

        /* Hide all sections */

        pageSections.forEach(
            function (section) {

                section.classList.remove(
                    "active-section"
                );

            }
        );


        /* Remove active menu */

        menuItems.forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

            }
        );


        /* Find selected section */

        const selectedSection =
            document.getElementById(
                sectionName
            );


        if (!selectedSection) {

            console.error(
                "Section not found:",
                sectionName
            );

            return;

        }


        /* Show section */

        selectedSection.classList.add(
            "active-section"
        );


        /* Find selected menu */

        const selectedMenu =
            document.querySelector(
                '.menu-item[data-section="' +
                sectionName +
                '"]'
            );


        if (selectedMenu) {

            selectedMenu.classList.add(
                "active"
            );

        }


        /* Update header */

        if (
            sectionInfo[sectionName] &&
            pageTitle &&
            pageSubtitle
        ) {

            pageTitle.textContent =
                sectionInfo[
                    sectionName
                ].title;

            pageSubtitle.textContent =
                sectionInfo[
                    sectionName
                ].subtitle;

        }


        /* Update URL */

        history.replaceState(
            null,
            "",
            "#" + sectionName
        );


        /* Scroll top */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }



    /* =====================================================
       SIDEBAR BUTTONS
    ====================================================== */

    menuItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    const section =
                        item.getAttribute(
                            "data-section"
                        );

                    openSection(
                        section
                    );

                }
            );

        }
    );



    /* =====================================================
       DASHBOARD BUTTONS
       View All / Full Timetable
    ====================================================== */

    const sectionButtons =
        document.querySelectorAll(
            "[data-section-button]"
        );


    sectionButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const section =
                        button.getAttribute(
                            "data-section-button"
                        );

                    openSection(
                        section
                    );

                }
            );

        }
    );



    /* =====================================================
       OPEN SECTION FROM URL HASH
    ====================================================== */

    function openHashSection() {

        const hash =
            window.location.hash
                .replace("#", "")
                .trim();


        const validSections = [
            "dashboard",
            "timetable",
            "notifications",
            "profile"
        ];


        if (
            validSections.includes(
                hash
            )
        ) {

            openSection(
                hash
            );

        } else {

            openSection(
                "dashboard"
            );

        }

    }


    openHashSection();



    /* =====================================================
       PROFILE STORAGE
    ====================================================== */

    const PROFILE_KEY =
        "smartTimeStudentProfile";


    const defaultProfile = {

        name:
            "Priyabrat Pradhan",

        regNo:
            "23CSE045",

        branch:
            "CSE",

        section:
            "A",

        year:
            "4th Year",

        email:
            "student@example.com",

        phone:
            "",

        photo:
            ""

    };



    /* =====================================================
       GET SAVED PROFILE
    ====================================================== */

    function getProfile() {

        const savedProfile =
            localStorage.getItem(
                PROFILE_KEY
            );


        if (!savedProfile) {

            return {
                ...defaultProfile
            };

        }


        try {

            const profile =
                JSON.parse(
                    savedProfile
                );


            return {
                ...defaultProfile,
                ...profile
            };

        } catch (error) {

            console.error(
                "Profile data error:",
                error
            );

            return {
                ...defaultProfile
            };

        }

    }



    /* =====================================================
       SAVE PROFILE TO LOCAL STORAGE
    ====================================================== */

    function saveProfileData(
        profile
    ) {

        localStorage.setItem(
            PROFILE_KEY,
            JSON.stringify(
                profile
            )
        );

    }



    /* =====================================================
       LOAD PROFILE
    ====================================================== */

    function loadProfile() {

        const profile =
            getProfile();


        const profileName =
            document.getElementById(
                "profileName"
            );

        const profileRegNo =
            document.getElementById(
                "profileRegNo"
            );

        const profileBranch =
            document.getElementById(
                "profileBranch"
            );

        const profileSection =
            document.getElementById(
                "profileSection"
            );

        const profileYear =
            document.getElementById(
                "profileYear"
            );

        const profileEmail =
            document.getElementById(
                "profileEmail"
            );

        const profilePhone =
            document.getElementById(
                "profilePhone"
            );


        if (profileName) {

            profileName.value =
                profile.name || "";

        }


        if (profileRegNo) {

            profileRegNo.value =
                profile.regNo || "";

        }


        if (profileBranch) {

            profileBranch.value =
                profile.branch || "";

        }


        if (profileSection) {

            profileSection.value =
                profile.section || "A";

        }


        if (profileYear) {

            profileYear.value =
                profile.year ||
                "4th Year";

        }


        if (profileEmail) {

            profileEmail.value =
                profile.email || "";

        }


        if (profilePhone) {

            profilePhone.value =
                profile.phone || "";

        }


        updateSidebarProfile(
            profile
        );

    }



    /* =====================================================
       UPDATE SIDEBAR
    ====================================================== */

    function updateSidebarProfile(
        profile
    ) {

        const sidebarName =
            document.getElementById(
                "sidebarName"
            );

        const sidebarRegNo =
            document.getElementById(
                "sidebarRegNo"
            );

        const sidebarBranch =
            document.getElementById(
                "sidebarBranch"
            );

        const sidebarSection =
            document.getElementById(
                "sidebarSection"
            );

        const sidebarYear =
            document.getElementById(
                "sidebarYear"
            );

        const welcomeName =
            document.getElementById(
                "welcomeName"
            );


        if (sidebarName) {

            sidebarName.textContent =
                profile.name ||
                "Student";

        }


        if (sidebarRegNo) {

            sidebarRegNo.textContent =
                profile.regNo ||
                "";

        }


        if (sidebarBranch) {

            sidebarBranch.textContent =
                profile.branch ||
                "";

        }


        if (sidebarSection) {

            sidebarSection.textContent =
                profile.section ||
                "";

        }


        if (sidebarYear) {

            sidebarYear.textContent =
                profile.year ||
                "";

        }


        if (welcomeName) {

            welcomeName.textContent =
                profile.name ||
                "Student";

        }


        updateProfileImages(
            profile.photo
        );

    }



    /* =====================================================
       UPDATE PROFILE IMAGES
    ====================================================== */

    function updateProfileImages(
        photo
    ) {

        const sidebarImage =
            document.getElementById(
                "sidebarProfileImage"
            );

        const defaultProfile =
            document.getElementById(
                "defaultProfile"
            );

        const profileImage =
            document.getElementById(
                "profileImage"
            );

        const largeDefaultProfile =
            document.getElementById(
                "largeDefaultProfile"
            );


        if (photo) {

            /* SIDEBAR */

            if (sidebarImage) {

                sidebarImage.src =
                    photo;

                sidebarImage.style.display =
                    "block";

            }


            if (defaultProfile) {

                defaultProfile.style.display =
                    "none";

            }


            /* PROFILE PAGE */

            if (profileImage) {

                profileImage.src =
                    photo;

                profileImage.style.display =
                    "block";

            }


            if (largeDefaultProfile) {

                largeDefaultProfile.style.display =
                    "none";

            }

        } else {

            /* SIDEBAR */

            if (sidebarImage) {

                sidebarImage.removeAttribute(
                    "src"
                );

                sidebarImage.style.display =
                    "none";

            }


            if (defaultProfile) {

                defaultProfile.style.display =
                    "flex";

            }


            /* PROFILE PAGE */

            if (profileImage) {

                profileImage.removeAttribute(
                    "src"
                );

                profileImage.style.display =
                    "none";

            }


            if (largeDefaultProfile) {

                largeDefaultProfile.style.display =
                    "flex";

            }

        }

    }



    /* =====================================================
       LOAD PROFILE ON START
    ====================================================== */

    loadProfile();



    /* =====================================================
       PROFILE FORM SAVE
    ====================================================== */

    const profileForm =
        document.getElementById(
            "profileForm"
        );


    if (profileForm) {

        profileForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const oldProfile =
                    getProfile();


                const updatedProfile = {

                    name:
                        document.getElementById(
                            "profileName"
                        ).value.trim(),

                    regNo:
                        document.getElementById(
                            "profileRegNo"
                        ).value.trim(),

                    branch:
                        document.getElementById(
                            "profileBranch"
                        ).value.trim(),

                    section:
                        document.getElementById(
                            "profileSection"
                        ).value,

                    year:
                        document.getElementById(
                            "profileYear"
                        ).value,

                    email:
                        document.getElementById(
                            "profileEmail"
                        ).value.trim(),

                    phone:
                        document.getElementById(
                            "profilePhone"
                        ).value.trim(),

                    photo:
                        oldProfile.photo || ""

                };


                saveProfileData(
                    updatedProfile
                );


                updateSidebarProfile(
                    updatedProfile
                );


                const saveMessage =
                    document.getElementById(
                        "saveMessage"
                    );


                if (saveMessage) {

                    saveMessage.textContent =
                        "Profile saved successfully ✓";


                    setTimeout(
                        function () {

                            saveMessage.textContent =
                                "";

                        },
                        3000
                    );

                }

            }
        );

    }



    /* =====================================================
       PHOTO INPUT
    ====================================================== */

    const photoInput =
        document.getElementById(
            "photoInput"
        );


    if (photoInput) {

        photoInput.addEventListener(
            "change",
            function (event) {

                const file =
                    event.target.files[0];


                if (!file) {

                    return;

                }


                /* CHECK FILE TYPE */

                if (
                    !file.type.startsWith(
                        "image/"
                    )
                ) {

                    alert(
                        "Please select a valid image file."
                    );

                    photoInput.value =
                        "";

                    return;

                }


                /* CHECK SIZE */

                if (
                    file.size >
                    5 * 1024 * 1024
                ) {

                    alert(
                        "Please select an image smaller than 5 MB."
                    );

                    photoInput.value =
                        "";

                    return;

                }


                /* READ IMAGE */

                const reader =
                    new FileReader();


                reader.onload =
                    function (e) {

                        const imageData =
                            e.target.result;


                        const profile =
                            getProfile();


                        profile.photo =
                            imageData;


                        saveProfileData(
                            profile
                        );


                        updateProfileImages(
                            imageData
                        );


                        const saveMessage =
                            document.getElementById(
                                "saveMessage"
                            );


                        if (saveMessage) {

                            saveMessage.textContent =
                                "Photo updated successfully ✓";


                            setTimeout(
                                function () {

                                    saveMessage.textContent =
                                        "";

                                },
                                3000
                            );

                        }


                        photoInput.value =
                            "";

                    };


                reader.readAsDataURL(
                    file
                );

            }
        );

    }



    /* =====================================================
       REMOVE PHOTO
    ====================================================== */

    const removePhotoBtn =
        document.getElementById(
            "removePhotoBtn"
        );


    if (removePhotoBtn) {

        removePhotoBtn.addEventListener(
            "click",
            function () {

                const profile =
                    getProfile();


                profile.photo =
                    "";


                saveProfileData(
                    profile
                );


                updateProfileImages(
                    ""
                );


                const saveMessage =
                    document.getElementById(
                        "saveMessage"
                    );


                if (saveMessage) {

                    saveMessage.textContent =
                        "Profile photo removed.";


                    setTimeout(
                        function () {

                            saveMessage.textContent =
                                "";

                        },
                        2500
                    );

                }

            }
        );

    }



    /* =====================================================
       NOTIFICATIONS
       
       IMPORTANT:
       NO ICONS ARE USED HERE.
    ====================================================== */

    const notifications = [

        {

            title:
                "Substitute Teacher Assigned",

            text:
                "A substitute faculty has been assigned for today's Software Project Management class.",

            time:
                "Yesterday • 04:15 PM"

        },


        {

            title:
                "Class Cancelled",

            text:
                "Today's 3:20 PM seminar class has been cancelled.",

            time:
                "Yesterday • 02:10 PM"

        },


        {

            title:
                "Timetable Updated",

            text:
                "The academic timetable has been updated. Please check the latest timetable.",

            time:
                "2 days ago • 10:30 AM"

        },


        {

            title:
                "Classroom Changed",

            text:
                "Applied Data Science class has been moved to Room 303.",

            time:
                "3 days ago • 09:15 AM"

        }

    ];



    /* =====================================================
       CREATE NOTIFICATION HTML
       
       NO ICON DIV
    ====================================================== */

    function createNotificationHTML(
        notification
    ) {

        return `

            <div class="notification-item">

                <div class="notification-content">

                    <h3>
                        ${notification.title}
                    </h3>

                    <p>
                        ${notification.text}
                    </p>

                    <span class="notification-time">
                        ${notification.time}
                    </span>

                </div>

            </div>

        `;

    }



    /* =====================================================
       LOAD NOTIFICATIONS
    ====================================================== */

    function loadNotifications() {

        const dashboardContainer =
            document.getElementById(
                "dashboardNotifications"
            );

        const allContainer =
            document.getElementById(
                "allNotifications"
            );


        if (dashboardContainer) {

            dashboardContainer.innerHTML =
                notifications
                    .slice(0, 2)
                    .map(
                        createNotificationHTML
                    )
                    .join("");

        }


        if (allContainer) {

            allContainer.innerHTML =
                notifications
                    .map(
                        createNotificationHTML
                    )
                    .join("");

        }

    }


    loadNotifications();



    /* =====================================================
       LOGOUT
    ====================================================== */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            function () {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmLogout) {

                    return;

                }


                /* Remove login session */

                localStorage.removeItem(
                    "loggedIn"
                );

                localStorage.removeItem(
                    "userRole"
                );

                localStorage.removeItem(
                    "userEmail"
                );

                localStorage.removeItem(
                    "userName"
                );


                /* Keep student profile */

                window.location.href =
                    "login.html";

            }
        );

    }



    /* =====================================================
       HASH CHANGE
       Allows browser back/forward
    ====================================================== */

    window.addEventListener(
        "hashchange",
        function () {

            openHashSection();

        }
    );


});