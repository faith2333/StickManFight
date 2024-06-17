
declare namespace FSM {
    export interface IState<TKey> {
        id: TKey;
        onEnter(): void;
        onExit(): void;
        update(deltaTime: number): void;
        canTransitionTo(id: TKey): boolean;
    }

    export interface ITransition<TKey> {
        transitionTo(id: TKey): void;
    }

    export interface IStateMachine<TKey> {
        add(state: IState<TKey>): void;
        remove(id: TKey): void;
        update(deltaTime: number): void;
    }
}