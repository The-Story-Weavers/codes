import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareModule } from 'src/app/share/share.module';

@Component({
  selector: 'app-read-story',
  standalone: true,
  imports: [ShareModule],
  templateUrl: './read-story.component.html',
  styleUrl: './read-story.component.less'
})
export class ReadStoryComponent {
  catalog = ['车辆评估师-布莱恩', '三年之约', '大伯比利', '血月', '这具尸体，请你放尊重点！'];
  curPage = 2;
  catalogShow = true;
  showMyPage = false;
  content = '';

  constructor(private router: Router) {
    const str = `公元3019年，4月1日。/br世界最年轻的武道大宗师高武，上演了一幕真人穿越飞升。整个世界为之震惊。/br在一次直播中，众目睽睽之下，高武化作一道虹光消失在了人们的视野里。/br破碎虚空？飞升虹化？
关于高武的消失，怀疑者有之，恶搞者有之，崇拜者有之⋯⋯/br地球各大论坛，街头巷尾，线上线下，众说纷纭热闹非凡。/br时间久了，高武慢慢的淡忘在了世间，唯有一些网站上还能查到一些蛛丝马迹：高武，著名武道大宗师。从小就极具运动天赋，两三岁的时候第N套广播体操做的贼溜。十四岁之后开始习武修行，十六岁开始接触各大正规赛事。一路无敌，各级赛事平趟而过；各种冠军手到擒来。不到二十岁，融汇贯通所有古武新武流派，形成自己的风格。不到二十二岁，成为世界最强大宗师，没有之一。
性格平淡近人，热衷武道传播。尤其喜好古武发掘和完善。/br高武却仍在迷惑之中。这特么是怎么回事，自己不是在直播么，怎么轻飘飘的一拳把自己给干飞升了呢。"`;
    this.content = str.replaceAll('/br', '<br/>');
  }

  toDetail(page) {
    this.catalogShow = false;
  }
  continue() {
    this.router.navigate(['/index/continue-story']);
  }
  createOtherLine() {
    this.router.navigate(['/index/other-line']);
  }

  return() {
    this.router.navigate(['/index/home']);
  }
}
