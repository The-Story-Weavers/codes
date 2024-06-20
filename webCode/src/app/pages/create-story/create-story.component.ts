import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/service/tools.service';
import { ShareModule } from 'src/app/share/share.module';
import { NzColorPickerComponent } from 'ng-zorro-antd/color-picker'

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
  urlToName = {

  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toolsService: ToolsService
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
    //todo 
    if(index == 1) {
      this.return()
    } else {
      this.router.navigate(['/index/create-line'])
    }
   
  }

  return() {
    this.router.navigate(['/index/home'])
  }

}
