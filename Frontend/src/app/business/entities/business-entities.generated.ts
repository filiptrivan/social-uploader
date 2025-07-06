import { BaseEntity, Filter, FilterRule, FilterSortMeta, MimeTypes, Namebook } from 'spiderly';


export class Notification extends BaseEntity
{
    title?: string;
	description?: string;
	emailBody?: string;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;
	isMarkedAsRead?: boolean;

    constructor(
    {
        title,
		description,
		emailBody,
		version,
		id,
		createdAt,
		modifiedAt,
		isMarkedAsRead
    }:{
        title?: string;
		description?: string;
		emailBody?: string;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('Notification'); 

        this.title = title;
		this.description = description;
		this.emailBody = emailBody;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class NotificationSaveBody extends BaseEntity
{
    notificationDTO?: Notification;
	selectedRecipientsIds?: number[];
	unselectedRecipientsIds?: number[];
	areAllRecipientsSelected?: boolean;
	recipientsTableFilter?: Filter;
	isMarkedAsRead?: boolean;

    constructor(
    {
        notificationDTO,
		selectedRecipientsIds,
		unselectedRecipientsIds,
		areAllRecipientsSelected,
		recipientsTableFilter,
		isMarkedAsRead
    }:{
        notificationDTO?: Notification;
		selectedRecipientsIds?: number[];
		unselectedRecipientsIds?: number[];
		areAllRecipientsSelected?: boolean;
		recipientsTableFilter?: Filter;
		isMarkedAsRead?: boolean;     
    } = {}
    ) {
        super('NotificationSaveBody'); 

        this.notificationDTO = notificationDTO;
		this.selectedRecipientsIds = selectedRecipientsIds;
		this.unselectedRecipientsIds = unselectedRecipientsIds;
		this.areAllRecipientsSelected = areAllRecipientsSelected;
		this.recipientsTableFilter = recipientsTableFilter;
		this.isMarkedAsRead = isMarkedAsRead;
    }
}


export class NotificationMainUIForm extends BaseEntity
{
    notificationDTO?: Notification;

    constructor(
    {
        notificationDTO
    }:{
        notificationDTO?: Notification;     
    } = {}
    ) {
        super('NotificationMainUIForm'); 

        this.notificationDTO = notificationDTO;
    }
}

export class User extends BaseEntity
{
    email?: string;
	hasLoggedInWithExternalProvider?: boolean;
	isDisabled?: boolean;
	version?: number;
	id?: number;
	createdAt?: Date;
	modifiedAt?: Date;

    constructor(
    {
        email,
		hasLoggedInWithExternalProvider,
		isDisabled,
		version,
		id,
		createdAt,
		modifiedAt
    }:{
        email?: string;
		hasLoggedInWithExternalProvider?: boolean;
		isDisabled?: boolean;
		version?: number;
		id?: number;
		createdAt?: Date;
		modifiedAt?: Date;     
    } = {}
    ) {
        super('User'); 

        this.email = email;
		this.hasLoggedInWithExternalProvider = hasLoggedInWithExternalProvider;
		this.isDisabled = isDisabled;
		this.version = version;
		this.id = id;
		this.createdAt = createdAt;
		this.modifiedAt = modifiedAt;
    }
}


export class UserSaveBody extends BaseEntity
{
    userDTO?: User;

    constructor(
    {
        userDTO
    }:{
        userDTO?: User;     
    } = {}
    ) {
        super('UserSaveBody'); 

        this.userDTO = userDTO;
    }
}


export class UserMainUIForm extends BaseEntity
{
    userDTO?: User;

    constructor(
    {
        userDTO
    }:{
        userDTO?: User;     
    } = {}
    ) {
        super('UserMainUIForm'); 

        this.userDTO = userDTO;
    }
}

export class Transaction extends BaseEntity
{
    user_email?: string;
    amount_paid?: string;
    currency?: string;
	version?: number;
	id?: number;
    created_at?: Date;
    modified_at?: Date;

    constructor(
    {
        user_email,
        amount_paid,
        currency,
		version,
		id,
		created_at,
		modified_at
    }:{
        user_email?: string;
        amount_paid?: string;
        currency?: string;
		version?: number;
		id?: number;
		created_at?: Date;
		modified_at?: Date;     
    } = {}
    ) {
        super('Transaction'); 

        this.user_email = user_email;
        this.amount_paid = amount_paid;
        this.currency = currency;
		this.version = version;
		this.id = id;
		this.created_at = created_at;
		this.modified_at = modified_at;
    }
}


export class TransactionSaveBody extends BaseEntity
{
    transactionDTO?: Transaction;

    constructor(
    {
        transactionDTO,
    }:{
        transactionDTO?: Transaction;
    } = {}
    ) {
        super('TransactionSaveBody'); 

        this.transactionDTO = transactionDTO;
    }
}


export class TransactionMainUIForm extends BaseEntity
{
    transactionDTO?: Transaction;

    constructor(
    {
        transactionDTO
    }:{
        transactionDTO?: Transaction;     
    } = {}
    ) {
        super('TransactionMainUIForm'); 

        this.transactionDTO = transactionDTO;
    }
}

export class Subscription extends BaseEntity
{
    user_email?: string;
    transactions?: string;

	version?: number;
	id?: number;
    created_at?: Date;
    modified_at?: Date;

    constructor(
    {
        user_email,
        amount_paid,
        currency,
		version,
		id,
		created_at,
		modified_at
    }:{
        user_email?: string;
        amount_paid?: string;
        currency?: string;
		version?: number;
		id?: number;
		created_at?: Date;
		modified_at?: Date;     
    } = {}
    ) {
        super('Subscription'); 

        this.user_email = user_email;
		this.version = version;
		this.id = id;
		this.created_at = created_at;
		this.modified_at = modified_at;
    }
}