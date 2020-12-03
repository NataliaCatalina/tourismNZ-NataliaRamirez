# JS Style guide
##Table of contents

1. Statement
2. References
3. Variable
4. Comments
5. Operators
6. Conditional structure - if
7. Object

###1. Statement
*Use one statement per line*\
*Always end a statement with a semicolon.*\
*Use a maximum of 80 characters on a line and if it is longer, break the line with a + and then bring it to the next line.*\
*Prefer single quotes over double quotes*

###2. References
*Use var for all of your references; avoid using const*

####Bad example
*const wellington*

####Good example
*var start = $(startDate).datepicker('getDate');*\
*var end*

### 3. variable
*Use camelCase for identifier names*\
*All names start with a letter*\
*Avoid global variables*

####Bad example
*function displaycards*

####Good example
*function displayCards*

### 4. Comments
*Use / ... / for multiline comments.*\
*Use // for single line comments.*

### 5. Operators
*Keep a space before and after any operator.*

####Bad example
*var i=0;*

####Good example
*var i = 0;*

### 6. Condition structure - if
*Use space after the keyword if.*\
*Use space after the parenthesis*\
*Use open curly braces at the end of first line.*\
*Use close curly braces in a new line.*\
*Keep the else keyword on the same line as the close curly braces of the previous set of brackets*\
*Indent the code as given in the good example Put the opening bracket at the end of the first line.*\
*Use one space before the opening bracket.*\
*Put the closing bracket on a new line, without leading spaces.*

####Bad example
*if(parseInt(this.id)===accommodation[i].id)*

####Good example
*if (parseInt(this.id) === accommodation[i].id)*

### 7. Object
*Opening bracket on the same line as object name*\
*Use quotes around word*\
*Use comma after every property value except the last one*\
*Place the closing bracket on a new line*
