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
            if(type == "modal"){
                console.log($(el).data('body'));

                var body = $(el).data('body');
                if (!body) {
                    body = $(el).data('body-target') ? $($(el).data('body-target')).html() : "";
                }

                var params = {
                    'main_type':    "modal",
                    'title':        $(el).data('title'),
                    'body':         body,
                    'button_class': $(el).data('button'),
                    'width':        $(el).data('width'),
                    'static':       ($(el).data('static') ? "true" : "")
                }
            }else if(type == "noty" || type == "toastr"){
                var params = {
                    'main_type': type,
                    'body':    $(el).data('body'),
                    'type':    $(el).data('type'),
                    'layout':  $(el).data('layout'),
                    'timeout': $(el).data('timeout')
                }
            }else{
                alert("Il semble s'êre produit une erreur");
                $('#canvasloader-container').fadeOut();
            }
            return params;
        }
    });
})(jQuery);
