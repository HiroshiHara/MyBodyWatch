/**
 * @flow
 */

export function validateCreateData(userid: string, states: Object): boolean {
  if (!userid || !states.tmpDate) {
    return false;
  }
  if (
    isNaN(states.tmpWeight) ||
    isNaN(states.tmpBmi) ||
    isNaN(states.tmpBfp) ||
    isNaN(states.tmpMm) ||
    isNaN(states.tmpKcal)
  ) {
    return false;
  }
  if (
    states.tmpWeight <= 0 ||
    states.tmpBmi <= 0 ||
    states.tmpBfp <= 0 ||
    states.tmpMm <= 0 ||
    states.tmpKcal <= 0
  ) {
    return false;
  }
  return true;
}

export function validateUpdateData(_id: string, states: Object): boolean {
  console.log(states);
  if (!states.tmpId || !states.tmpDate) {
    return false;
  }
  if (
    isNaN(states.tmpWeight) ||
    isNaN(states.tmpBmi) ||
    isNaN(states.tmpBfp) ||
    isNaN(states.tmpMm) ||
    isNaN(states.tmpKcal)
  ) {
    return false;
  }
  if (
    states.tmpWeight <= 0 ||
    states.tmpBmi <= 0 ||
    states.tmpBfp <= 0 ||
    states.tmpMm <= 0 ||
    states.tmpKcal <= 0
  ) {
    return false;
  }
  return true;
}
