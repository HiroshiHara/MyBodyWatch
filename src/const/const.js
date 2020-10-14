/**
 * @flow
 */

/**
 * Dialogコンポーネントのボタン押下時の実行モード。<br>
 * 新規登録。
 */
export const CREATE: string = "create";

/**
 * Dialogコンポーネントのボタン押下時の実行モード。<br>
 * 更新。
 */
export const UPDATE: string = "update";

/**
 * Dialogコンポーネントのボタン押下時の実行モード。<br>
 * キャンセル。
 */
export const CANCEL: string = "cancel";

/**
 * bodydataドキュメントのdateフィールド名。
 */
export const DATE_FIELDNAME: string = "date";

/**
 * bodydataドキュメントのweightフィールド名。
 */
export const WEIGHT_FIELDNAME: string = "weight";

/**
 * bodydataドキュメントのbmiフィールド名。
 */
export const BMI_FIELDNAME: string = "bmi";

/**
 * bodydataドキュメントのbfpフィールド名。
 */
export const BFP_FIELDNAME: string = "bfp";

/**
 * bodydataドキュメントのmmフィールド名。
 */
export const MM_FIELDNAME: string = "mm";

/**
 * bodydataドキュメントのkcalフィールド名。
 */
export const KCAL_FIELDNAME: string = "kcal";

/**
 * 表示年月切替時のモード。前月へ移動。
 */
export const SEARCH_KEY_PREVIOUS: number = -1;

/**
 * 表示年月切替時のモード。翌月へ移動。
 */
export const SEARCH_KEY_NEXT: number = 1;
