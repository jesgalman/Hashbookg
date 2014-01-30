
<?php

$id = $_GET["id"];
echo $id;
$con=mysqli_connect("localhost","doscerod_hacker","hack2013","doscerod_Dolphi");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$result = mysqli_query($con,"SELECT * FROM UserTags");

while($row = mysqli_fetch_array($result))
  {
  echo $row['t.tag'];
  echo "<br>";
  }

mysqli_close($con);
?>