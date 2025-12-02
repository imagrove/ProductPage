// 实用工具类型定义

// 基础工具类型
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
export type Maybe<T> = T | null | undefined

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P]
}

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// 函数相关类型
export type FunctionType = (...args: any[]) => any
export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>
export type Constructor<T = any> = new (...args: any[]) => T

export type Parameters<T extends FunctionType> = T extends (...args: infer P) => any ? P : never
export type ReturnType<T extends FunctionType> = T extends (...args: any[]) => infer R ? R : never

// 对象操作类型
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never
}[keyof T]

export type PickByType<T, U> = Pick<T, KeysOfType<T, U>>
export type OmitByType<T, U> = Omit<T, KeysOfType<T, U>>

export type ValueOf<T> = T[keyof T]
export type Entry<T> = [keyof T, ValueOf<T>]

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

// 数组操作类型
export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

export type Flatten<T> = T extends Array<infer U> ? Flatten<U> : T

export type NonEmptyArray<T> = [T, ...T[]]

export type Tuple<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never

type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>

// 条件类型
export type If<Condition extends boolean, TrueType, FalseType> = Condition extends true
  ? TrueType
  : FalseType

export type IsNever<T> = [T] extends [never] ? true : false
export type IsUnion<T> =
  IsNever<T> extends true ? false : [T] extends [UnionToIntersection<T>] ? false : true

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never

// 字符串操作类型
export type StringKeys<T> = Extract<keyof T, string>
export type StringValues<T> = T[StringKeys<T>]

export type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>

export type SnakeCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${SnakeCase<U>}`
  : S

// 事件相关类型
export type EventHandler<T = Event> = (event: T) => void
export type EventMap<T extends Element> = T extends HTMLElement
  ? HTMLElementEventMap
  : T extends SVGElement
    ? SVGElementEventMap
    : Record<string, Event>

export type EventType<T extends Element, K extends keyof EventMap<T>> = EventMap<T>[K]

// 表单相关类型
export type FormFieldValue = string | number | boolean | File | FileList | null
export type FormDataObject = Record<string, FormFieldValue>

export type FormValidationResult = {
  isValid: boolean
  errors: Record<string, string>
}

export type FormValidator<T = any> = (value: T) => string | null | undefined

// 响应式设计类型
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type BreakpointValues = Record<Breakpoint, number>

export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>

export type ResponsiveProp<T> = T | ResponsiveValue<T>

// 动画相关类型
export type EasingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'cubic-bezier'
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'

export type AnimationTiming = {
  duration: number
  delay?: number
  easing?: EasingFunction
  iterations?: number | 'infinite'
  direction?: AnimationDirection
  fill?: 'none' | 'forwards' | 'backwards' | 'both'
}

// 性能监控类型
export type PerformanceMetric = {
  name: string
  value: number
  unit: string
  timestamp: number
}

export type PerformanceEntryType =
  | 'navigation'
  | 'paint'
  | 'resource'
  | 'mark'
  | 'measure'
  | 'longtask'

// 错误处理类型
export type ErrorWithMessage = {
  message: string
  stack?: string
  cause?: unknown
}

export type ErrorHandler = (error: ErrorWithMessage) => void

export type ErrorBoundaryFallbackProps = {
  error: ErrorWithMessage
  resetErrorBoundary: () => void
}

// 国际化类型
export type Locale = string
export type TranslationKey = string
export type TranslationValues = Record<string, any>

export type TranslationFunction = (key: TranslationKey, values?: TranslationValues) => string

// 主题相关类型
export type ThemeMode = 'light' | 'dark' | 'auto'
export type ThemeColor = {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  error: string
  warning: string
  info: string
  success: string
}

export type Theme = {
  mode: ThemeMode
  colors: ThemeColor
  spacing: Record<string, string>
  typography: Record<string, any>
  breakpoints: BreakpointValues
}
