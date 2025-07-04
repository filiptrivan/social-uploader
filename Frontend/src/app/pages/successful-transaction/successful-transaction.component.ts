import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/business/entities/business-entities.generated';
import { SpiderlyFormGroup, SpiderlyPanelsModule, SpiderlyControlsModule } from 'spiderly';

@Component({
    selector: 'successful-transaction',
    templateUrl: './successful-transaction.component.html',
    imports: [
        SpiderlyPanelsModule,
        SpiderlyControlsModule,
    ]
})
export class SuccessfulTransactionComponent implements OnInit {
    paymentFormGroup = new SpiderlyFormGroup<Payment>({});

    constructor(
        
    ) {
    }

    ngOnInit() {

    }
}