export type AppAction<T> = {
    type: string,
    payload?: T,
}