const { check } = require('express-validator');

const validateTip = [
    check('place', 'Place is required').not().isEmpty(),
    check('totalAmount', 'Total amount must be a number').isNumeric(),
    check('tipPercentage', 'Tip percentage must be a number').isNumeric(),
  ];
  const validateDates = [
    check('startDate')
      .not().isEmpty().withMessage('Start date is required')
      .custom((value) => {
        const dateParts = value.split('-');
        if (dateParts.length !== 3) {
          throw new Error('Start date must be in dd-mm-yyyy format');
        }
        const [day, month, year] = dateParts.map(Number);
        const date = new Date(year, month - 1, day);
        if (date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
          throw new Error('Invalid start date');
        }
        return true;
      }),
    check('endDate')
      .not().isEmpty().withMessage('End date is required')
      .custom((value) => {
        const dateParts = value.split('-');
        if (dateParts.length !== 3) {
          throw new Error('End date must be in dd-mm-yyyy format');
        }
        const [day, month, year] = dateParts.map(Number);
        const date = new Date(year, month - 1, day);
        if (date.getDate() !== day || date.getMonth() + 1 !== month || date.getFullYear() !== year) {
          throw new Error('Invalid end date');
        }
        return true;
      }),
  ];
  
module.exports = {
    validateTip,
    validateDates
}