import { Animation } from "cc";
import { StateMachine } from "../../fsm/StateMachine";
import { BaseState } from "./BaseState";
import { StateDefine } from "./Define";
import { Parameters } from "./typing";

export enum MoveStateDefine {
    Walk = "walk",
    Run = "run",
    Dash = "dash",
    Slide = "slide"
}


export class MoveState extends BaseState {
    id: StateDefine.Move

    private _subMachine: StateMachine<MoveStateDefine> = new StateMachine;
    private _defaultState = MoveStateDefine.Walk;

    constructor(ani: Animation, params: Parameters) {
        super(ani, params)
        this.init()
    }

    init() {
        this._subMachine.add(new WalkState(this.ani, this.params))
        this._subMachine.add(new RunState(this.ani, this.params))
        this._subMachine.add(new DashState(this.ani, this.params))
        this._subMachine.add(new SlideState(this.ani, this.params))
    }

    onEnter(): void {
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
    id: MoveStateDefine.Walk;

    onEnter(): void {
        this.ani.play(this.id)
    }
}

export class RunState extends BaseMoveState {
    id: MoveStateDefine.Run;

    onEnter(): void {
        this.ani.play(this.id)
    }
}

export class DashState extends BaseMoveState {
    id: MoveStateDefine.Dash;

    onEnter(): void {
        this.ani.play(this.id)
    }
}

export class SlideState extends BaseMoveState {
    id: MoveStateDefine.Slide;

    onEnter(): void {
        this.ani.play(this.id)
    }
}