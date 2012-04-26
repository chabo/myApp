$(document).ready(function(){

	importPictures();

  $(document).html('<p id="width">' + $(window).width() + '</p>');

  $('#toggleImages').toggle(
    function(){
      $('#images').css('visibility', 'hidden');
      $('#toggleImages').html('Show Images');
    },
    function(){
      $('#images').css('visibility', 'visible');
      $('#toggleImages').html('Hide Images');
    }
  );
  
	importVideos();

  $('#toggleVideos').toggle(function(){
    
    $('#videos').fadeTo('10' , '0' );
    
    setTimeout(function(){
      $('#videos').fadeTo('visibility','hidden');
    }, 5000);
 
  },function(){
      $('#videos').fadeTo('10', '1');
      $('#videos').css('visibility', 'visible');
    }
    
  ); 

	importMusic();

	$('h1').click(function(){
		console.log('clicked h1');
		$('h1').css('color', 'red');
		$('h1').fadeTo('3', '0.5');
	});

	$('#revertcolor').click(function(){
		$('h1').css('color', 'black');
		$('h1').fadeTo('3', '1.0');
	});

	$('#toggleColor').toggle(
		function(){

			$('#smallsurface').css('background-color', 'red');
			$('#toggleColor').html('toBlack');
			}, 
		function(){
			$('#smallsurface').css('background-color', 'black');
			$('#toggleColor').html('toRed');
		});

	$('#smallsurface').css('width','100px');	
	$('#smallsurface').css('background-color','black');

});
	
$(window).resize(function() {
	console.log('rezizing');
	$('p id="width"').replaceWith('<p id="width">' + $(window).width() + '</p>');
});

function importMusic() {
	
	$.getJSON("http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=chabo_sthlm&api_key=845cd0ae41ff27da9fec7e2a09b9f7f1&limit=10&format=json" , function(data) {
		
		console.log(data.recenttracks.track[1].artist['#text']);

		for(var i = 0; i <10; i++) {
			$('#songs').append('<li id=song'+ [i] +  '>' + '<dt class="artist" title="artist" > ' + data.recenttracks.track[i].artist['#text'] + ' </dt><dd class="songtitle" title="songtitle"> ' +  data.recenttracks.track[i].name + '</dd></li>');		
		}
	 });
}

function importVideos() {
	$.ajax({
    url: "http://vimeo.com/api/v2/challberg/likes.json",
    dataType: "jsonp",
    success: function(data) {
        //$('#videos').text(JSON.stringify(data[0].url));
        $('#videos').append('<p>' + data[0].url + '</p>');
        console.log(data[1].url);
    },  
    error: function(errorSender, errorMsg) {
        $('#output').text(errorSender + ' ' + errorMsg);
    }
});
}

function importPictures() {
	
	console.log('trying to find some pics');
	$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  		{
    		tags: "cat",
    		tagmode: "any",
    		format: "json"
  		},
  	function(data) {
    	$.each(data.items, function(i,item){
      		$("<img/>").attr("src", item.media.m).appendTo("#images");
      		if ( i == 3 ) return false;
    	});
  	});

}
