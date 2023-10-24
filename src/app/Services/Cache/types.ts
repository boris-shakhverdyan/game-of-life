export interface ICacheable<T> {
    isEqual(param: T): boolean;
}
