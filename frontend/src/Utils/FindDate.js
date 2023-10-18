
// The First argument must be DATE

// Enter the second argument: FORMAT as a string in any of the following formats
// "dd-mm-yyyy"
// "mm-dd-yyyy"
// "mm-yyyy-dd"
// "dd-yyyy-mm"
// "yyyy-dd-mm"
// "yyyy-mm-dd"
// DEFAUL_VALUE will be "dd-mm-yyyy"

//The third argument is true or false. You can type true or false or leave the field empty.
// By doing so, you can choose if month should be returned as monthname insted of month number
// This is optional. Skipping it will return month in numbers

const findDate = (date,format,giveMonthName) => {

    const year = new Date(date).getFullYear()
    let day = new Date(date).getDate()
    let month = new Date(date).getMonth()
    let  monthName, monthToDisplay;

    switch (month){
        case 1: monthName= "Jan"; break;
        case 2: monthName= "Feb"; break;
        case 3: monthName= "Mar"; break;
        case 4: monthName= "Apr"; break;
        case 5: monthName= "May"; break;
        case 6: monthName= "Jun"; break;
        case 7: monthName= "Jul"; break;
        case 8: monthName= "Aug"; break;
        case 9: monthName= "Sep"; break;
        case 10: monthName= "Oct"; break;
        case 11: monthName= "Nov"; break;
        case 12: monthName= "Dec"; break;
        default: break;
    }

    if(day<10){
        day = `0${day}`
    }
    if(month<10){
        month = `0${month}`
    }

    if(giveMonthName){
        monthToDisplay = monthName
    }
    else{
        monthToDisplay = month;
    }


    switch(format){
        case "dd-mm-yyyy": return `${day}-${monthToDisplay}-${year}`;
        case "mm-dd-yyyy": return `${monthToDisplay}-${day}-${year}`;
        case "mm-yyyy-dd": return `${monthToDisplay}-${year}-${day}`;
        case "dd-yyyy-mm": return `${day}-${year}-${monthToDisplay}`;
        case "yyyy-dd-mm": return `${year}-${day}-${monthToDisplay}`;
        case "yyyy-mm-dd": return `${year}-${monthToDisplay}-${day}`;
        default: return `${day}-${monthToDisplay}-${year}`;
    }

}
export default findDate;







