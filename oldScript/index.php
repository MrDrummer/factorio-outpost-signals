<!--<!DOCTYPE html>
<html lang="en">
  <head>
    <title>
      <?php
        //echo("EJ_SA | ");
        //echo basename($_SERVER['PHP_SELF']);
      ?>
    </title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <!-- jQuery ajax library --
    <!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>--
  </head>
  <body onload="init()">
    <h1>Main Form</h2>
    <form action="convert.php" method="POST" enctype="multipart/form-data">
      <input type="file" name="uploadFile">

      <button type="submit" name="uploadSubmit">Upload</button>
    </form>
    <h1>Test Form</h2>
    <form action="jsonTest.php" method="POST" enctype="multipart/form-data">
      <input type="file" name="uploadFile2">

      <button type="submit" name="uploadSubmit2">Upload</button>
    </form>




    <script src="javascript.js"></script>
  </body>
</html>-->

<?php
  error_reporting(-1);
  function numbers($array = array(),$signal = "signal_cyan_blue-",$quantity = "10",$start = "0", $additional = "false") {
    $count = (int)$start;
    $signalNumbers = $array;
    foreach(range(1,(int)$quantity) as $index) {
      //echo "\n";
      /*echo "<br>";
      echo "Signal: $signal";
      echo "<br>";
      echo "Count: $count";
      echo "<br>";*/

      //echo $signal.(string)$count;
      array_push($signalNumbers, $signal.(string)$count);
      if ($additional != "false") {
        array_push($signalNumbers, $signal.(string)$count.$additional);
      }
      //echo "\n";
      //echo "<br>";
      $count += 1;
    }
    return $signalNumbers;
  }
  
  
  
  $debug = False;
  $config = file_get_contents("config.json");
  //echo "<br><br><br><br>";
  //echo $config;
  //echo "<br><br><br><br>";

  $jsonConfig = strip_tags($config);

  $jsonConfig = json_decode($jsonConfig, true);
  //configParse($jsonConfig, "colours");
  //echo "<br><br><br><br>\$jsonConfig->colours: ";
  //var_dump($jsonConfig);
  //echo "<br><br><br><br>";
  
  //echo "<br><br><br><br>\$jsonConfig[0]: ";
  //var_dump($jsonConfig["colours"][0]);
  //echo "<br><br><br><br>";
  

  //MAIN ARRAY
  $signalTypes = array();
  
  //var_dump($jsonConfig); 

  //echo "<textarea>";
  
  //Itterate through each group key
  while ($ids = current($jsonConfig)) {
  //foreach ($jsonConfig as $ids){
    //echo "<br><br><br>key(\$ids):<br>";
    //print_r(key($jsonConfig));
    $groupKey = key($jsonConfig);
    
    
    
    //########## DEBUG ##########
    if ($debug == True) {
      echo "<br><br><br>Item:<br>";
      print_r($ids);
      
      echo "<br><br><br>GROUP KEY: $groupKey<br>";
      echo "print test: $groupKey<br>";
      print_r($ids[0]["ids"]);
    }
    //########## DEBUG ##########
    
    
    //echo "<br>idsmain: ".$ids[0]["ids"];
    $lettersEnabled = $ids[0]["letters"];
    $numbersEnabled = $ids[0]["numbers"][0]["enabled"];
    $numbersQuantity = $ids[0]["numbers"][0]["quantity"];
    $numbersStart = $ids[0]["numbers"][0]["start"];
    if (array_key_exists("additional",$ids[0])) {
      $additional = $ids[0]["additional"];
    } else {
      $additional = "false";
    }
    //########## DEBUG ##########
    if ($debug == True) {
      echo "<br><br>=====VARIABLES=====";
      
      echo "<br><br>letters: ".$lettersEnabled;
      
      //echo "<br><br>numbers array: ".$ids[0]["numbers"]);
      
      echo "<br><br>numbers enabled: ".$numbersEnabled;
      
      echo "<br><br>numbers quantity: ".$numbersQuantity;
      
      echo "<br><br>letters start: ".$numbersStart;
      
      if ($additional != NULL) {
        echo "<br><br>ADDITIONAL: ".$additional;
      }
      
      echo "<br><br>=====VARIABLES END=====";
    }
    //########## DEBUG ##########
    
    foreach ($ids[0]["ids"] as $ids2){
      //echo "<br>\$ids2:<br>";
      //echo $ids2["signal"];
      
      //Colour Letter Generation
      if ($lettersEnabled == "true"){
        foreach (range("A","Z") as $letter){
          array_push($signalTypes, $ids2["signal"].$letter);
        }
      }
      if ($numbersEnabled == "true"){
        //Colour Number Generation
        $signalTypes = numbers($signalTypes, $ids2["signal"], $numbersQuantity, $numbersStart, $additional);
      }

      
      
      
    }
    
    //Colour Numbers And Letters generation
    //print_r($jsonConfig[$category]["letters"]);

    
    
    
    
    //echo "<br>end item<br><br>";
    
    
    
    //########## DEBUG ##########
    if ($debug == True) {
      echo "<br>idsmain:<br>";
      var_dump($ids[0]["ids"]);
      
      echo "<br><br>letters:<br>";
      var_dump($ids[0]["letters"]);
      
      echo "<br><br>numbers array:<br>";
      var_dump($ids[0]["numbers"]);
      
      echo "<br><br>numbers enabled:<br>";
      var_dump($ids[0]["numbers"][0]["enabled"]);
      
      echo "<br><br>numbers quantity:<br>";
      var_dump($ids[0]["numbers"][0]["quantity"]);
      
      echo "<br><br>letters start:<br>";
      var_dump($ids[0]["numbers"][0]["start"]);
      echo "end item<br><br>";
    }
    //########## DEBUG ##########
    
    next($jsonConfig);
  }
  
  //###########################################
  //var_dump($jsonConfig["colours"][0]);
  //Colour Numbers And Letters generation
  /*foreach ($jsonConfig["colours"][0][0] as $ids){
    //echo (string)$colours;
    //echo "Test.<br>";
    //print_r ($ids);
    //echo "<br><br><br><br>";
    //echo $ids->signal;
    //echo "\n";
    //echo "<br><br><br><br>";


    //Colour Letter Generation
    foreach (range("A","Z") as $letter){
      array_push($signalTypes, $ids["signal"].$letter);
      echo "<br><br><br>".$ids["signal"]."<br><br><br>";
      //echo $ids->signal.$letter;
      //echo "\n";
    }

    //Colour Number Generation
    $signalTypes = numbers($signalTypes, $ids["signal"], "10", "0");


  }*/
  //echo "</textarea>";
  //echo "<br><br><br><br>";
  //###########################################
  
  
  //Output values test (debug)

  echo "<h2>prototypes</h2>";
  echo "<textarea cols='150' rows='50'>";

  echo "data:extend({";
  echo "\n";
  $countItem = 1;
  $countLetter = "A";
  $countLetterGroup = "A";
  
  /*echo "\nVar Dump:";
  echo "\n";
  var_dump($signalTypes);
  echo "\n";
  echo "\n";*/
  //Removes signal_ from the start of the format
  $colourSplit = preg_split("/signal_(\/*)/", $signalTypes[0]);
  
  //splits the resulting string into two, colour and number/letter
  $colourSplit = preg_split("/(\/*)-/", $colourSplit[1]);
  
  $namedItem = $colourSplit[0];
  /*echo "\n";
  echo "\n";
  echo $namedItem;
  echo "\n";
  echo "\n";*/
  $signalTypeArray = array();
  foreach ($signalTypes as $item) {
    
    //echo $item;
    echo "  {";
    echo "\n";
    echo "    type = \"virtual-signal\",";
    echo "\n";
    echo "    name = \"$item\",";
    echo "\n";
    echo "    icon = \"__Outpost Signals__/graphics/$item.png\",";
    echo "\n";
    echo "    icon_size = \"32\",";
    echo "\n";
    //echo "\n";
    
    //Removes signal_ from the start of the format
    $colourSplit = preg_split("/signal_(\/*)/", $item);
    //print_r($colourSplit[1]);
    //echo "\n";
    //echo "\n";
    
    //splits the resulting string into two, colour and number/letter
    $colourSplit = preg_split("/(\/*)-/", $colourSplit[1]);
    //print_r($colourSplit);
    //echo "\n";
    //echo "\n";
    
    if ($colourSplit[0] != $namedItem) {
      $countItem += 1;
      if ($countLetter != "Y") {
        $countLetter++;
        $countLetterGroup = "A";
      } else {
        $countLetter = "ZA";
      }
      //echo "\n\nLETTER GROUP\n\n$countLetterGroup\n\n";
      
      array_push($signalTypeArray, $namedItem);              
    }
    
    $namedItem = $colourSplit[0];
    
    //$colourSplit[0] = colour
    
    //print_r($colourSplit);
    //echo "\n";
    //echo "\n";
    //echo "    c[letters]-[$colourSplit[0]]-[$colourSplit[1]]";
    //echo "\n";
    //$countItem
    //echo "\nCOUNT LETTER\n\n$countLetter\n";
    
    echo "    subgroup = \"virtual-signal-$namedItem\","; 
    echo "\n";
    echo "    order = \"".$countLetter."[$namedItem]-[".$countLetterGroup."]\"";//$colourSplit[1]
    echo "\n";
    echo "  },";
    echo "\n";
    /*echo "\n";
    echo "\n";
    echo $countItem;
    echo "\n";
    echo "\n";*/
    
    /*if ($colourSplit[0] != $namedItem) {
      $countItem += 1;              
    }
    $namedItem = $colourSplit[0];*/
    //$countLetter++;
    //$countLetterGroup++;
    
    if ($countLetterGroup != "Y") {
      $countLetterGroup++;
    } else {
      $countLetterGroup = "ZA";
    }
    
    
  }
  echo "})";
  echo "</textarea>";
  array_push($signalTypeArray, $namedItem);




  echo "<h2>locale</h2>";
  echo "<textarea cols='150' rows='50'>";
  echo "[virtual-signal-name]";
  echo "\n";
  foreach ($signalTypes as $item) {
    //Item = signal_cyan_blue-G
    
    //Remove signal_
    $itemSplit = preg_split("/signal_(\/*)/", $item); 
    
    //Split at -
    $itemSplit = preg_split("/(\/*)-/", $itemSplit[1]);
    if (count($itemSplit) > 2) {
      $additional = " ".$itemSplit[2];
    } else {
      $additional = "";
    }
    
    //Replace _ with ''
    $itemSplit = str_replace('_', ' ', $itemSplit);
    
    //Final Name construction in the format of Cyan Blue Signal G
    $itemSplit = $itemSplit[0].$additional." Signal ".$itemSplit[1];
    
    //Uppercase all words
    $itemSplit = ucwords($itemSplit);
    
    //Output
    echo "$item=$itemSplit";
    echo "\n";
  }
  echo "[item-group-name]";
  echo "\n";
  echo "outpost-signals=Outpost Signals";
  echo "</textarea>";
  
  
  echo "<h1>subgroups</h1>";
  echo "<textarea cols='150' rows='50'>";
  echo "data:extend({";
  echo "\n";
  echo "  {";
  echo "\n";
  echo "    type = \"item-group\",";
  echo "\n";
  echo "    name = \"outpost-signals\",";
  echo "\n";
  echo "    order = \"t\",";
  echo "\n";
  echo "    inventory_order = \"z\",";
  echo "\n";
  echo "    icon = \"__Outpost Signals__/graphics/signals.png\",";
  echo "\n";
  echo "    icon_size = \"32\"";
  echo "\n";  
  echo "  },";
  echo "\n";
  $counter = 1;
  foreach ($signalTypeArray as $item) {
    echo "  {";
    echo "\n";
    echo "    type = \"item-subgroup\",";
    echo "\n";
    echo "    name = \"virtual-signal-$item\",";
    echo "\n";
    echo "    group = \"outpost-signals\",";
    echo "\n";
    echo "    order = \"$counter\",";
    echo "\n";
    echo "  },";
    echo "\n";
    $counter += 1;
    //echo "$item";
    //echo "\r";
  }
  echo "})";
  echo "</textarea>";
?>