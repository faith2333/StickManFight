import { Animation, Settings, Vec2, Vec3 } from "cc";
import { StateMachine } from "../../fsm/StateMachine";
import { IdleState } from "./IdleState";
import { Parameters } from "./Parameters";
import { EnemyStateDefine } from "./StateDefine";
import { AttackState } from "./AttackState";
import { HitState } from "./HItState";
import { WalkState } from "./WalkState";

export class StateManager {

    private _sm: StateMachine<EnemyStateDefine> = new StateMachine();
    private _ani: Animation = null;
    private _params: Parameters = null;

    constructor(ani: Animation, params: Parameters) {
        this._ani = ani;
        this._params = params;
    }

    init() {
        this.initState();
    }

    initState() {
        this._sm.add(new IdleState(this._ani, this._params));
        this._sm.add(new WalkState(this._ani, this._params));
        this._sm.add(new AttackState(this._ani, this._params));
        this._sm.add(new HitState(this._ani, this._params));

        this._params.stateMachine = this._sm;
        this._sm.transitionTo(EnemyStateDefine.Idle);
    }

    update(deltaTime: number) {
        if (this.checkPlayerEnterVision()) {
            this._sm.transitionTo(EnemyStateDefine.Attack);
        }
        this._sm.update(deltaTime);
    }

    checkPlayerEnterVision(): boolean {
        // check player enter vision
        return false
    }
}