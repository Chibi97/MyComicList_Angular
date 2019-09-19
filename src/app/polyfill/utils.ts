type PExclude<T, U> = T extends U ? never : T;

type PPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type POmit<T, K extends keyof any> = Pick<T, PExclude<keyof T, K>>;

