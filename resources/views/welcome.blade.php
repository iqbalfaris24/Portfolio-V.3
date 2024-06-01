<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>404</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <!-- Styles -->
    <style>
        body {
            background-color: #0F0E17;
            overflow: hidden;
        }

        .parent {
            display: flex;
            min-height: 100vh;
        }

        img {
            width: 25%;
            margin: 0 auto;
        }
    </style>
</head>

<body class="antialiased">
    <div class="parent">
        <img class="w-5" src={{ asset('storage/404.svg') }} alt="" srcset="">
    </div>
</body>

</html>
