<?php

namespace App\QueryFilters;

use App\Enums\MatchModeCodes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use App\DTO\PaginatedResultDTO;
use App\DTO\FilterDTO;

class FilterBuilder
{
    public static function buildTransaction(Builder $query, FilterDTO $filterDTO): PaginatedResultDTO
    {
        $filters = $filterDTO->filters;

        foreach ($filters as $field => $rules) {
            foreach ($rules as $rule) {
                if (!isset($rule['value'])) {
                    continue;
                }

                $matchMode = MatchModeCodes::from($rule['matchMode']);
                $value = $rule['value'];

                switch ($field) {
                    case 'version':
                    case 'id':
                        $query = self::applyNumericFilter($query, $field, $matchMode, $value);
                        break;

                    case 'created_at':
                    case 'modified_at':
                        $query = self::applyDateFilter($query, $field, $matchMode, $value);
                        break;

                    default:
                        // Unknown field, skip
                        break;
                }
            }
        }

        $totalRecords = $query->count();
        $items = $query->skip($filterDTO->first)->take($filterDTO->rows)->get();

        return new PaginatedResultDTO($totalRecords, $items);
    }
    private static function applyStringFilter(Builder $query, string $field, MatchModeCodes $matchMode, string $value): Builder
    {
        return match ($matchMode) {
            MatchModeCodes::StartsWith => $query->where($field, 'like', $value . '%'),
            MatchModeCodes::Contains => $query->where($field, 'like', '%' . $value . '%'),
            MatchModeCodes::Equals => $query->where($field, '=', $value),
            default => throw new \InvalidArgumentException("Invalid string match mode."),
        };
    }

    private static function applyNumericFilter(Builder $query, string $field, MatchModeCodes $matchMode, $value): Builder
    {
        return match ($matchMode) {
            MatchModeCodes::Equals => $query->where($field, '=', $value),
            MatchModeCodes::LessThan => $query->where($field, '<', $value),
            MatchModeCodes::GreaterThan => $query->where($field, '>', $value),
            MatchModeCodes::In => $query->whereIn($field, $value),
            default => throw new \InvalidArgumentException("Invalid numeric match mode."),
        };
    }

    private static function applyDateFilter(Builder $query, string $field, MatchModeCodes $matchMode, string $value): Builder
    {
        $date = \Carbon\Carbon::parse($value);

        return match ($matchMode) {
            MatchModeCodes::Equals => $query->whereDate($field, '=', $date),
            MatchModeCodes::LessThan => $query->whereDate($field, '<', $date),
            MatchModeCodes::GreaterThan => $query->whereDate($field, '>', $date),
            default => throw new \InvalidArgumentException("Invalid date match mode."),
        };
    }
}
