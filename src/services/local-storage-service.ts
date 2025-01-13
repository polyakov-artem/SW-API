import { SwCategory } from '../enums/enums';

export type TStoredData = {
  search: string;
  category: SwCategory;
};

export class LocalStorageService<TData> {
  private storageKeyPrefix: string;

  constructor(storageKeyPrefix: string) {
    this.storageKeyPrefix = storageKeyPrefix;
  }

  private getStorageKey(key: string): string {
    return `${this.storageKeyPrefix}_${key}`;
  }

  public saveData<Key extends keyof TData & string>(key: Key, data: TData[Key]): void {
    const storageKey = this.getStorageKey(key.toString());
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  public getData<Key extends keyof TData & string>(key: Key): TData[Key] | null {
    const storageKey = this.getStorageKey(key);
    const data = localStorage.getItem(storageKey);

    if (data === null) return null;

    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
}

export default new LocalStorageService<TStoredData>('SW_App');
