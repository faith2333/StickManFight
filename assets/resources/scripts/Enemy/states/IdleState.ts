import { BaseState } from "./BaseState";
import { EnemyStateDefine } from "./StateDefine";


export class IdleState extends BaseState {
    id = EnemyStateDefine.Idle;
    
    onEnter() {
        try {
            this.ani.play(this.id);
        } catch (error) {
            console.error(error);
        }
    }

    onExit() {
        
    }

    update(deltaTime: number): void {}
}