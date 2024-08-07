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
  pid = null;
  pname = null;
  sort = "hot"

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private http: HttpService) {
    this.page.size = 12
  }
  ngOnInit() {
    this.pid = this.activatedRoute.snapshot.queryParams["id"];
    this.pname = this.activatedRoute.snapshot.queryParams["name"];
    // this.router.navigate(['/index/continue-story'])
    this.http.post("/weavers/portfolio/findPortDetail",{
      pid: this.pid,
    }).then(res=>{
      if(res.code == 200) {
        res.data.labels = res.data.labels?.split(",")
        res.data.createTime = new Date(res.data.createTime).toLocaleString();
        this.story = res.data;
        sessionStorage.setItem("themeName",this.story.ptitle)
        sessionStorage.setItem("themeId",this.pid)
      }
      
    })
    
    
    this.searchLine();
  }

  searchLine(isReset = false) {
    if(isReset) {
      this.page.page = 1
    }
    const address = sessionStorage.getItem('walletAddress')
    this.http.post("/weavers/story/findAllStory",{
      pid: this.pid,
      pageNum: this.page.page,
      pageSize: this.page.size,
      stitle:this.keyName,
      author:this.myChecked?address:null,
      sort: this.sort
    }).then(res=>{
      if(res.code == 200) {
        this.lineList = res.data.records;
        this.lineList.map(val=>{
          val.pageNum = val.chapters.length;
          val.updateTime = new Date(val.updateTime).toLocaleString();
          const authors = new Set<string>();
          val.chapters.map(item=>{
            authors.add(item.author)
          })
          const arr= Array.from(authors)
          
          val.otherLength = arr.length>3?arr.length-3:0;
          val.authorArr = arr.slice(0, 3);
        })
        this.page.total = res.data.total
      }
      
    })
  }
  filterStory(info) {
    this.sort = info
    this.searchLine(true);
  }
  
  toDetail(line) {
    sessionStorage.setItem("line",JSON.stringify(line))
    this.router.navigate(["/index/read"],{ queryParams: { id: line.sid}})
  }
  nzPageChange(e) {
    this.page.page = e
    this.searchLine()
  }

  handleSave() {
    this.router.navigate(['/index/create-line'],{ queryParams: { id: this.story?.id,name: this.story?.ptitle}})
   
  }

  toHome(){
    this.router.navigate(['/index/home'])
  }

}
