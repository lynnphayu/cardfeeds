$(document).ready(function () {

    window.paceOptions = {
        ajax: true, // disabled
        document: false, // disabled
        eventLag: false, // disabled
        elements: {
            selectors: ['#detail']
        }
    };





    var initialHeight = 0;
	var parseApplicationId = 'X5ScYGClDCL7LONVxJyrnB93mfyO1jerCiGqSTRd'
	var parseJavaScriptKey = 'f9kYD58TwhFEp3pK4L2L47KjtdsFLzIW3dtDiIG2'
	
	//change parseApplicationId and parseJavaScriptKey to values from Parse.com application dashboard
	Parse.initialize(parseApplicationId, parseJavaScriptKey);
	Parse.serverURL = 'https://parseapi.back4app.com/'
  
    var feeds = Parse.Object.extend("feeds");
    function getFeeds(){
    	var query = new Parse.Query(feeds);
        Pace.track(function(){
    	query.find({
    		success : function(results){
    			for ( var i in results ) {
                				

    		}, error : function(error){
    			console.log(error.message);
    		}
    	});
        });

    }
    getFeeds();
    
});


