import { BaseState } from "./BaseState";
import { EnemyStateDefine } from "./StateDefine";


export class IdleState extends BaseState {
    id = EnemyStateDefine.Idle;

    private _timeout: any = null;
    
    onEnter() {
        this.ani.play(this.id);
        this._timeout = setTimeout(() => {
            if (this.params.targetPosition.length == 0) {
                this.params.targetPosition = [...this.params.partolPos];
            }
            if (Math.abs(this.params.targetPosition[0].x - this.ani.node.worldPosition.x) < 10) {
                this.params.targetPosition.shift();
                this.onEnter();
                return;
            }
            if (this.params.targetPosition[0].x < this.ani.node.worldPosition.x) {
                this.params.direction = 1;
            } else {
                this.params.direction = -1;
            }

            this.params.stateMachine.transitionTo(EnemyStateDefine.Walk);
        }, 3000);
    }

    onExit() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
    }

    update(deltaTime: number): void {}
}