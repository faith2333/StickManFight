import { Collider2D, RigidBody2D } from "cc";
import { BaseState } from "./BaseState";
import { EnemyStateDefine } from "./StateDefine";


export class WalkState extends BaseState {
    id: EnemyStateDefine.Walk
    
    onExit(): void {
        
    }

    update(deltaTime: number): void {
        let lv = this.ani.node.getComponent(RigidBody2D).linearVelocity;
        lv.x = this.params.moveSpeed;
        this.ani.node.getComponent(RigidBody2D).linearVelocity = lv;
    }
}