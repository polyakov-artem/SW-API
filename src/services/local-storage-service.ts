import { SwCategory } from '../enums/enums';

export type StoredDataType = {
  search: string;
  category: SwCategory;
};

export class LocalStorageService<DataType> {
  private storageKeyPrefix: string;

  constructor(storageKeyPrefix: string) {
    this.storageKeyPrefix = storageKeyPrefix;
  }

  private getStorageKey(key: string): string {
    return `${this.storageKeyPrefix}_${key}`;
  }

  public saveData<Key extends keyof DataType & string>(key: Key, data: DataType[Key]): void {
    const storageKey = this.getStorageKey(key.toString());
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  public getData<Key extends keyof DataType & string>(key: Key): DataType[Key] | null {
    const storageKey = this.getStorageKey(key);
    const data = localStorage.getItem(storageKey);
    return data ? JSON.parse(data) : null;
  }
}

export default new LocalStorageService<StoredDataType>('SW_App');
