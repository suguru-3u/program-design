/**
 * staticメソッドは、ログの出力やフォーマット変換などのメソッドには使用しても問題ない
 */

// コンストラクタを公開すると様々な用途に使われてしまう。
// これを防ぐには、コンストラクタをprivateにして代わりに目的別のファクトリメソッドを用意する。

class GiftPoint {
  private readonly MIN_POINT = 0;
  private readonly STANDARD_MEMBERSHIP_POINT = 3000;
  private readonly PREMIUM_MEMBERSHIP_POINT = 10000;
  private point: number;

  // 生成ロジックがあまりにも増えてしまう場合は、生成専門のファクトリクラスとして分離することを検討する
  private constructor(point: number) {
    if (point < this.MIN_POINT) {
      new Error("ポイントが0以上ありません");
    }
    this.point = point;
  }

  // 標準会員向け入会ギフトポイント
  forStandaerdMenmbership(): GiftPoint {
    return new GiftPoint(this.STANDARD_MEMBERSHIP_POINT);
  }

  // プレミアム会員向け入会ギフトポイント
  forPremiimMenmbership(): GiftPoint {
    return new GiftPoint(this.PREMIUM_MEMBERSHIP_POINT);
  }
}

// 共通処理にいろいろ記載していくと管理が大変であり、基本的に作成しないように意識すること

// 引数を変更しないようにする
class Location2 {
  private x: number;

  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  // 引数の値は変更しない
  shift(x: number, y: number): Location2 {
    const nextX = this.x + x;
    const nextY = this.y + y;
    return new Location2(nextX, nextY);
  }
}

// 引数が多くならないように意識する
// 引数が多くなる場合、データを引数として使うのではなく、そのデータをインスタンス変数として持つクラスへ設計することを検討する
