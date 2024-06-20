import { Injectable } from '@angular/core';
import { tipConfig } from './commonConfig'
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private message: NzMessageService, private modal: NzModalService) {}


  /**
   * 
   * @param type 提示类型
   * @param msg 提示语
   * @param option nzDuration：提示显示时间（时间戳） nzPauseOnHover:光标放置时是否常显，默认为true
   */
  tip(type: 'info' | 'success' | 'error' | 'warning', msg: string, option: {nzDuration?: number, nzPauseOnHover?: boolean} = tipConfig) {
    this.message.create(type, msg, option);
  }

  textValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /^[a-zA-Z0-9_\u4e00-\u9fa5-]+$/;
      if(!control.value || regex.test(control.value)) {
        return {}
      } else {
        return { textErr: true };
      }
    };
  }

 groupBy(data: any[], key: string): Record<string, any[]> {
    return data.reduce((result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {} as Record<string, any[]>);
  }
}
