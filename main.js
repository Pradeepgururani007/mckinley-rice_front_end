$(document).ready(function() {

$('.btn').click(function(){
	$('#getartist').toggleClass('on');
})
$('#getartist .fa-close').click(function(){
	$('#getartist').removeClass('on');
})


// form submission ajax
$("#getartist").submit(function(e) {
var term = document.getElementsById("artist").value;
var limit = document.getElementById("track").value;
var data = $('#getartist').serialize();
if( term == 'JACK' && limit == 4){
    $.ajax({
        type: "POST",
        url:`http://itunes.apple.com/search?term=${term}&limit=${limit}`,
        data: {
            format: 'json'
         },
        dataType: 'jsonp',
        crossDomain: true,
        success: function(data) {
               console.log("success");
         }
     })
     
}
else{
        
}     
e.preventDefault();
});

});