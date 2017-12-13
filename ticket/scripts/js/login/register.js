function register()
{
    if($('#registerPassword').val() != $('#rePassword').val())
    {
           $("#registerMsgbox").fadeTo(200,0.1,function()
			{ 
			  $(this).html(getmessage(0)).addClass('alert alert-danger').fadeTo(900,1);
			});	
        return;
    }
     if($('#registerUsername').val().length < 3)
    {
           $("#registerMsgbox").fadeTo(200,0.1,function()
			{ 
			  $(this).html(getmessage(3)).addClass('alert alert-danger').fadeTo(900,1);
			});	
        return;
    }
      if($('#registerUsername').val().length > 16)
    {
           $("#registerMsgbox").fadeTo(200,0.1,function()
			{ 
			  $(this).html(getmessage(4)).addClass('alert alert-danger').fadeTo(900,1);
			});	
        return;
    }
     if($('#registerPassword').val().length < 4)
    {
           $("#registerMsgbox").fadeTo(200,0.1,function()
			{ 
			  $(this).html(getmessage(5)).addClass('alert alert-danger').fadeTo(900,1);
			});	
        return;
    }
     $.ajax({
        url : 'scripts/php/register.php',
        type : 'POST',
        data : { userName:$('#registerUsername').val(),password:$('#registerPassword').val()
        },
        dataType:'json',
        success : function(data) { 
            if(data == "1")
            {
                loginPage();
                $("#msgbox").fadeTo(200,0.1,function()
                    { 
                      $(this).html(getmessage(data)).addClass('alert alert-success').fadeTo(900,1);
                    });		
            }
            else
            {
                $("#registerMsgbox").fadeTo(200,0.1,function()
                { 
                  $(this).html(getmessage(data)).addClass('alert alert-danger').fadeTo(900,1);
                });	
            }
        }
    });
}