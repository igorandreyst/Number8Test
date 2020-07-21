Detailed Requirements:

1. Allow the user to specify three inputs: A Start Date, the Number of days to display and a Country Code literal (the country code literal value must be defined by the user with the keyboard).

Example:
Start Date: 8/15/2008
Number of days: 17
Country Code: US

2. Render a calendar that spans as many weeks as necessary in order to cover the defined number of days. If the date range spans months, a new header needs to be created for that month. The Calendar should display its days starting on Sunday and ending on Saturday, as shown below. This should work with any number of days regardless of the years meaning that if the user specifies more than 365 days, calendars will be generated accordingly for the next year and so on.

3. The days should be color coded as follows (they must match the picture above):

A. Weekends are yellow.
B. Weekdays are green.
C. Invalid days are hidden and the background should be gray.

Invalid days are defined as:
D. Any days in the week previous to the Start date.
E. Any days in the week after the last rendered day.
F. Any days before the first day of the month (if the calendar spills into another month).

4. Extra credit will be given for adding Holidays in a different color. HOLIDAYS ARE IN BLUE LETTERS

Version 2.0

- More Holidays and Regions.
- Better UI.
- Time to learn VueJS or Angular
