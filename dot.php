<?php
    require_once "vendor/easyrdf/easyrdf/lib/EasyRdf.php";

    $fileContent=file_get_contents($_FILES["dotInput"]["tmp_name"]);
    $info = new SplFileInfo($_FILES["dotInput"]["name"]);

    if(strcmp(strval($info->getExtension()),"dot")==0){
        $returnValue['status']="success";
        $returnValue['content']=$fileContent;  
        echo json_encode($returnValue);
        return;
    }

    $output_format_options = array();
    foreach (EasyRdf_Format::getFormats() as $format) {
        if ($format->getSerialiserClass()) {
            $output_format_options[$format->getLabel()] = $format->getName();
        }
        if ($format->getParserClass()) {
            $input_format_options[$format->getLabel()] = $format->getName();
        }
    }

    if (get_magic_quotes_gpc() and isset($fileContent)) {
       $fileContent = stripslashes($fileContent);
    }

    $_REQUEST['output_format'] = 'dot';
    $_REQUEST['input_format'] = 'guess';
   
    $graph = new EasyRdf_Graph();
    $returnValue = array();

    try {
        $graph->parse($fileContent, $_REQUEST['input_format']);
    }catch(EasyRdf_Exception $e){
        $returnValue['status']="failure";
        $returnValue['message']=$e->getMessage();
        echo json_encode($returnValue);
        return;
    }

    $format = EasyRdf_Format::getFormat($_REQUEST['output_format']);
    
    $output = $graph->serialise($format);
    if (!is_scalar($output)) {
        $output = var_export($output, true);
    }

    $returnValue['status']="success";
    $returnValue['content']=$output;
    echo json_encode($returnValue);

?>