/**
 * 下の関数ではtmpにいろいろ値が入っていて中身がどうなっているのか分かりにくい
 */

// function intdamage(){
//     //メンバーの腕力と武器性能が基本攻撃力
//     let tmp= member.power() + member.weaponAttack();
//     //メンバーのスピードで攻撃力を補正
//     tmp=(int)(tmp*(1f+member.speed()/100f));
//     //攻撃力から敵の防御力を差し引いたのがダメージ
//     tmp=tmp(int)(enemy.defence/2);
//     //ダメージ値が負数にならないよう補正
//     tmp=Math.max(0,tmp);
//     return tmp;
// }

// 上の関数を不変なローカル変数に変更

// 非常に見やすい
function damage() {
  const basicAttackPower = 1; //member.power() + member.weaponAttack();
  const finalAttackPower = 1; // basicAttackPower * (1f+member.speed()/100f));
  const reduction = 1; // enemy.defence/2;
  const damage = 1; // ath.max(0,finalAttackPower - reduction);
  return damage;
}

// 関数の副作用
// 引数を受け取り、戻り値を返す意外に、外部の状態（変数など）を変更すること

// 関数を作成するときは、データを引数（状態）で受け取ること、状態を変更しないこと、値は戻り値として返すようにすることを意識する

// 実際の開発でもデフォルトは　不変を意識する
// パフォーマンスに影響を与える時は、可変にすることを考慮する。（インスタンス生成でメモリを使用してしまうため）

// 可変にする場合は、正しく状態変更するメソッドを設計するように気を付ける。
