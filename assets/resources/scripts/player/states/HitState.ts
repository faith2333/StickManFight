import { BaseState } from "./BaseState";
import { StateDefine } from "./Define";


export class HitState extends BaseState {
    id = StateDefine.Hit;

    onEnter(): void {
        this.ani.play(this.id);
    }

    onExit(): void {
        
    }

    update(deltaTime: number): void {
     
    }
}