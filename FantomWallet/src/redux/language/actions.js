// @flow
export const types = {
  SET_LANGUAGE: "language/SET_LANGUAGE"
};

export const setLanguage = (payload: any) => ({
  type: types.SET_LANGUAGE,
  payload
});
