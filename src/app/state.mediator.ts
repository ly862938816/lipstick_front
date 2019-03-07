//
export enum StateType {
    MainPanelOnly,
    MainPanelWithSideNav,
    DetailPanel,
    LoginPanel
}
//面板的三个类型
export enum PanelType {
    Primary,
    Detail,
    OverlayPanel
}
export interface IState {
    getPanelType(): PanelType;
    getStateType(): StateType;
    isSideNavVisible(): boolean;
    getPanelButtonClass(): string;
    isLoginVisible(): boolean;
}
export class LoginPanel implements IState {
    getPanelType(): PanelType { return PanelType.OverlayPanel };
    getStateType(): StateType { return StateType.LoginPanel };
    isSideNavVisible(): boolean { return false };
    getPanelButtonClass(): string { return '' };
    isLoginVisible(): boolean { return true };
}
export class MainPanelOnly implements IState {
    getPanelType(): PanelType { return PanelType.Primary };
    getStateType(): StateType { return StateType.MainPanelOnly };
    isSideNavVisible(): boolean { return false };
    getPanelButtonClass(): string { return 'fa-chevron-right' };
    isLoginVisible(): boolean { return false };
}
export class MainPanelWithSideNav implements IState {
    getPanelType(): PanelType { return PanelType.Primary };
    getStateType(): StateType { return StateType.MainPanelWithSideNav };
    getPanelButtonClass(): string { return 'fa-chevron-left' };
    isSideNavVisible(): boolean { return true };
    isLoginVisible(): boolean { return false };
}
export class DetailPanel implements IState {
    getPanelType(): PanelType { return PanelType.Detail };
    getStateType(): StateType { return StateType.DetailPanel };
    getPanelButtonClass(): string { return '' };
    isSideNavVisible(): boolean { return false };
    isLoginVisible(): boolean { return false };
}
//调停者的接口
export interface IMediatorImpl {
    showNavPanel(): void;
    hideNavPanel(): void;
    showDetailPanel(): void;
    hideDetailPanel(): void;
    changeShowHideSideButton(fromClass: string, toClass: string): void;
    showLoginPanel(): void;
    hideLoginPanel(): void;
}
//调停者的类
export class Mediator {
    //调停者有所有面板的实例
    private _mainPanelState = new MainPanelOnly();
    private _detailPanelState = new DetailPanel();
    private _sideNavState = new MainPanelWithSideNav();
    private _loginState = new LoginPanel();

    private _currentState: IState;
    private _currentMainPanelState: IState;
    private _mediatorImpl: IMediatorImpl;

    constructor(mediatorImpl: IMediatorImpl) {
        this._mediatorImpl = mediatorImpl;
        this._currentState = this._currentMainPanelState = this._sideNavState;
    }
    getStateImpl(stateType: StateType): IState {
        var stateImpl: IState;
        switch (stateType) {
            case StateType.DetailPanel:
                stateImpl = this._detailPanelState;
                break;
            case StateType.MainPanelOnly:
                stateImpl = this._mainPanelState;
                break;
            case StateType.MainPanelWithSideNav:
                stateImpl = this._sideNavState;
                break;
            case StateType.LoginPanel:
                stateImpl = this._loginState;
                break;
        }
        return stateImpl;
    }
    moveToState(stateType: StateType) {
        var previousState = this._currentState;
        var nextState = this.getStateImpl(stateType);

        // console.log('pre button:' + previousState.getPanelButtonClass());
        // console.log('next button:' + nextState.getPanelButtonClass());
        if (previousState.getPanelType() == PanelType.Primary && nextState.getPanelType() == PanelType.Detail) {
            this._mediatorImpl.showDetailPanel();
        }
        if (previousState.getPanelType() == PanelType.Detail && nextState.getPanelType() == PanelType.Primary) {
            this._mediatorImpl.hideDetailPanel();
        }

        if (nextState.isSideNavVisible()) {
            this._mediatorImpl.showNavPanel();
        } else {
            this._mediatorImpl.hideNavPanel();
        }
        if (nextState.isLoginVisible()) {
            this._mediatorImpl.showLoginPanel();
        } else {
            this._mediatorImpl.hideLoginPanel();
        }

        this._mediatorImpl.changeShowHideSideButton(
            previousState.getPanelButtonClass(),
            nextState.getPanelButtonClass()
        );

        this._currentState = nextState;
        if (this._currentState.getPanelType() == PanelType.Primary) {
            this._currentMainPanelState = this._currentState;
        }
    }
    showHideSideNavClicked() {
        switch (this._currentState.getStateType()) {
            case StateType.MainPanelWithSideNav:
                this.moveToState(StateType.MainPanelOnly);
                break;
            case StateType.MainPanelOnly:
                this.moveToState(StateType.MainPanelWithSideNav);
                break;
        }
    }
    // 获取当前状态的状态类型
    getCurrentMainPanelState() {
        return this._currentMainPanelState.getStateType();
    }
}