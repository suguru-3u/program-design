// 体力クラス
// 関係し合うデータとロジックをクラスにまとまっている
// 意図が伝わるようにクラスや変数の名前を決める
class HitPoint {
  private MAX = 999;
  private MIN = 0;
  value: number;

  constructor(value: number) {
    if (value < this.MIN) throw new Error("MIN以上を指定してください");
    if (this.MAX < value) throw new Error("MAX以下を指定してください");
    this.value = value;
  }

  // ダメージを受ける
  // 変数を使いまわさない、目的ごとの変数を用意している
  // 意味のあるまとまりでメソッド化
  damage(damageAmout: number): HitPoint {
    const damaged = this.value - damageAmout;
    const corrected = damaged < this.MIN ? this.MIN : damaged;
    return new HitPoint(corrected);
  }

  // 回復する
  // 変数を使いまわさない、目的ごとの変数を用意している
  // 意味のあるまとまりでメソッド化
  recover(recoverAmount: number): HitPoint {
    const recovered = this.value + recoverAmount;
    const corrected = this.MAX < recovered ? this.MAX : recovered;
    return new HitPoint(corrected);
  }
}
