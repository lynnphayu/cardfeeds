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
                    var id = results[i].id;
    				$('<div>').addClass('card')
    					.append( $('<img>').addClass('card-img-top').attr('src', imageURl) )
    					.append( $('<div>').addClass('card-block')
    								.append( $('<h4>').addClass('card-title').html(captions) )
    								.append( $('<p>').addClass('card-text').html(intros) )
    								.append( $('<a>' , { href: "#" } )
                                                .addClass('detail')
                                                .data("id",id)
                                                .html("Detail") 
                                                .click( function(){ attachclickeventhandler($(this).data('id')); } )
                                                )
    								.append( $('<a>' , { href: "#" } ).addClass('share')
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

    $('.detail').click(function(){
        attachclickeventhandler();
    }); 
    
    function attachclickeventhandler(id){
        
        var query = new Parse.Query(feeds);
        
        query.get(id, {
            success: function(object) {

                var caption = object.get("captions");
                var detail = object.get("deepDetail");
                var imageURl = object.get("images").url();

                $('#detail').addClass('deep-detail');
                
                $('.root').addClass('blurring');

                $('<div>').addClass('col-md-8 offset-md-2').append(
                    $('<div>').addClass('card')
                        .append( $('<div>').addClass('cross-img').append( $('<img>').attr('src', 'asset/cross.png') ).click( function(){ $('#detail>div').remove();   $('.root').removeClass('blurring');}) )
                        .append( $('<img>').addClass('card-img-top').attr('src', imageURl))
                        .append( $('<div>').addClass('card-block')
                                    .append( $('<h4>').addClass('card-title').html(id) )
                                    .append( $('<p>').addClass('card-text').html(detail) )))
                        .appendTo('#detail');

            },
            error: function(error) {
                console.log("An error occured :(");
            }
        });

    }

    if ( window.matchMedia('(max-width: 401px)').matches ){
        $(window).scroll(function(){

            function elementScrolled(elem){

                var docViewTop = $(window).scrollTop();
                var docViewBottom = docViewTop + $(window).height();
                var elemTop = $(elem).offset().top+150;
                var theresholdForTopCard = $(window).height()*1/10;
                var theresholdForBottomCard = $(window).height()*1/10;
                return (((elemTop-theresholdForBottomCard) <= docViewBottom) && ((elemTop+theresholdForTopCard) >= docViewTop));
            
            }
             
            // This is where we use the function to detect if ".box2" is scrolled into view, and when it is add the class ".animated" to the <p> child element
            $('.card-columns>.card').each( function(){

                if(elementScrolled($(this))) {
                    $(this).addClass('inSight');
                }
                else {
                    $(this).removeClass('inSight');
                }

            });
        });   
    }

});


