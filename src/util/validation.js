/**
 * @flow
 */

export function checkCreateData(states: Object): boolean {
  if (!states.userid || !states.date) {
    return false;
  }
  if (
    isNaN(states.weight) ||
    isNaN(states.bmi) ||
    isNaN(states.bfp) ||
    isNaN(states.mm) ||
    isNaN(states.kcal)
  ) {
    return false;
  }
  if (
    states.weight <= 0 ||
    states.bmi <= 0 ||
    states.bfp <= 0 ||
    states.mm <= 0 ||
    states.kcal <= 0
  ) {
    return false;
  }
  return true;
}

export function checkUpdateData(states: Object): boolean {
  if (!states._id || !states.date) {
    return false;
  }
  if (
    isNaN(states.weight) ||
    isNaN(states.bmi) ||
    isNaN(states.bfp) ||
    isNaN(states.mm) ||
    isNaN(states.kcal)
  ) {
    return false;
  }
  if (
    states.weight <= 0 ||
    states.bmi <= 0 ||
    states.bfp <= 0 ||
    states.mm <= 0 ||
    states.kcal <= 0
  ) {
    return false;
  }
  return true;
}
