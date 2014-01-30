            
              window.fbAsyncInit = function() {
            FB.init({
              appId      : '649640785069496', // App ID
              channelUrl : 'http://hashbook.20d.mx', // Channel File
              status     : true, // check login status
              cookie     : true, // enable cookies to allow the server to access the session
              xfbml      : true  // parse XFBML
            });

             // Here we subscribe to the auth.authResponseChange JavaScript event. This event is fired
              // for any authentication related change, such as login, logout or session refresh. This means that
              // whenever someone who was previously logged out tries to log in again, the correct case below 
              // will be handled. 
              FB.Event.subscribe('auth.authResponseChange', function(response) {
                // Here we specify what we do with the response anytime this event occurs. 
                if (response.status === 'connected') {
                  // The response object is returned with a status field that lets the app know the current
                  // login status of the person. In this case, we're handling the situation where they 
                  // have logged in to the app.
                  testAPI();
                } else if (response.status === 'not_authorized') {
                  // In this case, the person is logged into Facebook, but not into the app, so we call
                  // FB.login() to prompt them to do so. 
                  // In real-life usage, you wouldn't want to immediately prompt someone to login 
                  // like this, for two reasons:
                  // (1) JavaScript created popup windows are blocked by most browsers unless they 
                  // result from direct interaction from people using the app (such as a mouse click)
                  // (2) it is a bad experience to be continually prompted to login upon page load.
                  FB.login();
                } else {
                  // In this case, the person is not logged into Facebook, so we call the login() 
                  // function to prompt them to do so. Note that at this stage there is no indication
                  // of whether they are logged into the app. If they aren't then they'll see the Login
                  // dialog right after they log in to Facebook. 
                  // The same caveats as above apply to the FB.login() call here.
                  FB.login();
                }
              });
              };

          // Load the SDK asynchronously
          (function(d){
             var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
             if (d.getElementById(id)) {return;}
             js = d.createElement('script'); js.id = id; js.async = true;
             js.src = "//connect.facebook.net/en_US/all.js";
             ref.parentNode.insertBefore(js, ref);
           }(document));

          // Here we run a very simple test of the Graph API after login is successful. 
          // This testAPI() function is only called in those cases. 
          function testAPI() {
            console.log('Welcome!  Fetching your information.... ');
            FB.api('/me', function(response) {
              console.log('Good to see you, ' + response.id + '.');
              // set cookie
              setCookie("user",response.id, 40);

              if (window.XMLHttpRequest)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
                }
              else
                {// code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                }
              xmlhttp.onreadystatechange=function()
                {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                  {
                  //document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
                  }
                }
              xmlhttp.open("GET","save_user.php?id="+response.id,true);
              xmlhttp.send();

            });
          }

          function logout(){
          FB.logout(function(response) {
            // user is now logged out
          });
        }
          
          function getUserObject(query){
            if(query) {
                var stream = document.getElementById("postStream");
                var newHTML= "";
                for(var j = 0; j<query.length; j++){
                console.log(query[j]);
                FB.api('/me/home?q='+query[j], function(response) {
                    if (response.data){
                
                        for(var i = 0; i<response.data.length && i<2; i++)
                            {
                                var message = response.data[i].message;
                                var name = response.data[i].from.name;
                                var img =  response.data[i].from.id;
                                if((message!="") || (typeof message !=="undefined") || (message.split(" ").length>5)) {
                                  console.log(message);
                                  stream.innerHTML  += "<div id='box' class='row'><div id ='profilepic' class='col-md-3'><img src='http://graph.facebook.com/"+img+"/picture?type=square' height='75' width='75'></div><div id = 'content' class='col-md-9'><h4 id= 'name'>"+name+"</h4><p>"+message+"</p></div></div>&nbsp;";
                                }
                            }
                            

                    }   });
                }
                
            }}


        window.onload = function() {
          var arr;
          if (window.XMLHttpRequest)

                  {// code for IE7+, Firefox, Chrome, Opera, Safari
                  xmlhttp=new XMLHttpRequest();
                            

                  }
                  else
                  {// code for IE6, IE5
                  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                  }
                  xmlhttp.onreadystatechange=function()
                  {
                  if (xmlhttp.readyState==4 && xmlhttp.status==200)
                    {
                    //document.getElementById("txtHint").innerHTML=xmlhttp.responseText;
                    }
                  }

                var theid = getCookie("user");
                
                var theid2 = encodeURIComponent(theid);
                xmlhttp.open("GET","get_my_tags.php?id="+theid,true);
                xmlhttp.send();

               $.get( "get_my_tags.php?id="+theid2, function( data ) {
                //var arr = new array(data);
                arr = data.split(",");
                var right = document.getElementById("content_right");
                for(var i = 0; i<arr.length && i<45; i++)
                            {
                               
                                var tag = arr[i];
                                if(tag!="")
                                right.innerHTML  += "<p><li><a href='#'>#"+arr[i]+"</a></li></p>";

                                }
                //console.log(data.split(",")[0]);


                });
                //console.log(data.split(",")[0]);



		 setTimeout(function (){ getUserObject(arr); }, 1000);
          console.log("Hiiii");
          //document.getElementById("fbLogout").onclick = function() { logout() }
        }
        function setCookie(c_name,value,exdays)
        {
          var exdate=new Date();
          exdate.setDate(exdate.getDate() + exdays);
          var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
          document.cookie=c_name + "=" + c_value;
        }


