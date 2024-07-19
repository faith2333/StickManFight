import { BaseState } from "./BaseState";
import { EnemyStateDefine } from "./StateDefine";


export class AttackState extends BaseState {
    id = EnemyStateDefine.Attack;
    
    onEnter(): void {
        this.ani.play('combo');
    }
    
    onExit() {
       
    }

    update(deltaTime: number): void {
        console.log("AttackState")
    }
}