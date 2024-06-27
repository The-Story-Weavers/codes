import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractService } from 'src/app/service/contract.service';
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
    private toolsService: ToolsService,
    private contract: ContractService
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
    this.contract.loading$.next(true);
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
    if(!values.remarks) {
      this.toolsService.tip("warning","请输入简介")
      return
    }
    if(!values.pageName) {
      this.toolsService.tip("warning","请输入章节标题")
      return
    }
    if(!values.content) {
      this.toolsService.tip("warning","请输入章节内容")
      return
    }
    const params = {
      stitle: values.name,
      remarks: values.remarks,
      screator: user,
      pid:this.storyId,
      isend: values.isFinished?1:0,
      ctitle: values.pageName,
      content: values.content,
      author: user
    }
    this.http.post('/weavers/story/saveStory',params).then(res=>{
      if(res.code == 200) {
        this.contract.addPage(res.data.cid, values.content).then((res2) => {
          this.contract.loading$.next(false);
          const line = {
            stitle:params.stitle,
            isend:params.isend,
            sid: res.data.sid
          }
          sessionStorage.setItem("line",JSON.stringify(line))
          this.router.navigate(["/index/read"], {
            queryParams: { id: res.data.sid },
          });
        });
      
      }
    })
    
   
  }

  return() {
    this.router.navigate(['/index/story-detail'],{ queryParams: { id: this.storyId }});
  }
}
