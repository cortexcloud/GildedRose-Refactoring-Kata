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
      this.nextDay(item);
      if (item.sellIn < 0) {
        this.updateExpiredItemQuality(item);
      } else {
        this.updateItemQuality(item);
      }
    }
    return this.items;
  }

  private nextDay(item: Item): void {
    if (item.name !== "Sulfuras, Hand of Ragnaros") {
      item.sellIn -= 1;
    }
  }

  private updateItemQuality(item: Item): void {
    if (item.name === "Aged Brie") {
      this.increaseItemQuality(item, 1);
    } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      if (item.sellIn <= 4) {
        this.increaseItemQuality(item, 3);
      } else if (item.sellIn <= 9) {
        this.increaseItemQuality(item, 2);
      } else {
        this.increaseItemQuality(item, 1);
      }
    } else if (item.name === "Sulfuras, Hand of Ragnaros") {
    } else {
      this.decreaseItemQuality(item, 1);
    }
  }

  private updateExpiredItemQuality(item): void {
    if (item.name === "Aged Brie") {
      this.increaseItemQuality(item, 2);
    } else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
      this.dropItemQuality(item);
    } else if (item.name === "Sulfuras, Hand of Ragnaros") {
    } else {
      this.decreaseItemQuality(item, 2);
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

  private dropItemQuality(item: Item): void {
    item.quality = 0;
  }
}
