import { BaseState } from "./BaseState";
import { EnemyStateDefine } from "./StateDefine";


export class AttackState extends BaseState {
    id = EnemyStateDefine.Attack;
    
    onExit() {
        
    }

    update(deltaTime: number): void {}
}