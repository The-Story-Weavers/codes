import { registerLocaleData } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import zh from '@angular/common/locales/zh';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnDestroy {

  constructor(private i18n: NzI18nService) {
    registerLocaleData(zh);
    this.i18n.setLocale(zh_CN);
  }
  
  ngOnDestroy(): void {}

}
