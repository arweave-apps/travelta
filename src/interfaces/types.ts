type Entries<T> = {
  [K in keyof T]: [K, T[K]];
};

export type EntriesArray<T> = Entries<T>[keyof T][];

type Keys<T> = {
  [K in keyof T]: [keyof T];
};

export type KeysArray<T> = Keys<T>[keyof T];

type Values<T> = {
  [K in keyof T]: [T[K]];
};

export type ValuesArray<T> = Values<T>[keyof T];
