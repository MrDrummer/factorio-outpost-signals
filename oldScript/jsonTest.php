<?php
  $itemSplit = "signal_cyan_blue-G";
  
  echo "<br>item:<br>".var_dump($itemSplit)."<br>";
    
  //Remove signal_
  $itemSplit = preg_split("/signal_(\/*)/", $itemSplit);
  echo "<br><br>Remove signal_:<br>";
  var_dump($itemSplit[1]);
  
  //Split at -
  $itemSplit = preg_split("/(\/*)-/", $itemSplit[1]);   
  echo "<br><br>Split at -:<br>";
  var_dump($itemSplit);
  if (count($itemSplit) > 2) {
    $additional = $itemSplit[2];
  } else {
    $additional = "";
  }
  //Replace _ with ''
  $itemSplit = str_replace('_', ' ', $itemSplit);
  echo "<br><br>Replace _ with '':<br>";
  var_dump($itemSplit[0]);
  
  //Final Name construction in the format of Cyan Blue Signal G
  $itemSplit = $itemSplit[0]." $additional Signal ".$itemSplit[1];
  echo "<br><br>string construction:<br>";
  var_dump($itemSplit);
  
  //Uppercase all words
  $itemSplit = ucwords($itemSplit);
  
  echo "<br><br>ucwords():<br>";
  var_dump($itemSplit);
?>