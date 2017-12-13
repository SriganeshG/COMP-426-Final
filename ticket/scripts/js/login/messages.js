function getmessage(messageId)
{
     var message = "";
     messageId = parseInt(messageId);
    console.log(messageId);
     switch(messageId)
     {
          case 0:
                 message = "This username is taken";
                 break;
          case 1:
                 message = "Registration complete! Please log in"
                 break;
          case 2:
                 message = "Passwords do not match!"
                 break;
          case 3:
                 message = "Username is too short"
                 break;
          case 4:
                 message = "Username is too long"
                 break;
          case 5:
                 message = "You did not enter a password"
                 break;

     }
    console.log(message);
         return message;
}