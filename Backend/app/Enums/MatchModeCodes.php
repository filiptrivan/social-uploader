<?php

namespace App\Enums;

enum MatchModeCodes: int
{
    case StartsWith = 0;
    case Contains = 1;
    case Equals = 2;
    case LessThan = 3;
    case GreaterThan = 4;
    case In = 5;
}
