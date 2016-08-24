$(document).ready(function () {

	var parseApplicationId = 'X5ScYGClDCL7LONVxJyrnB93mfyO1jerCiGqSTRd'
	var parseJavaScriptKey = 'f9kYD58TwhFEp3pK4L2L47KjtdsFLzIW3dtDiIG2'
	
	//change parseApplicationId and parseJavaScriptKey to values from Parse.com application dashboard
	Parse.initialize(parseApplicationId, parseJavaScriptKey);
	Parse.serverURL = 'https://parseapi.back4app.com/'
  
    var feeds = Parse.Object.extend("feeds");
    function getFeeds(){
    	var query = new Parse.Query(feeds);
    	query.find({
    		success : function(results){
    			for ( var i in results ) {
    				var captions = results[i].get("captions");
    				var intros = results[i].get("intros");
    				var imageURl = results[i].get("images").url();
    				$('<div>').attr('class','card')
    					.append( $('<img>').attr('class', 'card-img-top').attr('src', imageURl) )
    					.append( $('<div>').attr('class','card-block')
    								.append( $('<h4>').attr('class','card-title').html(captions) )
    								.append( $('<p>').attr('class','card-text').html(intros) )
    								.append( $('<a>').attr('class','detail').attr('href','#').html('Detail') )
    								.append( $('<a>').attr('class','share').attr('href','#')
    											.append( $('<img>').attr('src',"asset/web.png") ) 
    										)
    							).appendTo('.card-columns');
    			}

    		}, error : function(error){
    			console.log(error.message);
    		}
    	});

    }
    getFeeds();

});


