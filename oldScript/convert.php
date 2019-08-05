<?php
  function numbers($array = array(),$signal = "signal_cyan_blue-",$quantity = "10",$start = "0") {
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
      //echo "\n";
      //echo "<br>";
      $count += 1;
    }
    return $signalNumbers;
  }
  
  function configParse($jsonConfig, $category) {
    //Colour Numbers And Letters generation
    foreach ($jsonConfig->$category as $ids){
      print_r($jsonConfig->$category->letters);

      //Colour Letter Generation
      foreach (range("A","Z") as $letter){
        array_push($signalTypes, $ids->signal.$letter);
        //echo $ids->signal.$letter;
        //echo "\n";
      }

      //Colour Number Generation
      $signalTypes = numbers($signalTypes, $ids->signal, "10", "0");


    }
  }
  
  
  
  $debug = True;

  error_reporting(-1);
  $fileSizeLimit = 500000000;
  if (isset($_POST['uploadSubmit'])) {
    $allFiles = $_FILES['uploadFile'];

    //########## DEBUG ##########
    if ($debug == True) {
      echo "<br>All Files";
      print_r ($allFiles);
      echo "<br>";
    }
    $fileName = $_FILES['uploadFile']['name'];
    $fileTmpName = $_FILES['uploadFile']['tmp_name'];
    $fileSize = $_FILES['uploadFile']['size'];
    $fileError = $_FILES['uploadFile']['error'];
    $fileType = $_FILES['uploadFile']['type'];

    //file name is in the format [name].[extension]

    //Separates using the delimiter ".". This splits it into an array.
    $fileExt = explode('.', $fileName);

    //Sets this variable to the last item in the array (the actual extension)
    $fileActualExt = strtolower(end($fileExt));

    $allowedExt = array('txt','js','json');

    //if the file type is
    if (in_array($fileActualExt, $allowedExt)) {

      //if there are no errors
      if ($fileError === 0) {

        // If smaller than 500MB
        if ($fileSize < $fileSizeLimit) {

          $config = file_get_contents($fileName);
          echo "<br><br><br><br>";
          echo $config;
          echo "<br><br><br><br>";
          //########## DEBUG ##########
          if ($debug == True) {
            echo "<br>jsonConfig Type (Before Strip): ".gettype($config)."<br>";
            echo "CONFIG (Before Strip)<br>".$config."<br>";
          }

          $jsonConfig = strip_tags($config);

          //########## DEBUG ##########
          if ($debug == True) {
            echo "<br>jsonConfig Type (After Strip): ".gettype($jsonConfig)."<br>";
            echo "CONFIG (After Strip)<br>".$jsonConfig."<br>";
            var_dump($jsonConfig);
          }

          $jsonConfig = json_decode($jsonConfig);
          //configParse($jsonConfig, "colours");
          echo "<br><br><br><br>colours[1]";
          var_dump($jsonConfig);
          echo "<br><br><br><br>";
          //########## DEBUG ##########
          if ($debug == True) {
            echo "<br><br>jsonConfig Type (After Decode): ".gettype($jsonConfig)."<br>";
            echo "CONFIG (After Decode)<br>";
            var_dump($jsonConfig);
            echo "<br><br><br><br>";
            //$colours = $jsonConfig->colours;
            //print_r ($colours[0]);

            echo "<br><br><br>Config:<br>";
            print_r ($jsonConfig->colours);
            echo "<br><br><br><br>";
          }


          //MAIN ARRAY
          $signalTypes = array();

          //echo "<textarea>";
          
          
          
          //###########################################
          
          //Colour Numbers And Letters generation
          foreach ($jsonConfig->colours as $ids){
            //echo (string)$colours;
            //echo "Test.<br>";
            //print_r ($ids);
            //echo "<br><br><br><br>";
            //echo $ids->signal;
            //echo "\n";
            //echo "<br><br><br><br>";


            //Colour Letter Generation
            foreach (range("A","Z") as $letter){
              array_push($signalTypes, $ids->signal.$letter);
              //echo $ids->signal.$letter;
              //echo "\n";
            }

            //Colour Number Generation
            $signalTypes = numbers($signalTypes, $ids->signal, "10", "0");


          }
          //echo "</textarea>";
          //echo "<br><br><br><br>";
          //###########################################
          
          
          //Output values test (debug)

          echo "<h2>prototypes</h2>";
          echo "<textarea cols='150' rows='150'>";

          echo "data:extend({";
          echo "\n";
          $countItem = 1;
            
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
            //print_r($colourSplit);
            //echo "\n";
            //echo "\n";
            
            //splits the resulting string into two, colour and number/letter
            $colourSplit = preg_split("/(\/*)-/", $colourSplit[1]);
            if ($colourSplit[0] != $namedItem) {
              $countItem += 1;
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
            
            
            echo "    subgroup = \"virtual-signal-$namedItem\","; 
            echo "\n";
            echo "    order = \"".$countItem."[$namedItem]-[$colourSplit[1]]\"";
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
          }
          echo "})";
          echo "</textarea>";
          array_push($signalTypeArray, $namedItem);




          echo "<h2>locale</h2>";
          echo "<textarea cols='150' rows='150'>";
          echo "[virtual-signal-name]";
          echo "\n";
          foreach ($signalTypes as $item) {
            //Item = signal_cyan_blue-G
            
            //Remove signal_
            $itemSplit = preg_split("/signal_(\/*)/", $item); 
            
            //Split at -
            $itemSplit = preg_split("/(\/*)-/", $itemSplit[1]);
            
            //Replace _ with ''
            $itemSplit = str_replace('_', ' ', $itemSplit);
            
            //Final Name construction in the format of Cyan Blue Signal G
            $itemSplit = $itemSplit[0]." Signal ".$itemSplit[1];
            
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
          echo "<textarea cols='150' rows='150'>";
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
          echo "    icon = \"__Outpost Signals__/graphics/signals.png\"";
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


        } else {
          echo "<br>Your file is too big!";
        }

      } else {
        echo "<br>There was an error uploading the file! :(";
      }
    } else {
      echo "<br>You are not able to upload the file with the ".$fileActualExt." filetype.";
    }


  }
?>