import { _decorator, Component, EPhysics2DDrawFlags, EPhysicsDrawFlags, Node, PhysicsSystem, PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    start() {
        // this.debug();
    }

    update(deltaTime: number) {
        
    }

    debug() {
        PhysicsSystem2D.instance.enable = true;
        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.All;
    }
}

