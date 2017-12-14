function NewTicket() {
    document.getElementById("display").innerHTML = "" +
        "Please select the type of trouble you are having.<br><br>" +
        "<select id = 'category' name='category' length='51'>" +
        "SELECT type from categories<br><br>";

    document.getElementById("display").innerHTML += "</select> " +
        "Choose the importance of this ticket.<br><br><br>" +
        "<select id='priority' name='priority' length='31'>";

    document.getElementById("display").innerHTML += "</select><br> " +
        "Choose Department.<br><br><br>" +
        "<select id='department' name='department' length='31'>";

    document.getElementById("display").innerHTML += "</select> " +

        "<br>This ticket will be logged under your current username and email in the system. Please check back periodically to check  the status. <br><br>" +
        "Enter a Subject for this Ticket <input type='text' id='subject' size='60'><br />" +
        "Description of the Problem<br /> <textarea cols='50' id='description' rows='6'> </textarea>" +
        "<br><br />" +
        "<input type='submit' value='Submit Ticket' onclick='SubmitTicket()'>";


    $.ajax({
        url: 'scripts/php/getTypes.php',
        type: 'POST',
        data: {},
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                document.getElementById('category').options.add(new Option(data[i].type, data[i].id))
            }
        }
    });
    /////get priorities
    $.ajax({
        url: 'scripts/php/getPriority.php',
        type: 'POST',
        data: {},
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                document.getElementById('priority').options.add(new Option(data[i].level, data[i].id))
            }
        }
    });

    $.ajax({
        url: 'scripts/php/getDepartments.php',
        type: 'POST',
        data: {},
        dataType: 'json',
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                document.getElementById('department').options.add(new Option(data[i].type, data[i].id))
            }
        }
    });

}


function SubmitTicket() {
    $.ajax({
        url: 'scripts/php/submitTicket.php',
        type: 'POST',
        // data : { subject:document.getElementById("subject").value,description:document.getElementById("description").value,userName:userName,category:document.getElementById("category").options[document.getElementById("category").selectedIndex].value,priority:document.getElementById("priority").options[document.getElementById("priority").selectedIndex].value,department:document.getElementById("department").options[document.getElementById("department").selectedIndex].value},
        data: {
            subject: document.getElementById("subject").value,
            description: document.getElementById("description").value,
            userName: userName,
            category: document.getElementById("category").options[document.getElementById("category").selectedIndex].value,
            priority: document.getElementById("priority").options[document.getElementById("priority").selectedIndex].value,
            department: document.getElementById("department").options[document.getElementById("department").selectedIndex].value
        },
        dataType: 'json',
        success: function (data) {
            if (data == "1") {
                document.getElementById("display").innerHTML = "Ticket entered";
            } else {
                document.getElementById("display").innerHTML = data;
            }
        }
    });

}



function ShowTickets() {
    document.getElementById("display").innerHTML = "";
    document.getElementById("display").innerHTML +=

        "<br>Select Priority<br>" +
        "<select id='priority' name='priority' length='31'></select>";


    $.ajax({
        url: 'scripts/php/getPriority.php',
        type: 'POST',
        data: {},
        dataType: 'json',
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                document.getElementById('priority').options.add(new Option(data[i].level, data[i].id))
            }
        }
    });
    document.getElementById("display").innerHTML +=
        "<br><input type='submit' value='Apply Filter' onclick='ShowFilterTicket()'>";
    document.getElementById("display").innerHTML += "<br><input type='submit' value='Show All' onclick='ShowAllTicket()'>";
}

function ShowFilterTicket() {
    $.ajax({
        url: 'scripts/php/getTickets.php',
        type: 'POST',
        data: {
            priority: document.getElementById("priority").options[document.getElementById("priority").selectedIndex].value
        }, ////<---- change this to filter by type, you can pass category type
        dataType: 'json',
        success: function (data) {
            ////using HTML Table as a simple way to show, you make it better or leave it...Nothing wrong with HTML tables!
            ////remember   that .innerhtml will close each tag after every time used so you must build a string then add it
            document.getElementById("display").innerHTML = "";
            "<br>Select Priority<br>" +
            "<select id='priority' name='priority' length='31'></select>";
            "<br><input type='submit' value='Submit Ticket' onclick='ShowFilterTicket()'>"
            var ticketTable = "<table class='table table-bordered table-hover'><tr><th>Submitter</th><th>Category</th><th>Priority</th><th>Subject</th><th>Department</th><th>Due Date:</th><th>View</th></tr>";
            ticketTable += "<div class='container'><div class='modal fade' id='myModal' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Description:</h4></div><div class='modal-body'><p>"+data[0].tickD+"</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div></div>";
            for (var i = 0; i < data.length; i++) {
                ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td></td><td> <button type='button' class='btn btn-info btn-sm' data-toggle='modal' data-target='#myModal"+i+"'>View</button></td></tr> <div class='container'><div class='modal fade' id='myModal"+i+"' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Description:</h4></div><div class='modal-body'><p>"+data[i].tickD+"</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div></div>";
            }
            ticketTable += "</table>";
            
            document.getElementById("display").innerHTML += ticketTable;
        }
    });

}


