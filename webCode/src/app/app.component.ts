import { registerLocaleData } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzI18nService, en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnDestroy {

  constructor(private i18n: NzI18nService) {
    registerLocaleData(en);
    this.i18n.setLocale(en_US);
  }
  
  ngOnDestroy(): void {}

}
