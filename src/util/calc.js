/* @flow */

/**
 * calculate BMI, round to second decimal place.
 * @param {number} height height(cm)
 * @param {number} weight weight(kg)
 */
export function calcBmi(height: number, weight: number): number {
  if (height <= 0 || weight <= 0) {
    console.error("invalid argument.");
    return -1;
  }
  return Math.round((weight / (height * height)) * 10) / 10;
}

/**
 * calculate MM(muscle mass(%)), round to second decimal place.
 * @param {number} weight weight(kg)
 * @param {number} bfp Body fat mass(%)
 */
export function calcMm(weight: number, bfp: number): number {
  if (weight <= 0 || bfp <= 0) {
    console.error("invalid argument.");
    return -1;
  }
  const bfm = weight * (bfp / 100);
  const lbm = weight - bfm;
  const mm = lbm / 2;
  return Math.round((mm / weight) * 100 * 10) / 10;
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
  let result: number = 0;
  if (weight <= 0 || weight <= 0 || age <= 0) {
    console.error("invalid argument.");
    return -1;
  }
  if (sex !== "male" || sex !== "female") {
    console.error("invalid argument.");
    return -1;
  }
  if (sex === "male") {
    result = 13.397 * weight + (4.799 + height) - 5.677 * age + 88.362;
  }
  if (sex === "female") {
    result = 9.247 * weight + (3.098 + height) - 4.33 * age + 447.593;
  }
  return Math.round(result);
}