//function ViewTicket(id) {
//    $.ajax({
//        url: 'scripts/php/getTicketID.php',
//        type: 'POST',
//        data: {
//            id
//        }, ////<---- change this to filter by type, you can pass category type
//        dataType: 'json',
//        success: function (data) { 
//            document.getElementById("display").innerHTML = "";
//            console.log("works");
//            
//            var viewDesc = "<div class='container'><div class='modal fade' id='myModal' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Description:</h4></div><div class='modal-body'><p>"+data[0].tickD+"</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div></div>";
//            
//            
////            //var ticketTable = "<table class='table table-bordered table-hover'><tr><th>Submitter</th><th>Category</th><th>Priority</th><th>Subject</th><th>Department</th><th>Due Date:</th></tr>";
////            var ticketTable = "<table><tr><th>Submitted By:</th><td>"+data[0].name +"</td></tr><tr><th>Category:</th><td>"+data[0].category+"</td></tr><tr><th>Priority:</th>"+data[0].priority+"</td></tr><tr><th>Subject:</th><td>"+data[0].subject+"</td></tr><tr><th>Description:</th><td>"+data[0].tickD+"</td></table>";
////            
//////            for (var i = 0; i < data.length; i++) {
//////                ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td></td></tr><tr><td>" + data[i].tickD + "<td></tr>";
//////            }
////
////            //ticketTable += "</table>";
//            document.getElementById("display").innerHTML += viewDesc;
//        }
//    });
//
//}



function Delete(id) {
    $.ajax({
        url: 'scripts/php/deleteTicketID.php',
        type: 'POST',
        data: {
            id
        }, ////<---- change this to filter by type, you can pass category type
        dataType: 'json',
        success: function (data) {
            document.getElementById("display").innerHTML = "";
            ////using HTML Table as a simple way to show, you make it better or leave it...Nothing wrong with HTML tables!
            ////remember that .innerhtml will close each tag after every time used so you must build a string then add it
            var ticketTable = "<table class='table table-bordered table-hover'><tr><th>Submitter</th><th>Category</th><th>Priority</th><th>Subject</th><th>Department</th><th>Due Date:</th><th>View</th></tr>";
            for (var i = 0; i < data.length; i++) {
                ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td></td><td><input type='button' value='View' onclick='ViewTicket(" + data[i].id + ")'</td></tr>";
            }

            ticketTable += "</table>";
            document.getElementById("display").innerHTML += ticketTable;
        }
    });

}

function ShowAllTicket() {
    $.ajax({
        url: 'scripts/php/getAllTickets.php',
        type: 'POST',
        data: {
            priority: document.getElementById("priority").options[document.getElementById("priority").selectedIndex].value
        }, ////<---- change this to filter by type, you can pass category type
        dataType: 'json',
        success: function (data) {
            document.getElementById("display").innerHTML = "";
            ////using HTML Table as a simple way to show, you make it better or leave it...Nothing wrong with HTML tables!
            ////remember that .innerhtml will close each tag after every time used so you must build a string then add it
            var ticketTable = "<table class='table table-bordered table-hover'><tr><th>Submitter</th><th>Category</th><th>Priority</th><th>Subject</th><th>Department</th><th>Due Date:</th><th>View</th></tr>";
            for (var i = 0; i < data.length; i++) {
                ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td></td><td> <button type='button' class='btn btn-info btn-sm' data-toggle='modal' data-target='#myModal"+i+"'>View</button></td></tr> <div class='container'><div class='modal fade' id='myModal"+i+"' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Description:</h4></div><div class='modal-body'><p>"+data[i].tickD+"</p></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button></div></div></div></div></div>";
            }
            ticketTable += "</table>";
            document.getElementById("display").innerHTML += ticketTable;
        }
    });
}
