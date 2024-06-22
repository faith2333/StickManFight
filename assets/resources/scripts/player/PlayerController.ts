import { _decorator, Animation, CCFloat, Component, Node } from 'cc';
import { StateManager } from './states/Manager';
import { Parameters } from './states/typing';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {
    
    @property(CCFloat)
    public MoveSpeed: number = 0;
    @property(CCFloat)
    public JumpFore: number = 0;

    private _sm: StateManager = null;
    private _ani: Animation = null;
    private _params: Parameters = null;



    start() {
        this.initState();
    }

    initState() {
        this._params = {
            moveSpeed: this.MoveSpeed,
            jumpForce: this.JumpFore,
        }
        this._ani = this.node.getChildByName("Hero").getComponent(Animation);
        this._sm = new StateManager(this._ani, this._params);
    }

    update(deltaTime: number) {
        this._sm.update(deltaTime);
    }
}

