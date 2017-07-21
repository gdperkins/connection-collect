var injected = injected || (function(){

  // An object that will contain the "methods"
  // we can use from our event script.
  var methods = {};

  methods.downloadConnections = function(){
    //click the show more button if the section isn't visible
    var data = [];
    var button = $('button[data-control-name=contact_see_more]');
    if (button !== null) {
      $('button[data-control-name=contact_see_more]').click();
    } else {
      return data;
    }

    var details = $('.pv-profile-section__section-info section');
    
    
    $.each(details, function(i, v){
      var value = "";
      value = $(v).find('.pv-contact-info__contact-item').text();

      if (value == "") {
        value = $(v).find('.pv-contact-info__list li a').text()
      }

      var item ={
        key: $.trim($(v).find('header').text()),
        value: $.trim(value)
      };
      data.push(item);
      console.log(item);
    });
      
    return data;
  };

  // This tells the script to listen for
  // messages from our extension.
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = {};
    // If the method the extension has requested
    // exists, call it and assign its response
    // to data.
    if (methods.hasOwnProperty(request.method))
      data = methods[request.method]();
    // Send the response back to our extension.
    sendResponse({ data: data });
    return true;
  });

  return true;
})();