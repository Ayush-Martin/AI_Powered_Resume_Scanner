/**
 * Binds all prototype methods of an object to itself.
 * @param {T} instance - The object to bind methods to.
 */
export function binder<T extends object>(instance: T): void {
  const proto = Object.getPrototypeOf(instance);

  Object.getOwnPropertyNames(proto).forEach((methodName) => {
    const method = proto[methodName];

    // Bind all prototype methods except the constructor
    if (typeof method === "function" && methodName !== "constructor") {
      instance[methodName as keyof T] = method.bind(instance);
    }
  });
}