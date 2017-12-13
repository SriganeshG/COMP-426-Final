function checkSession()
{
      $.ajax({
            url : 'scripts/php/checkSession.php',
            type : 'POST',
        dataType:'json',
        success : function(data) {
            if(data != 0)
            {
               userName = data[0].name;
              
            }
            else
            {
                 loginPage();
            }
        }
});
}

function login()
{
		$("#msgbox").removeClass().addClass('messagebox').text('Validating....').fadeIn(1000);  
        $.ajax({
            url : 'scripts/php/validation.php',
            type : 'POST',
            data : { user_name:$('#username').val(),password:$('#password').val()
        },
        dataType:'json',
        success : function(data) { 
          if(data != 0)
                {
                        $("#msgbox").fadeTo(200,0.1,function()
                        { 
                          $(this).html('Logging in...').addClass('alert alert-success').fadeTo(900,1,
                          function()
                          { 
                              $('#loginModal').modal('toggle');
                               userName = data[0].name;
                               console.log(userName);
                          });

                        });
            }
            else
            {
               $("#msgbox").fadeTo(200,0.1,function()
                    { 
                      $(this).html('Your login details are incorrect').addClass('alert alert-danger').fadeTo(900,1);
                    });		 
            }
        }
    });
}

function logout()
{
        $.ajax({
            url : 'scripts/php/logout.php',
            type : 'POST',
        dataType:'json',
        success : function(data) { 
           location.reload();
        }
    });
}

function registration()
{
      document.getElementById("registerBox").innerHTML = "<form class='form-horizontal' method='post' action='' id='register_form'>" +
					  "<div class='row'><div class='col-md-6 column'><div class='control-group'>" + 
						"<label class='control-label' for='username'>Username</label><div class=''controls'>" + 
						  "<input type='text' id='registerUsername' placeholder='Username'>" +
						"</div></div>" +
					  "<div class='control-group'>" +
						"<label class='control-label' for='password'>Password</label>" +
						"<div class='controls'>" +
						  "<input type='password' id='registerPassword' placeholder='Password'>" +
						"</div><br></div>" +
                        "<div class='control-group'>" +
						"<label class='control-label' for='rePassword'>Retype Password</label>" +
						"<div class='controls'>" +
						  "<input type='password' id='rePassword' placeholder='Retype Password'>" +
						"</div><br></div><div id='registerMsgbox'></div></div>" +
                        "</div>" +
					  "<div class='control-group'>" +
						"<div class='controls'>" +
						  "<input name='Submit' type='button' onclick='javascript:register()' value='Register' class='btn btn-success'/>" +
						"</div></div></form>";
    
}

function loginPage()
{
     $('#loginModal').modal('toggle');
      document.getElementById("registerBox").innerHTML = "<form class='form-horizontal' method='post' action='' id='login_form'>" +
					  "<div class='control-group'>" +
						"<label class='control-label' for='username'>Username</label>" +
						"<div class='controls'>" +
						  "<input type='text' id='username' placeholder='Username'></div></div>" +
					  "<div class='control-group'> " +
						"<label class='control-label' for='password'>Password</label>" +
						"<div class='controls'>" +
						  "<input type='password' id='password' placeholder='Password'>" +
						"</div><br>" +
                           "<div id='msgbox'></div></div>" +
					  "<div class='control-group'>" +
						"<div class='controls'>" +
						  "<input name='Submit' type='button' onclick='javascript:login()' value='Login' class='btn btn-success'/>&nbsp;&nbsp;" +
						  "<input name='Submit' type='button' onclick='javascript:registration()' value='Register' class='btn btn-success'/>" +
						"</div>" +
					  "</div>" +
					"</form></div><div class='modal-footer'></div>";
}



    