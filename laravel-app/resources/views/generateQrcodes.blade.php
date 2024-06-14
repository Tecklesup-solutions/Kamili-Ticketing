@foreach($tickets as $ticket)
    {!! \App\Library\QRCode::generate($ticket->qr_code, 'img', ['id' => "qrCode{$ticket->id}", 'class' => 'qr-code img-fluid'])!!}
@endforeach
