import { SwCategory } from '../enums/enums';

type StoredData = {
  search: string;
  category: SwCategory;
};

export class LocalStorageService<StoredData> {
  private storageKeyPrefix: string;

  constructor(storageKeyPrefix: string) {
    this.storageKeyPrefix = storageKeyPrefix;
  }

  private getStorageKey(key: string): string {
    return `${this.storageKeyPrefix}_${key}`;
  }

  public saveData<Key extends keyof StoredData & string>(key: Key, data: StoredData[Key]): void {
    const storageKey = this.getStorageKey(key.toString());
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  public getData<Key extends keyof StoredData & string>(key: Key): StoredData[Key] | null {
    const storageKey = this.getStorageKey(key);
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : null;
  }
}

export default new LocalStorageService<StoredData>('SW_App');
