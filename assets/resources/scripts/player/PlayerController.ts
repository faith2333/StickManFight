import { _decorator, Animation, CCFloat, Component, input, Input, KeyCode, Node } from 'cc';
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
        this.initKeyboradsListener();
    }

    initState() {
        this._params = {
            moveSpeed: this.MoveSpeed, 
            jumpForce: this.JumpFore,
            isMoving: false,
            isJumping: false,
            direction: 1,
            isDashing: false,
            isRunning: false,
            isSliding: false,
            isOnGround: true,
        }
        this._ani = this.node.getChildByName("Hero").getComponent(Animation);
        this._sm = new StateManager(this._ani, this._params);
    }

    initKeyboradsListener() {
        input.on(Input.EventType.KEY_DOWN, (event) => {
           this._sm.handleKeyDown(event);
        }, this);
        input.on(Input.EventType.KEY_UP, (event) => {
            this._sm.handleKeyUp(event);
        }, this);  
    }

    update(deltaTime: number) {
        this._sm.update(deltaTime);
    }
}

