
<html>

<head>
    <style>
        .center {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 40rem;
        }
    </style>
</head>

<body style="height: 100%; background-color: aqua;">

    <div class="center">
        <div style="margin-right: 50px;">
            <input type="number">
            <button>Count</button>
        </div>
        <div style="margin-left: 50px;">
            <p>
                The factorial value of $number is 120
                <br>
                <br>
                5 x 4 x 3 x 2 x 1 = 120
            </p>
        </div>
    </div>
    <?php
    function factorial($n)
    {
        if ($n == 0 || $n == 1) {
            return 1;
        } else {
            return $n * factorial($n - 1);
        }
    }

    // Example usage
    $number = 4;
    $result = factorial($number);

    echo "The factorial of $number is: $result";
    ?>

</body>

</html>