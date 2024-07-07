import { Animation, Collider2D, ERaycast2DType, EventKeyboard, KeyCode, PhysicsSystem2D, UITransform, Vec2, Vec3, geometry } from "cc";
import { StateMachine } from "../../fsm/StateMachine";
import { StateDefine } from "./Define";
import { IdleState } from "./IdleState";
import { MoveState } from "./MoveState";
import { Parameters } from "./typing";


export class StateManager {

    private _sm: StateMachine<StateDefine> = new StateMachine;

    private _ani: Animation = null;
    private _params: Parameters = null;

    constructor(ani: Animation, params: Parameters) {
        this._ani = ani;
        this._params = params

        this.init()
    }

    handleKeyDown(event: EventKeyboard) {
        if (!this._params.isOnGround) {
            return
        }

        switch (event.keyCode) {
            case KeyCode.KEY_A:
            case KeyCode.ARROW_LEFT:
                this._params.direction = -1
                this._params.isMoving = true
                this._sm.transitionTo(StateDefine.Move)
                break
            case KeyCode.KEY_D:
            case KeyCode.ARROW_RIGHT:
                this._params.direction = 1
                this._params.isMoving = true
                this._sm.transitionTo(StateDefine.Move)
                break
            case KeyCode.KEY_W:
            case KeyCode.ARROW_UP:
            case KeyCode.SPACE:
                this._params.isJumping = true
                this._sm.transitionTo(StateDefine.Move)
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
                this._sm.transitionTo(StateDefine.Idle)
                break
        }
    }

    init() {
        this._sm.add(new IdleState(this._ani, this._params))
        this._sm.add(new MoveState(this._ani, this._params))
        
        this._sm.transitionTo(StateDefine.Idle)
    }

    update(deltaTime: number) {
        this.checkOnGround()

        this._sm.update(deltaTime)
    }

    checkOnGround() {
        const collider = this._ani.node.getComponent(Collider2D);
        const rayOrigin = collider.worldAABB.center.clone();
        rayOrigin.y -= collider.worldAABB.height / 2;
        const rayEnd = new Vec2(rayOrigin.x, rayOrigin.y - 15);

        try {
            const result = PhysicsSystem2D.instance.raycast(rayOrigin, rayEnd, ERaycast2DType.Closest);
            if (result && result.length > 0) {
                this._params.isOnGround = true
            } else {
                this._params.isOnGround = false
            }
        } catch (error) {
            console.error("Raycast failed:", error);
        }
    }

}