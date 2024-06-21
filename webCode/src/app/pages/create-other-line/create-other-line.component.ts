import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToolsService } from 'src/app/service/tools.service';
import { ShareModule } from 'src/app/share/share.module';

@Component({
  selector: 'app-create-other-line',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './create-other-line.component.html',
  styleUrl: './create-other-line.component.less'
})
export class CreateOtherLineComponent {
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
      name:[''],
      pageName:[''],
      content: [''],
      isFinished:[false]
    });

   
  }

  handleSave() {
    console.log(this.validateForm.value.content);
    
   
  }

  return() {
    this.router.navigate(['/index/home'])
  }
}
