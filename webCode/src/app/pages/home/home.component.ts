import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { Page } from 'src/app/service/commonConfig';
import { HttpService } from 'src/app/service/http.service';
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

  constructor(private router: Router,private http: HttpService) {
  }
  ngOnInit() {
    this.searchStory()
  }

  searchStory() {
    this.http.post("/portfolio/findAllPortfolio",{
      pageNum: 1,
      pageSize: 16,
      // searchName:''
    }).then(res=>{
      console.log(res);
      if(res.code == 200) {
        this.page.total =res.data.total;
        this.storyList = res.data.records;
        this.storyList.map(val=>{
          val.labels = val.labels?.split(",")
        })

      }
      
    })
    // ------------------
    this.showSearchResult = true
  }
  handleCreate() {
    this.router.navigate(['/index/create-story']);
  }
  return() {
    this.showSearchResult = false;
    this.searching = false;
    // 重新搜索
  }
  toStory(story) {
    this.router.navigate(['/index/story-detail'],{ queryParams: { id: story.id }});
  }

  nzPageChange(isReset = false) {
    console.log(1112);
    
  }



  ngOnDestroy() {}

}
