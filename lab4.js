// main.js

/**
 * Класс Item
 * Представляет предмет в инвентаре
 */
class Item {
  /**
   * @param {string} name - название предмета
   * @param {number} weight - вес предмета
   * @param {string} rarity - редкость предмета
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Возвращает информацию о предмете
   * @returns {string}
   */
  getInfo() {
    return `Название: ${this.name}, Вес: ${this.weight}, Редкость: ${this.rarity}`;
  }

  /**
   * Изменяет вес предмета
   * @param {number} newWeight
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}

/**
 * Класс Weapon
 * Наследуется от Item
 */
class Weapon extends Item {
  /**
   * @param {string} name
   * @param {number} weight
   * @param {string} rarity
   * @param {number} damage
   * @param {number} durability
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);

    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Использует оружие
   * Уменьшает прочность на 10
   */
  use() {
    if (this.durability > 0) {
      this.durability -= 10;

      if (this.durability < 0) {
        this.durability = 0;
      }
    }
  }

  /**
   * Восстанавливает прочность
   */
  repair() {
    this.durability = 100;
  }

  /**
   * Возвращает информацию об оружии
   * @returns {string}
   */
  getInfo() {
    return `${super.getInfo()}, Урон: ${this.damage}, Прочность: ${this.durability}`;
  }
}

// ---------------- ТЕСТИРОВАНИЕ ----------------

const sword = new Item("Steel Sword", 3.5, "rare");

console.log(sword.getInfo());

sword.setWeight(4.0);

console.log("Новый вес:", sword.weight);

const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);

console.log(bow.getInfo());

bow.use();

console.log("Прочность после использования:", bow.durability);

bow.repair();

console.log("Прочность после ремонта:", bow.durability);

// ---------------- ОПЦИОНАЛЬНАЯ ЦЕПОЧКА ----------------

const player = {
  inventory: {
    weapon: {
      name: "Magic Sword"
    }
  }
};

console.log(player?.inventory?.weapon?.name);
console.log(player?.inventory?.armor?.name);

// ---------------- ФУНКЦИЯ-КОНСТРУКТОР ----------------

/**
 * Функция-конструктор ItemConstructor
 * @param {string} name
 * @param {number} weight
 * @param {string} rarity
 */
function ItemConstructor(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

/**
 * Метод получения информации
 * @returns {string}
 */
ItemConstructor.prototype.getInfo = function () {
  return `Название: ${this.name}, Вес: ${this.weight}, Редкость: ${this.rarity}`;
};

/**
 * Метод изменения веса
 * @param {number} newWeight
 */
ItemConstructor.prototype.setWeight = function (newWeight) {
  this.weight = newWeight;
};

/**
 * Функция-конструктор WeaponConstructor
 * @param {string} name
 * @param {number} weight
 * @param {string} rarity
 * @param {number} damage
 * @param {number} durability
 */
function WeaponConstructor(
  name,
  weight,
  rarity,
  damage,
  durability
) {
  ItemConstructor.call(this, name, weight, rarity);

  this.damage = damage;
  this.durability = durability;
}

// Наследование
WeaponConstructor.prototype = Object.create(
  ItemConstructor.prototype
);

WeaponConstructor.prototype.constructor = WeaponConstructor;

/**
 * Использование оружия
 */
WeaponConstructor.prototype.use = function () {
  if (this.durability > 0) {
    this.durability -= 10;

    if (this.durability < 0) {
      this.durability = 0;
    }
  }
};

/**
 * Ремонт оружия
 */
WeaponConstructor.prototype.repair = function () {
  this.durability = 100;
};

/**
 * Получение информации об оружии
 * @returns {string}
 */
WeaponConstructor.prototype.getInfo = function () {
  return `Название: ${this.name}, Вес: ${this.weight}, Редкость: ${this.rarity}, Урон: ${this.damage}, Прочность: ${this.durability}`;
};

// Тест функции-конструктора

const axe = new WeaponConstructor(
  "Battle Axe",
  5,
  "legendary",
  40,
  100
);

console.log(axe.getInfo());

axe.use();

console.log("Прочность топора:", axe.durability);