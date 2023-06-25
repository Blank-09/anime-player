import { Optional } from "./Optional";

export type HTMLElementsOptionsMap<T> = {
  /**
   * FIXME:
   * Type 'Function & T[K]' does not satisfy the constraint '(...args: any) => any'.
   * Type 'Function' provides no match for the signature '(...args: any): any'.
   */

  [K in keyof T]?: T[K] extends Function
  // @ts-ignore
    ? Parameters<T[K]> : T[K] extends Object
    ? Optional<T[K]> : T[K];
};
