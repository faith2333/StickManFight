import { Animation, RigidBody2D, Vec2 } from "cc";
import { StateMachine } from "../../fsm/StateMachine";
import { BaseState } from "./BaseState";
import { StateDefine } from "./Define";
import { Parameters } from "./typing";

export enum MoveStateDefine {
    Walk = "walk",
    Run = "run",
    Dash = "dash",
    Jump = "jump",
    Slide = "slide"
}


export class MoveState extends BaseState {
    id =  StateDefine.Move

    private _subMachine: StateMachine<MoveStateDefine> = new StateMachine;
    private _defaultState = MoveStateDefine.Walk;

    constructor(ani: Animation, params: Parameters) {
        super(ani, params)
        this.init()
    }

    init() {
        this._subMachine.add(new WalkState(this.ani, this.params))
        this._subMachine.add(new JumpState(this.ani, this.params))
        this._subMachine.add(new RunState(this.ani, this.params))
        this._subMachine.add(new DashState(this.ani, this.params))
        this._subMachine.add(new SlideState(this.ani, this.params))
    }

    onEnter(): void {
        if (this.params.isJumping) {
            this._subMachine.transitionTo(MoveStateDefine.Jump)
            return
        }
        if (this.params.isRunning) {
            this._subMachine.transitionTo(MoveStateDefine.Run)
            return
        }
        this._subMachine.transitionTo(this._defaultState)
    }

    onExit(): void {
        this._subMachine.currentState.onExit()
    }

    update(deltaTime: number) {
        this._subMachine.currentState.update(deltaTime)
    }

    canTransitionTo(id: StateDefine): boolean {
        return true
    }
}

export class BaseMoveState implements FSM.IState<MoveStateDefine> {
    id: MoveStateDefine;

    protected ani: Animation = null;
    protected params: Parameters = null;

    constructor(ani: Animation, params: Parameters) {
        this.ani = ani;
        this.params = params;
    }

    onEnter(): void {}
    onExit(): void {}
    update(deltaTime: number) {}
    canTransitionTo(id: MoveStateDefine): boolean {return true}
}

export class WalkState extends BaseMoveState {
    id = MoveStateDefine.Walk;

    onEnter(): void {
        this.ani.play(this.id)
        this.ani.node.setScale(this.params.direction, 1, 1)
    }

    update(deltaTime: number): void {
        let vl = this.ani.node.getComponent(RigidBody2D).linearVelocity;
        vl.x = this.params.moveSpeed/2 * this.params.direction;
        this.ani.node.getComponent(RigidBody2D).linearVelocity = vl;
    }

    onExit(): void {
        let vl = this.ani.node.getComponent(RigidBody2D).linearVelocity;
        vl.x = 0;
        this.ani.node.getComponent(RigidBody2D).linearVelocity = vl;
    }
}

export class RunState extends BaseMoveState {
    id = MoveStateDefine.Run;

    onEnter(): void {
        this.ani.play(this.id)
    }

    onExit(): void {
        let vl = this.ani.node.getComponent(RigidBody2D).linearVelocity;
        vl.x = 0;
        this.ani.node.getComponent(RigidBody2D).linearVelocity = vl;
    }

    update(deltaTime: number): void {
        let vl = this.ani.node.getComponent(RigidBody2D).linearVelocity;
        vl.x = this.params.moveSpeed * this.params.direction;
        this.ani.node.getComponent(RigidBody2D).linearVelocity = vl;
    }
}

export class DashState extends BaseMoveState {
    id = MoveStateDefine.Dash;

    onEnter(): void {
        this.ani.play(this.id)
    }
}

export class JumpState extends BaseMoveState {
    id = MoveStateDefine.Jump;

    onEnter(): void {
        this.ani.play(this.id)
        let rigidBody = this.ani.node.getComponent(RigidBody2D)
        rigidBody.applyLinearImpulseToCenter(new Vec2(0, this.params.jumpForce), true)
    }

    update(deltaTime: number): void {
        if (this.params.isMoving) {
            let vl = this.ani.node.getComponent(RigidBody2D).linearVelocity;
            vl.x = this.params.moveSpeed/4 * this.params.direction;
            this.ani.node.getComponent(RigidBody2D).linearVelocity = vl;
        }
    }
}

export class SlideState extends BaseMoveState {
    id = MoveStateDefine.Slide;

    onEnter(): void {
        this.ani.play(this.id)
    }
}