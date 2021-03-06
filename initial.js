// initial.js

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


    for ($i = 1; ; $i++) {
        if ($a > 67) {
            echo "a is bigger than b";
            $b = 12;
        }
    }



    $i = 0;
    do {
        echo $i;
    } while ($i > 0);


    interface iTemplate
    {
        public function setVariable($name, $var);
        public function getHtml($template);
    }


    class stdObject {
        public function __call($method, $arguments) {
            $arguments = array("stdObject" => $this);
            if (isset($this->method) && is_callable($this->method)) {
                return true;
            } else {
                return false;
            }
        }
    }

?>
`