import { Component, OnInit } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { ConfigService } from 'src/app/business/services/config.service';
import { ButtonModule } from 'primeng/button';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Router } from '@angular/router';

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
    private config: ConfigService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

  createCheckoutSession() {
    this.apiService.createCheckoutSession().subscribe((stripeCheckoutUrl) => {
      window.location.href = stripeCheckoutUrl;
    });
  }

}
