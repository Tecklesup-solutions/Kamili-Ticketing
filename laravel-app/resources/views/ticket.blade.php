<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs/qrcode.min.js"></script>
    <style>
       .ticket {
            width: 100%;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            font-family: Arial, sans-serif;
        }
       .event-image {
            max-width: 100%;
            height: auto;
        }
       .qr-code-container {
            margin-top: 20px;
            text-align: center;
        }
       .qr-code img {
            width: 200px; /* Adjust size as needed */
            height: auto;
        }
    </style>
</head>
<body>

@foreach ($tickets as $ticket)
<div class="ticket">
    <h2>{{ $ticket->event->name }}</h2>
    <p>{{ $ticket->event->date }}</p>
    <p>Type: {{ $ticket->type }}</p>
    <p>Name: {{ $ticket->first_name }} {{ $ticket->last_name }}</p>
    <p>Email: {{ $ticket->email }}</p>

    <p>Qr code: {{ $ticket->qr_code }}</p>
    
    <div class="qr-code-container">
        <img src="{{ $ticket->qr_code_image }}" alt="QR Code">
    </div>
</div>
@endforeach

<script>
    $(document).ready(function() {
        @foreach ($tickets as $ticket)
            new QRCode(document.getElementById('qrcode_{{ $ticket->id }}'), {
                text: '{{ $ticket->qr_code }}',
                width: 128,
                height: 128,
                colorDark : '#000',
                colorLight : '#fff',
                correctLevel : QRCode.CorrectLevel.H
            });
        @endforeach
    });
</script>

</body>
</html>