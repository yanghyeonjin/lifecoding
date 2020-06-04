<?php 
$d1 = new DateTime();
$d1 -> setTimezone(new DateTimeZone("asia/seoul"));
echo $d1->format('H:i:s');
