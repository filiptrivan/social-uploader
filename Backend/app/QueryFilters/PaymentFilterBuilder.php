<?php

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Arr;
use App\DTO\PaginatedResultDTO;

class ProjectFilterBuilder
{
    public static function build(Builder $query, array $filterDTO): PaginatedResultDTO
    {
        $filters = $filterDTO['filters'] ?? [];

        foreach ($filters as $field => $rules) {
            foreach ($rules as $rule) {
                if (!isset($rule['value'])) {
                    continue;
                }

                $matchMode = $rule['matchMode'];
                $value = $rule['value'];

                switch ($field) {
                    case 'version':
                    case 'id':
                        $query = self::applyNumericFilter($query, $field, $matchMode, $value);
                        break;

                    case 'createdAt':
                    case 'modifiedAt':
                        $query = self::applyDateFilter($query, $field, $matchMode, $value);
                        break;

                    default:
                        // Unknown field, skip
                        break;
                }
            }
        }

        $totalRecords = $query->count();
        $items = $query->paginate(10);

        return new PaginatedResultDTO($totalRecords, $items);
    }

    private static function applyStringFilter(Builder $query, string $field, string $matchMode, string $value): Builder
    {
        return match ($matchMode) {
            'startsWith' => $query->where($field, 'like', $value . '%'),
            'contains' => $query->where($field, 'like', '%' . $value . '%'),
            'equals' => $query->where($field, '=', $value),
            default => throw new \InvalidArgumentException("Invalid string match mode: $matchMode"),
        };
    }

    private static function applyNumericFilter(Builder $query, string $field, string $matchMode, $value): Builder
    {
        return match ($matchMode) {
            'equals' => $query->where($field, '=', $value),
            'lessThan' => $query->where($field, '<', $value),
            'greaterThan' => $query->where($field, '>', $value),
            'in' => $query->whereIn($field, $value),
            default => throw new \InvalidArgumentException("Invalid numeric match mode: $matchMode"),
        };
    }

    private static function applyDateFilter(Builder $query, string $field, string $matchMode, string $value): Builder
    {
        $date = \Carbon\Carbon::parse($value);

        return match ($matchMode) {
            'equals' => $query->whereDate($field, '=', $date),
            'lessThan' => $query->whereDate($field, '<', $date),
            'greaterThan' => $query->whereDate($field, '>', $date),
            default => throw new \InvalidArgumentException("Invalid date match mode: $matchMode"),
        };
    }
}
