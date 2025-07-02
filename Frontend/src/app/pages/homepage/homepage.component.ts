import { Component, OnInit } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConfigService } from 'src/app/business/services/config.service';
import { ButtonModule } from 'primeng/button';

@Component({
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    imports: [
      TranslocoDirective,
      ButtonModule,
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
