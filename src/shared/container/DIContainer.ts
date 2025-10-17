export type Constructor<T = {}> = new (...args: any[]) => T;
export type ServiceIdentifier<T = any> = string | symbol | Constructor<T>;

export interface ContainerConfig {
  transient?: boolean;
  singleton?: boolean;
}

export class DIContainer {
  private services = new Map<ServiceIdentifier, any>();
  private singletons = new Map<ServiceIdentifier, any>();
  private factories = new Map<ServiceIdentifier, (...args: any[]) => any>();

  /**
   * Register a singleton service
   */
  registerSingleton<T>(identifier: ServiceIdentifier<T>, factory: () => T): DIContainer {
    this.factories.set(identifier, factory);
    this.services.set(identifier, { singleton: true });
    return this;
  }

  /**
   * Register a transient service
   */
  registerTransient<T>(identifier: ServiceIdentifier<T>, factory: (...args: any[]) => T): DIContainer {
    this.factories.set(identifier, factory);
    this.services.set(identifier, { transient: true });
    return this;
  }

  /**
   * Register an instance
   */
  registerInstance<T>(identifier: ServiceIdentifier<T>, instance: T): DIContainer {
    this.singletons.set(identifier, instance);
    return this;
  }

  /**
   * Resolve a service
   */
  resolve<T>(identifier: ServiceIdentifier<T>): T {
    // Check if it's already instantiated as singleton
    if (this.singletons.has(identifier)) {
      return this.singletons.get(identifier);
    }

    const factory = this.factories.get(identifier);
    if (!factory) {
      throw new Error(`Service ${String(identifier)} not registered`);
    }

    const config = this.services.get(identifier);
    const instance = factory();

    // Store singleton instances
    if (config?.singleton) {
      this.singletons.set(identifier, instance);
    }

    return instance;
  }

  /**
   * Check if service is registered
   */
  isRegistered<T>(identifier: ServiceIdentifier<T>): boolean {
    return this.services.has(identifier) || this.singletons.has(identifier);
  }

  /**
   * Clear all registrations
   */
  clear(): void {
    this.services.clear();
    this.singletons.clear();
    this.factories.clear();
  }
}

// Export default container instance
export const container = new DIContainer();