import { Animation } from "cc";
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

    init() {
        this._sm.add(new IdleState(this._ani, this._params))
        this._sm.add(new MoveState(this._ani, this._params))
    }

}