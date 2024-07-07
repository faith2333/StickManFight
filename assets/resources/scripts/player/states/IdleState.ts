import { RigidBody, RigidBody2D } from "cc";
import { BaseState } from "./BaseState";
import { StateDefine } from "./Define";

export class IdleState extends BaseState {
    id = StateDefine.Idle;

    onEnter(): void {
        this.ani.play(this.id)
    }
}
