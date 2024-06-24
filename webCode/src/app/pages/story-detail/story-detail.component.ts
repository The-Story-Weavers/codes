import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from 'src/app/service/commonConfig';
import { HttpService } from 'src/app/service/http.service';
import { StoryLineCardComponent } from 'src/app/share/components/story-line-card/story-line-card.component';
import { ShareModule } from 'src/app/share/share.module';

@Component({
  selector: 'app-story-detail',
  standalone: true,
  imports: [ShareModule,StoryLineCardComponent],
  templateUrl: './story-detail.component.html',
  styleUrl: './story-detail.component.less'
})
export class StoryDetailComponent {
  myChecked = false
  lineList = [];
  page = new Page();
  story = null;
  keyName = "";
  pid = null

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private http: HttpService) {
    this.page.total = 1000
  }
  ngOnInit() {
    this.pid = this.activatedRoute.snapshot.queryParams["id"];
    this.http.post("/portfolio/findPortDetail",{
      pid: this.pid,
    }).then(res=>{

      console.log(res);
      if(res.code == 200) {
        res.data.labels = res.data.labels.labels?.split(",")
        this.story = res.data
      }
      
    })
    
    
    this.searchLine();
  }

  searchLine() {
    this.http.post("/story/findAllStory",{
      pid: this.pid,
      pageNum: 1,
      pageSize: 12,
      stitle:this.keyName
    }).then(res=>{
      if(res.code == 200) {
        this.lineList = res.data.records;
        this.page.total = res.data.total
      }
      
    })
  }
  toDetail(line) {
    this.router.navigate(["/index/read"],{ queryParams: { id: line.sid }})
  }
  nzPageChange(isReset = false) {}

  handleSave() {
    // const values = this.validateForm.getRawValue();
    // const user = sessionStorage.getItem('walletAddress')
    // if(index == 1) {
    //   this.http.post('/portfolio/savePortfolio',{
    //     ptitle: values.name,
    //     introduce: values.content,
    //     bgcolor: values.color,
    //     creator: user,
    //     labels: this.tags
    //   }).then(res=>{
    //     console.log(res);
        
    //   })
    // } else {
      
    // }
    this.router.navigate(['/index/create-line'],{ queryParams: { id: this.story?.id,name: this.story?.ptitle}})
   
  }

  toHome(){
    this.router.navigate(['/index/home'])
  }

}
