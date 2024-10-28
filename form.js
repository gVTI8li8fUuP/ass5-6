function data() {

    var a = document.getElementById("name").value;
    var b = document.getElementById("email").value;
    var c = document.getElementById("topic").value;
    var d = document.getElementById("message").value;
    var e = document.getElementById("phone").value;


    if (a === "" || b === "" || c === "" || d === "") {
        alert("All fields are mandatory, excluding phone number!");
    }
    if (e !== "") {

        if (e.length !== 11) {
            alert("Number should be of 11 digits!");
            return false;
        }


        if (isNaN(e)) {
            alert("Only numbers are allowed!!");
            return false;
        }
    }

    var confirmation = confirm("Are you sure you want to submit the form?");
    if (!confirmation) {
        return false;
    }

    alert("Form submitted successfully!");
    return true;

}