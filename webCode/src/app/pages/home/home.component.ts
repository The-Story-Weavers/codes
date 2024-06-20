import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { Page } from 'src/app/service/commonConfig';
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
  storyList = [{

  },{
    
  },{
    
  },{
    
  },{
    
  },{
    
  },{
    
  }]
  page = new Page();

  constructor(private router: Router) {
    this.page.total = 1000
  }
  ngOnInit() {}

  searchStory() {
    // ------------------
    this.showSearchResult = true
  }
  handleCreate() {
    sessionStorage.setItem("routeData","创建故事集")
    this.router.navigate(['/index/create-story']);
  }
  return() {
    this.showSearchResult = false;
    this.searching = false;
    // 重新搜索
  }
  toStory(story) {
    this.router.navigate(['/index/story-detail'],{ queryParams: { id: '1' }});
  }

  nzPageChange(isReset = false) {}



  ngOnDestroy() {}

}
