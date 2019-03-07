import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RightscreenComponent } from './rightscreen/rightscreen.component';
import { Mediator, IMediatorImpl, StateType} from './state.mediator';
import { IBoardListItem, IApplyFilter } from './IBoardList';
import { BoardlistComponent } from './boardlist/boardlist.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements IMediatorImpl, AfterViewInit {
  @ViewChild(SidenavComponent)
  private sideNav: SidenavComponent;
  @ViewChild(RightscreenComponent)
  private rightScreen: RightscreenComponent;
  @ViewChild(BoardlistComponent)
  private boardList: BoardlistComponent;


  //实现调停者接口
  showNavPanel() {
    this.sideNav.showNav();
    document.getElementById('main').style.marginLeft = "250px";
  }
  hideNavPanel() {
    this.sideNav.closeNav();
    document.getElementById('main').style.marginLeft = "0px";
  }
  showDetailPanel() {
    this.rightScreen.openRightWindow();
    document.getElementById('main').style.transform = "translateX(-100%)";
  }
  hideDetailPanel() {
    this.rightScreen.closeRightWindow();
    document.getElementById('main').style.transform = "translateX(0%)";
  }
  changeShowHideSideButton(fromClass: string, toClass: string) {
    if (fromClass.length > 0 && toClass.length > 0) {
      document.getElementById('show-hide-side-button').classList.remove(fromClass);
      document.getElementById('show-hide-side-button').classList.add(toClass);
    }
  }
  showLoginPanel(){
    document.getElementById('loginPanel').classList.remove('login_sidenav_fade');
    document.getElementById('loginPanel').style.visibility = 'visible';
  }
  hideLoginPanel(){
    document.getElementById('loginPanel').classList.add('login_sidenav_fade');
    setTimeout(()=>{document.getElementById('loginPanel').style.visibility = 'hidden'},1000);
  }
    
  title = "Select an option :";
  isSideNavVisible = true;

  mediator: Mediator = new Mediator(this);
  // 页面初始的组件状态,实现了AfterViewInit的接口
  ngAfterViewInit() {
    this.mediator.moveToState(StateType.MainPanelOnly);
  }


  //主面板上的detail的按钮
  buttonClickedDetail() {
    this.mediator.moveToState(StateType.DetailPanel);
  }
  //侧边栏面板的隐藏和显示
  showHideSideClicked() {
    this.mediator.showHideSideNavClicked();
  }
  //细节面板的隐藏按钮，响应从子组件发出来的事件（notify）
  onNotifyRightWindow(message: string): void {
    this.mediator.moveToState(this.mediator.getCurrentMainPanelState());//获取进入到详细面板之前的页面状态
  }

  onNotifyBoardList(board: IBoardListItem){
    this.rightScreen.board = board;
    
    this.mediator.moveToState(StateType.DetailPanel);
  } 
  onNotifyFilter( filter : IApplyFilter){
    this.boardList.applyFilter(filter);
  }
}