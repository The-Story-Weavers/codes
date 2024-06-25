import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/service/tools.service';
import { ShareModule } from 'src/app/share/share.module';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker'
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-create-story',
  standalone: true,
  imports: [ShareModule,NzColorPickerComponent],
  templateUrl: './create-story.component.html',
  styleUrl: './create-story.component.less'
})
export class CreateStoryComponent {
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;
  validateForm: FormGroup;
  tags = [];
  inputVisible = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toolsService: ToolsService,
    private http: HttpService
  ) {

    this.validateForm = this.fb.group({
      name: [''],
      content: [''],
      tagInput: [''],
      color:['#C2E9FB']
    });

   
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.validateForm.value.tagInput && this.tags.indexOf(this.validateForm.value.tagInput) === -1) {
      this.tags = [...this.tags, this.validateForm.value.tagInput];
    }
    this.validateForm.patchValue({
      tagInput:''
    })
    this.inputVisible = false;
  }
  checkTag(tag:string) {
    if (this.tags.indexOf(tag) === -1) {
      this.tags = [...this.tags, tag];
    } else {
      this.tags = this.tags.filter(item => item !== tag);
    }
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }
  handleSave(index) {
    const user = sessionStorage.getItem('walletAddress')
    if(!user) {
      this.toolsService.tip("warning","请连接钱包")
      return
    }
    const values = this.validateForm.getRawValue();
    if(!values.name) {
      this.toolsService.tip("warning","请输入名称")
      return
    }
    if(!values.content) {
      this.toolsService.tip("warning","请输入简介")
      return
    }
    if(!this.tags.length) {
      this.toolsService.tip("warning","请添加标签")
      return
    }

    this.http.post('/portfolio/savePortfolio',{
      ptitle: values.name,
      introduce: values.content,
      bgcolor: values.color,
      creator: user,
      labels: this.tags
    }).then(res=>{
      if(res.code == 200) {
        if(index == 1) {
          this.return()
          // this.router.navigate(['/index/story-detail'],{ queryParams: { id: res.data }});
        } else {
          this.router.navigate(['/index/create-line'],{ queryParams: { id: res.data, name:values.name }})
        }
      }
    })
   
  }

  return() {
    this.router.navigate(['/index/home'])
  }

}
