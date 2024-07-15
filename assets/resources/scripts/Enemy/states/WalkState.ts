import { Collider2D, RigidBody2D } from "cc";
import { BaseState } from "./BaseState";
import { EnemyStateDefine } from "./StateDefine";


export class WalkState extends BaseState {
    id = EnemyStateDefine.Walk;

    onEnter() {
        this.ani.play(this.id);
        this.ani.node.scale.set(this.params.direction, 1, 1);
    }

    onExit() {
        const rigidBody = this.ani.node.getComponent(RigidBody2D);
        let lv = rigidBody.linearVelocity;
        lv.x = 0;
        rigidBody.linearVelocity = lv;
    }

    update(deltaTime: number): void {
        if (this.params.targetPosition.length == 0) {
            this.params.stateMachine.transitionTo(EnemyStateDefine.Idle);
            return;
        }

        let targetPos = this.params.targetPosition[0];
        if (Math.abs(targetPos.x - this.ani.node.worldPosition.x) < 10) {
            this.params.stateMachine.transitionTo(EnemyStateDefine.Idle);
            return;
        }

        const rigidBody = this.ani.node.getComponent(RigidBody2D);
        let lv = rigidBody.linearVelocity;
        lv.x = this.params.moveSpeed * this.params.direction * -1;
        rigidBody.linearVelocity = lv;
    }
}