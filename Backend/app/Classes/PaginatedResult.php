<?php

namespace App\Classes;

class PaginatedResult
{
    public int $totalRecords;
    public mixed $data;

    public function __construct(int $totalRecords, mixed $data)
    {
        $this->totalRecords = $totalRecords;
        $this->data = $data;
    }
}
