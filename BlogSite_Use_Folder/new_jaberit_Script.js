
const loginForm = document.querySelector('.form.login');
const signupForm = document.querySelector('.form.signup');
const loginLink = document.querySelector('.login-link');
const signupLink = document.querySelector('.signup-link');
const arrowIcon = document.getElementById('arrow-icon');
const logoutDropdownMenu = document.getElementById('logout-dropdown-menu');
const loginLogoutButton = document.getElementById('login-logout-button');
const userInfoContainer = document.getElementById('user-info-container');
const jwt = sessionStorage.getItem("jwt");

loginLink.addEventListener('click', function() {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
});
signupLink.addEventListener('click', function() {
    signupForm.style.display = 'block';
    loginForm.style.display = 'none';
});
// Get the image URL input element
const imageUrlInput = document.getElementById('avatar');
const imgdesply = document.getElementById("imagecontainerdiv");
function displayImage() {
    const imageUrl = imageUrlInput.value;
    imagecontainerdiv.innerHTML = `<img src="${imageUrl}" style="max-width: 114px; border-radius: 10px; height: 65px;">`;
}
// Add an event listener to the image URL input box
imageUrlInput.addEventListener('input', displayImage);

checkJWT();
showhide();

function checkJWT() {
    const fullbodydiv = document.querySelector('.fullbody');
    const fullbodydiv2 = document.querySelector('.fullbody2');
    const fullbodydiv3 = document.querySelector('.fullbody3');
    const fullbodydiv4 = document.querySelector('.fullbody4');
  if (jwt === null) {
    loginLogoutButton.innerText = 'Login';
    userInfoContainer.style.display = 'none';
    fullbodydiv2.style.display = 'block';
    fullbodydiv.style.display = 'none';
    fullbodydiv4.style.display = 'block';
    fullbodydiv3.style.display = 'none';
  } else {
    loadUser(jwt);
    loginLogoutButton.style.display = 'none';
    loginLogoutButton.innerText = 'Logout';
    userInfoContainer.style.display = 'flex';
    fullbodydiv.style.display = 'block';
    fullbodydiv2.style.display = 'none';
    fullbodydiv3.style.display = 'block';
    fullbodydiv4.style.display = 'none';
  }
};

