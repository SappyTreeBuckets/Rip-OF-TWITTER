var firebaseConfig = {
      apiKey: "AIzaSyDL8hO7PKm0ibXXBsfIF9l0Qbc_kVL_w04",
      authDomain: "kwitterfirebase-98bd1.firebaseapp.com",
      databaseURL: "https://kwitterfirebase-98bd1-default-rtdb.firebaseio.com",
      projectId: "kwitterfirebase-98bd1",
      storageBucket: "kwitterfirebase-98bd1.appspot.com",
      messagingSenderId: "223804363421",
      appId: "1:223804363421:web:c934db6b40288af2403a74"
    };
firebase.initializeApp(firebaseConfig);
username = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         console.log(firebase_message_id);
         console.log(message_data);
         name = message_data['name'];
         message = message_data['message'];
         like = message_data['like'];
         name_with_tag = "<h4>" + name + "<img class = 'user_tick' src = 'tick.png'></h4>";
         message_with_tag = "<h4 class=message_h4>" + message + "</h4>";
         like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " +like+ "</span></button><hr>";
         row = name_with_tag + message_with_tag + like_button + span_with_tag;
         document.getElementById("output").innerHTML += row;
      } });  }); }
getData();

function updateLike(message_id){
      console.log("clicked on like button -" + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      update_likes = Number(likes) + 1;
      console.log(update_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: update_likes
      });
}

function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:username,
            message:msg,
            like:0
      });
      document.getElementById("msg").value;
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}