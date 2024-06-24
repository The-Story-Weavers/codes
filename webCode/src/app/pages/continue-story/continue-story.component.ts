import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { ToolsService } from 'src/app/service/tools.service';
import { ShareModule } from 'src/app/share/share.module';

@Component({
  selector: 'app-continue-story',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './continue-story.component.html',
  styleUrl: './continue-story.component.less'
})
export class ContinueStoryComponent {
  validateForm: FormGroup;
  tags = [];
  inputVisible = false;
  storyId = null
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toolsService: ToolsService,
    private activatedRoute: ActivatedRoute,
    private http: HttpService,

  ) {

    this.validateForm = this.fb.group({
      pageName:[''],
      content: [''],
      isFinished:[false]
    });

   
  }

  ngOnInit() {
    this.storyId = this.activatedRoute.snapshot.queryParams["id"];
    // this.storyName = this.activatedRoute.snapshot.queryParams["name"];
    
  }

  handleSave() {
    console.log(this.validateForm.value.content);
    const user = sessionStorage.getItem('walletAddress')
    if(!user) {
      this.toolsService.tip("warning","请连接钱包")
      return
    }
    const values = this.validateForm.getRawValue();
    this.http.post('/chapter/saveChapter',{
      sid:this.storyId,
      isend: values.isFinished?1:0,
      ctitle: values.pageName,
      content: values.content,
      author: user
    }).then(res=>{
      if(res.code == 200) {
        this.router.navigate(["/index/read"],{ queryParams: { id: this.storyId }})
      }
    })
    
   
  }

  return() {
    this.router.navigate(['/index/home'])
  }
}