function logout() {
    localStorage.clear();
    sessionStorage.clear();
    sessionStorage.removeItem("jwt");
    window.location.reload(1);
};
function showhide() {
    const user_type = sessionStorage.getItem("user_type");
    if (user_type === "4" || user_type === "1") {
        document.querySelector(".loginuser").classList.add("show");
    } else {
        document.querySelector(".loginuser").classList.add("hide");
    }
};
function logvalidateForm() {
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    if (usernameInput.value === "") {
        Toast.fire({
            icon: 'error',
            title: 'Please enter a username' // 'Username is required',
            //text: 'Please enter a username'
        });
        return false;
    }
    if (passwordInput.value === "") {
        Toast.fire({
            icon: 'error',
            title: 'Please enter a password' //'Password is required',
            //text: 'Please enter a password'
        });
        return false;
    }
    checkUser();
};
function checkUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://apex.oracle.com/pls/apex/blogpost/NEW/BLOG_SITE_USERS/view");
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                try {
                    const objects = JSON.parse(xhttp.responseText);
                    const user = objects.items.find(obj => obj.username === username);
                    if (user) {
                        if (user.password === password) {
                            login(username, password);
                        } else {
                            Toast.fire({
                                icon: 'error',
                                title: 'Username and password do not match',
                                //   text: 'Please enter a valid password'
                            });
                        }
                    } else {
                        Toast.fire({
                            icon: 'error',
                            title: 'Username not found',
                            //  text: 'Please enter a valid username'
                        });
                    }
                } catch (error) {
                    console.error(error);
                    Toast.fire({
                        icon: 'error',
                        title: 'There was an error with your request. Please try again later.'
                        //    text: 'There was an error with your request. Please try again later.'
                    });
                }
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'There was an error with your request. Please try again later.'
                    //   text: 'There was an error with your request. Please try again later.'
                });
            }
        }
    };
    xhttp.send();
}
function login(username, password) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    const xhr2 = new XMLHttpRequest();
    xhr2.open("POST", "https://apex.oracle.com/pls/apex/blogpost/NEW/BLOG_SITE_USERS/login");
    xhr2.setRequestHeader("Content-Type", "application/json");
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4) {
            if (xhr2.status == 200) {
                try {
                    const objects = JSON.parse(xhr2.responseText);
                    if (objects[0].status === "ok") {
                        sessionStorage.setItem("jwt", objects[0].user_id);
                        sessionStorage.setItem("user_type", objects[0].user_type);
                        Toast.fire({
                            icon: 'success',
                            title: 'Login Successful'
                        }).then(() => {
                            // Redirect to index.html after 3 seconds
                            setTimeout(() => {
                                // window.location.href = './new.html';
                                window.history.back();
                            }, 1000);
                        });
                    } else {
                        Toast.fire({
                            icon: 'error',
                            title: 'Username and password do not match',
                            // text: 
                        }).then(() => {
                            // Clear the username and password fields
                            document.getElementById("username").value = "";
                            document.getElementById("password").value = "";
                        });
                    }
                } catch (error) {
                    console.error(error);
                    Toast.fire({
                        icon: 'error',
                        title: 'There was an error with your request. Please try again later.'
                        // text: 'There was an error with your request. Please try again later.'
                    });
                }
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'There was an error with your request. Please try again later.'
                    //    text: 'There was an error with your request. Please try again later.'
                });
            }
        }
    };
    const data = {
        "username": username,
        "password": password,
    };
    xhr2.send(JSON.stringify(data));
    return false;
};
function validateForm() {
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    var emailaddress = document.getElementById("emailaddress");
    var phonenumber = document.getElementById("phonenumber");
    var usernameInput = document.getElementById("usernamereg");
    var passwordInput = document.getElementById("passwordreg");
    if (emailaddress.value === "") {
        Toast.fire({
            icon: 'error',
            title: 'Please enter your email address' //'Email is required',
            //text: 'Please enter your email address'
        });
        return false;
    }
    if (phonenumber.value === "") {
        Toast.fire({
            icon: 'error',
            title: 'Please enter your phone Number' //'Email is required',
            //text: 'Please enter your email address'
        });
        return false;
    }
    if (usernameInput.value === "") {
        Toast.fire({
            icon: 'error',
            title: 'Please enter a username' // 'Username is required',
            //text: 'Please enter a username'
        });
        return false;
    }
    if (passwordInput.value === "") {
        Toast.fire({
            icon: 'error',
            title: 'Please enter a password' //'Password is required',
            //text: 'Please enter a password'
        });
        return false;
    }
    insert_api_Data();
};
function insert_api_Data() {
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    });
    var fnameInput = document.getElementById("fnameInput");
    var phonenumber = document.getElementById("phonenumber");
    var emailaddress = document.getElementById("emailaddress");
    var usernameInput = document.getElementById("usernamereg");
    var passwordInput = document.getElementById("passwordreg");
    var avatarInput = document.getElementById("avatar");
    var genderInput = document.getElementById("gender");
    var loginForm = document.getElementById("loginForm");
    var signupForm = document.getElementById("signupForm");
    // Check if username, email, and phone number already exist
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://apex.oracle.com/pls/apex/blogpost/NEW/BLOG_SITE_USERS/view", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                var items = response.items;
                var usernameExists = false;
                var emailExists = false;
                var phoneExists = false;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].username === usernameInput.value) {
                        usernameExists = true;
                        break;
                    }
                    if (items[i].email_address === emailaddress.value) {
                        emailExists = true;
                        break;
                    }
                    if (items[i].phone_number === phonenumber.value) {
                        phoneExists = true;
                        break;
                    }
                }
                if (usernameExists) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Username already exists',
                        //   text: 'Please choose a different username'
                    });
                } else if (emailExists) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Email already exists',
                        //  text: 'Please enter a different email address'
                    });
                } else if (phoneExists) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Phone number already exists',
                        //  text: 'Please enter a different phone number'
                    });
                } else {
                    // If the username, email, and phone number do not already exist, send the data to the server
                    var data = {
                        FULL_NAME: fnameInput.value,
                        PHONE_NUMBER: phonenumber.value,
                        EMAIL_ADDRESS: emailaddress.value,
                        USERNAME: usernameInput.value,
                        PASSWORD: passwordInput.value,
                        PP_URL: avatarInput.value,
                        GENDER: genderInput.value
                    };
                    var xhr2 = new XMLHttpRequest();
                    xhr2.open("POST", "https://apex.oracle.com/pls/apex/blogpost/NEW/BLOG_SITE_USERS/insert", true);
                    xhr2.setRequestHeader('Content-Type', 'application/json');
                    xhr2.onreadystatechange = function() {
                        if (xhr2.readyState === 4) {
                            if (xhr2.status === 200) {
                                var response = xhr2.responseText;
                                console.log(response);
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Registration Successful',
                                }).then((result) => {
                                 //    window.history.back();
                                    loginForm.style.display = 'block';
                                     signupForm.style.display = 'none';
                                });
                            } else {
                                Toast.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'There was an error with your request. Please try again.'
                                });
                            }
                        }
                    };
                    xhr2.send(JSON.stringify(data));
                }
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error with your request. Please try again.'
                });
            }
        }
    };
    xhr.send();
};
//loadUser(sessionStorage.getItem("jwt"));
function loadUser(jwt) {
    showLoading();
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://apex.oracle.com/pls/apex/blogpost/NEW/BLOG_SITE_USERS/UserInfo/" + jwt);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("Authorization", jwt);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const response = JSON.parse(this.responseText);
            console.log(response);
            if (response.items.length > 0) {
                const user = response.items[0];
                document.getElementById("avatar2").src = user.pp_url;
                 document.getElementById("fname2").innerHTML = user.full_name;
                document.getElementById("avatar3").src = user.pp_url;
                document.getElementById("avatar4").src = user.pp_url;
                document.getElementById("full_name").innerHTML = user.full_name;
                document.getElementById("phone_number").innerHTML = user.phone_number;
                document.getElementById("email_address").innerHTML = user.email_address;
                document.getElementById("user_type").innerHTML = user.user_type;
            }
        }
        hideLoading();
    };
}
function showLoading() {
    document.getElementById("loading-overlay").style.display = "block";
    setTimeout(function() {
        refreshIcon.style.display = "none";
    }, 10000);
};
function hideLoading() {
    document.getElementById("loading-overlay").style.display = "none";
};
// Chack User Login Info..

// Function to toggle the logout dropdown menu
function toggleLogoutDropdown() {
    const logoutDropdownMenu = document.getElementById('logout-dropdown-menu');
    if (logoutDropdownMenu.style.display === 'block') {
        logoutDropdownMenu.style.display = 'none';
        arrowIcon.classList.remove('fa-sign-down');
    } else {
        logoutDropdownMenu.style.display = 'block';
        arrowIcon.classList.add('fa-sign-down');
    }
};