<?php

enum MatchModeCodes: string
{
    case StartsWith = 'StartsWith';
    case Contains = 'Contains';
    case Equals = 'Equals';
    case LessThan = 'LessThan';
    case GreaterThan = 'GreaterThan';
    case In = 'In';
}
