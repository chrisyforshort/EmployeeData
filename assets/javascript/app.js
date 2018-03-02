$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDejbdoLPO3fMptAcL7FpfyD3I9CvBEHP4",
        authDomain: "employeedata-59b29.firebaseapp.com",
        databaseURL: "https://employeedata-59b29.firebaseio.com",
        projectId: "employeedata-59b29",
        storageBucket: "",
        messagingSenderId: "1077253889943"
    };
    firebase.initializeApp(config);

    var database = firebase.database()

    // Capture Button Click
    $("#submit").on("click", function (event) {
        event.preventDefault();
        // Capture User Inputs and store them into variables
        var input1 = $("#name-input").val().trim();
        var input2 = $("#role-input").val().trim();
        var input3 = $("#date-input").val().trim();
        var input4 = $("#rate-input").val().trim();
        var input5 = moment().diff(moment('input3','MM/DD/YYYY'), 'months')
         console.log(input5)
        $("#name-input").val("");
        $("#role-input").val("");
        $("#date-input").val("");
        $("#rate-input").val("");
        database.ref().push({
            name: input1,
            role: input2,
            date: input3,
            rate: input4,
            worked: input5,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
        // Output all of the new information into the relevant HTML sections
        $("#employees").append("<tr><th>" + input1 + "</th><th>" + input2 + "</th><th>" + input3 + "</th><th>" + input5 + "</th><th>" + input4 + "</th><th>" + input4 + "</th></tr>")
        database.ref().orderByChild('rate').limitToLast(1).on('child_added', function(snap){
            console.log(snap.val())
            })
        return false
    })

    database.ref().on("value", function(snap){
        console.log(snap.val())
    })
})