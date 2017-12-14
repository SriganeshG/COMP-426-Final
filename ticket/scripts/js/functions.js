function NewTicket()
{
     document.getElementById("display").innerHTML = "" +
          "<h4>Please select the type of trouble you are having.</h4>" +
       "<select id = 'category' name='category' length='51'>" +
         "SELECT type from categories<br><br></select> ";
      
      document.getElementById("display").innerHTML +=  "<br><br>" +
       "<h4>Choose the importance of this ticket.</h4>" +
      "<select id='priority' name='priority' length='31'> <br></select> ";

      document.getElementById("display").innerHTML +=  "<br><br>" +
       "<h4>Due Date</h4>" +
      "<input type='date' id='DueDate'> <br><br>";
    
     document.getElementById("display").innerHTML +=
       "<h4>Choose Department.</h4>" +
      "<select id='department' name='department' length='31'>";
     
       document.getElementById("display").innerHTML += "</select> " +
      
       "<br>" +
        "<br><h4>Enter a Subject for this Ticket</h4> <input type='text' id='subject' size='60'><br />" +
        "<br><h4>Description of the Problem</h4> <textarea cols='50' id='description' rows='6'> </textarea>" +
        "<br><br />" +
        "<input type='submit' class='btn btn-custom' value='Submit Ticket' onclick='SubmitTicket()'> <br><br>";   
    
   
         $.ajax({
        url : 'scripts/php/getTypes.php',
        type : 'POST',
        data : {},
        dataType:'json',
        success : function(data) { 
            for(var i = 0; i < data.length; i++)
            {
                document.getElementById('category').options.add(new Option(data[i].type, data[i].id))
            }
        }
    });
     /////get priorities
         $.ajax({
        url : 'scripts/php/getPriority.php',
        type : 'POST',
        data : {},
        dataType:'json',
        success : function(data) { 
             for(var i = 0; i < data.length; i++)
            {
               document.getElementById('priority').options.add(new Option(data[i].level, data[i].id))
            }
        }
    });
    
    
       /////get priorities
         $.ajax({
        url : 'scripts/php/getUsers.php',
        type : 'POST',
        data : {},
        dataType:'json',
        success : function(data) { 
             for(var i = 0; i < data.length; i++)
            {
               document.getElementById('users').options.add(new Option(data[i].name, data[i].id))
            }
        }
    });
    
    $.ajax({
        url : 'scripts/php/getDepartments.php',
        type : 'POST',
        data : {},
        dataType:'json',
        success : function(data) {
            console.log(data);
            for(var i = 0; i < data.length; i++)
            {
                document.getElementById('department').options.add(new Option(data[i].type, data[i].id))
            }
        }
    });
 
}


function SubmitTicket()
{
        $.ajax({
        url : 'scripts/php/submitTicket.php',
        type : 'POST',
       // data : { subject:document.getElementById("subject").value,description:document.getElementById("description").value,userName:userName,category:document.getElementById("category").options[document.getElementById("category").selectedIndex].value,priority:document.getElementById("priority").options[document.getElementById("priority").selectedIndex].value,department:document.getElementById("department").options[document.getElementById("department").selectedIndex].value},
          data : { subject:document.getElementById("subject").value,dd1:document.getElementById("DueDate").value,description:document.getElementById("description").value,userName:userName,category:document.getElementById("category").options[document.getElementById("category").selectedIndex].value,priority:document.getElementById("priority").options[document.getElementById("priority").selectedIndex].value,department:document.getElementById("department").options[document.getElementById("department").selectedIndex].value},
        dataType:'json',
        success : function(data) { 
            if(data == "1")
            {
                 document.getElementById("display").innerHTML = "Ticket entered <br><br>";
            }
            else
            {
                document.getElementById("display").innerHTML = data;
            }
        }
    });
    
}



