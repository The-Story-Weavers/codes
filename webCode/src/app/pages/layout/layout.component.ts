import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonService } from 'src/app/service/common.service';
import { HttpService } from 'src/app/service/http.service';
import { ShareModule } from 'src/app/share/share.module';
import { JsonRpcSigner, ethers } from 'ethers';
import { ContractService } from 'src/app/service/contract.service';
import { Subscription, from, fromEvent } from 'rxjs';
import { NgxJdenticonModule } from 'ngx-jdenticon';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ShareModule, RouterOutlet,NgxJdenticonModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('myElement', {static: true}) myElement: ElementRef;
  private scrollHandler: any;
  private subscription: Subscription;
  menuList: Array<any>;
  activeRoute = []; //导航数组，用于页面渲染导航目录区域
  username = 'Admin';

  routerSub: any;
  curUrl: string = '';
  isConnected = false;
  walletAddress?: string;
  userData = null;
  isSticky = false;
  breadcrumbLevel = 1

  constructor(private router: Router, private commonService: CommonService, private httpService: HttpService,private contractService: ContractService) {
    if(sessionStorage.getItem('walletAddress')){
      this.connectWallet()
    }
    this.routerSub = this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((res: any) => {
      this.curUrl = res.url;
      if(this.curUrl == '/index/home') {
        this.isSticky = false
      } else {
        this.isSticky = true
      }
    });
  }
  ngOnInit(): void {
    this.scrollHandler = () => {
      if(this.curUrl !== '/index/home') {
        return
      }
      // 这里处理滚动事件
      const height = this.myElement.nativeElement.scrollTop;
      if(height>50) {
        this.isSticky = true
      } else {
        this.isSticky = false
      }
    };
    
    window.addEventListener('scroll', this.scrollHandler,true);
  }

  toHome() {
    this.router.navigate(['/index/home']);
  }


  connectWallet() {
     this.contractService.connectWallet().then((res:JsonRpcSigner)=>{
      // console.log(res);
      
      this.walletAddress = res?.address;
      sessionStorage.setItem("walletAddress",this.walletAddress)
      
     }).catch(()=>{
       console.error("没有识别到钱包")
     })
  
    
  }
  toSign() {
    this.contractService.sign()
  }
  aa() {
    this.contractService.connectNetwork()
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.subscription?.unsubscribe();
  }
}
