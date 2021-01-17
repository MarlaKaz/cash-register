function checkCashRegister(price, cash, cid) {
    var changeDue = cash - price;
    var currency = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
    var currType = ["ONE HUNDRED", "TWENTY", "TEN", "FIVE", "ONE", "QUARTER", "DIME", "NICKEL", "PENNY"];
    var changeAvail = [];
    for (let k = 0; k < cid.length; k++) {
      changeAvail.push(cid[k][1]);
    }
    var changeAv = changeAvail.reduce((a,b) => a + b, 0); 
    var changeTable = [];
    var msgPrint = {status: null, change: []};
    if (changeAv < changeDue) {
      msgPrint.status = "INSUFFICIENT_FUNDS";
      return msgPrint;
    } else if (changeAv === changeDue) {
      msgPrint.status = "CLOSED";
      msgPrint.change = cid;
      return msgPrint;
    } else {
      cid.reverse();
      changeAvail.reverse();
      for (let i = 0; i < cid.length; i++) {
          if (changeDue >= currency[i] && cid[i][1] > 0) {
            if  (cid[i][1] < changeDue) {
              changeTable.push(cid[i]);
              changeAvail[i] = 0; 
              changeDue -= cid[i][1];
              changeDue = changeDue.toFixed(2)
            } else {
              var changeAlt = changeDue / currency[i];
              changeAlt = Math.floor(changeAlt) * currency[i];
              changeTable.push([currType[i], changeAlt]);
              changeDue -= changeAlt;
              changeAvail[i] = cid[i][1] - changeAlt;
              changeDue = changeDue.toFixed(2)
            }
          }
          
      }
    var changeAv = changeAvail.reduce((a,b) => a + b, 0); 
    console.log(changeAv)
    
      //console.log(changeAlt)
      //console.log(changeTable)
      changeDue = Math.round(changeDue * 100) / 100;
      //console.log(changeDue)
    if (changeDue == 0 && changeAv > 0 ) {  
        msgPrint.status = "OPEN";
        msgPrint.change = changeTable;
        return msgPrint;
      } 
    if (changeDue > 0 && changeAv > 0) {
        msgPrint.status = "INSUFFICIENT_FUNDS";
        return msgPrint;
  
      }
      
  
    }
    
   
  }
  
  checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);
  