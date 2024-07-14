import { _decorator, Animation, CCFloat, Component, Node } from 'cc';
import { StateManager } from './states/Manager';
import { Parameters } from './states/Parameters';
const { ccclass, property } = _decorator;

@ccclass('EnemyConntroller')
export class EnemyConntroller extends Component {

    @property(CCFloat)
    public MoveSpeed: number = 0;

    private _stateManager: StateManager = null;
    private _params: Parameters = null;

    start() {
        this._stateManager = new StateManager(this.node.getChildByName("Enemy").getComponent(Animation), this._params);
        this._stateManager.init();
    }

    update(deltaTime: number) {
        this._stateManager.update(deltaTime);
    }
}


