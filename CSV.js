/**
 * http://stackoverflow.com/a/12785546/497418
 */
(function (root) {
    "use strict";
    var CSV;
    
    function passthrough(r, c, v) {
        return v;
    }
    
    CSV = {
        parse: function (csv, reviver) {
            var chars,
                c,
                charCount,
                start,
                end,
                table,
                row;
            //split the csv data into an array of characters
            //allows for cross-browser array-access
            chars = csv.split('');
            //set the current character
            c = 0;
            //get the total number of characters
            charCount = chars.length;
            //instantiate the table as an array
            table = [];
            //set the reviver if one wasn't passed
            reviver = reviver || passthrough;
            //while there are more characters in the csv data...
            while (c < charCount) {
                //create a new row
                row = [];
                //add it to the table
                table.push(row);
                //while there are more characters that are not newlines...
                while (c < charCount && !/[\r\n]/.test(chars[c])) {
                    //set the start and end positions to the current position
                    start = end = c;
                    //if the current character is a quote...
                    if ('"' === chars[c]) {
                        //increment the current position
                        c += 1;
                        //set the start and end positions to the current position
                        start = end = c;
                        //while there are more characters in the csv data... [a]
                        while (c < charCount) {
                            //if the current character is a quote...
                            if ('"' === chars[c]) {
                                //...and the next character is not a quote
                                if ('"' !== chars[c + 1]) {
                                    //jump out of the loop [a]
                                    break;
                                } else {
                                    //otherwise, unescape the double quote by incrementing the current position...
                                    c += 1;
                                    //and clearing its value
                                    chars[c] = '';
                                }
                            }
                            //increment the current position
                            c += 1;
                            //and set the end position to the current position
                            end = c;
                        }
                        //if the current character is a quote
                        if ('"' === chars[c]) {
                            //increment the current position
                            c += 1;
                        }
                        //while there are more characters that are not newlines or commas
                        while (c < charCount && !/[\r\n,]/.test(chars[c])) {
                            //increment the current position
                            c += 1;
                        }
                    } else {
                        //if the current character is not a quote
                        //while there are more characters that are not newlines or commas...
                        while (c < charCount && !/[\r\n,]/.test(chars[c])) {
                            //increment the current position
                            c += 1;
                            //and set the end position to the current position
                            end = c;
                        }
                    }
                    //pass the current column, current row, and raw value to the reviver function,
                    //and add it to the row
                    row.push(reviver(table.length-1, row.length, chars.slice(start, end).join('')));
                    //if the current character is a comma...
                    if (',' === chars[c]) {
                        //increment the current position
                        c += 1;
                    }
                }
                //if the current character is a newline...
                if (/[\r\n]/.test(chars[c])) {
                    //increment the current position
                    c += 1;
                }
            }
            //return the resultant table
            return table;
        },
        stringify: function(table, replacer) {
            replacer = replacer || passthrough;
            var csv,
                c,
                cc,
                r,
                rowCount,
                cell;
            //initialize the csv data
            csv = '';
            //get the number of rows
            rowCount = table.length;
            //for every row in the table....
            for (r = 0; r < rowCount; ++r) {
                //if the current row is not the first...
                if (r) {
                    //add a newline
                    csv += '\r\n';
                }
                //for every column in the curent row...
                for (c = 0, cc = table[r].length; c < cc; ++c) {
                    //if the current column is not the first...
                    if (c) {
                        //add a comma
                        csv += ',';
                    }
                    //get the cell value from the table as a string
                    cell = '' + replacer(r, c, table[r][c]);
                    //if the cell contains commas, newlines, or quotes...
                    if (/[,\r\n"]/.test(cell)) {
                        //escape the contained quotes and surround the value in quotes
                        cell = '"' + cell.replace(/"/g, '""') + '"';
                    }
                    csv += cell || '';
                }
            }
            return csv;
        }
    };
    root.CSV = CSV;
}(this));