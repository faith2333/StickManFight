import { RigidBody, RigidBody2D } from "cc";
import { BaseState } from "./BaseState";
import { StateDefine } from "./Define";

export class IdleState extends BaseState {
    id = StateDefine.Idle;

    onEnter(): void {
        this.params.isMoving = false;
        this.params.isRunning = false;
        this.params.isSliding = false;
        this.params.isDashing = false;
        this.params.isJumping = false;
        this.ani.play(this.id)
    }
}
