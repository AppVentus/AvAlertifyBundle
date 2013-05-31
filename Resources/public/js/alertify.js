(function($) {
    $(document).ready(function() {
        $('body').prepend('<div id="canvasloader-container"></div>');
        createLoader('#canvasloader-container');

        $(document).on('click', '[data-alertify]', function(event) {
            event.preventDefault();
            $('#canvasloader-container').fadeIn();
            $("#alertify-container").data('update-effect', "show");
            $("#alertify-container").data('new-effect', "show");
            var params = getParams(this);
            $.ajax({
                'url':  "/alertify/ajax",
                'context': document.body,
                'type': "POST",
                'data': $.param(params),
                'success': function(jsonResponse) {
                    ajaxify(jsonResponse, "alertify-container");
                },
                'error': function(jsonResponse) {
                    alert("Il semble s'êre produit une erreur");
                    $('#canvasloader-container').fadeOut();
                }
            });

            return false;
        });

        function getParams(el){
            var type = $(el).attr("data-alertify");
            var params = {};
            var callback = false;
            if(type == "callback"){
                type = $(el).data('type');
                callback = true;
            }

            if(type == "modal"){

                var body = $(el).data('body');
                if (!body) {
                    body = $(el).data('body-target') ? $($(el).data('body-target')).html() : "";
                }

                params = $.extend({}, params, {
                    'main_type':    "modal",
                    'title':        $(el).data('title'),
                    'body':         body,
                    'button_class': $(el).data('button'),
                    'width':        $(el).data('width'),
                    'static':       ($(el).data('static') ? "true" : "")
                });
            }else if(type == "noty" || type == "toastr"){
                params = $.extend({}, params, {
                    'main_type': type,
                    'body':    $(el).data('body'),
                    'type':    $(el).data('type'),
                    'layout':  $(el).data('layout'),
                    'timeout': $(el).data('timeout')
                });
            }else{
                alert("Il semble s'êre produit une erreur");
                $('#canvasloader-container').fadeOut();
            }
            if (callback){
                params = $.extend({}, params, {
                    'main_type':    "callback",
                    'type':         $(el).data('type'),
                    'action':        $(el).data('action')?$(el).data('action'):$(el).attr('href'),
                    'args':         $(el).data('args'),
                    'actionType':        $(el).data('actionType'),
                });
            }
            console.log(params);
            return params;
        }
    });
})(jQuery);
