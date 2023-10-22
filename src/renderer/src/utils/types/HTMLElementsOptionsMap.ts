// export type HTMLElementsOptionsMap<T> = {
//   /**
//    * FIXME:
//    * Type 'Function & T[K]' does not satisfy the constraint '(...args: any) => any'.
//    * Type 'Function' provides no match for the signature '(...args: any): any'.
//    */

//   [K in keyof T]?: T[K] extends Function
//     ? Parameters<T[K]> : T[K] extends Object
//     ? Partial<T[K]> : T[K]
// }

export type HTMLElementsOptionsMap<T> = {
  [K in keyof T]?: T[K] extends (...args: any[]) => any
    ? Parameters<T[K]>
    : T[K] extends object
    ? Partial<T[K]>
    : T[K]
}
