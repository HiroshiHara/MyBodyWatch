/* @flow */

/**
 * calculate BMI, round to first decimal place.
 * @param {number} height height(cm)
 * @param {number} weight weight(kg)
 */
export function calcBmi(height: number, weight: number): number {
  if (height <= 0 || weight <= 0) {
    return 0;
  }
  const heightParseMeter = height / 100;
  return formatToFixed(weight / (heightParseMeter * heightParseMeter), 1);
}

/**
 * calculate MM(muscle mass(%)), round to first decimal place.
 * @param {number} weight weight(kg)
 * @param {number} bfp Body fat mass(%)
 */
export function calcMm(weight: number, bfp: number): number {
  if (weight <= 0 || bfp <= 0) {
    return 0;
  }
  const bfm = weight * (bfp / 100);
  const lbm = weight - bfm;
  const mm = lbm / 2;
  return formatToFixed((mm / weight) * 100, 1);
}

/**
 * calculate Basal metabolism(kcal) to integer.
 * @param {number} height height(cm)
 * @param {number} weight weight(kg)
 * @param {number} age age(integer)
 * @param {string} sex sex(male or female)
 */
export function calcKcal(
  height: number,
  weight: number,
  age: number,
  sex: string
): number {
  if (height <= 0 || weight <= 0) {
    return 0;
  }
  let result: number = 0;
  if (sex === "male") {
    result = 13.397 * weight + 4.799 * height - 5.677 * age + 88.362;
  }
  if (sex === "female") {
    result = 9.247 * weight + 3.098 * height - 4.33 * age + 447.593;
  }
  return formatToFixed(result, 0);
}

/**
 * 任意の小数点以下まで0埋めする。<br>
 * valueの小数点桁数がdigitよりも多い場合、digitの次の位で四捨五入される。
 * @param {number} value 数値
 * @param {number} digit 小数点何桁まで0埋めするか(小数点第一位→1, 小数点第二位→2)
 */
export function formatToFixed(value: number, digit: number): number {
  if (typeof value !== "number") value = Number(value);
  return value.toFixed(digit);
}
