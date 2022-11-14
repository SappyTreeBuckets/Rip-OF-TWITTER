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
document.getElementById("user_name").innerHTML = "Welcome " + username +"!";

function addRoom(){
      room_name = document.getElementById("room_name").value;

      firebase.database().ref("/").child(room_name).update({
            purpose : "Adding Room Name"
      });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";

}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
       console.log("Room Name -" + Room_names);
       row = "<div class='room_name' id="+Room_names+" onclick = 'redirectToRoomName(this.id)' > # " + Room_names + "</div><hr>";
       document.getElementById("output").innerHTML += row;
      });});}
getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("room_name",name);
window.location = "kwitter_page.html";

}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
