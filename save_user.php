<?php 
$u_id = $_GET["id"];

$con=mysqli_connect("localhost","doscerod_hacker","hack2013","doscerod_Dolphi");
  
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
$queryS = mysqli_query($con,"SELECT * FROM Users WHERE u_id = '$u_id'");
$numRows = mysqli_num_rows($queryS);

if($numRows<=0)
  mysqli_query($con,"INSERT INTO Users(u_id) VALUES('$u_id')");

mysqli_close($con);
$gohere = "http://hashbook.20d.mx/Home.html";

header("Location: $gohere");
?>