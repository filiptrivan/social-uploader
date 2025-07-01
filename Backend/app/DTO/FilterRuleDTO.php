<?php

class FilterRuleDTO
{
    /**
     * @var mixed
     */
    public $value;

    /**
     * @var MatchModeCodes
     */
    public MatchModeCodes $matchMode;

    public string $operator;

    public function __construct($value = null, MatchModeCodes $matchMode = null, string $operator = '')
    {
        $this->value = $value;
        $this->matchMode = $matchMode;
        $this->operator = $operator;
    }
}
