import { BaseState } from "./BaseState";
import { EnemyStateDefine } from "./StateDefine";


export class HitState extends BaseState {
    id = EnemyStateDefine.Hit;
    
    onEnter(): void {
        this.ani.play(this.id);
    }

    onExit() {
        
    }

    update(deltaTime: number): void {}
}