import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
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
  storyName = "";
  storyId = "";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpService,
    private toolsService: ToolsService
  ) {
    this.validateForm = this.fb.group({
      name: [''],
      remarks:[''],
      pageName:[''],
      content: [''],
      isFinished:[false]
    });

   
  }

  ngOnInit() {
    this.storyId = this.activatedRoute.snapshot.queryParams["id"];
    this.storyName = this.activatedRoute.snapshot.queryParams["name"];
    
  }

  handleSave() {
    const user = sessionStorage.getItem('walletAddress')
    if(!user) {
      this.toolsService.tip("warning","请连接钱包")
      return
    }
    const values = this.validateForm.getRawValue();
    this.http.post('/story/saveStory',{
      stitle: values.name,
      remarks: values.remarks,
      screator: user,
      pid:this.storyId,
      isend: values.isFinished?1:0,
      ctitle: values.pageName,
      content: values.content,
      author: user
    }).then(res=>{
      if(res.code == 200) {
      
      }
    })
    
   
  }

  return() {
    this.router.navigate(['/index/home'])
  }
}
