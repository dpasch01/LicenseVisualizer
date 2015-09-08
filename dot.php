<?php
    $content=file_get_contents($_FILES["dotInput"]["tmp_name"]);
    echo($content);
?>