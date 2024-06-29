import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { Page } from 'src/app/service/commonConfig';
import { HttpService } from 'src/app/service/http.service';
import { ToolsService } from 'src/app/service/tools.service';
import { StoryCardComponent } from 'src/app/share/components/story-card/story-card.component';
import { ShareModule } from 'src/app/share/share.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ShareModule,StoryCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent implements OnInit {
  myChecked = false;
  searching = false;
  showSearchResult = false;
  storyList = [];
  page = new Page();
  key = "";

  constructor(private router: Router,private http: HttpService,private toolsService: ToolsService) {
    this.page.size = 12
  }
  ngOnInit() {
    this.searchStory()
  }

  searchStory(showResultNum?) {
    const address = sessionStorage.getItem('walletAddress')
    this.http.post("/weavers/portfolio/findAllPortfolio",{
      pageNum: this.page.page,
      pageSize: this.page.size,
      searchName: this.key,
      author:this.myChecked&&!showResultNum?address:null
    }).then(res=>{
      if(res.code == 200) {
        this.page.total =res.data.total;
        this.storyList = res.data.records;
        this.storyList.map(val=>{
          val.labels = val.labels?.split(",")
        })
        if(showResultNum) {
          this.showSearchResult = true
        }
      }  
    })
   
  }
  keyChange() {
    this.page.page = 1
    this.searchStory(true)
  }
  checkedChange() {
    this.page.page = 1
    this.searchStory()
  }
  handleCreate() {
    const address = sessionStorage.getItem('walletAddress')
    if(!address) {
      this.toolsService.tip('info',"请使用钱包进行注册/登录");
      return
    }
    this.router.navigate(['/index/create-story']);
  }
  return() {
    this.showSearchResult = false;
    this.searching = false;
    this.key = ''
    this.searchStory()
    // 重新搜索
  }
  toStory(story) {
    const address = sessionStorage.getItem('walletAddress')
    if(!address) {
      this.toolsService.tip('info',"请使用钱包进行注册/登录");
      return
    }
    this.router.navigate(['/index/story-detail'],{ queryParams: { id: story.id }});
  }

  nzPageChange(e) {
    this.page.page = e
    this.searchStory()
  }
  ngOnDestroy() {}

}
