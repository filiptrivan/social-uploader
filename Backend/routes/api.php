<?php

use App\DTO\FilterDTO;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Requests\RefreshTokenRequest;
use App\Models\Payment;
use App\QueryFilters\PaymentFilterBuilder;

Route::post('/Payment/GetPaginatedPaymentList', function (FilterDTO  $request) {
    $filterDTO = $request->toDto();
    error_log(json_encode($filterDTO->all()));
    error_log($filterDTO->first);
    error_log(json_encode(PaymentFilterBuilder::build(Payment::query(), $filterDTO)));
    return json_encode(PaymentFilterBuilder::build(Payment::query(), $filterDTO));
});
