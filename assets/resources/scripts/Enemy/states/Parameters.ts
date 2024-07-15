import { Vec3 } from "cc";
import { EnemyStateDefine } from "./StateDefine";
import { StateMachine } from "../../fsm/StateMachine";


export type Parameters = {
    moveSpeed: number;
    direction: number;
    targetPosition: Vec3[];
    stateMachine: StateMachine<EnemyStateDefine>;
    partolPos: Vec3[];
}