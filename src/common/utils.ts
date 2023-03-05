/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { format, parseISO } from 'date-fns'
import moment from 'moment';
// import { ISchedule } from 'tui-calendar';
import { IMeetings } from './define-meetings';
// import {
//     InvalidNumberError, UnitNotEnoughError, ReadingConfig,
//     parseNumberData, readNumber
// } from 'read-vietnamese-number'

class Utils {

    static setLocalStorage(key: string, value: unknown): void {
        localStorage.setItem(key, JSON.stringify(value));
    }
    static getValueLocalStorage(key: string): any | null {
        const value = localStorage.getItem(key);
        let re = null;
        value && (re = Utils.parseJson(value));
        return re;
    }
    static removeItemLocalStorage(key: string): void {
        localStorage.removeItem(key);
    }
    static parseJson(str: string): any | null {
        try {
            return JSON.parse(str);
        } catch (e) {
            return null;
        }
    }
    static pathNameMatchContent(path: string): string | undefined {
        if (path === "/main") {
            return 'main'
        }
        const regex = /\/main\/(\w+)$/g;
        const matchResult = regex.exec(path);
        if (matchResult && matchResult.length === 2) {
            return matchResult[1]
        }
        return
    }
    static formatDate(date: Date): any | null {
        const tyoeFormat = 'MM/dd/yyyy'
        return format(date, tyoeFormat)
    }
    static formatDateVN(date: Date): any | null {
        const tyoeFormat = 'dd/MM/yyyy'
        return format(date, tyoeFormat)
    }
    static formatDateCallApi(date: Date): any | null {
        const tyoeFormat = 'yyyy-MM-dd'
        return format(date, tyoeFormat)
    }
    static formatDateTimeCallApi(date: Date): any | null {
        const tyoeFormat = 'yyyy-MM-dd HH:mm:ss'
        return format(date, tyoeFormat)
    }
    static isNullOrEmpty(value?: string | null): boolean {
        return (value === null || value === "" || value === undefined);
    }
    static formatDateString(date: string): any | null {
        const tyoeFormat = 'MM/dd/yyyy'
        const newDate = parseISO(date)
        return format(newDate, tyoeFormat)
    }
    static typeFormatDate(): any | null {
        return 'MM/dd/yyyy'
    }
    static typeFormatYear(): any | null {
        return 'yyyy'
    }
    static formatDateToTable(dateArr: string, dateDep: string): string | null {
        const tyoeFormat = 'MM/dd'
        const newDateArr = parseISO(dateArr)
        const newDateDep = parseISO(dateDep)
        return format(newDateArr, tyoeFormat) + " - " + format(newDateDep, tyoeFormat)
    }
    static formatDateToStringRevenue(dateArr: string): string | null {
        const tyoeFormat = 'dd/MM'
        const newDateArr = parseISO(dateArr)
        return format(newDateArr, tyoeFormat)
    }
    static convertToAsiaVNZone(date: Date): string {
        const tzString = "Asia/Jakarta";
        return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString })).toISOString();
    }

    static convertToVNTimeZone(date: Date): string {
        const hour = 7;
        date.setTime(date.getTime() + (hour * 60 * 60 * 1000));
        return date.toISOString();
    }
    static convertToVNTimeZoneMbyMoment(date: string | Date): string {
        const testDateUtc = moment.utc(date);
        const localDate = moment(testDateUtc).local();
        return localDate.format("MM-DD-YYYY HH:mm:ss");
    }
    static convertToUTC(date: Date): string {
        return moment(date).utc().format()
    }
    static differenceInDays(dateTo: Date | string, dateForm: Date | string): number {
        return moment(dateTo).diff(moment(dateForm), 'days');
    }
    static convertBirthDateFormat(oldDate: string | null): Date | undefined {
        if (oldDate === null || oldDate === undefined) return undefined;
        if (oldDate.length > 9) {
            return new Date(oldDate);
        }
        return undefined;
    }
    static convertStartDate(date: Date | string): any {
        const tmp = new Date(date)
        tmp.setHours(0, 0, 0, 0)
        return tmp;
    }

    static convertMiddleDate(date: Date | string): any {
        const tmp = new Date(date)
        tmp.setHours(12, 0, 0, 0)
        return tmp;
    }

    static convertEndDate(date: Date | string): any {
        const tmp = new Date(date)
        tmp.setHours(23, 59, 59, 59)
        return tmp;
    }
    static formatNumber(value: number): string {
        return Intl.NumberFormat().format(value);
    }

    static unsetFormatNumber(value: string): number {
        return parseInt(value.split(",").join(""));
    }

    static dateDiffInDays = (startDate: Date, endDate: Date): number => {
        // Discard the time and time-zone information.
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const utc1 = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        const utc2 = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static transformData = (obj: any, destination: any) => {
        Object?.keys(destination)?.map(key => {
            if (obj[key] !== "" && obj[key] !== null && obj[key] !== undefined)
                destination[key] = obj[key];
            return null;
        });
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static querySearchToString(filters: any): string {
        const _filters = { ...filters };
        const searchParams = Object.keys(_filters).map(filterKey => {
            if (_filters[filterKey] === undefined || _filters[filterKey] === null) {
                return '';
            }
            return `${filterKey}=${_filters[filterKey]}`;
        }).join('&');
        return searchParams;
    }
    static querySearchToJson(queryString: string): any {
        const pairs = queryString.substring(1).split('&');
        const array = pairs.map((el) => {
            const parts = el.split('=');
            return parts;
        });

        return Object.fromEntries(array);
    }
    static getPageSize(windowSize: string): number {
        switch (windowSize) {
        case "2xl":
            return 15;
        case "xl":
            return 12;
        case "lg":
            return 12;
        case "md":
            return 12;
        case "sm":
            return 12;
        default:
            break;
        }
        return 12
    }
    static getPageSizeAssign(windowSize: string): number {
        switch (windowSize) {
        case "2xl":
            return 8;
        case "xl":
            return 6;
        case "lg":
            return 6;
        case "md":
            return 6;
        case "sm":
            return 6;
        default:
            break;
        }
        return 6
    }


    static compareString = (a: string, b: string): number => {
        return a.localeCompare(b);
    }

    static spliceSlice(str: string, index: number, count: number, add: string) {
        // We cannot pass negative indexes directly to the 2nd slicing operation.
        if (index < 0) {
            index = str.length + index;
            if (index < 0) {
                index = 0;
            }
        }

        return str.slice(0, index) + (add || "") + str.slice(index + count);
    }

    static compareWithoutTime = (date1: Date, date2: Date): boolean => {
        date1.setHours(0, 0, 0, 0)
        date2.setHours(0, 0, 0, 0)
        return date1.toDateString() === date2.toDateString();
    }

    static middayTime(date: Date): Date {
        date.setHours(12, 0, 0, 0)
        return date
    }

    // static readVietnameseNumber = (number: string) => {
    //     try {
    //         const config = new ReadingConfig();
    //         config.unit = ['Việt Nam đồng'];
    //         const res = parseNumberData(config, number)

    //         return Utils.spliceSlice(readNumber(config, res), 0, 1, readNumber(config, res).slice(0, 1).toUpperCase())
    //     } catch (error) {
    //         if (error instanceof InvalidNumberError)
    //             console.log('Số không hợp lệ')
    //         else if (error instanceof UnitNotEnoughError)
    //             console.log('Không đủ đơn vị đọc số')
    //     }
    // }
    /**
 * Parse a localized number to a float.
 * @param {string} stringNumber - the localized number
 * @param {string} locale - [optional] the locale that the number is represented in. Omit this parameter to use the current locale.
 */
    static parseLocaleNumber(stringNumber: string) {
        const thousandSeparator = Intl.NumberFormat().format(11111).replace(/\p{Number}/gu, '');
        const decimalSeparator = Intl.NumberFormat().format(1.1).replace(/\p{Number}/gu, '');

        return parseFloat(stringNumber
            .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
            .replace(new RegExp('\\' + decimalSeparator), '.')
        );
    }
    static parseUrl(obj: { [key: string]: string }): URLSearchParams {
        const params = new URLSearchParams();
        Object.keys(obj).forEach((key) => {
            const value = obj[key];
            if (key && value) {
                params.set(key, value)
            }
        })
        return params;
    }
    static handleErrosMessaeg(error: any): boolean {
        if (error) {
            if (error.status === 401 || error.status === 502) {
                return false;
            }
        }
        return true;
    }
    static formatDateByUTC(date: Date): Date {
        const tmp = new Date(date);
        return new Date(Date.UTC(tmp.getFullYear(), tmp.getMonth(), tmp.getDate(), 0, 0, 0))
    }
    static getDatesBetween = (
        startDate: Date,
        endDate: Date,
        includeEndDate?: boolean
    ) => {
        const dates = [];
        const currentDate = startDate;
        while (currentDate < endDate) {
            dates.push(format(new Date(currentDate),"MM/dd/yyyy"));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        if (includeEndDate) dates.push(endDate);
        return dates;
    };
    static getTimeZoneLocal(): number{
        return new Date().getTimezoneOffset() / 60;
    }

    // static convertIMeetingsToSchedules = (lstMeetings: IMeetings[], viewName: string,width: number) => {
    //     const start = new Date();
    //     let scheduleTmp: ISchedule[];
    //     if(viewName==='day'){
    //         scheduleTmp= lstMeetings.map((item, index) => {
    //             // console.log('-------------------------------------------')
    //             let count = 1;
    //             lstMeetings.forEach(index => {
    //                 // console.log(item.startTime?.toString().slice(0,10))
    //                 // console.log(index.startTime?.toString().slice(0,10))
    //                 if(index.startTime && index.endTime && item.startTime && item.endTime &&index.id!=item.id){ // Count the meeting having the same time period
    //                     if(item.startTime < index.startTime && 
    //                         item.endTime > index.startTime && 
    //                         item.startTime.toString().slice(0,10) === index.startTime.toString().slice(0,10) || 
    //                         item.startTime < index.endTime && 
    //                         item.endTime > index.endTime && 
    //                         item.startTime.toString().slice(0,10) === index.startTime.toString().slice(0,10) ||
    //                         item.startTime >index.startTime &&
    //                         item.startTime < index.endTime &&
    //                         item.startTime.toString().slice(0,10) === index.startTime.toString().slice(0,10)||
    //                         item.endTime >index.startTime &&
    //                         item.endTime < index.endTime &&
    //                         item.startTime.toString().slice(0,10) === index.startTime.toString().slice(0,10)||
    //                         item.startTime ===index.startTime &&
    //                         item.endTime === index.endTime &&
    //                         item.startTime.toString().slice(0,10) === index.startTime.toString().slice(0,10)
    //                         ) {
    //                             count+=1;
    //                             // console.log(index.title)
    //                         }
                            
    //                 }
    //             }) // Check number of duplicated schedule
                
    //             // console.log(item.title)
    //             // console.log(count)
    //             // lstMeetings.
    //             let numberOfDisplayChar = 0;
    //             if (item.startTime && item.endTime){
    //                 const startTime = new Date(item.startTime).getTime();
    //                 const endTime = new Date(item.endTime).getTime();
    //                 // console.log(endTime - startTime)
    
    //                 numberOfDisplayChar = (((width*230)/1358)  /count) * ((endTime - startTime)/1800000)
    //                 // console.log(numberOfDisplayChar)
    //             }
    //             // console.log('-------------------------------------------')

    //             const tmp: ISchedule = {
    //                 id: item.id,
    //                 title: item.title.length < numberOfDisplayChar ? item.title : item.title.slice(0,item.title.slice(0,numberOfDisplayChar).lastIndexOf(" ")) + "...",
    //                 calendarId: item.task.id,
    //                 category: "time",
    //                 attendees: item?.memberMeetings ? item?.memberMeetings?.map(item => item?.member.fullName) : [],
    //                 isVisible: true,
    //                 start: item.startTime ? new Date(item.startTime) : new Date(new Date().setHours(start.getHours() + 0)),
    //                 end: item.endTime ? new Date(item.endTime) : new Date(new Date().setHours(start.getHours() + 3))
    //             }
    //             return tmp;
    //         })
    //         return scheduleTmp;
    //     }
    //     else if(viewName==='week'){
            
    //         scheduleTmp= lstMeetings.map((item, index) => {
    //             // console.log('-------------------------------------------')
    //             // console.log(item)
    //             let count = 1;
    //             lstMeetings.forEach(index => {
    //                 // console.log(item.startTime?.toString().slice(0,10))
    //                 // console.log(index.startTime?.toString().slice(0,10))
    //                 if(index.startTime && index.endTime && item.startTime && item.endTime && index.id!=item.id){ // Count the meeting having the same time period
    //                     if(item.startTime < index.startTime && 
    //                         item.endTime > index.startTime && 
    //                         item.startTime.toString().slice(0,10) === index.startTime.toString().slice(0,10) || 
    //                         item.startTime < index.endTime && 
    //                         item.endTime > index.endTime && 
    //                         item.startTime.toString().slice(0,10) === index.startTime.toString().slice(0,10) ||
    //                         item.startTime >index.startTime &&
    //                         item.startTime < index.endTime &&
    //                         item.startTime.toString().slice(0,10) === index.startTime.toString().slice(0,10)||
    //                         item.endTime >index.startTime &&
    //                         item.endTime < index.endTime &&
    //                         item.startTime.toString().slice(0,10) === index.startTime.toString().slice(0,10)||
    //                         item.startTime ===index.startTime &&
    //                         item.endTime === index.endTime &&
    //                         item.startTime.toString().slice(0,10) === index.startTime.toString().slice(0,10)
    //                         ) {
    //                             count+=1;
    //                             // console.log(index.title)
    //                         }
                            
    //                 }
    //             }) // Check number of duplicated schedule
                
    //             // console.log(item.title)
    //             // console.log(count)
    //             // lstMeetings.
    //             let numberOfDisplayChar = 0;
    //             if (item.startTime && item.endTime){
    //                 const startTime = new Date(item.startTime).getTime();
    //                 const endTime = new Date(item.endTime).getTime();
    //                 // console.log(endTime - startTime)
    
    //                 numberOfDisplayChar = (((width*27)/194 ) /count) * ((endTime - startTime)/1800000)
    //                 // console.log(numberOfDisplayChar)
    //             }
    //             // console.log('-------------------------------------------')
    
    //             const tmp: ISchedule = {
    //                 id: item.id,
    //                 title: item.title.length < numberOfDisplayChar ? item.title : item.title.slice(0,item.title.slice(0,numberOfDisplayChar).lastIndexOf(" ")) + "...",
    //                 calendarId: item.task.id,
    //                 category: "time",
    //                 attendees: item?.memberMeetings ? item?.memberMeetings?.map(item => item?.member.fullName) : [],
    //                 isVisible: true,
    //                 start: item.startTime ? new Date(item.startTime) : new Date(new Date().setHours(start.getHours() + 0)),
    //                 end: item.endTime ? new Date(item.endTime) : new Date(new Date().setHours(start.getHours() + 3))
    //             }
    //             return tmp;
    //         })
    //         return scheduleTmp;
    //     }
    //     else if(viewName==='month'){
    //         scheduleTmp= lstMeetings.map((item, index) => {
                
    //             let numberOfDisplayChar: number=(width*28)/205.7;
    //             // console.log(numberOfDisplayChar)
    //             // console.log(item.title.slice(0,item.title.slice(0,numberOfDisplayChar).lastIndexOf(" ")) + "...");
    //             const tmp: ISchedule = {
    //                 id: item.id,
    //                 title: item.title.length < numberOfDisplayChar ? item.title : item.title.slice(0,item.title.slice(0,numberOfDisplayChar).lastIndexOf(" ")) + "...",
    //                 calendarId: item.task.id,
    //                 category: "time",
    //                 attendees: item?.memberMeetings ? item?.memberMeetings?.map(item => item?.member.fullName) : [],
    //                 isVisible: true,
    //                 start: item.startTime ? new Date(item.startTime) : new Date(new Date().setHours(start.getHours() + 0)),
    //                 end: item.endTime ? new Date(item.endTime) : new Date(new Date().setHours(start.getHours() + 3))
    //             }
    //             return tmp;
    //         })
    //         return scheduleTmp;
    //     }
        
        
    // }

    static genRandomNumber = (max: number) => {
        return Math.floor(Math.random() * max);
    }
}

export default Utils
