<?php

use App\DTO\FilterDTO;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Requests\RefreshTokenRequest;
use App\Models\Payment;
use App\QueryFilters\PaymentFilterBuilder;
use Stripe\Webhook;
use Stripe\Exception\SignatureVerificationException;

Route::post('/Payment/GetPaginatedPaymentList', function (FilterDTO  $request) {
    $filterDTO = $request->toDto();
    error_log(json_encode($filterDTO));
    // error_log($filterDTO->first);
    // error_log(json_encode(PaymentFilterBuilder::build(Payment::query(), $filterDTO)));
    return json_encode(PaymentFilterBuilder::build(Payment::query(), $filterDTO));
});

Route::post('/Stripe/CreateCheckoutSession', function (Request $request) {
    $ch = curl_init('https://localhost:44388/api/Stripe/CreateCheckoutSession');

    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HEADER => true, // Needed to capture headers (including Location)
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Accept: application/json',
        ],
        CURLOPT_SSL_VERIFYHOST => false,
        CURLOPT_SSL_VERIFYPEER => false,
    ]);

    $response = curl_exec($ch);

    if ($response === false) {
        throw new \Exception('cURL error: ' . curl_error($ch));
    }

    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $headerStr = substr($response, 0, $headerSize);
    curl_close($ch);

    // Extract Location header
    if (preg_match('/^location:\s*(.+)$/im', $headerStr, $matches)) {
        $location = trim($matches[1]);
        error_log($location);
        return response($location, 200);
    }

    return response()->json(['error' => 'Location header not found'], 500);
});

Route::post('/Stripe/Webhook', function (Request $request) {
    $payload = $request->getContent();
    $sigHeader = $request->header('Stripe-Signature');
    $endpointSecret = env('StripeWebhookSecretKey', 'null');

    try {
        $event = Webhook::constructEvent($payload, $sigHeader, $endpointSecret);
    } catch (SignatureVerificationException $e) {
        return response("Webhook error: {$e->getMessage()}", 400);
    }

    if ($event->type === 'invoice.paid') {
        $invoice = $event->data->object;

        DB::transaction(function () use ($invoice) {
            $transaction = new Payment();
            $transaction->user_email = $invoice->customer_email;
            $transaction->amount_paid = $invoice->amount_paid / 100.0;
            $transaction->currency = $invoice->currency;
            $transaction->save();
        });
    }

    return response()->json(['status' => 'success'], 200);
});