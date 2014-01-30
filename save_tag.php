<?php

$id = $_REQUEST["id"];
$tag = $_REQUEST["tag"];

$con=mysqli_connect("localhost","doscerod_hacker","hack2013","doscerod_Dolphi");
  
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
$queryS = mysqli_query($con,"SELECT * FROM Tags WHERE tag = '$tag'");
$numRows = mysqli_num_rows($queryS);

if($numRows<=0){
  mysqli_query($con,"INSERT INTO Tags(tag) VALUES('$tag')");
  }

mysqli_query($con, "INSERT INTO Users_Tags(u_id,t_id) VALUES('$id',(SELECT t_id FROM Tags WHERE tag = '$tag'))");

mysqli_close($con);
$gohere = "http://hashbook.20d.mx/Home.html";

header("Location: $gohere");

?>