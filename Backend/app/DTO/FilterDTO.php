<?php

namespace App\DTO;

use Illuminate\Foundation\Http\FormRequest;

class FilterDTO extends FormRequest
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

    protected function prepareForValidation(): void
    {
        $this->merge([
            'filters' => $this->input('filters', []),
            'first' => (int)$this->input('first', 0),
            'rows' => (int)$this->input('rows', 0),
            'additionalFilterIdInt' => $this->input('additionalFilterIdInt'),
            'additionalFilterIdLong' => $this->input('additionalFilterIdLong'),
        ]);
    }

    public function toDTO(): self
    {
        $this->first = (int)$this->input('first');
        $this->rows = (int)$this->input('rows');
        $this->additionalFilterIdInt = $this->input('additionalFilterIdInt');
        $this->additionalFilterIdLong = $this->input('additionalFilterIdLong');
        $this->filters = $this->input('filters', []);
        return $this;
    }
}