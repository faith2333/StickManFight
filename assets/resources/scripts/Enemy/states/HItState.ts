import { BaseState } from "./BaseState";
import { EnemyStateDefine } from "./StateDefine";


export class HitState extends BaseState {
    id = EnemyStateDefine.Hit;
    
    onExit() {
        
    }

    update(deltaTime: number): void {}
}