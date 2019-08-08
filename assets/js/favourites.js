$('document').ready(function () {


    var firebaseConfig = {
        apiKey: "AIzaSyBQfhwOmLs8gR69DQayZ5pZpOpZTq2qw2I",
        authDomain: "dis-connect.firebaseapp.com",
        databaseURL: "https://dis-connect.firebaseio.com",
        projectId: "dis-connect",
        storageBucket: "",
        messagingSenderId: "25885376183",
        appId: "1:25885376183:web:d3e09c857764dc9d"
      };
  
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
  
      var database = firebase.database();



      var appendFave = $('<div>').attr({
        class: 'card',
        name: name,
        price: price,
        image: image,
        desc: desc,
        release_date: release_date
       
     
      })

    $('#faves-section').append(appendFave);
  })


});