const monthToText = ['nan' , 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export const monthConverter = (month)=>{
    const monthText = monthToText[month];
    return monthText;
}
