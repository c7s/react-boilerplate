const { attributes } = require('structure');

export const User = attributes({
  id: Number,
  name: {
    type: String,
    required: true
  },
  age: Number
})(class User {
  public static MIN_LEGAL_AGE: number = 21;
  public age: number;
  isLegal() {
    return this.age >= User.MIN_LEGAL_AGE;
  }
});
