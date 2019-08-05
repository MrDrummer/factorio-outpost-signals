<!DOCTYPE html>
<html lang="en">
  <head>
    <title>test</title>
  </head>
  <body>
		<?php
			error_reporting(-1); //OFF = 0 ON = -1
		?>
    <form action="/php-scripts-test/upload-script.php" method="POST" enctype="multipart/form-data">
      <input type="file" name="uploadFile[]" multiple="multiple">
      
      <button type="submit" name="uploadSubmit">Upload</form>
    </form>
  </body>
</html>