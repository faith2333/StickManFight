import { Animation, Collider2D, Contact2DType, IPhysics2DContact, Settings, Vec2, Vec3 } from "cc";
import { StateMachine } from "../../fsm/StateMachine";
import { IdleState } from "./IdleState";
import { Parameters } from "./Parameters";
import { EnemyStateDefine } from "./StateDefine";
import { AttackState } from "./AttackState";
import { HitState } from "./HItState";
import { WalkState } from "./WalkState";
import { PursuitState } from "./PursuitState";

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
        this.initVision();
    }

    initState() {
        this._sm.add(new IdleState(this._ani, this._params));
        this._sm.add(new WalkState(this._ani, this._params));
        this._sm.add(new AttackState(this._ani, this._params));
        this._sm.add(new HitState(this._ani, this._params));
        this._sm.add(new PursuitState(this._ani, this._params));

        this._params.stateMachine = this._sm;
        this._sm.transitionTo(EnemyStateDefine.Idle);
    }

    initVision() {
        const colliders = this._ani.node.getComponents(Collider2D)
        for (const collider of colliders) {
            if (collider.tag ===  1) {
                collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
                collider.on(Contact2DType.END_CONTACT, this.onCollisionEnd, this);
            }
        }
    }

    onCollisionEnter(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        if (otherCollider.node.name === 'Hero') {
            this._params.pursuitPosition = otherCollider.node.worldPosition;
            this._sm.transitionTo(EnemyStateDefine.Pursuit);
        }
    }

    onCollisionEnd(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact) {
        if (otherCollider.node.name === 'Hero') {
           
        }
    }

    update(deltaTime: number) {
        this._sm.update(deltaTime);
    }
}