import { Collider2D, math, RigidBody2D } from "cc";
import { BaseState } from "./BaseState";
import { EnemyStateDefine } from "./StateDefine";


export class PursuitState extends BaseState {
    id = EnemyStateDefine.Pursuit;

    onEnter(): void {
        if (!this.params.pursuitPosition) {
            this.params.stateMachine.transitionTo(EnemyStateDefine.Idle);
            return;
        }
        if (this.params.pursuitPosition.x > this.ani.node.worldPosition.x) {
            this.params.direction = -1;
        } else {
            this.params.direction = 1;
        }

        this.ani.node.scale.set(this.params.direction, 1, 1);
        this.ani.play(EnemyStateDefine.Run);
    }

    onExit(): void {
        const rg = this.ani.node.getComponent(RigidBody2D);
        let lv = rg.linearVelocity;
        lv.x = 0;
        rg.linearVelocity = lv;
        this.params.pursuitPosition = null;
    }

    update(deltaTime: number): void {
        if (Math.abs(this.params.pursuitPosition.x - this.ani.node.worldPosition.x) < 110) {
            this.params.stateMachine.transitionTo(EnemyStateDefine.Attack);
            return;
        }

        const rg = this.ani.node.getComponent(RigidBody2D);
        let lv = rg.linearVelocity;
        lv.x = this.params.moveSpeed * -1 * this.params.direction;
        rg.linearVelocity = lv;
    }
}