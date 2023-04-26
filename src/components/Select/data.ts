export interface CategoryProps {
  readonly _id: string;
  readonly name: string;
}
export interface SelectProps {
  readonly value: string;
  readonly label: string;
  readonly isDisabled?: boolean;
  readonly __isNew__?: boolean;
}
