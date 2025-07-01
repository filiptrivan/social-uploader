<?php

class FilterDTO
{
    /**
     * @var array<string, FilterRuleDTO[]>
     */
    public array $filters = [];

    public int $first;

    public int $rows;

    public ?int $additionalFilterIdInt = null;

    public ?int $additionalFilterIdLong = null;

    public function __construct()
    {
        $this->filters = [];
        $this->multiSortMeta = [];
    }
}