declare module "badwords-ko" {
  export default class Filter {
    constructor(options?: {
      placeHolder?: string;
      list?: string[];
      emptyList?: boolean;
    });

    clean(text: string): string;
    check(text: string): boolean; // check 메서드
    isProfane(text: string): boolean; // isProfane 메서드 추가
    addWords(...words: string[]): void; // addWords 메서드 추가
    removeWords(...words: string[]): void; // removeWords 메서드 추가
  }
}
