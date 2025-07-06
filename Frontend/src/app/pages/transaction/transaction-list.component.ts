import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/business/entities/business-entities.generated';
import { DataViewCardBody, SpiderlyControlsModule, SpiderlyDataViewComponent, SpiderlyTemplateTypeDirective, DataViewFilter, SpiderlyDataTableComponent, Column } from 'spiderly';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'transaction-list',
    templateUrl: './transaction-list.component.html',
    imports: [
        CommonModule,
        TranslocoDirective,
        SpiderlyTemplateTypeDirective,
        SpiderlyDataViewComponent,
        SpiderlyControlsModule,
        RouterModule,
        SpiderlyDataTableComponent
    ]
})
export class TransactionListComponent implements OnInit {
    hoveredIndex: number | null = null;

    templateType: DataViewCardBody<Transaction>;
    filters: DataViewFilter<Transaction>[];

    getPaginatedTransactionListObservableMethod = this.apiService.getPaginatedTransactionList;

    cols: Column<Transaction>[];

    // exportTransactionListToExcelObservableMethod = this.apiService.exportTransactionListToExcel;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
    ) { }

    ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Amount Paid ($)'), filterType: 'numeric', field: 'amount_paid'},
            {name: this.translocoService.translate('User'), filterType: 'text', field: 'user_email'},
            {name: 'Currency', filterType: 'text', field: 'currency'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'created_at', showMatchModes: true},
        ]
    }
}