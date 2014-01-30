<?php

$id = $_GET["id"];

$con=mysqli_connect("localhost","doscerod_hacker","hack2013","doscerod_Dolphi");
  
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
$queryS = mysqli_query($con, "SELECT Tags.tag FROM Tags INNER JOIN Users_Tags ON Tags.t_id = Users_Tags.t_id AND Users_Tags.u_id = '$id'");
$manumber = mysqli_num_rows($queryS);

while($row = mysqli_fetch_array($queryS)){
	//print_r($row);
	echo $row['tag'].",";
}

mysqli_close($con);
//$gohere = "http://hashbook.20d.mx/Home.html";

//header("Location: $gohere");

?>