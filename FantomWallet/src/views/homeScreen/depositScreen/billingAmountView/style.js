import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../../common/constants';

const style = {
  billAmountViewStyle: {
    backgroundColor: 'transparent',
  },
  billAmountLabelStyle: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
  },
  ftmViewStyle: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 10,
  },
  ftmLabelStyle: {
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
    color: '#fff',
  },
  amountInputStyle: {
    fontSize: 16,
    height: 54,
    paddingLeft: 16,
    color: '#a7a7a7',
    borderWidth: 2,
    borderColor: 'rgb(163,163,163)',
  },
  buttonViewStyle: {
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 20,
  },

  billingAmtContainer: {
    width: DEVICE_WIDTH - 32,
    marginTop: DEVICE_HEIGHT * 0.03,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  inputTextHeading: {
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
    color: '#FFFFFF',
    paddingLeft: 12,
  },
  textInputContainer: {
    height: 50,
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1.5,
    borderRadius: 4,
    borderBottomColor: 'rgb(56,65,71)',
    backgroundColor: 'rgb(32,37,42)',
  },
  enteredTextStyle: {
    fontSize: 12,
    flex: 1,
    paddingLeft: 12,
    color: '#fff',
    fontFamily: 'SFProDisplay-Regular',
  },
};
export default style;
