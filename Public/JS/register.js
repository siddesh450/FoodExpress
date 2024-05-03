document.addEventListener('DOMContentLoaded', function() {
    let regform = document.getElementById("regform");

    regform.addEventListener('submit', register);

    function register(e) {
        e.preventDefault();
        let first_name = document.getElementById("fname").value;
        let last_name = document.getElementById("lname").value;
        let Email = document.getElementById("email").value;
        let username = document.getElementById("Username").value;
        let password = document.getElementById("Password").value;
        let cPassword = document.getElementById("Confirm_Password").value;

        if(password !== cPassword) {
            document.querySelector(".error").innerText = "Passwords Must Match!";
            document.getElementById("Password").value = "";
            document.getElementById("Confirm_Password").value = "";
        } else {
            const user = {
                uName: username,
                pword: password
            };
            //  document.getElementById("welcome").innerText = `Welcome ${username}!`
        }
    }
});
