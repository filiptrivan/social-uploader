import { Component, OnInit } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { InfoCardComponent } from 'spiderly';
import { ConfigService } from 'src/app/business/services/config.service';

@Component({
    templateUrl: './homepage.component.html',
    imports: [
      InfoCardComponent,
      TranslocoDirective,
    ],
})
export class HomepageComponent implements OnInit {
  companyName = this.config.companyName;

  constructor(
    private config: ConfigService
  ) {}

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

}
