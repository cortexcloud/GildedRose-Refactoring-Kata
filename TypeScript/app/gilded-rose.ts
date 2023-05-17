export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  public updateQuality() {
    for (const item of this.items) {
      this.updateItemQuality(item);
    }
    return this.items;
  }

  private updateItemQuality(item: Item): void {
    if (item.name != "Sulfuras, Hand of Ragnaros") {
      item.sellIn -= 1;
    }

    if (
      item.name === "Aged Brie" ||
      item.name === "Backstage passes to a TAFKAL80ETC concert"
    ) {
      if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
        if (item.sellIn <= 4) {
          this.increaseItemQuality(item, 3);
        } else if (item.sellIn <= 9) {
          this.increaseItemQuality(item, 2);
        } else {
          this.increaseItemQuality(item, 1);
        }
      } else {
        this.increaseItemQuality(item, 1);
      }
    } else if (item.name != "Sulfuras, Hand of Ragnaros") {
      this.decreaseItemQuality(item, 1);
    }

    if (item.sellIn < 0) {
      if (item.name === "Aged Brie") {
        this.increaseItemQuality(item, 1);
      } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        item.quality = 0;
      } else if (item.name != "Sulfuras, Hand of Ragnaros") {
        this.decreaseItemQuality(item, 1);
      }
    }
  }

  private increaseItemQuality(item: Item, amount: number): void {
    const resultQuality = item.quality + amount;
    item.quality = resultQuality < 50 ? resultQuality : 50;
  }

  private decreaseItemQuality(item: Item, amount: number): void {
    const resultQuality = item.quality - amount;
    item.quality = resultQuality > 0 ? resultQuality : 0;
  }
}
