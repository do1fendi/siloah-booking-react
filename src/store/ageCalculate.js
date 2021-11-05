export const ageCalculate = (born, departureDate) => {
  var dob = new Date(born);
  //extract the year, month, and date from user date input

  var dobYear = dob.getYear();
  var dobMonth = dob.getMonth();
  var dobDate = dob.getDate();

  //get departure date
  // alert(this.GET_TOURPACKAGE.departureDate)
  var departure = new Date(departureDate);
  //extract the year, month, and date from departure date
  var currentYear = departure.getYear();
  var currentMonth = departure.getMonth();
  var currentDate = departure.getDate();

  //declare a variable to collect the age in year, month, and days
  var age = {};
  var yearAge = 0;
  var monthAge = 0;
  var dateAge = 0;
  //get years
  yearAge = currentYear - dobYear;

  //get months
  if (currentMonth >= dobMonth)
    //get months when current month is greater
    monthAge = currentMonth - dobMonth;
  else {
    yearAge--;
    monthAge = 12 + currentMonth - dobMonth;
  }

  //get days
  if (currentDate >= dobDate)
    //get days when the current date is greater
    dateAge = currentDate - dobDate;
  else {
    monthAge--;
    dateAge = 31 + currentDate - dobDate;

    if (monthAge < 0) {
      monthAge = 11;
      yearAge--;
    }
  }
  //group the age in a single variable
  // age = {
  //   years: yearAge,
  //   months: monthAge,
  //   days: dateAge,
  // };

  //display the calculated age

  if (yearAge >= 12) return "adult";
  else if (yearAge < 12 && yearAge >= 7) return "child";
  else if (yearAge < 7 && yearAge >= 3) return "kid";
  else if (yearAge < 3) return "infant";
};
