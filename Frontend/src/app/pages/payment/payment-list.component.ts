import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/business/entities/business-entities.generated';
import { DataViewCardBody, SpiderlyControlsModule, SpiderlyDataViewComponent, SpiderlyTemplateTypeDirective, DataViewFilter, getHtmlImgDisplayString64, SpiderlyDataTableComponent, Column } from 'spiderly';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'payment-list',
    templateUrl: './payment-list.component.html',
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
export class PaymentListComponent implements OnInit {
    hoveredIndex: number | null = null;

    templateType: DataViewCardBody<Payment>;
    filters: DataViewFilter<Payment>[];

    getPaginatedPaymentListObservableMethod = this.apiService.getPaginatedPaymentList;

    cols: Column<Payment>[];

    // exportPaymentListToExcelObservableMethod = this.apiService.exportPaymentListToExcel;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
    ) { }

    ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Id'), filterType: 'numeric', field: 'id'},
            {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt', showMatchModes: true},
            {actions:[
                {name: this.translocoService.translate('Details'), field: 'Details'},
            ]},
        ]
    }
}