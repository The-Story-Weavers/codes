export class Page {
  page = 1; // 当前页码
  total = 0; // 总共几条
  size = 24; // 一页显示几条
}

export const tipConfig = {
  nzDuration: 2000,
  nzPauseOnHover: true
}
// 接口过滤白名单 不弹窗，不做任何处理
export const whiteList = [];
