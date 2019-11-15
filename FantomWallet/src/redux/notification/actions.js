// @flow
export const types = {
  SET_DROPDOWN_ALERT: 'notification/set_dropdown_alert',
};
export const setDopdownAlert = (
  type: string, text: string | false, style?: { [string]: string } = {},
) => ({
  type: types.SET_DROPDOWN_ALERT,
  payload: {
    type, text, style,
  },
});

