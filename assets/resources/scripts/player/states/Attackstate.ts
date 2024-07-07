import { BaseState } from "./BaseState";
import { StateDefine } from "./Define";


export class AttackState extends BaseState {
    id = StateDefine.Attack;

    onEnter(): void {
        this.ani.play(this.id)
    }

    onExit(): void {
        this.params.attackCount = 0;
    }

    update(deltaTime: number): void {
    }
}