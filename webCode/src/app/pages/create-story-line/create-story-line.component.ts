import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/service/tools.service';
import { ShareModule } from 'src/app/share/share.module';

@Component({
  selector: 'app-create-story-line',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './create-story-line.component.html',
  styleUrl: './create-story-line.component.less'
})
export class CreateStoryLineComponent {

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
      pageName:[''],
      content: [''],
      isFinished:[false]
    });

   
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  showInput(): void {
    this.inputVisible = true;
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
  handleSave() {
    console.log(this.validateForm.value.content);
    
   
  }

  return() {
    this.router.navigate(['/index/home'])
  }
}
