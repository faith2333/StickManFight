
// StateMachine, can be used as top level state machine or as a sub state machine
export class StateMachine<TKey> implements FSM.IState<TKey>, FSM.IStateMachine<TKey>, FSM.ITransition<TKey> {
    id: TKey;
    private _currentState: FSM.IState<TKey> | null = null;
    private _states: Map<TKey, FSM.IState<TKey>> = new Map();
    private _transitions: Map<TKey, FSM.IState<TKey>> = new Map();

    public get currentState(): FSM.IState<TKey> | null {
        return this._currentState;
    }

    public onEnter(): void {
        this._currentState?.onEnter();
    }

    public onExit(): void {
        this._currentState?.onExit();
    }

    public update(deltaTime: number): void {
        this._currentState?.update(deltaTime);
    }

    public canTransitionTo(id: TKey): boolean {
        return this._transitions.has(id);
    }

    public add(state: FSM.IState<TKey>): void {
        this._states.set(state.id, state);
    }

    public remove(id: TKey): void {
        this._states.delete(id);
    }

    public transitionTo(id: TKey): void {
        if (this.canTransitionTo(id)) {
            this._currentState?.onExit();
            this._currentState = this._transitions.get(id);
            this._currentState?.onEnter();
        }
    }
}