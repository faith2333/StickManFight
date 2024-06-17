import { Animation } from "cc";
import { StateDefine } from "./Define";
import { Parameters } from "./typing";




export abstract class BaseState implements FSM.IState<StateDefine> {
    id: StateDefine
    protected ani: Animation = null;
    protected params: Parameters = null;

    constructor(ani: Animation, params: Parameters) {
        this.ani = ani;
        this.params = params;
    }

    onEnter(): void {}
    onExit(): void {}
    update(deltaTime: number) {}
    canTransitionTo(id: StateDefine): boolean {return true};
}