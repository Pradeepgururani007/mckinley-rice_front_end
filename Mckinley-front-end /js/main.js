$(document).ready(function(){
      
      var clickCount = 0;
      $('.container-btn .btn').click(function(){
            $('#getartist').toggleClass('on');
      })
      $('#getartist .fa-close').click(function(){
            $('#getartist').removeClass('on');
            clickCount = 0;
      })


      $('.sub').click(function(){
            clickCount++;
            if(clickCount > 1){
                  alert("Data is being loaded, please be paitent");
            }
            else{
                  let term = document.getElementById("artist").value;
                  let limit = document.getElementById("track").value;
                  let resultElement = $('.result');
                  if( term == 'jack' && limit == 4){
                  $.ajax({
                        url:`http://itunes.apple.com/search?term=${term}&limit=${limit}`,
                        method: 'get',
                        dataType: 'jsonp',
                        crossDomain: true,
                        success: function(data){
                              var initial = data.results[0];
                              $('#getartist').removeClass('on');
                              for(i = 0;i < data.results.length; i++){
                                          $('.infotabs .tab-nav .link').append(`<a class='tab' href='#' id='${data.results[i].artistName}'>${data.results[i].artistName}</a>`);    
                              }
                              $('.infotabs').addClass('on');
                              // set default data in tabs
                              $('.tab-content .artst').append(`${initial.artistName}`);
                              $('.tab-content .trac').append(`${initial.trackName}`);
                              $('.tab-content .thumb').attr('src',`${initial.artworkUrl30}`);
                              $('.tab-nav .link a:nth-child(1)').addClass('active');
                  },
                  error: function (jqXHR, exception) {
                        var msg = '';
                        if (jqXHR.status === 0) {
                            msg = 'Not connect.\n Verify Network.';
                        } else if (jqXHR.status == 404) {
                            msg = 'Requested page not found. [404]';
                        } else if (jqXHR.status == 500) {
                            msg = 'Internal Server Error [500].';
                        } else if (exception === 'parsererror') {
                            msg = 'Requested JSON parse failed.';
                        } else if (exception === 'timeout') {
                            msg = 'Time out error.';
                        } else if (exception === 'abort') {
                            msg = 'Ajax request aborted.';
                        } else {
                            msg = 'Uncaught Error.\n' + jqXHR.responseText;
                        }
                        $('#getartist').html(msg);
                    }
            });
      
                  }
                  else{   
                        alert('error validating');
                  }
            }
   

      });


      $('.tab-nav').on('click','.tab',function(event){
            let tabInfo = $(event.currentTarget).html();
            $(event.currentTarget).toggleClass('active');
            $(event.currentTarget).siblings().removeClass('active');
            $.ajax({
                  url:`http://itunes.apple.com/search?term=${tabInfo}&limit=1`,
                  method: 'get',
                  dataType: 'jsonp',
                  crossDomain: true,
                  success: function(dat){
                        $('.tab-content .artst').html(`${dat.results[0].artistName}`);
                        $('.tab-content .trac').html(`${dat.results[0].trackName}`);
                        $('.tab-content .thumb').attr('src',`${dat.results[0].artworkUrl30}`);                            
                  },
                  error: function (jqXHR, exception) {
                        var msg = '';
                        if (jqXHR.status === 0) {
                            msg = 'Not connect.\n Verify Network.';
                        } else if (jqXHR.status == 404) {
                            msg = 'Requested page not found. [404]';
                        } else if (jqXHR.status == 500) {
                            msg = 'Internal Server Error [500].';
                        } else if (exception === 'parsererror') {
                            msg = 'Requested JSON parse failed.';
                        } else if (exception === 'timeout') {
                            msg = 'Time out error.';
                        } else if (exception === 'abort') {
                            msg = 'Ajax request aborted.';
                        } else {
                            msg = 'Uncaught Error.\n' + jqXHR.responseText;
                        }
                        $('infotabs').html(msg);
                    }
            });
      
      });

});
