let initialString = `
<?php

    $favcolor = "red";
    switch ($favcolor) {
        case "red":
            echo "Your favorite color is red!";
            break;
        case "blue":
            echo "Your favorite color is blue!";
            break;
        case "green":
            echo "Your favorite color is green!";
            break;
        default:
            echo "Your favorite color is neither red, blue, nor green!";
    }

    $x = 1; 
    while($x <= 5) {
        echo "The number is: $x <br>";
        $x++;
    } 
?>
`