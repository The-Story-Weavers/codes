import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/service/http.service';
import { ShareModule } from 'src/app/share/share.module';

@Component({
  selector: 'app-read-story',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './read-story.component.html',
  styleUrl: './read-story.component.less'
})
export class ReadStoryComponent {
  catalog = [];
  curPage = null;
  catalogShow = true;
  showMyPage = false;
  content = '';
  sid = null;
  contentInfo = null;
  stitle = null;
  themeName = '';
  themeId = '';
  user = "";
  story = null;
  cid = null



  constructor(private router: Router,private activatedRoute: ActivatedRoute,private http: HttpService) {}

  ngOnInit() {
    
    this.themeName = sessionStorage.getItem("themeName")
    this.themeId = sessionStorage.getItem("themeId")
    this.sid = this.activatedRoute.snapshot.queryParams["id"];
    this.stitle = this.activatedRoute.snapshot.queryParams["name"];
    this.cid = this.activatedRoute.snapshot.queryParams["cid"];
    const line = JSON.parse(sessionStorage.getItem("line"))
    if(line?.sid == this.sid){
      this.story = line
    }

    this.http.post("/weavers/chapter/getCtitleBySid",{
      sid: this.sid,
    }).then(res=>{
      if(res.code == 200) {
        this.catalog = res.data
        const index = this.catalog.findIndex(val=>val.cid == this.cid)
        console.log(index);
        
        if(this.cid) {
          this.toDetail({cid:this.cid},index)
        }
      }
      
    })
    
  }
  toTheme() {
    this.router.navigate(['/index/story-detail'],{ queryParams: { id: this.themeId }});
  }
  getMyPage() {
    this.user = sessionStorage.getItem("walletAddress")
  }
  

  toDetail(page,index) {
    this.sid = this.activatedRoute.snapshot.queryParams["id"];
    this.http.post("/weavers/chapter/getChapterByCid",{
      cid: page.cid,
    }).then(res=>{
      if(res.code == 200) {
        this.content = res.data.content;
        this.contentInfo = {
          length: this.content.length,
          author: res.data.author,
          time: new Date(res.data.ccreateTime).toLocaleString()
        }
        this.content = this.content.replaceAll('\n', '<br/>');
        this.content = this.content.replaceAll('/br', '<br/>');
        this.catalogShow = false;
        this.curPage = index
      }
      
    })
    
   
  }
  close() {
    if(this.curPage || this.curPage === 0) {
      this.catalogShow = false
    } else {
      this.toTheme()
    }
  }
  continue() {
    this.router.navigate(['/index/continue-story'],{ queryParams: { id: this.sid,name:this.stitle }});
  }
  return() {
    this.router.navigate(['/index/home']);
  }
}
