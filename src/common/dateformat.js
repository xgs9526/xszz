// 时间处理
let dateFormat = {
    // 时间转字符串
    // type: cn(中文年月日) datetime(年月日时分秒) date(年月日) md(月日) 默认datetime
    // separator为日期分隔符如'-' '/' 默认'/'
    //
    dateToStr(date, type, separator){
        //时间参数有效判断
        if(!(date instanceof Date)){
            date = date.replace(/-/g, '/');
            date = new Date(date);
            if(date == 'Invalid Date'){
                console.log('时间格式化时间参数有问题');
                return;
            }
        }

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        //日期分隔符
        separator = separator ? separator : '/';

        let timeStr;
        if(type == 'cn'){
            timeStr = year + '年' + month + '月' + day + '日';
        }else if(type == 'date'){
            timeStr = year + separator + month + separator + day;
        }else if(type == 'md'){
            timeStr = month + separator + day;
        }else{
            timeStr = year + separator + month + separator + day + ' ' + hours + ':' + minutes + ':' + seconds;
        }
        return timeStr;
    },


};
export default dateFormat
