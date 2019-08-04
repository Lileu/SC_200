var state = {
   games : []
}

$('document').ready(function(){
  $('.submit-button').on('click', function(e){
    e.preventDefault();

    var categoryVal = $('#category-selector').val(); 
    var genreVal = $('#genre-selector').val(); 

    $.ajax({
      url : `https://steam.cmandersen.com/apps?limit=9&random=1&category=${categoryVal}&genre=${genreVal}&free=0&_=${Date.now()}`, 
      method : 'GET'
    })
    .then((resp) => {
      console.log(resp)
    })
  })

});