function ShowTickets()
{
        document.getElementById("display").innerHTML = "";
        document.getElementById("display").innerHTML += 

     "Select Priority<br>" +
    "<select id='priority' name='priority' length='31'></select> <br>";
    


          $.ajax({
        url : 'scripts/php/getPriority.php',
        type : 'POST',
        data : {},
        dataType:'json',
        success : function(data) { 
             for(var i = 0; i < data.length; i++)
            {
               document.getElementById('priority').options.add(new Option(data[i].level, data[i].id))
            }
        }
    });
          document.getElementById("display").innerHTML +=
        "<br><input class='btn btn-custom' type='submit' value='Apply Filter' onclick='ShowFilterTicket()'><br>";
    
    
//    //
//    document.getElementById("display").innerHTML += 
//
//     "Select Users<br>" +
//    "<select id='users' name='users' length='31'></select>";
    


          $.ajax({
        url : 'scripts/php/getUsers.php',
        type : 'POST',
        data : {},
        dataType:'json',
        success : function(data) { 
             for(var i = 0; i < data.length; i++)
            {
               document.getElementById('users').options.add(new Option(data[i].name, data[i].id))
            }
        }
    });
    
      //       document.getElementById("display").innerHTML +=
        //"<br><input class='btn btn-custom' type='submit' value='Apply Filter' onclick='ShowFilterTicketUsers()'><br>";
    
     document.getElementById("display").innerHTML += "<br><input class='btn btn-custom' type='submit' value='Show All' onclick='ShowAllTicket()'><br><br>"
    
}

function ShowFilterTicket(){
        $.ajax({
        url : 'scripts/php/getTickets.php',
        type : 'POST',
        data : {priority:document.getElementById("priority").options[document.getElementById("priority").selectedIndex].value},////<---- change this to filter by type, you can pass category type
        dataType:'json',
        success : function(data) { 
          ////using HTML Table as a simple way to show, you make it better or leave it...Nothing wrong with HTML tables!
            ////remember   that .innerhtml will close each tag after every time used so you must build a string then add it
           document.getElementById("display").innerHTML = "";
            "Select Priority<br>" +
      "<br><br><select id='priority' name='priority' length='31'></select>";
      "<br><br><input type='submit' value='Submit Ticket' onclick='ShowFilterTicket()'><br>"
           var ticketTable = "<table class='table table-bordered table-hover'><tr><th>Submitter</th><th>Category</th><th>Priority</th><th>Subject</th><th>Department</th><th>Time Issued:</th><th>View</th><th>Delete</th></tr>";
            for(var i = 0; i < data.length; i++)
            {
               //ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td>" + data[i].timeIssued + "</td><td><input type='button' value='View' onclick='ViewTicket(" + data[i].id + ")'</td><td><input type='button' value='Delete' onclick='Delete(" + data[i].id + ");ShowTickets()'</td></tr>";
                ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td>" + data[i].timeIssued + "</td><td><button type='button' class='btn btn-custom' data-toggle='modal' data-target='#myModal"+i+"'>View</button></td><div class='modal fade' id='myModal"+i+"' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Description:</h4></div><div class='modal-body'><p>Due: "+data[i].DueDate+"<br>"+data[i].tickD+"</p></div><div class='modal-footer'><button type='button' class='btn btn-custom' data-dismiss='modal'>Close</button></div></div></div></div><td><input type='button' value='Delete' onclick='Delete(" + data[i].id + ");ShowTickets()'</td></tr>";
            }
            ticketTable += "</table>";
             document.getElementById("display").innerHTML += ticketTable;
        }
    });
    
}


function ShowFilterTicketUsers(){
        $.ajax({
        url : 'scripts/php/getTicketUsers.php',
        type : 'POST',
        data :  {users:document.getElementById("users").options[document.getElementById("users").selectedIndex].value},////<---- change this to filter by type, you can pass category type
        dataType:'json',
        success : function(data) { 
          ////using HTML Table as a simple way to show, you make it better or leave it...Nothing wrong with HTML tables!
            ////remember   that .innerhtml will close each tag after every time used so you must build a string then add it
           document.getElementById("display").innerHTML = "";
  "Select Priority<br>" +
      "<br><br><select id='priority' name='priority' length='31'></select>";
      "<br><br><input type='submit' value='Submit Ticket' onclick='ShowFilterTicket()'><br>"
           var ticketTable = "<table class='table table-bordered table-hover'><tr><th>Submitter</th><th>Category</th><th>Priority</th><th>Subject</th><th>Department</th><th>Time Issued:</th><th>View</th><th>Delete</th></tr>";
            for(var i = 0; i < data.length; i++)
            {
               //ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td>" + data[i].timeIssued + "</td><td><input type='button' value='View' onclick='ViewTicket(" + data[i].id + ")'</td><td><input type='button' value='Delete' onclick='Delete(" + data[i].id + ");ShowTickets()'</td></tr>";
                ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td>" + data[i].timeIssued + "</td><td><button type='button' class='btn btn-custom' data-toggle='modal' data-target='#myModal"+i+"'>View</button></td><div class='modal fade' id='myModal"+i+"' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Description:</h4></div><div class='modal-body'><p>Due: "+data[i].DueDate+"<br>"+data[i].tickD+"</p></div><div class='modal-footer'><button type='button' class='btn btn-custom' data-dismiss='modal'>Close</button></div></div></div></div><td><input type='button' value='Delete' onclick='Delete(" + data[i].id + ");ShowTickets()'</td></tr>";
            }
            ticketTable += "</table>";
             document.getElementById("display").innerHTML += ticketTable;
        }
    });
    
}






