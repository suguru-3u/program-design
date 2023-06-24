/**
 * クラス単体で正常に動作するように設計する
 * ▫️クラスの構成要素(どちらか1つかけてもダメ)
 * ・インスタンス変数
 * ・インスタンス変数を不正状態から防御し、正常に操作するメソッド
 * システムの使用に必要なメソッドのみ定義する
 * クラス設計とは、インスタンス変数を不正状態にしないための仕組みづくり
 */

class Money {
  //　外部から値が書き換えられないようにするためにprivateにしておく
  private readonly amount: number; //金額

  private readonly currency: string; //通貨単位

  // インスタンス生成時に、インスタンス変数に値を渡せるようにしておく
  // 不正な値が入り込んできた際は、バリデーションで弾く
  constructor(amount: number, currency: string) {
    if (amount < 0) {
      throw new Error("amountの値が0以下です");
    }
    if (currency == null) {
      throw new Error("currncyに値を入れてください");
    }
    this.amount = amount;
    this.currency = currency;
  }

  // 計算ロジックも追加
  // 値を変更する際は、変更値をもったインスタンスを生成する
  // 引数に期待してない値の混入を防ぐために引数の型も厳格化する
  add(other: Money) {
    if (this.currency !== other.currency) {
      return new Error("通貨単位が異なります");
    }
    // 途中で値が変わってしまわないように、再代入できないようにする
    const added = this.amount + other.amount;
    return new Money(added, this.currency);
  }
}
