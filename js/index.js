$("#dotInput").fileinput(
    {
        'showPreview':false,
        'allowedFileExtensions':['dot'],
        'msgValidationError': "File type not valid.",
        'uploadLabel':'Visualize'
    }
);

$('button.fileinput-upload-button').on('click',function(){
   $('#uploadForm').submit(function(submitEvent) {    
        var formData = new FormData($(this)[0]);
        $.ajax({
            url: "dot.php",
            type: "POST",
            data: formData,
            async: true,
            success: function (data) {
                $("#dotInput").fileinput('reset');
                $("div.graph-browse").hide();
                $('#graphContainer').addClass("graph-container");
                initializeGraph(data,'graphContainer');
            },
            cache: false,
            contentType: false,
            processData: false
        });
        submitEvent.preventDefault();
    });

    $('uploadForm').submit();
});