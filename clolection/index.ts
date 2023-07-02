// for文の中にif文が存在しているケース
let hasPrisonKey = false;
const items = [
  {
    name: "a",
  },
  {
    name: "b",
  },
  {
    name: "牢屋の鍵",
  },
];

//itemsはList<Item>型
for (let item of items) {
  if (item.name.includes("牢屋の鍵")) {
    hasPrisonKey = true;
    break;
  }
}

// アロー関数を使うことで短く処理できる
const hasPrisonKey2 = items.some((item) => item.name === "牢屋の鍵");

// for文内のif文ネストも早期returnを応用したcontineを使用することでネストを解消できる。

// コレクションに関数ことで勉強になる参考ページ
// https://qiita.com/suin/items/14c43f138133f4af0679
