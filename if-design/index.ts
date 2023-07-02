// ⚫︎if文のネスト問題

const attackPoint = 0;
const canAct = true;
const costMagicPoint = 10;

function magicAttack() {
  if (0 < attackPoint) {
    if (canAct) {
      if (costMagicPoint > 0) {
        console.log("アタック！");
      }
    }
  }
}

// 早期returnでネスト解消
// 条件を満たしていないすぐにreturnで抜け出すこと
// 早期リターンを行うには条件を反転させる

function magicAttack2() {
  // 攻撃発動条件がまとめられ、魔法発動時のロジックに対して仕様変更が容易となる
  if (attackPoint === 0) return;
  if (!canAct) return;
  if (costMagicPoint <= 0) return;
  console.log("アタック");
}

// elseも早期リターンで対応することができ、基本は使用しない

// ⚫︎switch文
enum MagicType {
  fire = "fire", // 炎の魔法
  shiden = "shiden", // 雷の魔法
}

// MagicTypeを起点に同じようなswitch文が量産されてしまっている
class MagicManager {
  getName(magicType: MagicType) {
    let name: string = "";

    switch (magicType) {
      case "fire":
        name = "ファイア";
        break;
      case "shiden":
        name = "紫電";
        break;
    }

    return name;
  }
  getCostMagic(magicType: MagicType) {
    let costMagic: number = 0;

    switch (magicType) {
      case "fire":
        costMagic = 10;
        break;
      case "shiden":
        costMagic = 2;
        break;
    }

    return costMagic;
  }

  getAttackPoint(magicType: MagicType) {
    let attackPoint: number = 0;

    switch (magicType) {
      case "fire":
        attackPoint = 10;
        break;
      case "shiden":
        attackPoint = 2;
        break;
    }

    return attackPoint;
  }
}

// MagicManagerの改良版
class MagicManager2 {
  name?: string;

  costMagic?: number;

  attackPoint?: number;

  // switch文が一つにまとまり可読性、保守性が上がった
  MagicManager2(magicType: MagicType) {
    switch (magicType) {
      case "fire":
        this.name = "ファイア";
        this.costMagic = 10;
        this.attackPoint = 5;
        break;
      case "shiden":
        this.name = "紫電";
        this.costMagic = 10;
        this.attackPoint = 5;
        break;
      default:
        throw new Error("エラー発生");
    }
  }
}

// interfaceをswitch文に応用（ストラテジーパターン）
// 処理が分散され保守性がさらに上がった

class MagicPoint {
  costMagic: number;

  constructor(num: number) {
    this.costMagic = num;
  }
}

class AttackPoint {
  attackPoint: number;

  constructor(num: number) {
    this.attackPoint = num;
  }
}

interface Magic {
  name(): string;
  // 戻り値の型も丁寧にオブジェクト化するようにする
  costMagic(): MagicPoint;
  attackPoint(): AttackPoint;
}

type Menber = {
  teamNames: string[];
};

class Fire implements Magic {
  private menber: Menber;

  constructor(menber: Menber) {
    this.menber = menber;
  }

  name(): string {
    return "Fire";
  }

  costMagic(): MagicPoint {
    return new MagicPoint(10);
  }

  attackPoint(): AttackPoint {
    return new AttackPoint(3);
  }
}

class Shiden implements Magic {
  private menber: Menber;

  constructor(menber: Menber) {
    this.menber = menber;
  }

  name(): string {
    return "Shiden";
  }

  costMagic(): MagicPoint {
    return new MagicPoint(100);
  }

  attackPoint(): AttackPoint {
    return new AttackPoint(38);
  }
}
const menber = {
  teamNames: ["a", "b"],
};

// Mapを使用して、さらに保守性を高めよう！！
const magic = new Map<MagicType, Magic>();
const fire = new Fire(menber);
const shiden = new Shiden(menber);

magic.set(MagicType.fire, fire);
magic.set(MagicType.shiden, shiden);

// mapを使用したことで、魔法ごとの条件分岐を書かなくて良くなった
class Attack {
  constructor() {}

  magicAttack(magicType: MagicType) {
    const using = magic.get(magicType);
    using?.attackPoint;
  }

  showMagicName(magicType: MagicType) {
    const using = magic.get(magicType);
    return using?.name;
  }
}

// interfaceは条件分岐のネストにも役に立つ
// ポリシーパターンを使用する

// 購入履歴クラス
class PurchaseHistory {
  totalAmount: number;
  purchaseFrequencyPerMonth: number;
  returnRate: number;

  constructor() {
    this.totalAmount = 100;
    this.purchaseFrequencyPerMonth = 1000;
    this.returnRate = 0.1;
  }
}

// 改善前のコード
// ネストしており、条件が増えていくことで可読性が悪くなる
class bag {
  constructor() {}

  isGoldCustomer(purchaseHistory: PurchaseHistory) {
    if (10000 < purchaseHistory.totalAmount) {
      if (10 <= purchaseHistory.purchaseFrequencyPerMonth) {
        if (purchaseHistory.returnRate <= 0.001) {
          return true;
        }
      }
    }
    return false;
  }
}

// 購入者判定インターフェイスを作成
interface ExcellentCustomerRule {
  ok(history: PurchaseHistory): boolean;
}

// 判定条件クラスを作成
class GoldCustomerPurchaseAmountRule implements ExcellentCustomerRule {
  ok(history: PurchaseHistory) {
    return 100000 <= history.totalAmount;
  }
}

// 判定条件を作成
class PurchaseFrequencyRule implements ExcellentCustomerRule {
  ok(history: PurchaseHistory) {
    return 10 <= history.purchaseFrequencyPerMonth;
  }
}

// 判定条件を作成
class ReturnRateRule implements ExcellentCustomerRule {
  ok(history: PurchaseHistory) {
    return history.returnRate <= 0.001;
  }
}

// ポリシークラスの実装
class ExcellentCustomerPolicy {
  rules: Set<ExcellentCustomerRule>;

  constructor() {
    this.rules = new Set();
  }

  add(rule: ExcellentCustomerRule) {
    this.rules.add(rule);
  }

  /***
   * @paramhistory購入履歴
   * @returnルールをすべて満たす場合true
   * */
  complyWithAll(history: PurchaseHistory) {
    for (let rule of this.rules) {
      if (!rule.ok(history)) return false;
    }
    return true;
  }
}

// bagクラスからの改良版
// シルバー会員向けの実装を行う際は、インターフェイスから専用のクラスを作成すれば対応可能
class GoldCustomerPolicy {
  private policy: ExcellentCustomerPolicy;

  constructor() {
    this.policy = new ExcellentCustomerPolicy();
    this.policy.add(new GoldCustomerPurchaseAmountRule());
    this.policy.add(new PurchaseFrequencyRule());
    this.policy.add(new ReturnRateRule());
  }

  complyWithAll(history: PurchaseHistory) {
    return this.policy.complyWithAll(history);
  }
}
