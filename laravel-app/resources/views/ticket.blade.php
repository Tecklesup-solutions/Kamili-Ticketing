<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        .ticket {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ccc;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            background-color: black;
            color: white;
        }
        .qr-code img {
            max-width: 100%;
            height: auto;
        }
    </style>
</head>
<body>

<div class="container">
    @foreach ($tickets as $ticket)
    <div class="ticket card shadow-lg">
        <div class="row">
            <div class="col-md-6">
                <h2>{{ $ticket->event->name }}</h2>
                <p>{{ $ticket->event->date }}</p>
                <p>Type: {{ $ticket->type }}</p>
                <p>Name: {{ $ticket->first_name }} {{ $ticket->last_name }}</p>
                <p>Email: {{ $ticket->email }}</p>
            </div>
            <div class="col-md-6">
                <div class="qr-code-container">
                    <img src="qr_codes/{{ $ticket->qr_code_image }}" alt="QR Code">
                </div>
            </div>
        </div>
    </div>
    @endforeach
</div>

</body>
</html>