function ViewTicket(id)
{
         $.ajax({
        url : 'scripts/php/getTicketID.php',
        type : 'POST',
        data : {id},////<---- change this to filter by type, you can pass category type
        dataType:'json',
        success : function(data) { 
          document.getElementById("display").innerHTML = "";
          ////using HTML Table as a simple way to show, you make it better or leave it...Nothing wrong with HTML tables!
            ////remember that .innerhtml will close each tag after every time used so you must build a string then add it
           var ticketTable = "<table class='table table-bordered table-hover'><tr><th>Submitter</th><th>Category</th><th>Priority</th><th>Subject</th><th>Department</th><th>Time Issued:</th></tr>";
            for(var i = 0; i < data.length; i++)
            {
               ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td></td></tr><tr><td>" + data[i].tickD + "<td></tr>";
            }

            ticketTable += "</table>";
             document.getElementById("display").innerHTML += ticketTable;
        }
    });
    
}



function Delete(id)
{
         $.ajax({
        url : 'scripts/php/DeleteTicketID.php',
        type : 'POST',
        data : {id},////<---- change this to filter by type, you can pass category type
        dataType:'json',
        success : function(data) { 
          document.getElementById("display").innerHTML = "";
          ////using HTML Table as a simple way to show, you make it better or leave it...Nothing wrong with HTML tables!
            ////remember that .innerhtml will close each tag after every time used so you must build a string then add it
           var ticketTable = "<table class='table table-bordered table-hover'><tr><th>Submitter</th><th>Category</th><th>Priority</th><th>Subject</th><th>Department</th><th>Time Issued:</th><th>View</th></tr>";
            for(var i = 0; i < data.length; i++)
            {
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
            var ticketTable = "<table class='table table-bordered table-hover'><tr><th>Submitter</th><th>Category</th><th>Priority</th><th>Subject</th><th>Department</th><th>Time Issued:</th><th>View</th><th>Delete</th></tr>";
            for(var i = 0; i < data.length; i++)
            {
               //ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td>" + data[i].timeIssued + "</td><td><input type='button' value='View' onclick='ViewTicket(" + data[i].id + ")'</td><td><input type='button' value='Delete' onclick='Delete(" + data[i].id + ");ShowTickets()'</td></tr>";
                ticketTable += "<tr><td>" + data[i].name + "</td><td>" + data[i].category + "</td><td>" + data[i].priority + "</td><td>" + data[i].subject + "</td><td>" + data[i].department + "</td><td>" + data[i].timeIssued + "</td><td><button type='button' class='btn btn-custom' data-toggle='modal' data-target='#myModal"+i+"'>View</button></td><div class='modal fade' id='myModal"+i+"' role='dialog'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'>&times;</button><h4 class='modal-title'>Description:</h4></div><div class='modal-body'><p>Due: "+data[i].DueDate+"<br>"+data[i].tickD+"</p></div><div class='modal-footer'><button type='button' class='btn btn-custom' data-dismiss='modal'>Close</button></div></div></div></div><td><input type='button' value='Delete' onclick='Delete(" + data[i].id + ");ShowTickets()'</td></tr>";
            }
             ticketTable += "</table>";
             document.getElementById("display").innerHTML += ticketTable;
         }
     });
}


