import { Animation } from "cc";
import { Parameters } from "./Parameters";
import { EnemyStateDefine } from "./StateDefine";

export abstract class BaseState implements FSM.IState<EnemyStateDefine> {
    id: EnemyStateDefine;

    protected ani: Animation = null;
    protected params: Parameters = null;

    constructor(ani: Animation, params: Parameters) {
        this.ani = ani;
        this.params = params;
    }

    onEnter(): void {
        this.ani.play(this.id);
    };
    abstract onExit(): void;
    abstract update(deltaTime: number): void;
    canTransitionTo(id: EnemyStateDefine): boolean {
        return true;
    }

}