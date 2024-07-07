import { Animation, Collider2D, ERaycast2DType, EventKeyboard, KeyCode, PhysicsSystem2D, UITransform, Vec2, Vec3, geometry } from "cc";
import { StateMachine } from "../../fsm/StateMachine";
import { StateDefine } from "./Define";
import { IdleState } from "./IdleState";
import { MoveState } from "./MoveState";
import { Parameters } from "./typing";
import { AttackState } from "./Attackstate";

const DOUBLE_CLICK_THRESHOLD = 500;


export class StateManager {

    private _sm: StateMachine<StateDefine> = new StateMachine;

    private _ani: Animation = null;
    private _params: Parameters = null;
    private _walkKeyTimeout: Map<string, any> = new Map();
    private _clickCount: Map<string, number> = new Map();

    private _attackCount: number = 0;
    private _comboTimeout: any = null;

    constructor(ani: Animation, params: Parameters) {
        this._ani = ani;
        this._params = params

        this._clickCount['left'] = 0
        this._clickCount['right'] = 0

        this.init()
    }

    handleKeyDown(event: EventKeyboard) {
        if (!this._params.isOnGround || this._params.isSliding) {
            return
        }

        switch (event.keyCode) {
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                this.moveLeft()
                break
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this.moveRight()
                break
            case KeyCode.KEY_S:
            case KeyCode.ARROW_DOWN:
                this.slide()
                break
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
            case KeyCode.SPACE:
                this._params.isJumping = true
                this._sm.transitionTo(StateDefine.Move)
                break
            case KeyCode.KEY_J:
                this.combo()
                break
        }
    }

    handleKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this._params.isMoving = false
                if (this._params.isOnGround && !this._params.isSliding) {
                    this._sm.transitionTo(StateDefine.Idle)
                }
                break
        }
    }

    moveLeft() {
        this._params.direction = -1
        this._params.isMoving = true
        this._clickCount['left']++
        if (this._clickCount['left'] === 1) {
            this._walkKeyTimeout['left'] = setTimeout(() => {
                this._clickCount['left'] = 0
            }, DOUBLE_CLICK_THRESHOLD)
        } else if (this._clickCount['left'] === 2) {
            clearTimeout(this._walkKeyTimeout['left'])
            this._clickCount['left'] = 0
            this._params.isRunning = true
        }
        this._sm.transitionTo(StateDefine.Move)
    }

    moveRight() {
        this._params.direction = 1
        this._params.isMoving = true
        this._clickCount['right']++
        if (this._clickCount['right'] === 1) {
            this._walkKeyTimeout['left'] = setTimeout(() => {
                this._clickCount['right'] = 0
            }, DOUBLE_CLICK_THRESHOLD)
        } else if (this._clickCount['right'] === 2) {
            clearTimeout(this._walkKeyTimeout['left'])
            this._clickCount['right'] = 0
            this._params.isRunning = true
        }
        this._sm.transitionTo(StateDefine.Move)
    }

    slide() {
        if (this._params.isRunning) {
            this._params.isSliding = true
            this._sm.transitionTo(StateDefine.Move)
            setTimeout(() => {
                if (this._params.isSliding) {
                    this._params.isSliding = false
                    if (this._params.isMoving) {
                        this._sm.transitionTo(StateDefine.Move)
                    } else {
                        this._sm.transitionTo(StateDefine.Idle)
                    }
                }
            }, 1000)    
        }
    }

    combo() {
        this._attackCount++
        if (this._comboTimeout) {
            clearTimeout(this._comboTimeout)
            this._comboTimeout = setTimeout(() => {
                this._attackCount = 0
                this._comboTimeout = null
            }, 500)
        } else {
            this._comboTimeout = setTimeout(() => {
                this._attackCount = 0
                this._comboTimeout = null
            }, 500)
        }
    }

    init() {
        this._sm.add(new IdleState(this._ani, this._params))
        this._sm.add(new MoveState(this._ani, this._params))
        this._sm.add(new AttackState(this._ani, this._params))
        
        this._sm.transitionTo(StateDefine.Idle)
    }

    update(deltaTime: number) {
        let onGround = this.checkOnGround()
        if (onGround && !this._params.isOnGround) {
            this._params.isOnGround = true
            this._params.isJumping = false
            if (this._params.isMoving || this._params.isRunning) {
                this._sm.transitionTo(StateDefine.Move)
                return
            }
            this._sm.transitionTo(StateDefine.Idle)
            return
        } else if (!onGround && this._params.isOnGround) {
            this._params.isOnGround = false
        }

        if (this._attackCount > 0 && this._params.attackCount == 0) {
            this._params.attackCount = this._attackCount
            this._sm.transitionTo(StateDefine.Attack)
            return
        }

        if (this._attackCount > 0 && this._params.attackCount > 0) {
            this._params.attackCount = this._attackCount
        }

        if (this._attackCount == 0 && this._params.attackCount > 0) {
            this._sm.transitionTo(StateDefine.Idle)
            return
        }

        this._sm.update(deltaTime)
    }

    checkOnGround(): boolean {
        const collider = this._ani.node.getComponent(Collider2D);
        const rayOrigin = collider.worldAABB.center.clone();
        rayOrigin.y -= collider.worldAABB.height / 2;
        const rayEnd = new Vec2(rayOrigin.x, rayOrigin.y - 15);

        try {
            const result = PhysicsSystem2D.instance.raycast(rayOrigin, rayEnd, ERaycast2DType.Closest);
            if (result && result.length > 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error("Raycast failed:", error);
        }
    }

}