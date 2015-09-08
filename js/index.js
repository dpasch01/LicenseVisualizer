$("#dotInput").fileinput(
    {
        'showPreview':false,
        'allowedFileExtensions':['rdf','owl','ttl'],
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
                data = JSON.parse(data);
                if(data.status=="failure"){
                    $("#dotInput").fileinput('reset');
                    swal("Error", data.message, "error");
                }else{
                    $("#dotInput").fileinput('reset');
                    $("div.graph-browse").hide();
                    $('#graphContainer').addClass("graph-container");
                    initializeGraph(data.content,'graphContainer');
                }
            },
            cache: false,
            contentType: false,
            processData: false
        });
        submitEvent.preventDefault();
    });

    $('uploadForm').submit();
});
